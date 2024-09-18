import { OrgschemaBoard } from "@/src/features/OrgschemaBoard";
import { OrgschemaMenu } from "@/src/features/OrgschemaMenu";

export default function OrgSchema() {
  return (
    <section className="flex flex-row gap-4 items-center justify-center h-full pl-6 py-4 pr-3 flex-grow">
      <OrgschemaBoard />
      <OrgschemaMenu />
    </section>
  );
}
