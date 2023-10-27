import { InfoModalParams } from "@models/InfoModalParams";
import { AddUserModal } from "@app/Modals/AddUserModal";
import { RemoveUserModal } from "@app/Modals/RemoveUserModal";

import { InfoModal } from "./InfoModal";

export const ModalRegistry = {
  "info-modal": InfoModal,
  "add-user-modal": AddUserModal,
  "remove-user-modal": RemoveUserModal,
};

// const a = new RemoveUserModal(1);
export interface ModalRegistryTypes {
  "info-modal": InfoModalParams,
  "add-user-modal": null,
  "remove-user-modal": null,
}

export type ModalKey = Extract<keyof ModalRegistryTypes, string>;
