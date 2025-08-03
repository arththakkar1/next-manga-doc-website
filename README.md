# 📚 Manga Reader Website

⚠️ Disclaimer
Image Loading Notice:
Some manga thumbnails or chapter images may occasionally fail to load due to API rate limits, hotlinking protection, or third-party restrictions (e.g., MangaDex servers blocking image access).

For the best experience, we recommend running this project locally, where image fetching is less likely to be affected by deployment-side limitations (like on Vercel or similar platforms).

Always support official manga platforms when possible.

A modern, responsive manga reading platform built with Next.js, featuring a sleek dark interface and comprehensive manga discovery features.

🌐 **Live Demo**: [https://next-manga-doc.vercel.app/](https://next-manga-doc.vercel.app/)

## ✨ Features

### 🔍 **Advanced Search & Discovery**

- **Intelligent Search**: Search manga by title with real-time results
- **Tag-Based Filtering**: Filter manga by genres, themes, and categories
- **Author Pages**: Browse manga collections by specific authors
- **Genre Categories**: Dedicated sections for Horror, Romance, and more
- **Trending & Latest**: Discover popular and recently updated manga
- **Random Discovery**: Find new manga with random selection
- **Pagination**: Smooth navigation through large manga collections

### 📖 **Reading Experience**

- **Chapter Navigation**: Seamless chapter-by-chapter reading
- **Reading Interface**: Optimized manga panel display
- **Progress Tracking**: Keep track of your reading progress
- **Responsive Reader**: Adapted for all device sizes
- **Fast Loading**: Optimized image loading and caching

### 👤 **User Features**

- **User Authentication**: Sign up and sign in functionality
- **User Profiles**: Personalized user pages
- **Reading History**: Track your manga reading journey
- **Personalized Recommendations**: Based on reading preferences

### 🎨 **User Interface**

- **Modern Design**: Sleek, dark theme with blue accent colors
- **Interactive Elements**: Hover effects and smooth transitions
- **Skeleton Loading**: Elegant loading states for better UX
- **Responsive Layout**: Grid and carousel layouts for different content types
- **Navigation**: Intuitive navbar with search integration

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Language**: TypeScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: [TanStack Query](https://tanstack.com/query) (React Query)
- **Icons**: [React Icons](https://react-icons.github.io/react-icons/)
- **Deployment**: [Vercel](https://vercel.com/)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/arththakkar1/next-manga-doc-website.git
   cd next-manga-doc-website
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Configure your API endpoints and database connections in `.env.local`

4. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🖼️ Screenshots

🖥️ Desktop View

<div align="center"> <img src="/public/screenshots/desktop/1.png" width="800" /> <img src="/public/screenshots/desktop/2.png" width="800" /> <img src="/public/screenshots/desktop/3.png" width="800" /> <img src="/public/screenshots/desktop/4.png" width="800" /> <img src="/public/screenshots/desktop/5.png" width="800" /> <img src="/public/screenshots/desktop/6.png" width="800" /> <img src="/public/screenshots/desktop/7.png" width="800" /> <img src="/public/screenshots/desktop/8.png" width="800" /> <img src="/public/screenshots/desktop/9.png" width="800" /> <img src="/public/screenshots/desktop/10.png" width="800" /> <img src="/public/screenshots/desktop/11.png" width="800" /> <img src="/public/screenshots/desktop/12.png" width="800" /> <img src="/public/screenshots/desktop/13.png" width="800" /> <img src="/public/screenshots/desktop/14.png" width="800" /> <img src="/public/screenshots/desktop/15.png" width="800" /> <img src="/public/screenshots/desktop/16.png" width="800" /> </div>
📱 Mobile View
<div align="center"> <img src="/public/screenshots/mobile/1.png" width="300" /> <img src="/public/screenshots/mobile/2.png" width="300" /> <img src="/public/screenshots/mobile/3.png" width="300" /> <img src="/public/screenshots/mobile/4.png" width="300" /> <img src="/public/screenshots/mobile/5.png" width="300" /> <img src="/public/screenshots/mobile/6.png" width="300" /> <img src="/public/screenshots/mobile/7.png" width="300" /> <img src="/public/screenshots/mobile/8.png" width="300" /> <img src="/public/screenshots/mobile/9.png" width="300" /> <img src="/public/screenshots/mobile/10.png" width="300" /> <img src="/public/screenshots/mobile/11.png" width="300" /> <img src="/public/screenshots/mobile/12.png" width="300" /> </div>

## 📁 Project Structure

```
├── src/
│   ├── app/                     # Next.js App Router
│   │   ├── api/                # API Routes
│   │   │   ├── chapter/        # Chapter-related endpoints
│   │   │   ├── horror-manga/   # Horror manga API
│   │   │   ├── latest/         # Latest manga updates
│   │   │   ├── manga/          # General manga endpoints
│   │   │   ├── random/         # Random manga selection
│   │   │   ├── romance-manga/  # Romance manga API
│   │   │   ├── tags/           # Tags and categories
│   │   │   └── trending/       # Trending manga
│   │   ├── author/[id]/[name]/ # Author profile pages
│   │   ├── chapter/[mangaId]/[id]/ # Chapter reading pages
│   │   ├── manga/[id]/         # Individual manga pages
│   │   ├── search/             # Advanced search page
│   │   ├── sign-in/            # User authentication
│   │   ├── sign-up/            # User registration
│   │   ├── tags/[tagId]/[tagName]/ # Tag-based browsing
│   │   └── user/               # User profile pages
│   ├── components/             # React Components
│   │   ├── ui/                 # Base UI components
│   │   ├── Carousel.tsx        # Image carousel
│   │   ├── ChapterList.tsx     # Chapter navigation
│   │   ├── HorrorManga.tsx     # Genre-specific components
│   │   ├── LatestManga.tsx     # Latest updates display
│   │   ├── MangaCard.tsx       # Manga display cards
│   │   ├── MangaCardSearch.tsx # Search result cards
│   │   ├── MangaPanel.tsx      # Reading interface
│   │   ├── Navbar.tsx          # Navigation component
│   │   ├── RomanceManga.tsx    # Romance manga section
│   │   ├── SearchBar.tsx       # Search functionality
│   │   ├── SimpleUserInfo.tsx  # User info display
│   │   ├── TrendingManga.tsx   # Trending section
│   │   └── *Skeleton.tsx       # Loading components
│   └── lib/                    # Utilities and middleware
├── public/                     # Static assets
├── package.json               # Dependencies
├── next.config.js            # Next.js configuration
├── tailwind.config.ts        # Tailwind CSS config
└── postcss.config.mjs        # PostCSS configuration
```

## 🔧 Key Features

### 🏠 **Homepage**

- **Trending Manga**: Showcase of popular manga
- **Latest Updates**: Recently updated manga chapters
- **Genre Sections**: Horror, Romance, and other category highlights
- **Random Discovery**: Discover new manga randomly
- **Carousel Display**: Interactive content browsing

### 📚 **Reading System**

- **Chapter Pages**: Full chapter reading interface with optimized panels
- **Chapter Navigation**: Easy switching between chapters
- **Manga Details**: Comprehensive manga information pages
- **Progress Tracking**: User reading history and bookmarks

### 🔍 **Search & Browse**

- **Advanced Search**: Multi-parameter search with filters
- **Tag System**: Browse by genres, themes, and categories
- **Author Profiles**: Dedicated pages for manga creators
- **API-Driven**: RESTful API endpoints for all content

### 👥 **User Management**

- **Authentication System**: Secure sign-up and sign-in
- **User Profiles**: Personalized user pages
- **Reading Preferences**: Customizable user experience

## 🌟 Page Details

### 🏠 **Homepage** (`/`)

- Featured trending manga carousel
- Latest manga updates section
- Genre-specific highlights (Horror, Romance)
- Random manga discovery
- Quick search access

### 📖 **Manga Pages** (`/manga/[id]`)

- Detailed manga information
- Chapter list with navigation
- Author information and links
- Tags and genre classification
- User ratings and reviews

### 📑 **Chapter Reader** (`/chapter/[mangaId]/[id]`)

- Full-screen reading interface
- Optimized manga panel display
- Chapter navigation controls
- Progress tracking
- Responsive image loading

### 🔍 **Search Page** (`/search`)

- Advanced search with query parameters
- Tag-based filtering system
- Paginated results (10 items per page)
- URL state persistence for shareable links

### 👤 **Author Pages** (`/author/[id]/[name]`)

- Author-specific manga collections
- Grid layout with 20 items per page
- Author biography and information
- Complete works showcase

### 🏷️ **Tag Pages** (`/tags/[tagId]/[tagName]`)

- Genre and tag-based manga browsing
- Filtered collections by category
- Popular tags navigation

### 👥 **User System** (`/user`, `/sign-in`, `/sign-up`)

- User authentication and registration
- Personal reading history
- User preferences and settings
- Profile management

## 🎨 Design Philosophy

- **Dark Theme**: Easy on the eyes for long reading sessions
- **Minimalist**: Clean, uncluttered interface focusing on content
- **Responsive**: Mobile-first design that works on all devices
- **Fast**: Optimized loading and smooth interactions

## 🚀 Deployment

The website is deployed on Vercel with automatic deployments from the main branch.

### Deploy Your Own

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/arththakkar1/next-manga-doc-website)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🔗 Links

- **Live Website**: [https://next-manga-doc.vercel.app/](https://next-manga-doc.vercel.app/)
- **Repository**: [GitHub](https://github.com/arththakkar1/next-manga-doc-website)

---

Built with ❤️ using Next.js and TypeScript
