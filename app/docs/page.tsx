import { DocsBoard } from "@/src/features/DocsBoard/ui/DocsBoard/DocsBoard";
import { DocsIcon, HomeIcon } from "@/src/shared/assets/icons";
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
  {
    startContent: <DocsIcon size={20} />,
    text: "Документооборот",
    href: "/docs",
  },
];

export default function Docs() {
  return (
    <Page>
      <BreadcrumbsClient items={breadcrumbs} size="lg" />
      <DocsBoard />
    </Page>
  );
}
