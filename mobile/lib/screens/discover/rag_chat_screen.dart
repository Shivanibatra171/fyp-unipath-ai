import 'package:flutter/material.dart';
import '../../theme/app_theme.dart';
import '../../models/models.dart';
import '../../data/mock_data.dart';

class ChatMessage {
  final String text;
  final bool isUser;
  final String? citation;
  final String? universitySource;

  const ChatMessage({
    required this.text,
    required this.isUser,
    this.citation,
    this.universitySource,
  });
}

class RagChatScreen extends StatefulWidget {
  const RagChatScreen({super.key});

  @override
  State<RagChatScreen> createState() => _RagChatScreenState();
}

class _RagChatScreenState extends State<RagChatScreen> {
  final TextEditingController _controller = TextEditingController();
  final ScrollController _scrollController = ScrollController();

  final List<ChatMessage> _messages = [
    const ChatMessage(
      text:
          'Assalam-o-Alaikum! I am your UniPath AI Prospectus Assistant. Ask me anything about admission criteria, aggregate formulas, tuition fees, hostels, or scholarships for top Pakistani universities.',
      isUser: false,
      citation: 'Official Prospectus Database 2025/2026',
    ),
  ];

  final List<String> _suggestedPrompts = [
    'What is the NUST NET merit formula?',
    'What is FAST-NUCES CS tuition fee?',
    'Does LUMS provide full financial aid?',
    'Can ICS students apply to Software Engineering?',
    'What is the IBA Karachi test structure?',
  ];

  void _sendMessage(String query) {
    if (query.trim().isEmpty) return;

    setState(() {
      _messages.add(ChatMessage(text: query, isUser: true));
      _controller.clear();
    });

    _scrollToBottom();

    // RAG retrieval simulation
    Future.delayed(const Duration(milliseconds: 600), () {
      final qLower = query.toLowerCase();
      RAGKnowledgeItem? matchedItem;

      for (var item in MockData.ragKnowledge) {
        final itemQLower = item.query.toLowerCase();
        if (qLower.contains('nust') && itemQLower.contains('nust')) {
          matchedItem = item;
          break;
        } else if (qLower.contains('fast') && itemQLower.contains('fast')) {
          matchedItem = item;
          break;
        } else if (qLower.contains('lums') && itemQLower.contains('lums')) {
          matchedItem = item;
          break;
        }
      }

      String reply;
      String citation;
      String? uniName;

      if (matchedItem != null) {
        reply = matchedItem.answer;
        citation = matchedItem.source;
        uniName = matchedItem.universityName;
      } else if (qLower.contains('ics') || qLower.contains('pre-eng')) {
        reply =
            'According to HEC and NCEAC regulations, ICS students with Mathematics, Physics, and Computer Science are eligible for BS Computer Science, Software Engineering, AI, and Data Science across all Pakistani universities including FAST, NUST, and GIKI.';
        citation = 'HEC National Curriculum Guidelines & University Admission Criteria 2025';
        uniName = 'HEC / NCEAC';
      } else if (qLower.contains('iba')) {
        reply =
            'IBA Karachi entrance exam consists of two main sections: Mathematics (Multiple Choice & Problem Solving) and English (Grammar, Vocabulary, Reading Comprehension). Both sections carry separate minimum cutoff criteria.';
        citation = 'IBA Karachi Testing Service Manual 2025/2026';
        uniName = 'IBA Karachi';
      } else {
        reply =
            'Based on verified admissions guidelines across Pakistan, admission aggregates heavily prioritize your entry test (50%–75%), followed by FSc Part-1 marks (15%–50%) and Matriculation (10%–15%). Check our "Merit Calculator" tab for exact institutional weightages.';
        citation = 'Consolidated Pakistani Engineering & Computing Council Guidelines';
        uniName = 'Admissions Council';
      }

      if (mounted) {
        setState(() {
          _messages.add(
            ChatMessage(
              text: reply,
              isUser: false,
              citation: citation,
              universitySource: uniName,
            ),
          );
        });
        _scrollToBottom();
      }
    });
  }

  void _scrollToBottom() {
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (_scrollController.hasClients) {
        _scrollController.animateTo(
          _scrollController.position.maxScrollExtent,
          duration: const Duration(milliseconds: 300),
          curve: Curves.easeOut,
        );
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppTheme.background,
      appBar: AppBar(
        title: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('UniPath AI Assistant', style: AppTheme.headingSmall()),
            Text('RAG Prospectus Verification', style: AppTheme.bodySmall(color: AppTheme.textSecondary)),
          ],
        ),
        backgroundColor: AppTheme.surface,
        elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back, color: AppTheme.primaryDark),
          onPressed: () => Navigator.pop(context),
        ),
      ),
      body: SafeArea(
        child: Column(
          children: [
            // Prompt suggestion chips
            Container(
              height: 44,
              color: AppTheme.surface,
              child: ListView.separated(
                scrollDirection: Axis.horizontal,
                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 6),
                itemCount: _suggestedPrompts.length,
                separatorBuilder: (context, i) => const SizedBox(width: 8),
                itemBuilder: (context, index) {
                  final prompt = _suggestedPrompts[index];
                  return ActionChip(
                    label: Text(
                      prompt,
                      style: const TextStyle(fontSize: 11, color: AppTheme.primary, fontWeight: FontWeight.w600),
                    ),
                    backgroundColor: AppTheme.primarySubtle,
                    side: BorderSide(color: AppTheme.primary.withOpacity(0.2)),
                    onPressed: () => _sendMessage(prompt),
                  );
                },
              ),
            ),
            const Divider(height: 1),

            // Chat stream
            Expanded(
              child: ListView.builder(
                controller: _scrollController,
                padding: const EdgeInsets.all(16),
                itemCount: _messages.length,
                itemBuilder: (context, index) {
                  final msg = _messages[index];
                  if (msg.isUser) {
                    return Align(
                      alignment: Alignment.centerRight,
                      child: Container(
                        margin: const EdgeInsets.only(bottom: 12, left: 40),
                        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                        decoration: BoxDecoration(
                          color: AppTheme.primary,
                          borderRadius: BorderRadius.circular(16).copyWith(bottomRight: Radius.zero),
                        ),
                        child: Text(
                          msg.text,
                          style: const TextStyle(color: Colors.white, fontSize: 13, height: 1.4),
                        ),
                      ),
                    );
                  } else {
                    return Align(
                      alignment: Alignment.centerLeft,
                      child: Container(
                        margin: const EdgeInsets.only(bottom: 14, right: 40),
                        padding: const EdgeInsets.all(14),
                        decoration: BoxDecoration(
                          color: AppTheme.surface,
                          borderRadius: BorderRadius.circular(16).copyWith(bottomLeft: Radius.zero),
                          border: Border.all(color: AppTheme.border),
                        ),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Row(
                              children: [
                                Container(
                                  padding: const EdgeInsets.all(4),
                                  decoration: BoxDecoration(
                                    color: AppTheme.accent,
                                    borderRadius: BorderRadius.circular(4),
                                  ),
                                  child: const Icon(Icons.school, size: 14, color: AppTheme.primaryDark),
                                ),
                                const SizedBox(width: 8),
                                Text(
                                  msg.universitySource ?? 'UniPath AI',
                                  style: const TextStyle(
                                    fontWeight: FontWeight.bold,
                                    fontSize: 12,
                                    color: AppTheme.primary,
                                  ),
                                ),
                              ],
                            ),
                            const SizedBox(height: 8),
                            Text(
                              msg.text,
                              style: AppTheme.bodyMedium(height: 1.45),
                            ),
                            if (msg.citation != null) ...[
                              const SizedBox(height: 10),
                              Container(
                                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                                decoration: BoxDecoration(
                                  color: AppTheme.primarySubtle,
                                  borderRadius: BorderRadius.circular(6),
                                  border: Border.all(color: AppTheme.primary.withOpacity(0.15)),
                                ),
                                child: Row(
                                  mainAxisSize: MainAxisSize.min,
                                  children: [
                                    const Icon(Icons.verified, size: 12, color: AppTheme.primary),
                                    const SizedBox(width: 4),
                                    Flexible(
                                      child: Text(
                                        'Verified: ${msg.citation}',
                                        style: const TextStyle(fontSize: 10, color: AppTheme.primary, fontWeight: FontWeight.w600),
                                        maxLines: 1,
                                        overflow: TextOverflow.ellipsis,
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                            ],
                          ],
                        ),
                      ),
                    );
                  }
                },
              ),
            ),

            // Input field
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
              decoration: BoxDecoration(
                color: AppTheme.surface,
                border: Border(top: BorderSide(color: AppTheme.border)),
              ),
              child: Row(
                children: [
                  Expanded(
                    child: TextField(
                      controller: _controller,
                      decoration: InputDecoration(
                        hintText: 'Ask about merit formulas, fee, hostels...',
                        hintStyle: AppTheme.bodySmall(color: AppTheme.textSecondary),
                        border: InputBorder.none,
                        contentPadding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                      ),
                      onSubmitted: _sendMessage,
                    ),
                  ),
                  IconButton(
                    icon: const Icon(Icons.send, color: AppTheme.primary),
                    onPressed: () => _sendMessage(_controller.text),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
