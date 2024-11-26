import { Installation } from "@/components/docs/Installation";
import DocsLayout from "@/components/DocsLayout";
import { DocsSidebar } from "@/components/DocsSidebar";

export default function InstallationPage() {
  return (
    <DocsLayout
      sidebar={<DocsSidebar currentPath="/docs/installation" />}
      main={<Installation />}
    />
  );
}
