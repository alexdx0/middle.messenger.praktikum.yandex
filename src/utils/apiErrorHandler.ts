import { AppStore } from "@Core/AppStore";
import { ModalService } from "@app/Modals/ModalService";
import { Router } from "@app/appRouting";

export const apiErrorHandler = (error: Error) => {
  if (error.message.includes("Ошибка 401 : Cookie is not valid")) {
    AppStore.clear();
    Router.go("/");
  } else if (error.message.includes("Ошибка 400 : User already in system")) {
    Router.go("/messenger");
  } else {
    ModalService.show("info-modal", { message: error.message ?? "Произошла ошибка" });
  }
};
