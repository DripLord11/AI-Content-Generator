# Interview Assistant - System-Level macOS Overlay Application

## Project Overview

A macOS system-level application that acts as an invisible AI-powered overlay during live technical interviews. The app captures screenshots and audio input, processes them through an AI API, and displays structured, natural-sounding answers directly on screen — invisible to screen sharing software.

---

## Research Summary: How Interview Coder Works

### Architecture
- **Electron** desktop app with React frontend and TypeScript
- Native OS window APIs for stealth (`NSWindow.sharingType = .none`, `setContentProtection(true)`)
- Global keyboard shortcuts registered at OS level (not browser level)
- Click-through overlay window (mouse events pass to underlying windows)
- No dock icon, no taskbar entry, disguised process name

### Stealth Mechanism
- Sets `NSWindow.sharingType` to `NSWindowSharingNone` — hides window from screen capture
- `BrowserWindow` configured with: `transparent: true`, `frame: false`, `skipTaskbar: true`, `hasShadow: false`, `alwaysOnTop: true`
- Overlay is click-through by default so focus never leaves the interview browser/IDE
- Global hotkeys (e.g., Cmd+B toggle visibility) don't trigger browser focus events

### Critical Limitation (macOS 15+ Sequoia)
- **Apple's ScreenCaptureKit now ignores `NSWindow.sharingType = .none`**
- On macOS 15+, all visible window content is composited into a single framebuffer before capture
- `setContentProtection(true)` only blocks legacy `CGWindowListCreateImage` APIs
- **No known public API workaround exists** — Apple has confirmed this and suggests filing Feedback Assistant requests
- Interview Coder 2.0 claims to still work, but independent testers have found visibility leaks in newer Zoom versions and macOS updates

### Features (Interview Coder 2.0)
- Screenshot capture of coding problems → AI analysis → solution generation
- Real-time audio transcription of interviewer speech
- Multi-language code support
- Problem extraction, solution generation, and debugging as separate AI stages
- Eye-contact-friendly positioning (overlay placed over code editor area)
- Window repositioning via Cmd+Arrow keys

---

## Proposed Tech Stack

### Option A: Electron + React + TypeScript (Recommended)
- **Pros**: Proven architecture (Interview Coder uses this), large ecosystem, cross-platform potential, rapid UI development with React, well-documented stealth window APIs
- **Cons**: Larger binary size (~150MB+), higher memory usage, Chromium overhead

### Option B: Tauri + React + TypeScript + Rust
- **Pros**: Much smaller binary (~10-20MB), lower memory usage, native performance, Rust backend safety
- **Cons**: Smaller ecosystem, same `NSWindow.sharingType` limitations as Electron on macOS 15+, less battle-tested for this use case

### Option C: Native Swift/SwiftUI
- **Pros**: Smallest binary, best macOS integration, direct access to all Apple APIs, lowest latency
- **Cons**: macOS only (no Windows potential), steeper learning curve, slower UI iteration

**Recommendation**: Option A (Electron) — matches the proven architecture, fastest path to MVP, and most of the open-source references use this stack.

### AI API Choice

| Dimension | Claude API | Gemini API |
|---|---|---|
| **Vision/Screenshot Analysis** | Strong practical analysis, great at code | Natively multimodal, stronger OCR heritage |
| **Speed (TTFT)** | 300-600ms | 200-400ms (Flash) |
| **Input Cost** | ~$3/M tokens (Sonnet) | ~$0.15/M (Flash), $1.25/M (Pro) |
| **Output Cost** | ~$15/M tokens (Sonnet) | ~$0.60/M (Flash), $10/M (Pro) |
| **Code Quality** | Excellent structured outputs, top-tier instruction following | Fast but less controlled outputs |
| **Interview Format Adherence** | Excels at following complex multi-step instructions | May need more prompt engineering |

**For this use case**: Both are viable. Claude excels at following the structured interview format (clarifying questions → brute force → optimization → explanation). Gemini Flash is significantly cheaper and faster for the screenshot analysis stage. A **hybrid approach** could use Gemini Flash for fast screenshot OCR/extraction and Claude for solution generation and structured interview responses.

### Audio Transcription
- **WhisperKit** (on-device, Apple Silicon native, Swift) — zero latency, free, private
- **OpenAI Whisper API** (cloud) — higher accuracy, costs money, requires network
- **Deepgram / AssemblyAI** — real-time streaming transcription APIs

**Recommendation**: WhisperKit for on-device transcription (no API cost, no latency, works offline).

---

## Application Architecture

```
┌─────────────────────────────────────────────────┐
│                  Electron Main Process           │
│  ┌───────────┐  ┌────────────┐  ┌────────────┐  │
│  │  Window    │  │  Global    │  │  Tray      │  │
│  │  Manager   │  │  Shortcuts │  │  Manager   │  │
│  └─────┬─────┘  └─────┬──────┘  └─────┬──────┘  │
│        │               │               │         │
│  ┌─────┴───────────────┴───────────────┴──────┐  │
│  │              IPC Bridge                     │  │
│  └─────────────────┬───────────────────────────┘  │
│                    │                              │
│  ┌─────────────────┴───────────────────────────┐  │
│  │           Core Services                      │  │
│  │  ┌──────────────┐  ┌─────────────────────┐  │  │
│  │  │  Screenshot   │  │  Audio Capture      │  │  │
│  │  │  Capture      │  │  + Transcription    │  │  │
│  │  └──────┬───────┘  └──────────┬──────────┘  │  │
│  │         │                     │              │  │
│  │  ┌──────┴─────────────────────┴──────────┐  │  │
│  │  │         AI Processing Pipeline         │  │  │
│  │  │  1. Problem Extraction (Vision)        │  │  │
│  │  │  2. Solution Generation (LLM)          │  │  │
│  │  │  3. Debugging/Follow-up (LLM)          │  │  │
│  │  └──────────────────┬─────────────────────┘  │  │
│  └─────────────────────┼────────────────────────┘  │
│                        │                           │
└────────────────────────┼───────────────────────────┘
                         │
┌────────────────────────┴───────────────────────────┐
│              Electron Renderer Process              │
│  ┌──────────────────────────────────────────────┐  │
│  │              React UI (Overlay)               │  │
│  │  ┌────────────┐  ┌─────────┐  ┌──────────┐  │  │
│  │  │  Solution   │  │ Status  │  │ Settings │  │  │
│  │  │  Display    │  │ Bar     │  │ Panel    │  │  │
│  │  └────────────┘  └─────────┘  └──────────┘  │  │
│  └──────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────┘
```

---

## Feature Breakdown

### Phase 1: Core MVP
1. **Invisible Overlay Window**
   - Transparent, frameless, always-on-top Electron BrowserWindow
   - `setContentProtection(true)` for screen capture exclusion
   - Click-through mode (mouse events pass to windows below)
   - No dock icon, no taskbar entry
   - Visibility toggle via global hotkey

2. **Screenshot Capture**
   - Global hotkey triggers screen region capture (exclude overlay window itself)
   - Use Electron's `desktopCapturer` or native `screencapture` command
   - Send captured image to AI API for problem extraction

3. **AI Processing Pipeline**
   - **Stage 1 - Problem Extraction**: Send screenshot to vision model, extract the coding problem, constraints, examples
   - **Stage 2 - Solution Generation**: Generate a structured response following the interview tips format:
     - Clarifying questions to ask
     - Edge cases to mention
     - Brute force approach with complexity
     - Optimized approach with data structures/patterns
     - Step-by-step code with explanations
     - Test cases and complexity analysis
   - **Stage 3 - Debug/Refine**: Send follow-up screenshots for debugging assistance

4. **Solution Display Overlay**
   - Render AI response in a clean, readable overlay
   - Scrollable content area
   - Adjustable opacity (so you can see through to the IDE)
   - Adjustable font size
   - Repositionable (Cmd+Arrow keys)

5. **Global Keyboard Shortcuts**
   - `Cmd+B` — Toggle overlay visibility
   - `Cmd+H` — Hide/show completely
   - `Cmd+Shift+S` — Capture screenshot and process
   - `Cmd+Shift+D` — Debug mode (capture + send for debugging)
   - `Cmd+Arrow` — Reposition overlay
   - `Cmd+[` / `Cmd+]` — Adjust opacity
   - `Cmd+Shift+R` — Reset/clear current session

### Phase 2: Audio Intelligence
6. **Real-Time Audio Transcription**
   - Capture system audio (interviewer's voice) and/or microphone
   - On-device transcription via WhisperKit (Apple Silicon)
   - Display live transcript in a secondary overlay panel
   - Feed transcript to AI for context-aware responses

7. **Voice-Aware AI Responses**
   - AI considers both the visual problem (screenshot) and verbal context (transcript)
   - Detects when interviewer asks follow-up questions
   - Generates contextual hints based on what interviewer says

### Phase 3: Polish & Advanced Features
8. **Multi-Language Code Support** — Python, JavaScript, Java, C++, Go, etc.
9. **Session History** — Track problems solved during an interview session
10. **Settings UI** — API key configuration, model selection, hotkey customization
11. **Auto-Update** — Electron auto-updater for seamless updates
12. **Process Disguise** — Rename process to appear as a system process

---

## Interview Response Format

The AI should generate responses structured to follow the provided interview tips:

```
## Problem Understanding
- [Clarifying questions to ask the interviewer]
- [Identified edge cases to discuss]

## Brute Force Approach
- Approach: [description]
- Time: O(?) | Space: O(?)
- [Ask: "Should I code this or move to optimization?"]

## Optimized Approach
- Pattern/DS: [e.g., HashMap, Two Pointers, Sliding Window]
- Key Insight: [why this optimization works]
- Steps:
  1. [step]
  2. [step]
  3. [step]
- Time: O(?) | Space: O(?)

## Code
```[language]
// Test case: [small example]
[solution code with clear variable names]
```

## Complexity Analysis
- Time: O(?) — [explanation with N defined]
- Space: O(?) — [explanation]
- Best case: ... | Worst case: ...
- Trade-offs: [pros/cons of this approach]

## Test Cases
- Basic: [example]
- Edge: [edge cases]
```

---

## Project Structure

```
interview-assistant/
├── electron/
│   ├── main.ts                 # Electron main process entry
│   ├── preload.ts              # Preload script for secure IPC
│   ├── window-manager.ts       # Overlay window creation & stealth config
│   ├── shortcut-manager.ts     # Global keyboard shortcut registration
│   ├── tray-manager.ts         # System tray (optional, hidden by default)
│   ├── screenshot.ts           # Screenshot capture logic
│   └── ipc-handlers.ts         # IPC message handlers
├── src/
│   ├── App.tsx                 # React app root
│   ├── components/
│   │   ├── Overlay.tsx         # Main overlay container
│   │   ├── SolutionDisplay.tsx # Rendered AI solution
│   │   ├── TranscriptPanel.tsx # Live audio transcript
│   │   ├── StatusBar.tsx       # Status indicators
│   │   └── Settings.tsx        # Settings panel
│   ├── services/
│   │   ├── ai-client.ts        # AI API client (Claude/Gemini)
│   │   ├── problem-extractor.ts # Screenshot → problem extraction
│   │   ├── solution-generator.ts # Problem → structured solution
│   │   ├── audio-service.ts    # Audio capture & transcription
│   │   └── session-manager.ts  # Interview session state
│   ├── hooks/
│   │   ├── useOverlay.ts       # Overlay state management
│   │   ├── useAI.ts            # AI request/response hooks
│   │   └── useAudio.ts         # Audio transcription hooks
│   ├── prompts/
│   │   ├── extract-problem.ts  # System prompt for problem extraction
│   │   ├── generate-solution.ts # System prompt for solution generation
│   │   └── debug-code.ts       # System prompt for debugging
│   ├── types/
│   │   └── index.ts            # TypeScript type definitions
│   └── utils/
│       ├── config.ts           # App configuration
│       └── markdown.ts         # Markdown rendering utils
├── assets/
│   └── icons/                  # App icons (icns, png)
├── package.json
├── tsconfig.json
├── electron-builder.yml        # Build configuration
├── vite.config.ts              # Vite config for React
└── .env.example                # API key template
```

---

## Key Technical Decisions Needed

### 1. Framework Choice
- **Electron** (proven, larger binary) vs **Tauri** (lighter, Rust backend) vs **Native Swift** (best macOS integration)

### 2. AI API Strategy
- **Claude only** — Best instruction following, structured outputs
- **Gemini only** — Cheapest, fastest for vision tasks
- **Hybrid** — Gemini Flash for screenshot OCR, Claude for solution generation
- **User's choice at runtime** — Support both, let user configure

### 3. Audio Transcription
- **On-device (WhisperKit)** — Free, private, works offline, requires Apple Silicon
- **Cloud (Whisper API / Deepgram)** — Works on any Mac, costs money, needs internet

### 4. macOS Version Target
- **macOS 14 and below**: `setContentProtection` works reliably for stealth
- **macOS 15+ (Sequoia)**: Apple broke `NSWindow.sharingType = .none` — ScreenCaptureKit ignores it. No known public workaround. Interview Coder 2.0 claims to still work but has reported leaks.
- This is the single biggest technical risk for the project.

### 5. Stealth vs. Functionality Trade-off
- Maximum stealth = minimal visible UI, all hotkey driven
- Maximum usability = richer overlay with interactive elements
- Need to decide where on this spectrum to land

---

## Risks & Mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| macOS 15+ breaks stealth | High | Target macOS 14 initially; research private APIs; consider non-overlay approaches (e.g., second monitor, external device) |
| AI response latency too high | Medium | Use streaming responses; Gemini Flash for extraction (200ms TTFT); pre-load prompts with caching |
| Screenshot quality issues | Low | Allow manual region selection; add image preprocessing |
| Audio transcription accuracy | Medium | WhisperKit with `large-v3` model; fallback to cloud API |
| Zoom/Meet detection updates | High | Regular testing against latest versions; community reporting |

---

## Development Phases & Milestones

### Milestone 1: Skeleton App
- Electron project scaffold with React + TypeScript + Vite
- Invisible overlay window with basic stealth configuration
- Global hotkey registration (toggle visibility)
- Basic IPC between main and renderer

### Milestone 2: Screenshot → AI Pipeline
- Screenshot capture via hotkey
- AI API integration (problem extraction + solution generation)
- Render AI response in overlay with markdown formatting
- Streaming response display

### Milestone 3: Interview-Optimized UX
- Structured response format (clarifying Qs → brute force → optimized → code → testing)
- Adjustable opacity, position, font size
- Session state management
- Debug mode (follow-up screenshots)

### Milestone 4: Audio Intelligence
- Microphone/system audio capture
- WhisperKit integration for on-device transcription
- Live transcript display
- Voice-context-aware AI responses

### Milestone 5: Polish
- Settings UI (API keys, model selection, hotkey config)
- Auto-update mechanism
- Process name disguise
- Build & distribution (DMG installer)
- Multi-language code support

---

## Open Questions for Discussion

1. **Which AI API do you want to start with?** Claude, Gemini, or support both from day one?
2. **Do you want the app to work on macOS 15+ (Sequoia)?** This is the hardest stealth problem — may require research into undocumented approaches or accepting reduced stealth.
3. **Electron or would you prefer Tauri/Swift?** Electron is the proven path but has trade-offs.
4. **How important is audio transcription for MVP?** It adds significant complexity — should it be Phase 1 or Phase 2?
5. **Do you want Windows support eventually?** This affects framework choice (Electron/Tauri = cross-platform, Swift = macOS only).
6. **What programming languages should be prioritized?** Python + JavaScript first, or broader from the start?
