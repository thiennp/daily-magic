import HomePageLayout from "@/features/pages/layouts/HomePageLayout";
import { demoUser } from "@/features/demo/mock/demoUser";

export default function DemoHomePage() {
  return <HomePageLayout user={demoUser} />;
}
