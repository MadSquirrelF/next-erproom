import { HomeIcon } from "@/src/shared/assets/icons";
import BreadcrumbsClient, {
  IBreadcrumbItem,
} from "@/src/shared/ui/BreadcrumbsClient/BreadcrumbsClient";
import { Page } from "@/src/widgets/Page";

const breadcrumbs: IBreadcrumbItem[] = [
  {
    startContent: <HomeIcon size={20} />,
    text: "Главная страница",
    href: "/",
  },
];

export default function Home() {
  return (
    <Page>
      <BreadcrumbsClient items={breadcrumbs} size="lg" />
      <p>Home page</p>
    </Page>
  );
}
