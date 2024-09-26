import { INodeEmployee } from "@/src/entities/Node/model/types/node";
import {
  IUser,
  UserStatus,
} from "@/src/features/OrgschemaMenu/model/data/data";

export function getUsersByEmployee(employees: INodeEmployee[], users: IUser[]) {
  return employees
    .map((employee) => {
      return users.filter((user) => user.id === employee.user_id);
    })
    .flat();
}

export const getUserStatusColor = (
  status: UserStatus,
): "primary" | "danger" | "success" | "warning" => {
  switch (status) {
    case UserStatus.FREE:
      return "primary";
    case UserStatus.DISMISSED:
      return "danger";
    case UserStatus.HOSPITAL:
      return "success";
    case UserStatus.VACATION:
      return "warning";
    default:
      return "warning";
  }
};

export const getUserStatus = (status: UserStatus): string => {
  switch (status) {
    case UserStatus.FREE:
      return "Свободен";
    case UserStatus.DISMISSED:
      return "Уволен";
    case UserStatus.HOSPITAL:
      return "Болеет";
    case UserStatus.VACATION:
      return "В отпуске";
    default:
      return "Свободен";
  }
};
