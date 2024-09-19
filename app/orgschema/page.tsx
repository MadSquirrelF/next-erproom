import { OrgschemaBoard } from "@/src/features/OrgschemaBoard";
import { OrgschemaMenu } from "@/src/features/OrgschemaMenu";

export default function OrgSchema() {
  return (
    <section className="flex gap-4 items-center justify-between w-full h-full pl-6 py-4 pr-3 flex-grow">
      <OrgschemaBoard />
      <OrgschemaMenu />
    </section>
  );
}
