"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { SectionLoader } from "@/features/dashboard/components/section-loader";
import { SectionError } from "@/features/dashboard/components/section-error";
import { SectionNoDataFound } from "@/features/dashboard/components/section-no-data-found";
import { TemplateCard } from "@/features/dashboard/components/template-card";
import {
  ResponseType,
  useGetTemplates,
} from "@/features/projects/api/use-get-templates";
import { useCreateProject } from "@/features/projects/api/use-create-project";
import { usePaywall } from "@/features/subscriptions/hooks/use-paywall";

export const TemplatesSection = () => {
  const router = useRouter();

  // Paywall
  const paywall = usePaywall();

  // mutation
  const { mutate, isPending } = useCreateProject();
  const { data, isLoading, isError } = useGetTemplates({
    page: "1",
    limit: "4",
  });

  const onTemplateClick = (template: ResponseType["data"][0]) => {
    if (template.isPro && paywall.shouldBlock) {
      paywall.triggerPaywall(); 
      return;
    }

    mutate(
      {
        name: `${template.name} project`,
        width: template.width,
        height: template.height,
        json: template.json,
      },
      {
        onSuccess: ({ data }) => {
          router.push(`/editor/${data.id}`);
        },
      },
    );
  };

  if (isLoading) return <SectionLoader title="Start from a template" />;

  if (isError)
    return (
      <SectionError
        title="Start from a template"
        message="Failed to load templates"
      />
    );

  if (!data?.length)
    return (
      <SectionNoDataFound
        title="Start from a template"
        message="No templates found"
      />
    );

  return (
    <div>
      <h3 className="text-lg font-semibold">Start from a template</h3>
      <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
        {data.map((template) => (
          <TemplateCard
            key={template.id}
            title={template.name}
            description={`${template.width} x ${template.height} px`}
            imageSrc={template.thumbnailUrl || ""}
            width={template.width}
            height={template.height}
            isPro={template.isPro}
            disabled={isPending}
            onClick={() => onTemplateClick(template)}
          />
        ))}
      </div>
    </div>
  );
};
