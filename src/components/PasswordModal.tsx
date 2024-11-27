import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface PasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCorrectPassword: () => void;
}

export function PasswordModal({ isOpen, onClose, onCorrectPassword }: PasswordModalProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "moondreamteam") {
      onCorrectPassword();
      onClose();
      setError(false);
    } else {
      setError(true);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
            onClick={onClose}
          />
          <div className="fixed inset-0 flex items-center justify-center z-[101]">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", duration: 0.3 }}
              className="w-[calc(100%-2rem)] sm:w-[440px] max-h-[calc(100vh-2rem)] overflow-y-auto
                bg-black/90 border border-white/10 rounded-xl p-6 shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-6">
                <h2 className="text-xl text-white font-semibold mb-3">🔒 Title is Locked</h2>
                <p className="text-white/60 text-sm leading-relaxed">
                  Join our <a href="https://discord.com/invite/tRUdpjDQfH" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors">Discord</a> and ask for the password in #general to unlock title customization!
                </p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError(false);
                    }}
                    placeholder="Enter password"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5
                      text-white placeholder-white/40 focus:outline-none focus:ring-2 
                      focus:ring-blue-500/50 transition-all"
                  />
                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-400 text-sm mt-2"
                    >
                      Incorrect password. Join our Discord at discord.gg/tRUdpjDQfH for the right one!
                    </motion.p>
                  )}
                </div>
                <div className="flex justify-end items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-white/60 hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 
                      text-blue-400 rounded-lg transition-colors"
                  >
                    Unlock
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}