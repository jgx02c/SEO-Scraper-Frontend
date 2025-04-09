# SEO Scraper Frontend

A modern web application built with Next.js that provides comprehensive SEO analysis, competitor tracking, and website optimization tools. This project serves as the frontend interface for the SEO Scraper tool, offering an intuitive dashboard for managing and analyzing SEO data.

## Developer
- **Developer**: Joshua Goodman
- **GitHub**: [jgx02c](https://github.com/jgx02c)
- **Project**: SEO Scraper Frontend

## Features

- 📊 **Interactive Dashboard**: Comprehensive overview of SEO metrics and website performance
- 🔍 **Competitor Analysis**: Track and analyze competitor websites and strategies
- 📈 **Traffic Analytics**: Detailed traffic analysis and performance metrics
- 📑 **Reports**: Generate and view detailed SEO and performance reports
- 🤖 **AI Integration**: AI-powered content suggestions and SEO improvements
- 💬 **Chat Interface**: Interactive chat system for SEO queries and assistance
- 📱 **Responsive Design**: Fully responsive interface that works on all devices
- 🎯 **Ad Campaign Tracking**: Monitor and analyze advertising campaign performance

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Custom components with shadcn/ui
- **Charts**: Recharts
- **State Management**: React Context
- **Authentication**: Custom auth implementation

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/jgx02c/SEO-Scraper-Frontend.git
   cd SEO-Scraper-Frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Project Structure

```
src/
├── pages/
│   ├── dashboard/
│   │   └── index.tsx       # Main dashboard page (previously BusinessDetailPage)
│   └── index.tsx           # Landing page
├── components/
│   ├── dashboard/          # Dashboard-specific components
│   │   ├── tabs/          # Individual tab components
│   │   │   ├── Overview/
│   │   │   ├── Traffic/
│   │   │   ├── Analytics/
│   │   │   ├── Reports/
│   │   │   ├── Files/
│   │   │   ├── Ads/
│   │   │   ├── CompetitorLookup/
│   │   │   ├── AI/
│   │   │   └── Chat/
│   │   └── shared/        # Shared dashboard components
│   │       └── ComponentLoader.tsx
│   └── ui/                # Generic UI components
└── types/
    └── dashboard.ts       # Dashboard-related types
```

## Key Features Breakdown

### Dashboard
- Overview tab with key metrics
- Traffic analysis
- Analytics reporting
- File management
- Ad campaign tracking
- Competitor analysis
- AI-powered suggestions
- Interactive chat support

### Landing Page
- Modern, responsive design
- Feature showcases
- Pricing information
- Case studies
- Blog section

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Deployment

The application is configured for deployment on Vercel. For other deployment options, please refer to the [Next.js deployment documentation](https://nextjs.org/docs/pages/building-your-application/deploying).

## Support

For support, please open an issue in the GitHub repository or contact the developer directly.

---

Built with ❤️ by Joshua Goodman