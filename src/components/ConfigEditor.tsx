import { useState } from "react";
import { useConfig } from "@/context/ConfigContext";
import { motion, AnimatePresence } from "framer-motion";
import { defaultConfig } from "@/config/defaults";

interface ConfigEditorProps {
  componentId:
    | "terminal"
    | "codeEditor"
    | "commandPalette"
    | "notificationStack"
    | "typewriterMenu"
    | "interactiveTypewriter";
}

export function ConfigEditor({ componentId }: ConfigEditorProps) {
  const { config, updateConfig } = useConfig();
  const [isOpen, setIsOpen] = useState(false);
  const [editableConfig, setEditableConfig] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleEdit = () => {
    console.log("Opening config editor for:", componentId);
    console.log("Full config:", config);
    console.log("Component config:", config[componentId]);
    console.log("Default config:", defaultConfig[componentId]);

    const configToEdit = config[componentId] || defaultConfig[componentId];
    console.log("Config to edit:", configToEdit);

    setEditableConfig(JSON.stringify(configToEdit, null, 2));
    setIsOpen(true);
  };

  const handleSave = () => {
    try {
      const parsed = JSON.parse(editableConfig);
      updateConfig({
        ...config,
        [componentId]: parsed,
      });
      setError(null);
      setIsOpen(false);
    } catch (err) {
      setError("Invalid JSON format");
    }
  };

  return (
    <>
      <button
        onClick={handleEdit}
        className="text-white/60 hover:text-white 
          bg-white/10 px-3 py-1.5 rounded-lg hover:bg-white/20 
          transition-colors flex items-center space-x-2 text-sm"
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
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
          />
        </svg>
        <span>Edit Config</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={(e) => e.target === e.currentTarget && setIsOpen(false)}
          >
            <div className="bg-[#1a1a1a] rounded-lg p-4 w-full max-w-2xl">
              <h3 className="text-white font-semibold mb-4">
                Edit {componentId} Configuration
              </h3>
              <div className="relative">
                <textarea
                  value={editableConfig}
                  onChange={(e) => setEditableConfig(e.target.value)}
                  className="w-full h-96 bg-black/50 text-white font-mono p-4 rounded-lg
                    focus:outline-none focus:ring-2 focus:ring-white/20"
                />
                {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
              </div>
              <div className="flex justify-end space-x-2 mt-4">
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 text-white/60 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-white/10 text-white rounded-lg
                    hover:bg-white/20 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
