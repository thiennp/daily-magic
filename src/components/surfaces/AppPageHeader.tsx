import {
  APP_SURFACE_PAGE_DESCRIPTION_CLASS,
  APP_SURFACE_PAGE_TITLE_CLASS,
} from "@/components/surfaces/appSurfaceStyles.constant";

interface AppPageHeaderProps {
  readonly title: string;
  readonly description?: string;
}

export default function AppPageHeader({
  title,
  description,
}: AppPageHeaderProps) {
  return (
    <header>
      <h1 className={APP_SURFACE_PAGE_TITLE_CLASS}>{title}</h1>
      {description !== undefined && description.length > 0 ? (
        <p className={APP_SURFACE_PAGE_DESCRIPTION_CLASS}>{description}</p>
      ) : null}
    </header>
  );
}
