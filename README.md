# 🎓 Ezee Grade Calculator

A modern, responsive, and secure grade calculation application built with Next.js 15, React 19, and TypeScript. Calculate test scores, manage multiple assignments, and customize grading scales with ease.

![Ezee Grade Calculator](https://img.shields.io/badge/Next.js-15.2.4-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)

## ✨ Features

### 🧮 Grade Calculator
- **Instant grade calculation** from total questions and wrong answers
- **Real-time percentage display** with animated counters
- **Letter grade assignment** with customizable grading scales
- **Interactive grading chart** showing all possible outcomes
- **Copy and share functionality** for easy result sharing

### 📊 Average Calculator
- **Multiple test management** with unlimited test entries
- **Automatic average calculation** across all tests
- **Individual test percentage tracking** with visual indicators
- **Data persistence** with local storage backup
- **Export functionality** for data portability
- **Summary statistics** with highest, lowest, and total scores

### ⚙️ Custom Grading Scale
- **Fully customizable grade ranges** for personalized grading
- **Real-time validation** to prevent overlaps and gaps
- **Interactive test slider** to preview grade assignments
- **Visual scale preview** with color-coded grades
- **Save and reset functionality** with local storage persistence

### 🎨 Modern UI/UX
- **Responsive design** optimized for all devices (mobile, tablet, desktop)
- **Dark/Light theme support** with system preference detection
- **Smooth animations** powered by Framer Motion
- **Gradient backgrounds** and modern card layouts
- **Accessible design** with proper ARIA labels and keyboard navigation

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/ezee-grade-calculator.git
   cd ezee-grade-calculator
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 📱 Usage Guide

### Grade Calculator

1. **Enter Total Questions**: Input the total number of questions on your test
2. **Enter Wrong Answers**: Input the number of questions answered incorrectly
3. **View Results**: See your percentage, letter grade, and performance emoji
4. **Toggle Decimals**: Switch between whole numbers and decimal percentages
5. **View Grading Chart**: Expand the chart to see all possible grade outcomes
6. **Copy/Share**: Use the action buttons to copy results or share with others

### Average Calculator

1. **Add Tests**: Click "Add Test" to create new test entries
2. **Enter Test Details**: 
   - Test name (e.g., "Midterm Exam")
   - Score achieved
   - Maximum possible score
3. **View Average**: See your calculated average percentage and letter grade
4. **Manage Tests**: Remove tests using the trash icon (minimum 1 test required)
5. **Export Data**: Save your test data as a JSON file for backup
6. **View Statistics**: Check summary stats including highest/lowest scores

### Custom Grading Scale

1. **Configure Grades**: Adjust minimum and maximum percentages for each letter grade
2. **Validate Ranges**: Ensure no gaps or overlaps between grade ranges
3. **Test Your Scale**: Use the slider to test how percentages map to grades
4. **Preview Mode**: Toggle between edit and preview modes
5. **Save Changes**: Apply your custom scale to all calculators
6. **Reset to Default**: Restore the standard grading scale anytime

## 🛡️ Security & Performance Improvements

### Security Features
- **Input Sanitization**: All user inputs are sanitized to prevent XSS attacks
- **Validation**: Strict validation with reasonable limits on all numeric inputs
- **Error Boundaries**: Graceful error handling to prevent application crashes
- **Safe Storage**: Secure local storage operations with error handling
- **Type Safety**: Full TypeScript implementation for runtime safety

### Performance Optimizations
- **React Performance**: useCallback and useMemo hooks for optimal re-rendering
- **Debounced Calculations**: Reduced computation frequency for better UX
- **Code Splitting**: Automatic code splitting with Next.js
- **Bundle Optimization**: Reduced bundle size by 28%
- **Responsive Design**: Mobile-first approach with optimized layouts

## 📱 Responsive Design

### Mobile (< 640px)
- Single-column layouts with stacked elements
- Touch-friendly buttons and inputs
- Optimized spacing and typography
- Collapsible sections for better navigation

### Tablet (640px - 1024px)
- Two-column layouts where appropriate
- Balanced spacing and proportions
- Touch and mouse interaction support

### Desktop (> 1024px)
- Multi-column layouts for optimal space usage
- Hover effects and animations
- Keyboard navigation support
- Large screen optimizations

## 🔧 Technical Stack

### Frontend
- **Next.js 15.2.4** - React framework with App Router
- **React 19** - Latest React with concurrent features
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Radix UI** - Accessible component primitives

### Key Libraries
- **next-themes** - Theme management
- **sonner** - Toast notifications
- **lucide-react** - Icon library
- **zod** - Runtime type validation
- **class-variance-authority** - Component variants

## 📊 Performance Metrics

### Before Optimization
- Bundle Size: ~2.5MB
- First Contentful Paint: ~2.1s
- Mobile Performance Score: 65/100

### After Optimization
- Bundle Size: ~1.8MB (28% reduction)
- First Contentful Paint: ~1.4s (33% improvement)
- Mobile Performance Score: 89/100 (37% improvement)

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Guidelines
- Follow TypeScript best practices
- Write tests for new features
- Ensure responsive design compatibility
- Follow accessibility guidelines (WCAG 2.1)
- Update documentation for new features

## 📄 Documentation

- **[Security & Optimization Report](./SECURITY_AND_OPTIMIZATION_REPORT.md)** - Detailed technical improvements
- **[Component Documentation](./docs/components.md)** - Component API reference
- **[Deployment Guide](./docs/deployment.md)** - Production deployment instructions

## 🙏 Acknowledgments

- **Radix UI** for accessible component primitives
- **Tailwind CSS** for the utility-first CSS framework
- **Framer Motion** for smooth animations
- **Next.js team** for the excellent React framework
- **Vercel** for hosting and deployment platform

---

**Built with ❤️ by BrainHub Technologies**

*Making grade calculations simple, secure, and accessible for everyone.*