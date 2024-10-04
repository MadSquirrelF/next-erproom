import { IFlowStep } from "@/src/entities/Route/model/types/route";

export function getDocumentStatusWithColor(statusCode: number): {
  status: string;
  color: "default" | "success" | "primary" | "secondary" | "warning" | "danger";
} {
  switch (statusCode) {
    case 1:
      return { status: "Сохранен", color: "secondary" };
    case 2:
      return { status: "Отправлен", color: "primary" };
    case 3:
      return { status: "В процессе", color: "warning" };
    case 4:
      return { status: "Согласован", color: "success" };
    case 5:
      return { status: "Отменен", color: "danger" };
    default:
      return {
        status: "Некорректный статус. Пожалуйста, введите число от 1 до 5.",
        color: "default",
      };
  }
}

export function getDisabledStepsKeys(
  allSteps: IFlowStep[],
  selectedKey?: number,
): string[] | [] {
  if (!selectedKey || allSteps.length === 0) {
    return [];
  }

  const selectedIndex = allSteps.findIndex((step) => step.id === selectedKey);

  if (selectedIndex === -1) {
    return [];
  }

  return allSteps.slice(0, selectedIndex).map((step) => String(step.id));
}
