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

export function returnUserColorStatus(
  status: UserStatus,
): "danger" | "success" | "primary" {
  if (status === UserStatus.HOSPITAL) {
    return "danger";
  } else if (status === UserStatus.VACATION) {
    return "success";
  }

  return "primary";
}
