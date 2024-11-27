import DocsLayout from "@/components/DocsLayout";
import { DocsSidebar } from "@/components/DocsSidebar";
import { Overview } from "@/components/docs/Overview";
import { useState } from "react";

export default function OverviewPage() {
  const [isTitleUnlocked, setIsTitleUnlocked] = useState(false);

  return (
    <DocsLayout
      sidebar={
        <DocsSidebar 
          currentPath="/docs/overview" 
          onTitleClick={() => {}}
          isTitleUnlocked={isTitleUnlocked}
        />
      }
      main={<Overview />}
    />
  );
}
