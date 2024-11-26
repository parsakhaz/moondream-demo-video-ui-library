import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { defaultConfig } from "@/config/defaults";

export interface Config {
  terminal: {
    commands: string[];
    prompt: string;
    typingSpeed: number;
    deleteSpeed: number;
  };
  codeEditor: {
    code: string;
    language: string;
    theme: string;
  };
  commandPalette: {
    placeholder: string;
    commands: Array<{
      id: string;
      title: string;
      icon: string;
      shortcut?: string;
    }>;
    animations: {
      searchInputDelay: number;
      itemStaggerDelay: number;
      hoverTransitionDuration: number;
      slideInDistance: number;
    };
    style: {
      maxHeight: string;
      width: string;
      backgroundColor: string;
      textColor: string;
    };
  };
  notificationStack: {
    notifications: Array<{
      id: string;
      type: "success" | "error" | "warning" | "info";
      title: string;
      message: string;
      icon?: string;
      duration?: number;
    }>;
    position: "top-right" | "top-left" | "bottom-right" | "bottom-left";
    maxNotifications: number;
    animations: {
      enterDuration: number;
      exitDuration: number;
      staggerDelay: number;
      slideDistance: number;
    };
    style: {
      spacing: number;
      maxWidth: string;
      opacity: number;
      blur: string;
    };
  };
  macWindow: {
    variant:
      | "default"
      | "minimal"
      | "dark"
      | "gradient"
      | "glassmorphic"
      | "chroma";
    customCursor: boolean;
    style: {
      backgroundColor: string;
      borderColor: string;
      titleBarColor: string;
      buttonStyle: "default" | "minimal" | "hidden";
      borderRadius: string;
      shadow: string;
    };
    animations: {
      mount: boolean;
      hover: boolean;
      buttonHover: boolean;
    };
    title?: string;
    showTitle: boolean;
  };
  typewriterMenu: {
    items: Array<{
      id: string;
      text: string;
      href: string;
    }>;
    animations: {
      typingSpeed: number;
      deleteSpeed: number;
      cursorBlinkSpeed: number;
    };
  };
  interactiveTypewriter: {
    categories: Array<{
      id: string;
      name: string;
      items: Array<{
        id: string;
        text: string;
        href: string;
      }>;
    }>;
    animations: {
      typingSpeed: number;
      cursorBlinkSpeed: number;
      enterHintDelay: number;
    };
  };
}

interface ConfigContextType {
  config: Config;
  updateConfig: (newConfig: Config) => void;
}

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

export function ConfigProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<Config>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("componentConfig");
      if (saved) {
        const parsedConfig = JSON.parse(saved);
        if (
          parsedConfig.interactiveTypewriter &&
          !parsedConfig.interactiveTypewriter.categories
        ) {
          localStorage.removeItem("componentConfig");
          return defaultConfig;
        }
        return parsedConfig;
      }
      return defaultConfig;
    }
    return defaultConfig;
  });

  useEffect(() => {
    localStorage.setItem("componentConfig", JSON.stringify(config));
  }, [config]);

  const updateConfig = (newConfig: Config) => {
    setConfig(newConfig);
  };

  return (
    <ConfigContext.Provider value={{ config, updateConfig }}>
      {children}
    </ConfigContext.Provider>
  );
}

export function useConfig() {
  const context = useContext(ConfigContext);
  if (!context) {
    throw new Error("useConfig must be used within a ConfigProvider");
  }

  console.log("Current Config State:", context.config);

  return context;
}
