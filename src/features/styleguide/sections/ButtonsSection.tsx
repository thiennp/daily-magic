import ComponentCard from "@/components/common/ComponentCard";
import Button from "@/components/ui/button/Button";
import AppIcon from "@/components/ui/icon/AppIcon";
import { BoxIcon } from "@/icons";

export default function ButtonsSection() {
  return (
    <section id="buttons" className="scroll-mt-28">
      <h2 className="mb-5 text-2xl font-semibold text-gray-800 dark:text-white/90">
        Buttons
      </h2>
      <div className="space-y-5 sm:space-y-6">
        <ComponentCard title="Primary Button">
          <div className="flex items-center gap-5">
            <Button size="sm" variant="primary">
              Button Text
            </Button>
            <Button size="md" variant="primary">
              Button Text
            </Button>
          </div>
        </ComponentCard>
        <ComponentCard title="Primary Button with Left Icon">
          <div className="flex items-center gap-5">
            <Button size="sm" variant="primary" startIcon={<AppIcon icon={BoxIcon} size="md" />}>
              Button Text
            </Button>
            <Button size="md" variant="primary" startIcon={<AppIcon icon={BoxIcon} size="md" />}>
              Button Text
            </Button>
          </div>
        </ComponentCard>
        <ComponentCard title="Primary Button with Right Icon">
          <div className="flex items-center gap-5">
            <Button size="sm" variant="primary" endIcon={<AppIcon icon={BoxIcon} size="md" />}>
              Button Text
            </Button>
            <Button size="md" variant="primary" endIcon={<AppIcon icon={BoxIcon} size="md" />}>
              Button Text
            </Button>
          </div>
        </ComponentCard>
        <ComponentCard title="Secondary Button">
          <div className="flex items-center gap-5">
            <Button size="sm" variant="outline">
              Button Text
            </Button>
            <Button size="md" variant="outline">
              Button Text
            </Button>
          </div>
        </ComponentCard>
        <ComponentCard title="Outline Button with Left Icon">
          <div className="flex items-center gap-5">
            <Button size="sm" variant="outline" startIcon={<AppIcon icon={BoxIcon} size="md" />}>
              Button Text
            </Button>
            <Button size="md" variant="outline" startIcon={<AppIcon icon={BoxIcon} size="md" />}>
              Button Text
            </Button>
          </div>
        </ComponentCard>
        <ComponentCard title="Outline Button with Right Icon">
          <div className="flex items-center gap-5">
            <Button size="sm" variant="outline" endIcon={<AppIcon icon={BoxIcon} size="md" />}>
              Button Text
            </Button>
            <Button size="md" variant="outline" endIcon={<AppIcon icon={BoxIcon} size="md" />}>
              Button Text
            </Button>
          </div>
        </ComponentCard>
      </div>
    </section>
  );
}
