import { useState, useEffect } from "react";
// import { Logo } from './ui/Logo';
import { CustomCursor } from "./CustomCursor";

interface DocsLayoutProps {
  sidebar: React.ReactNode;
  main: React.ReactNode;
}

export default function DocsLayout({ sidebar, main }: DocsLayoutProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const checkMobile = () => {
      const isMobileView = window.innerWidth < 1024;
      setIsMobile(isMobileView);
      if (!isMobileView) {
        setSidebarOpen(true);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="min-h-screen flex">
      <CustomCursor />
      
      {/* Mobile Menu Button - Moved outside sidebar */}
      {isMobile && (
        <button
          className="fixed left-4 top-4 z-50 bg-white/10 p-2 rounded-lg backdrop-blur-md"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {sidebarOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      )}

      {/* Sidebar - Now with black background */}
      <div
        className={`
          fixed lg:relative min-h-screen bg-black border-r border-white/10
          overflow-y-auto scrollbar-thin scrollbar-track-white/5 scrollbar-thumb-white/20
          transition-transform duration-300 flex flex-col
          ${isMobile ? "z-50 w-[320px]" : "w-[300px]"} 
          ${isMobile ? (sidebarOpen ? "translate-x-0" : "-translate-x-[320px]") : "translate-x-0"}
        `}
      >
        {/* Sidebar Header */}
        <div className="sticky top-0 z-10 bg-black/50 backdrop-blur-sm border-b border-white/10 px-4 py-3">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-2">
              <span className="text-2xl shrink-0 mt-0.5">🎨</span>
              <span className="font-semibold text-base sm:text-lg text-white leading-tight">
                {isMobile ? "Moondream\nComponent Library" : "Moondream Open Video Component Library"}
              </span>
            </div>
            {isMobile && (
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors shrink-0 ml-2"
                aria-label="Close sidebar"
              >
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Sidebar content */}
        <div className="flex-1 px-4 py-3 overflow-y-auto">{sidebar}</div>

        {/* Sidebar Footer */}
        <div className="border-t border-white/10 px-4 py-3">
          <div className="text-sm text-white/60 space-y-2">
            <p className="text-xs">Made with ❤️ by Moondream</p>
            <a href="https://discord.com/invite/tRUdpjDQfH" target="_blank" rel="noopener noreferrer" className="text-xs hover:text-white transition-colors">Questions? Build something with Moondream? Let us know!</a>
            <a
              href="https://github.com/parsakhaz/moondream-demo-video-ui-library"
              className="hover:text-white transition-colors flex items-center space-x-2"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z"
                />
              </svg>
              <span>View on GitHub</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main content - Keeps chroma key background */}
      <div className="flex-1 transition-all duration-300 bg-[#0000FF]">
        <div className="max-w-[1200px] mx-auto px-6 py-12">
          <div className="max-w-4xl">{main}</div>
        </div>
      </div>

      {/* Mobile overlay */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
