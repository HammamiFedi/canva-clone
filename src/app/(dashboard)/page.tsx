import { protectServer } from "@/features/auth/utils";

import { Banner } from "@/features/dashboard/components/banner";
import { ProjectsSection } from "@/features/dashboard/components/projects-section";
import { TemplatesSection } from "@/features/dashboard/components/templates-section";

export default async function Home() {
  await protectServer();

  return (
    <div className="mx-auto flex max-w-[1150px] flex-col space-y-6 pb-10">
      <Banner />
      <TemplatesSection />
      <ProjectsSection />
    </div>
  );
}
