import { ModalRegistry, ModalRegistryTypes, ModalKey } from "@app/Modals/ModalRegistry";
import { IRemoveUserModalProps } from "@app/Modals/RemoveUserModal/RemoveUserModal";

class ModalService {
  private _params: Partial<ModalRegistryTypes> = {};

  private _showModal<TKey extends ModalKey>(modalName: TKey, params?: ModalRegistryTypes[TKey]) {
    this._params[modalName] = params;

    document.querySelector("#modal-root")?.classList.add("is-visible");

    const ModalContentBlock = ModalRegistry[modalName];
    if (!ModalContentBlock) {
      return;
    }

    const instance = new ModalContentBlock({} as IRemoveUserModalProps);
    document.querySelector("#modal-root .modal-dialog__content")!.append(instance.getContent()!);
  }

  private _closeModal<TKey extends ModalKey>(modalName: TKey) {
    if (modalName in this._params) {
      delete this._params[modalName];
    }

    document.querySelector("#modal-root .modal-dialog__content")!.innerHTML = "";
    document.querySelector("#modal-root")?.classList.remove("is-visible");
  }

  show<TKey extends ModalKey>(modalName: TKey, params?: ModalRegistryTypes[TKey]) {
    this._showModal(modalName, params);
  }

  close<TKey extends ModalKey>(modalName: TKey) {
    this._closeModal(modalName);
  }

  getParams<TKey extends ModalKey>(modalName: TKey): Partial<ModalRegistryTypes>[TKey] {
    return this._params[modalName];
  }
}

const instance = new ModalService();
export { instance as ModalService };
