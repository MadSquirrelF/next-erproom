export enum UserStatus {
  NOT_ACTIVE = "0",
  ACTIVE = "1",
  DISMISSED = "2",
  NOT_CONFIRMED = "3",
}

export interface IUser {
  id: string | number;
  name: string | null;
  email: string | null;
  email_verified_at: string | null;
  remember_token: string | null;
  created_at: string;
  updated_at: string;
  password: string;
  status: UserStatus;
  login: string | null;
  avatar: string | null;
  lastname: string | null;
  middlename: string | null;
  position_id: string | null;
  birthday: string | null;
  phones: string | null;
  job_phones: string | null;
  gender_id: string | null;
  last_ip: string | null;
  vks_link: string | null;
  vacation: boolean | null;
  disease: boolean | null;
}
