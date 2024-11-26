import { Usage } from "@/components/docs/Usage";
import DocsLayout from "@/components/DocsLayout";
import { DocsSidebar } from "@/components/DocsSidebar";

export default function UsagePage() {
  return (
    <DocsLayout
      sidebar={<DocsSidebar currentPath="/docs/usage" />}
      main={<Usage />}
    />
  );
}
