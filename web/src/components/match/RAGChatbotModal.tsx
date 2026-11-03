import React, { useState } from 'react';
import {
  MessageSquareText,
  Send,
  Sparkles,
  BookOpen,
  FileCheck,
  Bot,
  User,
  ShieldCheck,
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { RAG_KNOWLEDGE_BASE } from '../../data/ragKnowledgeData';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

interface RAGChatbotModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ChatEntry {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  source?: string;
  category?: string;
  officialLink?: string;
}

export const RAGChatbotModal: React.FC<RAGChatbotModalProps> = ({
  isOpen,
  onClose
}) => {
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatEntry[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: 'Assalam-o-Alaikum! I am your UniPath Prospectus Assistant. You can ask me any verified question regarding Pakistani university fee structures, entrance test syllabi, merit formulas, hostel policies, and scholarships. Every answer is cited directly from official institutional documentation.',
      source: 'UniPath Verified Knowledge Base 2025-2026'
    }
  ]);

  const presetQuestions = [
    "What is the FAST-NUCES CS tuition fee and per-semester cost?",
    "How is the NUST NET merit aggregate calculated?",
    "Does LUMS provide full financial aid and what is the NOP program?",
    "What documents do I need for Pakistani university admission?",
    "NUST vs FAST-NUCES: which is better for CS?"
  ];

  const handleSendMessage = (textToSend?: string) => {
    const query = (textToSend || inputValue).trim();
    if (!query) return;

    // 1. Add user message
    const userMsg: ChatEntry = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query
    };

    setChatHistory((prev) => [...prev, userMsg]);
    if (!textToSend) setInputValue('');
    setIsTyping(true);

    // 2. RAG Match lookup — multi-keyword scoring
    setTimeout(() => {
      const lowerQ = query.toLowerCase();
      const queryWords = lowerQ.split(/\s+/).filter((w) => w.length > 3);

      let bestMatch = RAG_KNOWLEDGE_BASE[0];
      let bestScore = -1;

      for (const item of RAG_KNOWLEDGE_BASE) {
        let score = 0;

        // University name match — high weight
        if (item.universityName && lowerQ.includes(item.universityName.toLowerCase())) {
          score += 10;
        }

        // Keyword overlap with stored query
        const itemWords = item.query.toLowerCase().split(/\s+/).filter((w) => w.length > 3);
        for (const word of queryWords) {
          if (itemWords.includes(word)) score += 2;
          if (item.answer.toLowerCase().includes(word)) score += 1;
        }

        // Category keyword hints
        if ((lowerQ.includes('fee') || lowerQ.includes('cost') || lowerQ.includes('tuition') || lowerQ.includes('scholarship') || lowerQ.includes('financial')) && item.category === 'Fee & Scholarships') score += 3;
        if ((lowerQ.includes('merit') || lowerQ.includes('aggregate') || lowerQ.includes('eligib') || lowerQ.includes('group') || lowerQ.includes('fsc') || lowerQ.includes('ics')) && item.category === 'Eligibility & Merit') score += 3;
        if ((lowerQ.includes('test') || lowerQ.includes('syllabus') || lowerQ.includes('net') || lowerQ.includes('sat') || lowerQ.includes('ecat') || lowerQ.includes('pattern')) && item.category === 'Test & Syllabus') score += 3;
        if ((lowerQ.includes('hostel') || lowerQ.includes('campus') || lowerQ.includes('resid') || lowerQ.includes('accommodat')) && item.category === 'Hostels & Campus') score += 3;
        if ((lowerQ.includes('document') || lowerQ.includes('required') || lowerQ.includes('cnic') || lowerQ.includes('matric') || lowerQ.includes('certificate')) && item.category === 'Documents & Process') score += 3;
        if ((lowerQ.includes('vs') || lowerQ.includes('better') || lowerQ.includes('difference') || lowerQ.includes('rank') || lowerQ.includes('compar')) && item.category === 'Comparison') score += 3;

        if (score > bestScore) {
          bestScore = score;
          bestMatch = item;
        }
      }

      const aiReply: ChatEntry = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: bestMatch.answer,
        source: bestMatch.source,
        category: bestMatch.category,
        officialLink: bestMatch.officialLink
      };

      setChatHistory((prev) => [...prev, aiReply]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-[6px] bg-[#17284A] text-[#C79A3D] flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </div>
          <span>Chat with UniPath AI — Official Prospectus RAG</span>
        </div>
      }
      subtitle="Verified institutional data indexed from 10 launch university prospectuses (2025-2026)"
      maxWidth="2xl"
    >
      <div className="space-y-4">
        {/* Sample Prompt Pills */}
        <div>
          <span className="text-[10px] uppercase font-bold text-[#8E97A6] tracking-wider block mb-1.5">
            Suggested Prospectus Queries:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {presetQuestions.slice(0, 3).map((pq) => (
              <button
                key={pq}
                onClick={() => handleSendMessage(pq)}
                className="text-[11px] px-2.5 py-1 rounded-[6px] bg-[#F5F6F9] hover:bg-[#DEE6F2] text-[#17284A] border border-[#E1E4EA] text-left transition-colors cursor-pointer"
              >
                {pq}
              </button>
            ))}
          </div>
        </div>

        {/* Chat History Box */}
        <div className="bg-[#FAFBFD] border border-[#E1E4EA] rounded-[10px] p-4 max-h-[360px] min-h-[260px] overflow-y-auto space-y-3.5">
          {chatHistory.map((item) => (
            <div
              key={item.id}
              className={`flex items-start gap-2.5 ${
                item.sender === 'user' ? 'flex-row-reverse' : ''
              }`}
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                  item.sender === 'ai'
                    ? 'bg-[#17284A] text-[#C79A3D]'
                    : 'bg-[#C79A3D] text-[#17284A]'
                }`}
              >
                {item.sender === 'ai' ? <Bot className="w-3.5 h-3.5" /> : <User className="w-3.5 h-3.5" />}
              </div>

              <div
                className={`max-w-[85%] rounded-[10px] p-3 text-xs leading-relaxed ${
                  item.sender === 'ai'
                    ? 'bg-white border border-[#DEE6F2] text-[#1B1F27] shadow-xs'
                    : 'bg-[#17284A] text-white'
                }`}
              >
                <p className="whitespace-pre-line">{item.text}</p>

                {item.source && (
                  <div className="mt-2.5 pt-2 border-t border-[#E1E4EA] space-y-1.5">
                    <div className="flex items-center justify-between gap-2 text-[11px] text-[#2F6B4F]">
                      <div className="flex items-center gap-1 font-semibold">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#2F6B4F]" />
                        <span>{item.source}</span>
                      </div>
                      {item.category && (
                        <Badge variant="green" size="sm">
                          {item.category}
                        </Badge>
                      )}
                    </div>
                    {item.officialLink && (
                      <a
                        href={item.officialLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs text-[#17284A] font-semibold hover:underline"
                      >
                        <ExternalLink className="w-3 h-3" /> Visit Official Admission Portal →
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 text-xs text-[#5B6472]">
              <Sparkles className="w-4 h-4 text-[#C79A3D] animate-spin" />
              <span>Querying verified prospectus knowledge base...</span>
            </div>
          )}
        </div>

        {/* Input area */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask about NUST merit, FAST fees, LUMS financial aid, etc..."
            className="flex-1 bg-white border border-[#CAD0DC] focus:border-[#17284A] focus:ring-2 focus:ring-[#17284A] rounded-[8px] px-3.5 py-2.5 text-xs text-[#1B1F27] placeholder:text-[#8E97A6] focus:outline-none"
          />
          <Button
            type="submit"
            variant="primary"
            size="md"
            disabled={!inputValue.trim()}
            rightIcon={<Send className="w-3.5 h-3.5" />}
          >
            Ask AI
          </Button>
        </form>
      </div>
    </Modal>
  );
};
