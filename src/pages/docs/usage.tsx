import DocsLayout from "@/components/DocsLayout";
import { DocsSidebar } from "@/components/DocsSidebar";
import { Usage } from "@/components/docs/Usage";
import { useState } from "react";

export default function UsagePage() {
  const [isTitleUnlocked, setIsTitleUnlocked] = useState(false);

  return (
    <DocsLayout
      sidebar={
        <DocsSidebar 
          currentPath="/docs/usage" 
          onTitleClick={() => {}}
          isTitleUnlocked={isTitleUnlocked}
        />
      }
      main={<Usage />}
    />
  );
}
