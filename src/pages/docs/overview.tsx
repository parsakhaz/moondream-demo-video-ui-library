import { Overview } from "@/components/docs/Overview";
import DocsLayout from "@/components/DocsLayout";
import { DocsSidebar } from "@/components/DocsSidebar";

export default function OverviewPage() {
  return (
    <DocsLayout
      sidebar={<DocsSidebar currentPath="/docs/overview" />}
      main={<Overview />}
    />
  );
}
