import { ModalService } from "@app/Modals/ModalService";

export const apiErrorHandler = (error: Error) => {
  ModalService.show("info-modal", { message: error.message ?? "Произошла ошибка" });
};
