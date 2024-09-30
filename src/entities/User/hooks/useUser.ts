import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

import { IUser } from "../model/types/user";
import { UserService } from "../model/services/user";

export const useUser = () => {
  const { data, isLoading, isError, error } = useQuery<IUser[]>({
    queryKey: ["get all users"],
    queryFn: () => UserService.getAllUsers(),
  });

  return useMemo(
    () => ({
      data,
      isLoading,
      isError,
      error,
    }),
    [data, isLoading, isError, error],
  );
};
