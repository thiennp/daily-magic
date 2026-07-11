import Badge from "@/components/ui/badge/Badge";
import { PlusIcon } from "@/icons";

function BadgeGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="px-6 py-5">
        <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
          {title}
        </h3>
      </div>
      <div className="border-t border-gray-100 p-6 dark:border-gray-800 xl:p-10">
        <div className="flex flex-wrap gap-4 sm:items-center sm:justify-center">
          {children}
        </div>
      </div>
    </div>
  );
}

export default function BadgesSection() {
  return (
    <section id="badges" className="scroll-mt-28">
      <h2 className="mb-5 text-2xl font-semibold text-gray-800 dark:text-white/90">
        Badges
      </h2>
      <div className="space-y-5 sm:space-y-6">
        <BadgeGroup title="With Light Background">
          <Badge variant="light" color="primary">
            Primary
          </Badge>
          <Badge variant="light" color="success">
            Success
          </Badge>
          <Badge variant="light" color="error">
            Error
          </Badge>
          <Badge variant="light" color="warning">
            Warning
          </Badge>
          <Badge variant="light" color="info">
            Info
          </Badge>
          <Badge variant="light" color="light">
            Light
          </Badge>
          <Badge variant="light" color="dark">
            Dark
          </Badge>
        </BadgeGroup>

        <BadgeGroup title="With Solid Background">
          <Badge variant="solid" color="primary">
            Primary
          </Badge>
          <Badge variant="solid" color="success">
            Success
          </Badge>
          <Badge variant="solid" color="error">
            Error
          </Badge>
          <Badge variant="solid" color="warning">
            Warning
          </Badge>
          <Badge variant="solid" color="info">
            Info
          </Badge>
          <Badge variant="solid" color="light">
            Light
          </Badge>
          <Badge variant="solid" color="dark">
            Dark
          </Badge>
        </BadgeGroup>

        <BadgeGroup title="Light Background with Left Icon">
          <Badge variant="light" color="primary" startIcon={<PlusIcon />}>
            Primary
          </Badge>
          <Badge variant="light" color="success" startIcon={<PlusIcon />}>
            Success
          </Badge>
          <Badge variant="light" color="error" startIcon={<PlusIcon />}>
            Error
          </Badge>
        </BadgeGroup>

        <BadgeGroup title="Solid Background with Right Icon">
          <Badge variant="solid" color="primary" endIcon={<PlusIcon />}>
            Primary
          </Badge>
          <Badge variant="solid" color="success" endIcon={<PlusIcon />}>
            Success
          </Badge>
          <Badge variant="solid" color="error" endIcon={<PlusIcon />}>
            Error
          </Badge>
        </BadgeGroup>
      </div>
    </section>
  );
}
