import { createContext, useContext, useState, ReactNode } from "react";
import { useRouter } from "next/router";

interface ComponentsContextType {
  activeComponents: Record<string, boolean>;
  toggleComponent: (title: string) => void;
}

const ComponentsContext = createContext<ComponentsContextType | undefined>(
  undefined,
);

export function ComponentsProvider({ children }: { children: ReactNode }) {
  const [activeComponents, setActiveComponents] = useState<
    Record<string, boolean>
  >({});
  const router = useRouter();

  const toggleComponent = (title: string) => {
    setActiveComponents((prev) => {
      const newState = {
        ...prev,
        [title]: !prev[title],
      };

      // If we're enabling a component and we're not on the home page,
      // redirect to home to show the component
      if (newState[title] && router.pathname !== "/") {
        router.push("/");
      }

      return newState;
    });
  };

  return (
    <ComponentsContext.Provider value={{ activeComponents, toggleComponent }}>
      {children}
    </ComponentsContext.Provider>
  );
}

export function useComponents() {
  const context = useContext(ComponentsContext);
  if (context === undefined) {
    throw new Error("useComponents must be used within a ComponentsProvider");
  }
  return context;
}
