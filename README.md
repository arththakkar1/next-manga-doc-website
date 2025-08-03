# MangaDoc

**MangaDoc** is a modern, responsive manga reading website built with Next.js. It uses the MangaDex API to fetch manga data, allowing users to search, filter by tags, view details, and read chapters in a smooth, optimized UI.

![MangaDoc Banner](public/banner.png) <!-- Replace with your actual banner path or remove -->

---

## 🚀 Features

- 🔍 **Search Manga** by title and tags
- 🏷️ **Tag Filtering** on the `/search` page
- 📖 **Chapter Reader** with smooth page transitions
- 📚 **View Manga Details** including authors, description, and cover
- 🌙 **Dark Theme UI** with a primary color of `#610094`
- 🔁 **Pagination** for better browsing performance
- ✅ **Responsive** design for mobile and desktop
- 🔐 **Authentication** using Clerk with custom UI
- ⚡ **Client-side Caching** using React Query

---

## 🧰 Tech Stack

- [Next.js 14 (App Router)](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn/UI](https://ui.shadcn.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [React Query](https://tanstack.com/query/v4)
- [MangaDex API](https://api.mangadex.org/)
- [Clerk Elements](https://clerk.com/docs/elements)

---

## 🖼️ Screenshots

| Home Page | Search Page | Manga Details |
|-----------|-------------|----------------|
| ![](public/screens/home.png) | ![](public/screens/search.png) | ![](public/screens/details.png) |

---

## 📂 Project Structure

.
├── app/ # Next.js App Router pages
├── components/ # Reusable UI components
├── lib/ # Fonts, API utils
├── public/ # Static assets
└── styles/ # Global styles

yaml
Copy
Edit

---

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+
- Git

### Installation

```bash
git clone https://github.com/arththakkar1/next-manga-doc-website.git
cd next-manga-doc-website
npm install
Development Server
bash
Copy
Edit
npm run dev
Visit http://localhost:3000 to view the app.

☁️ Deployment
The project is ready to be deployed on platforms like Vercel.

Deploy on Vercel
Push your project to GitHub.

Go to vercel.com, sign in with GitHub, and import the repo.

Set environment variables if needed (e.g., Clerk keys).

Click Deploy and you're done!

👥 Contributors
Made with ❤️ by:

Arth Thakkar

Manan Rupaliya

Bhavya Solanki

Krish Tank

Abhi Thakkar

<!-- Replace the empty GitHub links with actual ones if available -->
📄 License
Licensed under the MIT License.
