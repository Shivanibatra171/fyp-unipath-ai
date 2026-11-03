# UniPath AI — Academic Admissions & Test Prep Portal for Pakistani Students

**Final Year Project (FYP)**

A complete academic guidance and entrance examination preparation system designed specifically for Pakistani Intermediate students (FSc Pre-Engineering, Pre-Medical, ICS, I.Com, FA, and Cambridge A-Levels).

---

## Project Structure

```
E:\fyp\unipath-ai_app\
├── start-web.bat                 # 1-Click launcher for Web Frontend
├── run-mobile.bat                # 1-Click launcher for Mobile Flutter App
├── web/                          # Web Frontend Application (React + Vite + TypeScript)
│   ├── start.bat                 # Direct Node launcher for Vite dev server
│   ├── package.json
│   ├── src/
│   │   ├── components/           # Navigation, Cards, Modals, Marksheet Scanner
│   │   ├── context/              # Global state (Shortlist, User Profile, Notifications)
│   │   ├── data/                 # 10 Universities, 25 MCQs, RAG Knowledge, Study Plan
│   │   ├── pages/                # 12 Complete Interactive Pages
│   │   └── types/                # TypeScript Interfaces
│   └── dist/                     # Optimized Production Build
│
└── mobile/                       # Mobile Application (Flutter Material 3 + Dart)
    ├── pubspec.yaml              # Dependencies (google_fonts, cupertino_icons)
    ├── analysis_options.yaml
    └── lib/
        ├── main.dart             # App entry point, MaterialApp & Route definitions
        ├── theme/
        │   └── app_theme.dart    # Academic Prospectus Design System (Ink Navy & Gold)
        ├── models/
        │   └── models.dart       # Strong Dart models
        ├── data/
        │   └── mock_data.dart    # Rich dataset (10 Pakistani Unis, 25 MCQs, RAG)
        ├── widgets/              # 8 Reusable Design Components
        │   ├── app_button.dart
        │   ├── app_card.dart
        │   ├── app_text_field.dart
        │   ├── badge_chip.dart
        │   ├── progress_path.dart
        │   ├── stat_card.dart
        │   ├── marksheet_scanner.dart
        │   └── comparison_bar.dart
        └── screens/              # 15 Interactive Screens
            ├── onboarding/       # 3-Slide Swipeable Onboarding
            ├── auth/             # Login & Registration with Pakistani Boards & Groups
            ├── main_navigation_screen.dart # 5-Tab Material 3 Navigation Bar
            ├── home/             # Student Dashboard & Admission Alerts
            ├── discover/         # AI Cognitive Interview, 5-Tab Uni Details, Compare, RAG Chat
            ├── applications/     # Application Trackers & Pakistani Document Vault
            ├── test_prep/        # 25-MCQ Test Engine, 4-Week Timetable, Mock Exams
            └── profile/          # Editable Academic Profile & Notification Settings
```

---

## Design System & Institutional Palette

- **Ink Navy (`#17284A`)**: Primary institutional brand color.
- **Convocation Gold (`#C79A3D`)**: Accent color for calls to action, badges, and progress milestones.
- **Field Green (`#2F6B4F`)**: Success states and verified criteria.
- **Clay Red (`#B5482F`)**: Urgent deadlines and weak area alerts.
- **Paper Blue-White (`#F5F6F9`)**: Neutral background for clean academic reading.
- **Typography**: Headings in **Fraunces** serif, Body & UI in **IBM Plex Sans**.

---

## 10 Launch Pakistani Universities

1. **NUST Islamabad** (National University of Sciences and Technology)
2. **LUMS Lahore** (Lahore University of Management Sciences)
3. **Quaid-e-Azam University (QAU)** Islamabad
4. **FAST-NUCES** (National University of Computer and Emerging Sciences)
5. **IBA Karachi** (Institute of Business Administration)
6. **Punjab University (PUCIT / CEIT)** Lahore
7. **UET Lahore** (University of Engineering and Technology)
8. **Sukkur IBA University**
9. **GIKI Topi** (Ghulam Ishaq Khan Institute of Engineering Sciences and Technology)
10. **COMSATS University Islamabad (CUI)**

---

## How to Run

### 1. Web Application (React + Vite)
Simply double-click:
```
E:\fyp\unipath-ai_app\start-web.bat
```
This will automatically launch the local Vite development server and open your default web browser at `http://localhost:5173`.

### 2. Mobile Application (Flutter)
Ensure Flutter SDK is installed and available in your command line, then run:
```bash
cd E:\fyp\unipath-ai_app\mobile
flutter pub get
flutter run
```
Or double-click `run-mobile.bat`. You can also open the `mobile/` directory directly inside **VS Code** or **Android Studio** to run on an Android emulator or connected device.
