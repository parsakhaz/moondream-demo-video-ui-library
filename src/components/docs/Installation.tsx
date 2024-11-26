import { motion } from "framer-motion";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useState } from "react";

export function Installation() {
  const [copied, setCopied] = useState(false);
  const repoUrl = "https://github.com/yourusername/ui-components";

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6 text-white"
    >
      <h1 className="text-3xl font-bold">Installation</h1>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Quick Start</h2>
        <ol className="list-decimal list-inside space-y-4 text-white/80">
          <li>
            Clone the repository:
            <div className="mt-2 relative">
              <pre className="bg-black/20 p-4 rounded-lg">
                git clone {repoUrl}
              </pre>
              <CopyToClipboard
                text={`git clone ${repoUrl}`}
                onCopy={handleCopy}
              >
                <button className="absolute top-3 right-3 text-white/60 hover:text-white">
                  {copied ? (
                    <span className="text-green-400">Copied!</span>
                  ) : (
                    <svg
                      className="w-5 h-5"
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
          </li>
          <li>
            Navigate to the project directory:
            <pre className="mt-2 bg-black/20 p-4 rounded-lg">
              cd ui-components
            </pre>
          </li>
          <li>
            Install dependencies:
            <pre className="mt-2 bg-black/20 p-4 rounded-lg">npm install</pre>
          </li>
          <li>
            Start the development server:
            <pre className="mt-2 bg-black/20 p-4 rounded-lg">npm run dev</pre>
          </li>
        </ol>
      </div>

      <div className="p-4 bg-white/10 rounded-lg">
        <h3 className="font-semibold mb-2">Note</h3>
        <p className="text-white/80">
          After installation, visit{" "}
          <code className="bg-black/20 px-2 py-1 rounded">
            http://localhost:3000
          </code>{" "}
          and use the component toggles to enable the components you want to
          record.
        </p>
      </div>
    </motion.div>
  );
}
