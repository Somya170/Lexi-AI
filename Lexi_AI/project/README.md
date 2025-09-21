# LexiAI Frontend Demo

A polished, premium frontend-only demo application that simulates an AI-powered legal document simplification tool. This demo showcases modern web development practices with React, TypeScript, and beautiful UI animations.

## 🚀 Developer Note

This is a **frontend-only demo** with simulated AI functionality. To integrate with real backend services and AI models, replace the logic in `src/utils/simulatedAi.ts` with actual API calls to your legal AI service.

## ✨ Features

- **Document Analysis**: Load and analyze legal documents (Loan & Rent agreements included)
- **Smart Summarization**: Convert complex legal text into plain English bullet points
- **Risk Assessment**: Identify and explain potential risks with confidence levels
- **Interactive Chat**: Ask questions about documents with simulated AI responses
- **Comparison View**: Side-by-side original vs simplified text with risk highlighting
- **Report Generation**: Download comprehensive analysis reports
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Premium UI**: Glassmorphism design with smooth animations

## 🛠️ Technology Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom glass morphism effects
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Fonts**: Inter from Google Fonts

## 🏃‍♂️ Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation & Running

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to `http://localhost:5173`

4. **Build for production:**
   ```bash
   npm run build
   ```

5. **Preview production build:**
   ```bash
   npm run preview
   ```

## 🧪 Testing the Demo

### Basic Functionality Test
1. Open the application at `http://localhost:5173`
2. Click "Load Loan Agreement" in the sidebar
3. Verify all tabs work: Summary, Original, Comparison, Risks
4. Click "Load Rent Agreement" and repeat
5. Test the chatbot by clicking the floating chat button

### Chat Functionality Test
1. Load the Rent Agreement
2. Open chat and ask: **"Can the landlord increase rent anytime?"**
3. **Expected Result**: "No — rent increases only on renewal with 20% automatic increase"
4. Try other example questions provided in the chat interface

### Download Test
1. Load any document
2. Click "Download Report" button
3. Verify that a text file downloads with the complete analysis

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── Header.tsx       # App header with branding
│   ├── Sidebar.tsx      # Document selector sidebar
│   ├── DocumentViewer.tsx # Main document display with tabs
│   ├── ClauseCard.tsx   # Risk analysis cards
│   ├── Chatbot.tsx      # Floating chat interface
│   └── DownloadReport.tsx # Report generation
├── data/
│   └── documents.ts     # Hardcoded legal documents
├── types/
│   └── index.ts         # TypeScript interfaces
├── utils/
│   └── simulatedAi.ts   # AI simulation logic
├── App.tsx              # Main app component
├── main.tsx            # App entry point
└── styles.css          # Global styles
```

## 🎯 Component Overview

- **Header**: Branding and demo disclaimer banner
- **Sidebar**: Document loading interface with previews
- **DocumentViewer**: Tabbed interface for Summary/Original/Comparison/Risks
- **ClauseCard**: Individual risk analysis with "Explain like I'm 5" feature
- **Chatbot**: Floating chat with contextual AI responses
- **DownloadReport**: Generates downloadable analysis reports

## 🤖 Simulated AI Logic

The app includes sophisticated simulation logic in `utils/simulatedAi.ts`:

- **Keyword Matching**: Responds to specific legal terms and concepts
- **Context Awareness**: Provides different answers based on loaded document
- **Risk Analysis**: Pre-computed risk assessments with confidence levels
- **Chat Responses**: Deterministic responses with source clause references

## 🎨 Design Features

- **Glassmorphism UI**: Modern glass-like cards with backdrop blur
- **Gradient Backgrounds**: Beautiful blue-to-purple gradients
- **Smooth Animations**: Framer Motion transitions and hover effects
- **Responsive Layout**: Mobile-first design with breakpoint optimization
- **Accessibility**: High contrast ratios and keyboard navigation support

## 🔒 Security & Limitations

- **Frontend Only**: No backend dependencies or API keys required
- **Demo Data**: Uses hardcoded legal documents and simulated responses
- **No Real AI**: All "AI" functionality is deterministic frontend logic
- **Local Storage**: No data persistence between sessions

## 📱 Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🚨 Important Disclaimers

1. **Not Legal Advice**: This is a demo application for development purposes only
2. **Demo Mode**: All AI responses are simulated and not from real legal AI
3. **No Liability**: Do not use for actual legal decisions

## 🔮 Future Enhancements

To convert this demo into a production application:

1. **Replace** `src/utils/simulatedAi.ts` with real API integrations
2. **Add** user authentication and document management
3. **Integrate** with legal AI services (OpenAI, legal-specific models)
4. **Implement** real document parsing and OCR capabilities
5. **Add** database storage for user documents and analysis history

## 📞 Support

This is a demo application. For technical questions about the code implementation, refer to the inline comments and component documentation.

---

**Made with ❤️ using React, TypeScript, and modern web technologies**