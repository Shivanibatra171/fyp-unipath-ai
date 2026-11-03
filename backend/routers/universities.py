"""
Universities data + Recommendation engine.
All 10 Pakistani universities with verified data.
"""
from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional, List

router = APIRouter(prefix="/universities", tags=["universities"])

# --- University Data (from universitiesData.ts, converted to Python) ---
UNIVERSITIES = [
    {
        "id": "nust",
        "name": "NUST",
        "fullName": "National University of Sciences and Technology",
        "city": "Islamabad",
        "province": "Federal",
        "type": "Public",
        "ranking": 1,
        "officialWebsite": "https://www.nust.edu.pk",
        "admissionPortal": "https://ugadmissions.nust.edu.pk",
        "minAggregate": 70,
        "annualFee": 350000,
        "hasScholarship": True,
        "aggregateWeights": {"entryTest": 50, "fscHssc": 40, "matricSsc": 10},
        "entryTest": "NET",
        "programs": [
            {"name": "Computer Science", "department": "SEECS", "seats": 120, "minAggregate": 75},
            {"name": "Software Engineering", "department": "SEECS", "seats": 80, "minAggregate": 73},
            {"name": "Electrical Engineering", "department": "SEECS", "seats": 100, "minAggregate": 72},
            {"name": "Mechanical Engineering", "department": "SMME", "seats": 80, "minAggregate": 70},
            {"name": "Civil Engineering", "department": "SCEE", "seats": 60, "minAggregate": 68},
        ],
        "scholarships": ["Need-based", "Merit-based", "NUST Excellence Award"],
        "description": "Pakistan's top engineering university, ranked #1 in Pakistan."
    },
    {
        "id": "lums",
        "name": "LUMS",
        "fullName": "Lahore University of Management Sciences",
        "city": "Lahore",
        "province": "Punjab",
        "type": "Private",
        "ranking": 2,
        "officialWebsite": "https://www.lums.edu.pk",
        "admissionPortal": "https://admission.lums.edu.pk",
        "minAggregate": 75,
        "annualFee": 800000,
        "hasScholarship": True,
        "aggregateWeights": {"entryTest": 50, "fscHssc": 30, "matricSsc": 20},
        "entryTest": "SAT/LCAT",
        "programs": [
            {"name": "Computer Science", "department": "SBASSE", "seats": 100, "minAggregate": 80},
            {"name": "Business Administration", "department": "SDSB", "seats": 200, "minAggregate": 75},
            {"name": "Economics", "department": "SDSB", "seats": 80, "minAggregate": 75},
            {"name": "Law", "department": "Shaikh Ahmad Hassan School of Law", "seats": 60, "minAggregate": 76},
            {"name": "Accounting & Finance", "department": "SDSB", "seats": 100, "minAggregate": 75},
        ],
        "scholarships": ["National Outreach Programme (NOP)", "Need-based Financial Aid", "Merit Scholarship"],
        "description": "Pakistan's leading business school and liberal arts university."
    },
    {
        "id": "fast",
        "name": "FAST-NUCES",
        "fullName": "FAST National University of Computer and Emerging Sciences",
        "city": "Islamabad",
        "province": "Federal",
        "type": "Private",
        "ranking": 3,
        "officialWebsite": "https://www.nu.edu.pk",
        "admissionPortal": "https://admissions.nu.edu.pk",
        "minAggregate": 55,
        "annualFee": 200000,
        "hasScholarship": True,
        "aggregateWeights": {"entryTest": 50, "fscHssc": 40, "matricSsc": 10},
        "entryTest": "NU Entry Test",
        "programs": [
            {"name": "Computer Science", "department": "CS", "seats": 200, "minAggregate": 60},
            {"name": "Software Engineering", "department": "CS", "seats": 100, "minAggregate": 58},
            {"name": "Artificial Intelligence", "department": "CS", "seats": 80, "minAggregate": 62},
            {"name": "Data Science", "department": "CS", "seats": 60, "minAggregate": 60},
            {"name": "Electrical Engineering", "department": "EE", "seats": 80, "minAggregate": 55},
        ],
        "scholarships": ["HEC Need-based", "FAST Merit Scholarship", "Alumni Scholarship"],
        "description": "Pakistan's top CS university with campuses in 5 cities."
    },
    {
        "id": "iba",
        "name": "IBA Karachi",
        "fullName": "Institute of Business Administration",
        "city": "Karachi",
        "province": "Sindh",
        "type": "Public",
        "ranking": 4,
        "officialWebsite": "https://www.iba.edu.pk",
        "admissionPortal": "https://admission.iba.edu.pk",
        "minAggregate": 60,
        "annualFee": 350000,
        "hasScholarship": True,
        "aggregateWeights": {"entryTest": 60, "fscHssc": 30, "matricSsc": 10},
        "entryTest": "IBA Aptitude Test",
        "programs": [
            {"name": "Business Administration", "department": "BBA", "seats": 120, "minAggregate": 65},
            {"name": "Computer Science", "department": "CS", "seats": 80, "minAggregate": 63},
            {"name": "Economics & Mathematics", "department": "Economics", "seats": 60, "minAggregate": 60},
            {"name": "Accounting & Finance", "department": "Accounting", "seats": 80, "minAggregate": 62},
            {"name": "Social Sciences", "department": "SS", "seats": 40, "minAggregate": 60},
        ],
        "scholarships": ["IBA Need-based", "IBA Merit Scholarship", "Donor Scholarships"],
        "description": "Pakistan's oldest business school, consistently ranked top in business education."
    },
    {
        "id": "giki",
        "name": "GIKI",
        "fullName": "Ghulam Ishaq Khan Institute of Engineering Sciences and Technology",
        "city": "Topi",
        "province": "KPK",
        "type": "Private",
        "ranking": 5,
        "officialWebsite": "https://www.giki.edu.pk",
        "admissionPortal": "https://giki.edu.pk/admissions",
        "minAggregate": 60,
        "annualFee": 450000,
        "hasScholarship": True,
        "aggregateWeights": {"entryTest": 50, "fscHssc": 40, "matricSsc": 10},
        "entryTest": "ECAT/NET",
        "programs": [
            {"name": "Computer Engineering", "department": "FCS&E", "seats": 80, "minAggregate": 65},
            {"name": "Software Engineering", "department": "FCS&E", "seats": 60, "minAggregate": 63},
            {"name": "Mechanical Engineering", "department": "FME", "seats": 80, "minAggregate": 62},
            {"name": "Electrical Engineering", "department": "FES&E", "seats": 80, "minAggregate": 62},
            {"name": "Industrial Engineering", "department": "FES&E", "seats": 40, "minAggregate": 60},
        ],
        "scholarships": ["GIKI Need-based", "GIKI Merit Scholarship", "HEC Scholarship"],
        "description": "Top engineering institute in KPK, known for rigorous engineering programs."
    },
    {
        "id": "qau",
        "name": "Quaid-e-Azam University",
        "fullName": "Quaid-i-Azam University",
        "city": "Islamabad",
        "province": "Federal",
        "type": "Public",
        "ranking": 6,
        "officialWebsite": "https://qau.edu.pk",
        "admissionPortal": "https://qau.edu.pk/admissions",
        "minAggregate": 50,
        "annualFee": 50000,
        "hasScholarship": True,
        "aggregateWeights": {"entryTest": 30, "fscHssc": 50, "matricSsc": 20},
        "entryTest": "QAU Entry Test",
        "programs": [
            {"name": "Computer Science", "department": "CS", "seats": 60, "minAggregate": 55},
            {"name": "Physics", "department": "Sciences", "seats": 80, "minAggregate": 50},
            {"name": "Chemistry", "department": "Sciences", "seats": 80, "minAggregate": 50},
            {"name": "Mathematics", "department": "Sciences", "seats": 60, "minAggregate": 50},
            {"name": "Biotechnology", "department": "Sciences", "seats": 40, "minAggregate": 55},
        ],
        "scholarships": ["HEC Need-based", "QAU Merit Scholarship", "Federal Government Scholarship"],
        "description": "Federal government's premier research university in Islamabad."
    },
    {
        "id": "uet",
        "name": "UET Lahore",
        "fullName": "University of Engineering and Technology Lahore",
        "city": "Lahore",
        "province": "Punjab",
        "type": "Public",
        "ranking": 7,
        "officialWebsite": "https://www.uet.edu.pk",
        "admissionPortal": "https://www.uet.edu.pk/admissions",
        "minAggregate": 60,
        "annualFee": 80000,
        "hasScholarship": True,
        "aggregateWeights": {"entryTest": 40, "fscHssc": 40, "matricSsc": 20},
        "entryTest": "ECAT",
        "programs": [
            {"name": "Computer Science", "department": "CS", "seats": 120, "minAggregate": 68},
            {"name": "Electrical Engineering", "department": "EE", "seats": 160, "minAggregate": 65},
            {"name": "Civil Engineering", "department": "CE", "seats": 120, "minAggregate": 62},
            {"name": "Mechanical Engineering", "department": "ME", "seats": 120, "minAggregate": 63},
            {"name": "Chemical Engineering", "department": "ChE", "seats": 80, "minAggregate": 60},
        ],
        "scholarships": ["Punjab Government Scholarship", "HEC Need-based", "UET Merit Scholarship"],
        "description": "One of Pakistan's oldest and most respected engineering universities."
    },
    {
        "id": "punjab",
        "name": "University of the Punjab",
        "fullName": "University of the Punjab",
        "city": "Lahore",
        "province": "Punjab",
        "type": "Public",
        "ranking": 8,
        "officialWebsite": "https://www.pu.edu.pk",
        "admissionPortal": "https://admissions.pu.edu.pk",
        "minAggregate": 45,
        "annualFee": 40000,
        "hasScholarship": True,
        "aggregateWeights": {"entryTest": 25, "fscHssc": 55, "matricSsc": 20},
        "entryTest": "Punjab University Entry Test",
        "programs": [
            {"name": "Computer Science", "department": "PUCIT", "seats": 200, "minAggregate": 55},
            {"name": "Business Administration", "department": "PMBA", "seats": 200, "minAggregate": 50},
            {"name": "Law", "department": "Law", "seats": 100, "minAggregate": 48},
            {"name": "Mass Communication", "department": "MCM", "seats": 80, "minAggregate": 45},
            {"name": "Psychology", "department": "Applied Psychology", "seats": 60, "minAggregate": 45},
        ],
        "scholarships": ["Punjab Endowment Fund", "HEC Need-based", "PM Laptop Scheme"],
        "description": "Pakistan's largest university with diverse programs and low fees."
    },
    {
        "id": "sukkur",
        "name": "Sukkur IBA University",
        "fullName": "Sukkur IBA University",
        "city": "Sukkur",
        "province": "Sindh",
        "type": "Public",
        "ranking": 9,
        "officialWebsite": "https://www.iba-suk.edu.pk",
        "admissionPortal": "https://admission.iba-suk.edu.pk",
        "minAggregate": 50,
        "annualFee": 60000,
        "hasScholarship": True,
        "aggregateWeights": {"entryTest": 40, "fscHssc": 40, "matricSsc": 20},
        "entryTest": "Sukkur IBA Entry Test",
        "programs": [
            {"name": "Computer Science", "department": "CS", "seats": 60, "minAggregate": 55},
            {"name": "Software Engineering", "department": "CS", "seats": 40, "minAggregate": 53},
            {"name": "Business Administration", "department": "Business", "seats": 80, "minAggregate": 50},
            {"name": "Electrical Engineering", "department": "Engineering", "seats": 40, "minAggregate": 52},
            {"name": "Education", "department": "Education", "seats": 40, "minAggregate": 50},
        ],
        "scholarships": ["Sindh Government Scholarship", "IBA-Sukkur Merit Scholarship", "HEC Need-based"],
        "description": "Sindh's top public university, modeled after IBA Karachi."
    },
    {
        "id": "comsats",
        "name": "COMSATS University",
        "fullName": "COMSATS University Islamabad",
        "city": "Islamabad",
        "province": "Federal",
        "type": "Public",
        "ranking": 10,
        "officialWebsite": "https://www.comsats.edu.pk",
        "admissionPortal": "https://admission.comsats.edu.pk",
        "minAggregate": 50,
        "annualFee": 120000,
        "hasScholarship": True,
        "aggregateWeights": {"entryTest": 30, "fscHssc": 50, "matricSsc": 20},
        "entryTest": "CUI Entry Test",
        "programs": [
            {"name": "Computer Science", "department": "CS", "seats": 200, "minAggregate": 55},
            {"name": "Software Engineering", "department": "CS", "seats": 100, "minAggregate": 53},
            {"name": "Electrical Engineering", "department": "EE", "seats": 120, "minAggregate": 52},
            {"name": "Bioinformatics", "department": "Biosciences", "seats": 40, "minAggregate": 50},
            {"name": "Business Administration", "department": "Management", "seats": 120, "minAggregate": 50},
        ],
        "scholarships": ["HEC Need-based", "COMSATS Merit Scholarship", "PM Fee Reimbursement"],
        "description": "Multi-campus public university with strong science and technology focus."
    },
]

# --- Endpoints ---
@router.get("/")
def get_all_universities():
    return UNIVERSITIES

@router.get("/{university_id}")
def get_university(university_id: str):
    for uni in UNIVERSITIES:
        if uni["id"] == university_id:
            return uni
    from fastapi import HTTPException
    raise HTTPException(status_code=404, detail="University not found")

@router.get("/{university_id}/programs")
def get_programs(university_id: str):
    for uni in UNIVERSITIES:
        if uni["id"] == university_id:
            return uni["programs"]
    from fastapi import HTTPException
    raise HTTPException(status_code=404, detail="University not found")

# --- Recommendation Engine ---
class RecommendRequest(BaseModel):
    matric_marks: Optional[int] = None
    matric_total: Optional[int] = 1100
    fsc_marks: Optional[int] = None
    fsc_total: Optional[int] = 1100
    expected_test_score: Optional[int] = None
    budget: Optional[int] = None
    preferred_cities: Optional[List[str]] = None
    interests: Optional[List[str]] = None
    target_major: Optional[str] = None

@router.post("/recommend")
def recommend_universities(data: RecommendRequest):
    results = []
    
    # Calculate percentages
    matric_pct = (data.matric_marks / data.matric_total * 100) if data.matric_marks else None
    fsc_pct = (data.fsc_marks / data.fsc_total * 100) if data.fsc_marks else None
    test_pct = (data.expected_test_score / 200 * 100) if data.expected_test_score else None

    for uni in UNIVERSITIES:
        score = 100  # Start with perfect score, deduct based on mismatches
        reasons = []
        warnings = []
        eligible = True
        
        # Calculate aggregate if we have data
        aggregate = None
        w = uni["aggregateWeights"]
        if matric_pct and fsc_pct and test_pct:
            aggregate = (
                test_pct * w["entryTest"] / 100 +
                fsc_pct * w["fscHssc"] / 100 +
                matric_pct * w["matricSsc"] / 100
            )
        elif fsc_pct:
            aggregate = fsc_pct  # rough estimate

        # Check eligibility
        if aggregate and aggregate < uni["minAggregate"]:
            eligible = False
            gap = uni["minAggregate"] - aggregate
            warnings.append(f"Aggregate {aggregate:.1f}% is below minimum {uni['minAggregate']}% (gap: {gap:.1f}%)")
            score -= 40
        elif aggregate:
            gap = aggregate - uni["minAggregate"]
            if gap >= 10:
                reasons.append(f"✅ Well above merit cutoff (+{gap:.1f}%)")
                score += 10
            elif gap >= 5:
                reasons.append(f"✅ Above merit cutoff (+{gap:.1f}%)")
            else:
                reasons.append(f"⚡ Near merit cutoff (+{gap:.1f}%)")
                score -= 5

        # Budget check
        if data.budget:
            if uni["annualFee"] <= data.budget:
                reasons.append(f"✅ Within budget (Fee: PKR {uni['annualFee']:,}/yr)")
            elif uni["hasScholarship"]:
                reasons.append(f"⚠️ Fee PKR {uni['annualFee']:,}/yr (scholarships available)")
                score -= 10
            else:
                warnings.append(f"❌ Fee PKR {uni['annualFee']:,}/yr exceeds budget")
                score -= 20

        # Location preference
        if data.preferred_cities and len(data.preferred_cities) > 0:
            if uni["city"] in data.preferred_cities:
                reasons.append(f"✅ Located in preferred city ({uni['city']})")
                score += 5
            else:
                score -= 5

        # Major/program match
        matched_programs = []
        if data.target_major:
            for prog in uni["programs"]:
                if data.target_major.lower() in prog["name"].lower():
                    matched_programs.append(prog["name"])
        if matched_programs:
            reasons.append(f"✅ Offers: {', '.join(matched_programs)}")
            score += 10
        elif data.target_major:
            score -= 15
            warnings.append(f"No exact match for '{data.target_major}'")

        results.append({
            "university": {
                "id": uni["id"],
                "name": uni["name"],
                "fullName": uni["fullName"],
                "city": uni["city"],
                "type": uni["type"],
                "annualFee": uni["annualFee"],
                "hasScholarship": uni["hasScholarship"],
                "officialWebsite": uni["officialWebsite"],
                "minAggregate": uni["minAggregate"],
            },
            "matchScore": max(0, min(100, score)),
            "estimatedAggregate": round(aggregate, 1) if aggregate else None,
            "eligible": eligible,
            "reasons": reasons,
            "warnings": warnings,
            "matchedPrograms": matched_programs,
        })

    # Sort by match score descending
    results.sort(key=lambda x: x["matchScore"], reverse=True)
    return results
