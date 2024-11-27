import DocsLayout from "@/components/DocsLayout";
import { DocsSidebar } from "@/components/DocsSidebar";
import { Installation } from "@/components/docs/Installation";
import { useState } from "react";

export default function InstallationPage() {
  const [isTitleUnlocked, setIsTitleUnlocked] = useState(false);

  return (
    <DocsLayout
      sidebar={
        <DocsSidebar 
          currentPath="/docs/installation" 
          onTitleClick={() => {}} // No-op since we don't need title editing here
          isTitleUnlocked={isTitleUnlocked}
        />
      }
      main={<Installation />}
    />
  );
}
