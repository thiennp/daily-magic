import ComponentCard from "@/components/common/ComponentCard";
import Button from "@/components/ui/button/Button";
import AppIcon from "@/components/ui/icon/AppIcon";
import { BoxIcon } from "@/icons";

function SizePair({
  variant,
  label,
  iconPosition,
}: {
  readonly variant: "primary" | "outline";
  readonly label: string;
  readonly iconPosition?: "start" | "end";
}) {
  const icon = <AppIcon icon={BoxIcon} size="md" />;

  return (
    <div className="flex items-center gap-5">
      <Button
        size="sm"
        variant={variant}
        startIcon={iconPosition === "start" ? icon : undefined}
        endIcon={iconPosition === "end" ? icon : undefined}
      >
        {label}
      </Button>
      <Button
        size="md"
        variant={variant}
        startIcon={iconPosition === "start" ? icon : undefined}
        endIcon={iconPosition === "end" ? icon : undefined}
      >
        {label}
      </Button>
    </div>
  );
}

export default function StyleguideButtonDemos() {
  return (
    <div className="space-y-5 sm:space-y-6">
      <ComponentCard title="Primary Button">
        <SizePair variant="primary" label="Primary action" />
      </ComponentCard>
      <ComponentCard title="Primary Button with Left Icon">
        <SizePair
          variant="primary"
          label="Primary action"
          iconPosition="start"
        />
      </ComponentCard>
      <ComponentCard title="Primary Button with Right Icon">
        <SizePair variant="primary" label="Primary action" iconPosition="end" />
      </ComponentCard>
      <ComponentCard title="Secondary Button">
        <SizePair variant="outline" label="Secondary action" />
      </ComponentCard>
      <ComponentCard title="Outline Button with Left Icon">
        <SizePair
          variant="outline"
          label="Secondary action"
          iconPosition="start"
        />
      </ComponentCard>
      <ComponentCard title="Outline Button with Right Icon">
        <SizePair
          variant="outline"
          label="Secondary action"
          iconPosition="end"
        />
      </ComponentCard>
    </div>
  );
}
