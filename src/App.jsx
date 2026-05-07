// App.jsx
import React, { useEffect, useState } from "react";
import './index.css'
import {
  Menu,
  Search,
  Globe,
  Cpu,
  Landmark,
  ShieldAlert,
  Sparkles,
} from "lucide-react";

const categories = [
  { name: "Top", icon: Globe },
  { name: "War", icon: ShieldAlert },
  { name: "Technology", icon: Cpu },
  { name: "AI", icon: Sparkles },
  { name: "Finance", icon: Landmark },
];

// FREE APIs
const NEWS_API = "https://newsapi.org/v2";
const API_KEY = import.meta.env.VITE_API_KEY;

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState("Top");
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");

  const getQuery = () => {
    switch (selectedCategory) {
      case "War":
        return "war OR military OR conflict";
      case "Technology":
        return "technology";
      case "AI":
        return "artificial intelligence OR AI";
      case "Finance":
        return "finance OR stock market OR economy";
      default:
        return "world";
    }
  };

  const fetchNews = async () => {
    setLoading(true);

    try {
      const query = search || getQuery();

      const response = await fetch(
        `${NEWS_API}/everything?q=${query}&language=en&sortBy=publishedAt&pageSize=20&apiKey=${API_KEY}`
      );

      const data = await response.json();
      setArticles(data.articles || []);
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchNews();
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/90 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          {/* LOGO */}
          <div className="flex items-center gap-2">
            <div className="bg-white text-black p-2 rounded-xl">
              <Globe size={20} />
            </div>

            <h1 className="text-2xl font-black tracking-tight">
              NovaNews
            </h1>
          </div>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-3">
            {categories.map((cat) => {
              const Icon = cat.icon;

              return (
                <button
                  key={cat.name}
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
                    selectedCategory === cat.name
                      ? "bg-white text-black"
                      : "bg-zinc-900 hover:bg-zinc-800"
                  }`}
                >
                  <Icon size={16} />
                  {cat.name}
                </button>
              );
            })}
          </div>

          {/* SEARCH */}
          <div className="hidden md:flex items-center bg-zinc-900 px-4 py-2 rounded-full w-80">
            <Search size={18} className="text-zinc-400" />

            <input
              type="text"
              placeholder="Search news..."
              className="bg-transparent outline-none ml-2 w-full"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && fetchNews()}
            />
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Menu />
          </button>
        </div>

        {/* MOBILE MENU */}
        {menuOpen && (
          <div className="md:hidden px-4 pb-4 flex flex-col gap-3">
            <div className="flex items-center bg-zinc-900 px-4 py-3 rounded-xl">
              <Search size={18} className="text-zinc-400" />

              <input
                type="text"
                placeholder="Search news..."
                className="bg-transparent outline-none ml-2 w-full"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {categories.map((cat) => {
              const Icon = cat.icon;

              return (
                <button
                  key={cat.name}
                  onClick={() => {
                    setSelectedCategory(cat.name);
                    setMenuOpen(false);
                  }}
                  className={`flex items-center gap-2 px-4 py-3 rounded-xl ${
                    selectedCategory === cat.name
                      ? "bg-white text-black"
                      : "bg-zinc-900"
                  }`}
                >
                  <Icon size={16} />
                  {cat.name}
                </button>
              );
            })}
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="bg-gradient-to-r from-zinc-900 to-zinc-800 rounded-3xl p-8 md:p-14 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,white,transparent_40%)]"></div>

          <div className="relative z-10">
            <span className="bg-white/10 border border-white/10 px-4 py-2 rounded-full text-sm">
              Live Global News
            </span>

            <h2 className="text-4xl md:text-6xl font-black mt-6 leading-tight max-w-3xl">
              Read breaking stories about war, AI, technology & finance.
            </h2>

            <p className="text-zinc-400 mt-6 max-w-2xl">
              Modern news experience with real-time updates from trusted
              international sources.
            </p>
          </div>
        </div>
      </section>

      {/* NEWS GRID */}
      <section className="max-w-7xl mx-auto px-4 pb-16">
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-zinc-900 animate-pulse rounded-3xl h-[400px]"
              />
            ))}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article, index) => (
              <a
                href={article.url}
                target="_blank"
                rel="noreferrer"
                key={index}
                className="group bg-zinc-900 hover:bg-zinc-800 transition-all duration-300 rounded-3xl overflow-hidden border border-zinc-800 hover:border-zinc-700"
              >
                {/* IMAGE */}
                <div className="overflow-hidden h-56">
                  <img
                    src={
                      article.urlToImage ||
                      "https://images.unsplash.com/photo-1504711434969-e33886168f5c"
                    }
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                </div>

                {/* CONTENT */}
                <div className="p-6">
                  <div className="flex items-center justify-between text-sm text-zinc-400 mb-3">
                    <span>{article.source?.name}</span>

                    <span>
                      {new Date(article.publishedAt).toLocaleDateString()}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold leading-snug line-clamp-3">
                    {article.title}
                  </h3>

                  <p className="text-zinc-400 mt-4 line-clamp-3">
                    {article.description}
                  </p>

                  <div className="mt-6">
                    <span className="inline-flex items-center gap-2 text-sm font-semibold">
                      Read Full Story →
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </section>

      {/* FOOTER */}
      <footer className="border-t border-zinc-800 py-8 text-center text-zinc-500">
        <p>
          © 2026 NovaNews — Modern Global News Experience
        </p>
      </footer>
    </div>
  );
}