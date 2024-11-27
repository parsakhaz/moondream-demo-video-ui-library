import Link from "next/link";
import { demos } from "./demos";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useState } from "react";
import { useComponents } from "@/context/ComponentsContext";
import { useConfig } from "@/context/ConfigContext";
import type { Config } from "@/context/ConfigContext";
import { macWindowVariants, defaultConfig } from "@/config/defaults";

const CHROMA_KEY_COLOR = "#0000FF";

interface DocsSidebarProps {
  currentPath: string;
  onTitleClick: () => void;
  isTitleUnlocked: boolean;
}

export function DocsSidebar({ 
  currentPath, 
  onTitleClick,
  isTitleUnlocked 
}: DocsSidebarProps) {
  const [copied, setCopied] = useState(false);
  const { activeComponents, toggleComponent } = useComponents();
  const { config, updateConfig } = useConfig();

  const macWindowConfig = config?.macWindow || defaultConfig.macWindow;

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isActive = (path: string) => currentPath === path;

  return (
    <div className="text-white">
      {/* MacWindow Settings */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">MacWindow Settings</h3>
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-white uppercase tracking-wider">
            Getting Started
          </h2>
          <div className="space-y-1">
            <Link
              href="/docs/overview"
              className={`block py-1 transition-colors ${isActive("/docs/overview") ? "text-white font-medium" : "text-white/80 hover:text-white"}`}
            >
              Overview
            </Link>
            <Link
              href="/docs/installation"
              className={`block py-1 transition-colors ${isActive("/docs/installation") ? "text-white font-medium" : "text-white/80 hover:text-white"}`}
            >
              Installation
            </Link>
            <Link
              href="/docs/usage"
              className={`block py-1 transition-colors ${isActive("/docs/usage") ? "text-white font-medium" : "text-white/80 hover:text-white"}`}
            >
              Usage
            </Link>
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="text-sm pt-4 font-semibold text-white uppercase tracking-wider">
            Components
          </h2>
          <div className="space-y-4">
            <div className="space-y-1">
              {demos.map((demo) => (
                <label
                  key={demo.title}
                  className="flex items-center space-x-2 group cursor-pointer py-1"
                >
                  <input
                    type="checkbox"
                    checked={activeComponents[demo.title] || false}
                    onChange={() => toggleComponent(demo.title)}
                    className="rounded bg-white/20 border-2 border-white/40 text-blue-500 
                      focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-[#0000FF]
                      transition-shadow cursor-pointer"
                  />
                  <span className="text-white/80 group-hover:text-white transition-colors">
                    {demo.title}
                  </span>
                </label>
              ))}
            </div>

            <button
              onClick={() => {
                const currentActive = { ...activeComponents };
                for (const key in currentActive) {
                  if (currentActive[key]) {
                    toggleComponent(key);
                    setTimeout(() => toggleComponent(key), 0);
                  }
                }
              }}
              className="w-full text-sm text-white/80 hover:text-white transition-colors 
                flex items-center justify-center space-x-1 bg-white/20 rounded-lg p-2
                hover:bg-white/30 border-2 border-white/20 hover:border-white/30"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              <span>Reset Animations</span>
            </button>
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="text-sm pt-4 font-semibold text-white uppercase tracking-wider">
            Configuration
          </h2>
          <div>
            <h3 className="text-white font-medium mb-2 flex items-center text-sm">
              <span className="w-2 h-2 rounded-full bg-[#0000FF] mr-2"></span>
              Chroma Key Color
            </h3>
            <div className="flex items-center space-x-2">
              <code
                className="bg-white/10 px-2 py-1 rounded text-white/90 text-sm
                border-2 border-white/20"
              >
                {CHROMA_KEY_COLOR}
              </code>
              <CopyToClipboard text={CHROMA_KEY_COLOR} onCopy={handleCopy}>
                <button className="text-white/60 hover:text-white transition-colors">
                  {copied ? (
                    <span className="text-green-400 text-sm">Copied!</span>
                  ) : (
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                  )}
                </button>
              </CopyToClipboard>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="text-sm pt-4 font-semibold text-white uppercase tracking-wider">
            Window Style
          </h2>
          <div className="space-y-2">
            <select
              value={macWindowConfig.variant}
              onChange={(e) => {
                const newVariant = e.target
                  .value as Config["macWindow"]["variant"];
                const variantStyles = macWindowVariants[newVariant];

                updateConfig({
                  ...config,
                  macWindow: {
                    ...macWindowConfig,
                    variant: newVariant,
                    style: {
                      ...macWindowConfig.style,
                      backgroundColor: variantStyles.backgroundColor,
                      borderColor: variantStyles.borderColor,
                      titleBarColor: variantStyles.titleBarColor,
                      buttonStyle: variantStyles.buttonStyle,
                    },
                  },
                });
              }}
              className="w-full bg-black/30 text-white border-2 border-white/20 rounded-lg
                px-3 py-2 focus:outline-none focus:ring-2 focus:ring-white/30
                focus:border-white/40"
            >
              <option value="default">Default</option>
              <option value="minimal">Minimal</option>
              <option value="dark">Dark</option>
              <option value="gradient">Gradient</option>
              <option value="glassmorphic">Glassmorphic</option>
              <option value="chroma">Chroma Key</option>
            </select>

            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-white/80 hover:text-white">
                <input
                  type="checkbox"
                  checked={macWindowConfig.showTitle}
                  onChange={(e) =>
                    updateConfig({
                      ...config,
                      macWindow: {
                        ...macWindowConfig,
                        showTitle: e.target.checked,
                      },
                    })
                  }
                  className="rounded bg-white/20 border-2 border-white/40 text-blue-500
                    focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-[#0000FF]"
                />
                <span>Show Title</span>
              </label>

              {macWindowConfig.showTitle && (
                <div>
                  <input
                    type="text"
                    value={macWindowConfig.title || ""}
                    onClick={onTitleClick}
                    onChange={(e) => {
                      if (!isTitleUnlocked) return;
                      updateConfig({
                        ...config,
                        macWindow: {
                          ...macWindowConfig,
                          title: e.target.value,
                        },
                      });
                    }}
                    placeholder={isTitleUnlocked ? "Enter title" : "🔒 Title is locked"}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 
                      text-sm text-white placeholder-white/40 focus:outline-none focus:ring-2 
                      focus:ring-blue-500/50"
                    readOnly={!isTitleUnlocked}
                  />
                  {!isTitleUnlocked && (
                    <p className="text-xs text-white/40 mt-1">
                      <a href="https://discord.com/invite/tRUdpjDQfH" target="_blank" rel="noopener noreferrer" className="hover:text-white/60 transition-colors">Join Discord to unlock title customization</a>
                    </p>
                  )}
                </div>
              )}

              <label className="flex items-center space-x-2 text-white/80 hover:text-white">
                <input
                  type="checkbox"
                  checked={macWindowConfig.customCursor}
                  onChange={(e) =>
                    updateConfig({
                      ...config,
                      macWindow: {
                        ...macWindowConfig,
                        customCursor: e.target.checked,
                      },
                    })
                  }
                  className="rounded bg-white/20 border-2 border-white/40 text-blue-500
                    focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-[#0000FF]"
                />
                <span>Custom Cursor</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
