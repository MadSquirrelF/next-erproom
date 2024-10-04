import { memo } from "react";

interface DocReferencesProps {
  className?: string;
}

export const DocReferences = memo((props: DocReferencesProps) => {
  const { className } = props;

  return <div>DocReferences</div>;
});
