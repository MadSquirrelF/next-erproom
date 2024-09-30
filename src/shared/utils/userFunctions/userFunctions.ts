import { INodeEmployee } from "@/src/entities/Node/model/types/node";
import { IUser, UserStatus } from "@/src/entities/User/model/types/user";

export function getUsersByEmployee(employees: INodeEmployee[], users: IUser[]) {
  return employees
    .map((employee) => {
      return users.filter((user) => user.id === employee.user_id);
    })
    .flat();
}

export function formatFullName(
  firstName?: string | null,
  middlename?: string | null,
  lastname?: string | null,
): string {
  const parts = [firstName, middlename, lastname].filter((part) => part);

  return parts.join(" ");
}

export function getStatusText(
  status: UserStatus,
  isOnVacation: boolean | null,
  isOnSickLeave: boolean | null,
): string {
  if (isOnVacation) {
    return "В отпуске";
  }

  if (isOnSickLeave) {
    return "На больничном";
  }

  switch (status) {
    case UserStatus.NOT_ACTIVE:
      return "Неактивный";
    case UserStatus.ACTIVE:
      return "Активный";
    case UserStatus.DISMISSED:
      return "Уволен";
    case UserStatus.NOT_CONFIRMED:
      return "Не подтвержден";
    default:
      return "Неизвестный статус";
  }
}

export function getStatusColor(
  status: UserStatus,
  isOnVacation: boolean | null,
  isOnSickLeave: boolean | null,
): "default" | "primary" | "secondary" | "success" | "warning" | "danger" {
  if (isOnVacation) {
    return "secondary";
  }

  if (isOnSickLeave) {
    return "success";
  }

  switch (status) {
    case UserStatus.NOT_ACTIVE:
      return "default";
    case UserStatus.ACTIVE:
      return "primary";
    case UserStatus.DISMISSED:
      return "danger";
    case UserStatus.NOT_CONFIRMED:
      return "warning";
    default:
      return "default";
  }
}
