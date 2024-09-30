"use client";

import { Button } from "@nextui-org/button";
import { useEffect } from "react";

import { subtitle, title } from "@/components/primitives";
import { ErrorBg } from "@/src/shared/assets/ErrorBg/ErrorBg";
import { GlobalRefreshIcon, HomeIcon } from "@/src/shared/assets/icons";
import { Page } from "@/src/widgets/Page";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  function goToHomePage() {
    window.location.href = "/";
  }

  function refreshPage() {
    window.location.reload();
  }

  return (
    <Page classname="flex flex-col gap-3 justify-center items-center">
      <ErrorBg className="text-danger" size={400} />
      <h1
        className={title({
          size: "sm",
        })}
      >
        Упс... Похоже на ошибку
      </h1>
      <p className={subtitle()}>Ошибка: {error.message}</p>
      <div className="flex flex-row gap-2">
        <Button
          color="primary"
          startContent={<HomeIcon />}
          onClick={goToHomePage}
        >
          На главную страницу
        </Button>
        <Button
          color="danger"
          startContent={<GlobalRefreshIcon />}
          onClick={refreshPage}
        >
          Обновить страницу
        </Button>
      </div>
    </Page>
  );
}
