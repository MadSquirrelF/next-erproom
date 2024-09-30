import { OrgschemaBoard } from "@/src/features/OrgschemaBoard";
import { OrgschemaMenu } from "@/src/features/OrgschemaMenu";
import { Page } from "@/src/widgets/Page";

export default function OrgSchema() {
  return (
    <Page classname="pb-2 relative overflow-hidden">
      <OrgschemaBoard />

      <OrgschemaMenu />
    </Page>
  );
}
