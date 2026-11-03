"""
RAG (Retrieval-Augmented Generation) router.
Uses university knowledge base + keyword retrieval + Gemini API (if key available).
If no Gemini key, returns retrieved context directly.
"""
import os
from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional, List

router = APIRouter(prefix="/rag", tags=["rag"])

# --- University Knowledge Base ---
# Structured knowledge from all 10 universities
KNOWLEDGE_BASE = [
    # NUST
    {"id": "nust_1", "university": "NUST", "topic": "admission", "text": "NUST (National University of Sciences and Technology) admissions are through the NET (NUST Entry Test). The minimum aggregate required is 70%. Aggregate formula: Entry Test 50% + FSc 40% + Matric 10%. Admission portal: ugadmissions.nust.edu.pk", "source": "NUST Official Admission Guide", "url": "https://ugadmissions.nust.edu.pk"},
    {"id": "nust_2", "university": "NUST", "topic": "fees", "text": "NUST annual tuition fee is approximately PKR 350,000 per year for undergraduate programs. This varies by program and school. Fee structure is available on the official website.", "source": "NUST Fee Structure", "url": "https://www.nust.edu.pk/students/fee-structure"},
    {"id": "nust_3", "university": "NUST", "topic": "scholarships", "text": "NUST offers Need-based scholarships, Merit-based scholarships, and the NUST Excellence Award. The National Outreach Programme (NOP) supports students from underprivileged backgrounds. Students can apply through the NUST financial aid office.", "source": "NUST Scholarship Information", "url": "https://www.nust.edu.pk/students/scholarships"},
    {"id": "nust_4", "university": "NUST", "topic": "programs", "text": "NUST offers programs in Computer Science, Software Engineering, Electrical Engineering, Mechanical Engineering, and Civil Engineering through schools like SEECS, SMME, and SCEE. SEECS is the School of Electrical Engineering and Computer Science.", "source": "NUST Academic Programs", "url": "https://www.nust.edu.pk/academics"},
    {"id": "nust_5", "university": "NUST", "topic": "eligibility", "text": "For NUST admission, you must have completed FSc Pre-Engineering or equivalent with at least 60% marks. You must appear in NET (NUST Entry Test). Only FSc (or equivalent) students in natural sciences are eligible for engineering programs.", "source": "NUST Eligibility Criteria", "url": "https://ugadmissions.nust.edu.pk"},

    # LUMS
    {"id": "lums_1", "university": "LUMS", "topic": "admission", "text": "LUMS (Lahore University of Management Sciences) accepts SAT scores or LCAT (LUMS Common Admission Test) for undergraduate admissions. Minimum aggregate: 75%. Aggregate: Entry Test 50% + FSc 30% + Matric 20%.", "source": "LUMS Admissions Guide", "url": "https://admission.lums.edu.pk"},
    {"id": "lums_2", "university": "LUMS", "topic": "fees", "text": "LUMS annual fee is approximately PKR 800,000 per year, making it one of the most expensive universities in Pakistan. However, LUMS offers extensive financial aid through the National Outreach Programme (NOP).", "source": "LUMS Fee Structure", "url": "https://www.lums.edu.pk/admissions/tuition-fee"},
    {"id": "lums_3", "university": "LUMS", "topic": "scholarships", "text": "LUMS National Outreach Programme (NOP) provides full scholarships to students from under-resourced backgrounds across Pakistan. Over 50% of LUMS students receive financial aid. Need-based and merit scholarships are available.", "source": "LUMS NOP Information", "url": "https://nop.lums.edu.pk"},
    {"id": "lums_4", "university": "LUMS", "topic": "programs", "text": "LUMS offers programs through SDSB (Business), SBASSE (Sciences), Shaikh Ahmad Hassan School of Law, and Mushtaq Ahmad Gurmani School of Humanities. Programs include CS, Business Administration, Economics, Law, and Accounting & Finance.", "source": "LUMS Academics", "url": "https://www.lums.edu.pk/academics"},

    # FAST-NUCES
    {"id": "fast_1", "university": "FAST-NUCES", "topic": "admission", "text": "FAST-NUCES (Foundation for Advancement of Science and Technology) has campuses in Islamabad, Lahore, Karachi, Peshawar, and Chiniot. Admission is through the NU Entry Test. Minimum aggregate: 55%. Formula: Entry Test 50% + FSc 40% + Matric 10%.", "source": "FAST Admissions Policy", "url": "https://admissions.nu.edu.pk"},
    {"id": "fast_2", "university": "FAST-NUCES", "topic": "fees", "text": "FAST-NUCES annual fee is approximately PKR 200,000 per year, making it affordable for a private CS university. Fee is semester-based.", "source": "FAST Fee Structure", "url": "https://www.nu.edu.pk"},
    {"id": "fast_3", "university": "FAST-NUCES", "topic": "programs", "text": "FAST offers Computer Science, Software Engineering, Artificial Intelligence, Data Science, and Electrical Engineering. It is Pakistan's top CS-focused university.", "source": "FAST Academic Programs", "url": "https://www.nu.edu.pk/academics"},
    {"id": "fast_4", "university": "FAST-NUCES", "topic": "scholarships", "text": "FAST offers HEC need-based scholarships, FAST merit scholarships, and alumni scholarships. Students with 80%+ aggregate may qualify for merit-based fee waiver.", "source": "FAST Scholarship Information", "url": "https://www.nu.edu.pk/students/scholarships"},

    # IBA Karachi
    {"id": "iba_1", "university": "IBA Karachi", "topic": "admission", "text": "IBA Karachi is Pakistan's oldest business school. Admission via IBA Aptitude Test. Minimum aggregate: 60%. Formula: Entry Test 60% + FSc 30% + Matric 10%. IBA is highly selective.", "source": "IBA Admission Guide", "url": "https://admission.iba.edu.pk"},
    {"id": "iba_2", "university": "IBA Karachi", "topic": "fees", "text": "IBA Karachi annual fee is approximately PKR 350,000 per year. IBA is a public university with reasonable fees for the quality of education provided.", "source": "IBA Fee Structure", "url": "https://www.iba.edu.pk"},
    {"id": "iba_3", "university": "IBA Karachi", "topic": "scholarships", "text": "IBA offers need-based scholarships, merit scholarships, and various donor scholarships. IBA has a strong alumni network that funds student scholarships.", "source": "IBA Financial Aid", "url": "https://www.iba.edu.pk/financial-aid"},

    # GIKI
    {"id": "giki_1", "university": "GIKI", "topic": "admission", "text": "GIKI (Ghulam Ishaq Khan Institute) in Topi, KPK accepts ECAT or NET for admission. Minimum aggregate: 60%. Formula: Entry Test 50% + FSc 40% + Matric 10%.", "source": "GIKI Admissions", "url": "https://giki.edu.pk/admissions"},
    {"id": "giki_2", "university": "GIKI", "topic": "fees", "text": "GIKI annual fee is approximately PKR 450,000 per year. As a residential university, hostel and meal expenses add to the total cost.", "source": "GIKI Fee Structure", "url": "https://giki.edu.pk"},
    {"id": "giki_3", "university": "GIKI", "topic": "programs", "text": "GIKI offers Computer Engineering, Software Engineering, Mechanical Engineering, Electrical Engineering, and Industrial Engineering. GIKI is known for rigorous engineering education.", "source": "GIKI Academic Programs", "url": "https://giki.edu.pk/academics"},

    # QAU
    {"id": "qau_1", "university": "QAU", "topic": "admission", "text": "Quaid-i-Azam University (QAU) in Islamabad is a federal research university. Admission via QAU Entry Test. Minimum aggregate: 50%. Formula: Entry Test 30% + FSc 50% + Matric 20%.", "source": "QAU Admissions", "url": "https://qau.edu.pk/admissions"},
    {"id": "qau_2", "university": "QAU", "topic": "fees", "text": "QAU is one of the most affordable universities in Pakistan with annual fees around PKR 50,000. As a federal university, fees are heavily subsidized.", "source": "QAU Fee Structure", "url": "https://qau.edu.pk"},
    {"id": "qau_3", "university": "QAU", "topic": "programs", "text": "QAU offers programs in Computer Science, Physics, Chemistry, Mathematics, and Biotechnology. QAU is strong in natural sciences and research.", "source": "QAU Academic Programs", "url": "https://qau.edu.pk/academics"},

    # UET Lahore
    {"id": "uet_1", "university": "UET Lahore", "topic": "admission", "text": "UET (University of Engineering and Technology) Lahore requires ECAT for admission. Minimum aggregate: 60%. Formula: Entry Test 40% + FSc 40% + Matric 20%.", "source": "UET Admissions", "url": "https://www.uet.edu.pk/admissions"},
    {"id": "uet_2", "university": "UET Lahore", "topic": "fees", "text": "UET Lahore annual fee is approximately PKR 80,000. As Punjab's premier engineering university, it offers excellent education at low fees.", "source": "UET Fee Structure", "url": "https://www.uet.edu.pk"},
    {"id": "uet_3", "university": "UET Lahore", "topic": "programs", "text": "UET offers Computer Science, Electrical Engineering, Civil Engineering, Mechanical Engineering, and Chemical Engineering. UET is Punjab's top engineering university.", "source": "UET Academic Programs", "url": "https://www.uet.edu.pk/academics"},
    {"id": "uet_4", "university": "UET Lahore", "topic": "scholarships", "text": "UET offers Punjab Government scholarships, HEC need-based scholarships, and UET merit scholarships. Fee waivers are available for top merit students.", "source": "UET Scholarships", "url": "https://www.uet.edu.pk/students/scholarships"},

    # Punjab University
    {"id": "punjab_1", "university": "University of the Punjab", "topic": "admission", "text": "University of the Punjab is Pakistan's largest university. Admission via Punjab University Entry Test. Minimum aggregate: 45%. Formula: Entry Test 25% + FSc 55% + Matric 20%.", "source": "Punjab University Admissions", "url": "https://admissions.pu.edu.pk"},
    {"id": "punjab_2", "university": "University of the Punjab", "topic": "fees", "text": "Punjab University annual fee is approximately PKR 40,000, making it one of the most affordable options. PUCIT (Punjab University College of IT) is excellent for CS students.", "source": "PU Fee Structure", "url": "https://www.pu.edu.pk"},
    {"id": "punjab_3", "university": "University of the Punjab", "topic": "programs", "text": "Punjab University offers diverse programs: Computer Science (PUCIT), Business Administration, Law, Mass Communication, and Psychology. It has 13 constituent colleges.", "source": "PU Academic Programs", "url": "https://www.pu.edu.pk/academics"},

    # Sukkur IBA
    {"id": "sukkur_1", "university": "Sukkur IBA University", "topic": "admission", "text": "Sukkur IBA University is modeled after IBA Karachi. Admission via Sukkur IBA Entry Test. Minimum aggregate: 50%. Formula: Entry Test 40% + FSc 40% + Matric 20%.", "source": "Sukkur IBA Admissions", "url": "https://admission.iba-suk.edu.pk"},
    {"id": "sukkur_2", "university": "Sukkur IBA University", "topic": "fees", "text": "Sukkur IBA University annual fee is approximately PKR 60,000. It is Sindh's top public university with affordable fees.", "source": "Sukkur IBA Fee Structure", "url": "https://www.iba-suk.edu.pk"},
    {"id": "sukkur_3", "university": "Sukkur IBA University", "topic": "scholarships", "text": "Sukkur IBA offers Sindh Government scholarships, IBA-Sukkur merit scholarships, and HEC need-based scholarships.", "source": "Sukkur IBA Scholarships", "url": "https://www.iba-suk.edu.pk/scholarships"},

    # COMSATS
    {"id": "comsats_1", "university": "COMSATS University", "topic": "admission", "text": "COMSATS University Islamabad (CUI) has campuses in Islamabad, Lahore, Sahiwal, Attock, Wah, Abbottabad, and Vehari. Admission via CUI Entry Test. Minimum aggregate: 50%. Formula: Entry Test 30% + FSc 50% + Matric 20%.", "source": "COMSATS Admissions", "url": "https://admission.comsats.edu.pk"},
    {"id": "comsats_2", "university": "COMSATS University", "topic": "fees", "text": "COMSATS University annual fee is approximately PKR 120,000 per year. It offers quality education at moderate fees compared to other private universities.", "source": "COMSATS Fee Structure", "url": "https://www.comsats.edu.pk"},
    {"id": "comsats_3", "university": "COMSATS University", "topic": "programs", "text": "COMSATS offers Computer Science, Software Engineering, Electrical Engineering, Bioinformatics, and Business Administration. It has strong programs in CS and Engineering.", "source": "COMSATS Academic Programs", "url": "https://www.comsats.edu.pk/academics"},
    {"id": "comsats_4", "university": "COMSATS University", "topic": "scholarships", "text": "COMSATS offers HEC need-based scholarships, COMSATS merit scholarships, and PM Fee Reimbursement Scheme for students from low-income families.", "source": "COMSATS Scholarships", "url": "https://www.comsats.edu.pk/students/scholarships"},

    # General
    {"id": "gen_1", "university": "General", "topic": "aggregate", "text": "Pakistani university aggregate formula typically combines: Entry/Admission Test score (30-60%), FSc/HSSC marks (30-50%), and Matric/SSC marks (10-20%). The exact weights vary by university. Always check the official admission policy.", "source": "HEC Pakistan Guidelines", "url": "https://www.hec.gov.pk"},
    {"id": "gen_2", "university": "General", "topic": "tests", "text": "Common entry tests in Pakistan: NET (NUST), ECAT (UET/GIKI), NU Test (FAST), SAT/LCAT (LUMS), IBA Aptitude Test (IBA), CUI Test (COMSATS). MDCAT is for medical. Check which test your target university accepts.", "source": "HEC Pakistan", "url": "https://www.hec.gov.pk"},
    {"id": "gen_3", "university": "General", "topic": "hec", "text": "HEC (Higher Education Commission) provides need-based scholarships to students from low-income families at any HEC recognized university. Apply at hec.gov.pk. The PM Fee Reimbursement Scheme is also available for deserving students.", "source": "HEC Pakistan", "url": "https://www.hec.gov.pk/scholarships"},
]

# --- Simple keyword-based retrieval (no ML needed, works offline) ---
def retrieve_relevant_chunks(question: str, top_k: int = 4) -> List[dict]:
    question_lower = question.lower()
    
    # Score each chunk
    scored = []
    keywords = question_lower.split()
    
    for chunk in KNOWLEDGE_BASE:
        score = 0
        text_lower = chunk["text"].lower()
        uni_lower = chunk["university"].lower()
        topic_lower = chunk["topic"].lower()
        
        # University name mention
        for uni_name in ["nust", "lums", "fast", "iba", "giki", "qau", "uet", "punjab", "sukkur", "comsats"]:
            if uni_name in question_lower and uni_lower in ["general", uni_name]:
                score += 10
        
        # Keyword matching
        for kw in keywords:
            if len(kw) > 2:  # Skip short words
                if kw in text_lower:
                    score += 3
                if kw in topic_lower:
                    score += 5
                if kw in uni_lower:
                    score += 5
        
        # Topic detection
        topic_keywords = {
            "fees": ["fee", "fees", "cost", "tuition", "afford", "price", "expensive", "cheap", "rupee", "pkr"],
            "admission": ["admission", "apply", "application", "test", "entry", "aggregate", "merit", "cutoff"],
            "scholarships": ["scholarship", "financial", "aid", "grant", "stipend", "free", "waiver", "fund"],
            "programs": ["program", "degree", "course", "major", "cs", "engineering", "business", "computer", "software"],
            "eligibility": ["eligible", "eligibility", "requirement", "criteria", "qualify", "marks", "percentage"],
        }
        
        for topic, kws in topic_keywords.items():
            if chunk["topic"] == topic:
                for kw in kws:
                    if kw in question_lower:
                        score += 8
        
        if score > 0:
            scored.append((score, chunk))
    
    # Sort by score and return top_k
    scored.sort(key=lambda x: x[0], reverse=True)
    return [chunk for _, chunk in scored[:top_k]]

# --- Gemini API integration (optional) ---
def generate_with_gemini(question: str, context_chunks: List[dict], api_key: str) -> str:
    try:
        import google.generativeai as genai
        genai.configure(api_key=api_key)
        model = genai.GenerativeModel("gemini-1.5-flash")
        
        context_text = "\n\n".join([
            f"[Source: {c['university']} - {c['source']}]\n{c['text']}"
            for c in context_chunks
        ])
        
        prompt = f"""You are UniPath AI, a helpful university admissions counselor for Pakistani students.

Use ONLY the following official information to answer the question. Do NOT invent or assume any information not present below.

=== OFFICIAL UNIVERSITY INFORMATION ===
{context_text}

=== STUDENT QUESTION ===
{question}

=== INSTRUCTIONS ===
- Answer based only on the provided information
- If information is not available, say "I don't have verified information about this"
- Be concise and helpful
- Mention the specific university when relevant
- Always encourage students to verify information from official sources

Answer:"""
        
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        return None

# --- Request/Response Models ---
class ChatRequest(BaseModel):
    question: str
    conversation_history: Optional[List[dict]] = []

class ChatResponse(BaseModel):
    answer: str
    sources: List[dict]
    used_ai: bool

# --- Endpoint ---
@router.post("/chat", response_model=ChatResponse)
def rag_chat(data: ChatRequest):
    question = data.question.strip()
    
    # Step 1: Retrieve relevant chunks
    relevant_chunks = retrieve_relevant_chunks(question, top_k=4)
    
    # Step 2: Try Gemini API if key is available
    api_key = os.getenv("GEMINI_API_KEY", "")
    answer = None
    used_ai = False
    
    if api_key and relevant_chunks:
        answer = generate_with_gemini(question, relevant_chunks, api_key)
        if answer:
            used_ai = True
    
    # Step 3: Fallback — compose answer from retrieved chunks
    if not answer:
        if relevant_chunks:
            answer = "Based on official university information:\n\n"
            for chunk in relevant_chunks[:2]:
                answer += f"**{chunk['university']}:** {chunk['text']}\n\n"
            answer += "\n*Please verify all information from official university websites before applying.*"
        else:
            answer = "I don't have specific information about that in my knowledge base. Please visit the official university website or contact the admissions office directly."
    
    # Step 4: Format sources
    sources = [
        {
            "university": c["university"],
            "document": c["source"],
            "excerpt": c["text"][:200] + "..." if len(c["text"]) > 200 else c["text"],
            "url": c.get("url", ""),
        }
        for c in relevant_chunks
    ]
    
    return ChatResponse(answer=answer, sources=sources, used_ai=used_ai)
