export enum UserStatus {
  FREE = "FREE",
  HOSPITAL = "HOSPITAL",
  VACATION = "VACATION",
  DISMISSED = "DISMISSED",
}
export interface IUser {
  id: number;
  fullName: string;
  email: string;
  position: string;
  workPhone: string;
  phone: string;
  birthday: string;
  vksLink: string;
  avatarPath: string;
  status: UserStatus;
  role: string;
}

export const SchemasList = [
  {
    id: 1,
    name: "IT Схема",
  },
  {
    id: 2,
    name: "Frontend Схема",
  },
  {
    id: 3,
    name: "Backend Схема",
  },
  {
    id: 4,
    name: "1C Схема",
  },
];

export const RoutesList = [
  {
    id: 1,
    name: "Создание документа",
  },
  {
    id: 2,
    name: "Согласование документа",
  },
  {
    id: 3,
    name: "Подписание документа",
  },
  {
    id: 4,
    name: "Архивирование документа",
  },
  {
    id: 5,
    name: "Отчет по документам",
  },
];

export const UserListData: IUser[] = [
  {
    id: 1,
    fullName: "Семенов Антон Юрьевич",
    email: "anton.semenov@mail.ru",
    position: "Хозяин",
    workPhone: "+7 (999) 999-99-99",
    phone: "+7 (999) 999-99-99",
    birthday: "09.09.1999",
    vksLink: "-",
    avatarPath: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    status: UserStatus.FREE,
    role: "Admin",
  },
  {
    id: 2,
    fullName: "Иванова Мария Петровна",
    email: "maria.ivanova@mail.ru",
    position: "Менеджер",
    workPhone: "+7 (999) 888-88-88",
    phone: "+7 (999) 888-88-88",
    birthday: "15.05.1995",
    vksLink: "https://example.com/vks/maria",
    avatarPath: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    status: UserStatus.FREE,
    role: "User",
  },
  {
    id: 3,
    fullName: "Петров Алексей Сергеевич",
    email: "alexey.petrov@mail.ru",
    position: "Разработчик",
    workPhone: "+7 (999) 777-77-77",
    phone: "+7 (999) 777-77-77",
    birthday: "22.11.1990",
    vksLink: "https://example.com/vks/alexey",
    avatarPath: "https://i.pravatar.cc/150?u=a04258a2462d826712d",
    status: UserStatus.VACATION,
    role: "User",
  },
  {
    id: 4,
    fullName: "Сидорова Ольга Николаевна",
    email: "olga.sidorova@mail.ru",
    position: "Дизайнер",
    workPhone: "+7 (999) 666-66-66",
    phone: "+7 (999) 666-66-66",
    birthday: "30.12.1988",
    vksLink: "https://example.com/vks/olga",
    avatarPath: "https://i.pravatar.cc/150?u=a04258114e29026702d",
    status: UserStatus.HOSPITAL,
    role: "User",
  },
  {
    id: 5,
    fullName: "Кузнецов Дмитрий Владимирович",
    email: "dmitry.kuznetsov@mail.ru",
    position: "Аналитик",
    workPhone: "+7 (999) 555-55-55",
    phone: "+7 (999) 555-55-55",
    birthday: "01.01.1985",
    vksLink: "https://example.com/vks/dmitry",
    avatarPath: "https://i.pravatar.cc/150?u=a04258114e29026302d",
    status: UserStatus.DISMISSED,
    role: "User",
  },
  {
    id: 6,
    fullName: "Смирнов Алексей Викторович",
    email: "alexey.smirnov@mail.ru",
    position: "Тестировщик",
    workPhone: "+7 (999) 444-44-44",
    phone: "+7 (999) 444-44-44",
    birthday: "18.03.1992",
    vksLink: "https://example.com/vks/alexey_smirnov",
    avatarPath: "https://i.pravatar.cc/150?u=a04258114e29026708c",
    status: UserStatus.DISMISSED,
    role: "User",
  },
];
