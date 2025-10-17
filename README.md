
# 🚦 AetherAi - Next-Gen AI Traffic & Route Intelligence

![AetherAi Banner](https://img.shields.io/badge/AetherAi-AI%20Traffic%20Intelligence-8B5CF6)
![React](https://img.shields.io/badge/React-18.3.1-61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6)
![Vite](https://img.shields.io/badge/Vite-5.4.19-646CFF)
![Supabase](https://img.shields.io/badge/Supabase-Backend-3ECF8E)

## 🌟 Overview

AetherAi is a cutting-edge AI-powered traffic analysis and route intelligence platform featuring:

- 🎯 **Real-time Traffic Analysis** - Monitor traffic patterns across cities
- 🧠 **AI-Powered Predictions** - Smart route optimization and forecasts
- 🎨 **Cyberpunk UI** - Modern glassmorphic design with purple/pink gradients
- 📊 **Comprehensive Analytics** - Interactive dashboards and metrics
- 🌙 **Dark/Light Themes** - Adaptive user interface

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/AravinZz69/AetherAii.git
cd AetherAii

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production
```bash
npm run build
npm run preview
```

## 🛠️ Technology Stack

### Frontend
- **React 18.3.1** - Modern React with Hooks
- **TypeScript 5.8.3** - Type-safe development
- **Vite 5.4.19** - Fast build tool
- **Tailwind CSS 3.4.17** - Utility-first styling
- **shadcn/ui** - High-quality React components
- **Radix UI** - Accessible component primitives

### Backend & Database
- **Supabase** - Backend-as-a-Service
  - PostgreSQL database
  - Real-time subscriptions
  - Authentication
  - Edge functions

### State Management
- **TanStack Query** - Server state management
- **React Hook Form** - Form state management
- **Zod** - Schema validation

### UI Enhancement
- **Lucide React** - Beautiful icons
- **Recharts** - Data visualization
- **Next Themes** - Theme switching
- **Sonner** - Toast notifications

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── CityMap.tsx     # Interactive city map
│   ├── TrafficDisplay.tsx
│   └── ...
├── pages/              # Route components
│   ├── Index.tsx       # Main dashboard
│   ├── TrafficAnalysis.tsx
│   └── ...
├── contexts/           # React contexts
├── integrations/       # External integrations
│   └── supabase/      # Supabase client
└── lib/               # Utilities
```

## 🎨 Design System

### Color Palette
- **Primary**: `hsl(262, 83%, 58%)` - Vibrant purple
- **Accent**: `hsl(292, 91%, 73%)` - Bright pink
- **Secondary**: `hsl(217, 91%, 60%)` - Complementary blue

### Features
- Glassmorphic cards with backdrop blur
- Gradient backgrounds and animations
- Neon glow effects
- Responsive design (mobile-first)

## 🔧 Environment Setup

Create `.env.local`:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
```

## 📊 Key Features

### Dashboard
- Real-time metrics grid
- Interactive city map
- Weather integration
- Traffic predictions
- AI insights panel

### Traffic Analysis
- City search with autocomplete
- Route optimization
- Traffic-free alternatives
- Best travel times
- ML-powered recommendations

## 🚀 Deployment

### Development
```bash
npm run dev          # Development server
npm run build        # Production build
npm run preview      # Preview build
npm run lint         # Code linting
```

### Recommended Platforms
- **Vercel** (Recommended)
- **Netlify**
- **GitHub Pages**

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 Documentation

For detailed documentation, see [DOCUMENTATION.md](./DOCUMENTATION.md)

**Use GitHub Codespaces**

- Navigate to the main page of your repository
- Click on the "Code" button (green button) near the top right
- Select the "Codespaces" tab
- Click on "New codespace" to launch a new Codespace environment
- Edit files directly within the Codespace and commit your changes



*Built with ❤️ for the future of traffic intelligence*
