# 💍 Wedding Invitation Web App

A beautiful, elegant, and scalable mobile-first wedding invitation web application built with Next.js, React, Tailwind CSS, and Framer Motion.

## ✨ Features

- **Mobile-First Design**: Optimized for all screen sizes with responsive layouts
- **Elegant Animations**: Subtle, sophisticated animations using Framer Motion
- **Clean Architecture**: Strict separation of concerns with component-based structure
- **Production-Ready**: Fully typed with TypeScript and production-grade code quality
- **Accessibility**: Semantic HTML and keyboard navigation support

## 🎨 Design System

### Color Palette
- **Cream Background**: Soft, warm cream tones (250, 245, 240)
- **Amber Accents**: Elegant gold and amber highlights (139, 92, 46)
- **Classic Typography**: Cormorant Garamond (serif) + Montserrat (sans-serif)

### Components
- Custom SVG ornaments for decorative flourishes
- Elegant card design with subtle shadows and textures
- Fixed bottom navigation with blur effect
- Staggered text animations for graceful content reveal

## 📁 Project Structure

```
wedding-invitation/
├── app/
│   ├── page.tsx              # Main page (composition only)
│   ├── layout.tsx            # Root layout with fonts
│   └── globals.css           # Global styles
│
├── components/
│   └── invitation/
│       ├── InvitationPage.tsx    # Full-screen container
│       ├── InvitationCard.tsx    # Centered card wrapper
│       ├── InvitationContent.tsx # Wedding details
│       ├── Ornament.tsx          # Reusable SVG decorations
│       └── BottomAppBar.tsx      # Fixed bottom navigation
│
├── tailwind.config.ts        # Tailwind configuration
├── tsconfig.json             # TypeScript configuration
└── package.json              # Dependencies
```

## 🏗️ Architecture Principles

### Clean Separation
The `app/page.tsx` file acts as a **pure composer** - it only imports and renders components:

```typescript
import InvitationPage from '@/components/invitation/InvitationPage';

export default function Home() {
  return <InvitationPage />;
}
```

### Component Responsibilities

1. **InvitationPage**: Full-screen layout management, background, spacing
2. **InvitationCard**: Card container with styling and animations
3. **InvitationContent**: Wedding details with staggered animations
4. **Ornament**: Reusable decorative SVG elements
5. **BottomAppBar**: Fixed navigation with 4 action buttons

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn or pnpm

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the invitation.

## 🎯 Bottom Navigation

The app includes a fixed bottom navigation bar with four actions:

1. **Hubungi** (Contact) - Phone icon
2. **RSVP** - Check circle icon
3. **Kalendar** (Calendar) - Calendar icon
4. **Lokasi** (Location) - Map pin icon

Currently, these buttons have placeholder click handlers that log to console. They're ready to be connected to actual functionality.

## 🎭 Animation Details

### Card Animation
- Fade in from 95% to 100% scale
- Duration: 1 second
- Custom easing: [0.22, 1, 0.36, 1]

### Content Animation
- Staggered children with 0.15s delay
- Fade up from 20px below
- Delay start: 0.3s after page load

### Ornaments
- Gentle opacity and scale transition
- 1.2s duration for elegant reveal

### Bottom Bar
- Staggered button appearance
- Tap scale animation (0.95)
- Hover scale animation (1.05)

## 📱 Responsive Breakpoints

- **Mobile**: < 640px (default)
- **Tablet**: 640px - 1024px (sm:, md:)
- **Desktop**: > 1024px (lg:, xl:)

All components are mobile-first with progressive enhancement for larger screens.

## 🔧 Customization

### Wedding Details
Edit `components/invitation/InvitationContent.tsx` to update:
- Couple names
- Wedding date and time
- Venue name and address
- RSVP deadline

### Colors
Modify custom colors in `app/globals.css` and `tailwind.config.ts`:
```css
--cream-50: 250 245 240;
--amber-700: 139 92 46;
```

### Fonts
Change fonts in `app/layout.tsx`:
```typescript
import { Cormorant_Garamond, Montserrat } from 'next/font/google';
```

## 🎨 Design Philosophy

This project follows a **refined classic** aesthetic:
- Timeless elegance over trendy designs
- Subtle animations over flashy effects
- Generous whitespace for breathing room
- Premium typography for sophisticated feel
- Warm, inviting color palette

## 📦 Dependencies

### Core
- **Next.js 14**: React framework with App Router
- **React 18**: UI library
- **TypeScript**: Type safety

### Styling
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Animation library

### Icons
- **Lucide React**: Beautiful icon library

## 🚧 Future Enhancements

- [ ] Connect RSVP form
- [ ] Add calendar download (.ics file)
- [ ] Integrate Google Maps for location
- [ ] WhatsApp/contact integration
- [ ] Photo gallery page
- [ ] Gift registry page
- [ ] Guest list management
- [ ] Email notifications
- [ ] Multi-language support

## 📄 License

This is a template project for wedding invitations. Feel free to customize and use for your own wedding!

## 👨‍💻 Development Notes

### Code Quality
- All components are properly typed with TypeScript
- Semantic HTML for accessibility
- Mobile-first responsive design
- Clean, commented code
- Reusable component architecture

### Performance
- Server-side rendering with Next.js
- Optimized font loading with `next/font`
- Minimal JavaScript bundle
- CSS-in-JS with Tailwind for optimal caching

---

Built with ❤️ for Fareez & Zanis
