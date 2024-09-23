import { format, formatDistanceToNow, isAfter, subMonths } from "date-fns";
import { ru } from "date-fns/locale";

export function getTimeDifferenceFromCreationDate(
  creationDate: string | null,
): string {
  if (!creationDate) {
    return "Неизвестно";
  }
  const twoMonthsAgo = subMonths(new Date(), 2);
  // Форматируем исходную дату
  const formattedDate = format(creationDate, "d MMMM yyyy", { locale: ru });

  // Проверяем, если дата создания позже, чем 2 месяца назад
  if (isAfter(creationDate, twoMonthsAgo)) {
    return formatDistanceToNow(creationDate, { addSuffix: true, locale: ru });
  }

  return formattedDate; // Если превышает 2 месяца, возвращаем отформатированную дату
}
