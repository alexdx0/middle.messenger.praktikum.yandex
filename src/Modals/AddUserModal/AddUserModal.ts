import { Block } from "@Core";
import { ModalService } from "@app/Modals/ModalService";
import { UserController } from "@app/Controllers/UserController";
import { FormInput } from "@components/FormInput";
import { ChatsController } from "@app/Controllers/ChatsController";
import { connect } from "@Core/connect";
import { Indexed } from "@app/types/Indexed";
import { ChatModel } from "@models/ChatModel";

import AddUserModalHbs from "./AddUserModal.hbs";

interface IAddUserModalProps extends Indexed {
  currentChat: ChatModel;
}

class AddUserModal extends Block<IAddUserModalProps> {
  constructor(props: IAddUserModalProps) {
    super({
      ...props,
      addHandler: () => {
        UserController.searchUser((this.refs.login as FormInput).value() as string)
          .then(users => {
            ChatsController.addUserToChat({ chatId: this.props.currentChat.id, users: [users[0].id] });
          });

        ModalService.close("add-user-modal");
      },
      closeHandler: () => {
        ModalService.close("add-user-modal");
      },
    });
  }

  protected render() {
    return AddUserModalHbs;
  }
}

const instance = connect(({ currentChat }) => ({ currentChat }))(AddUserModal);
export { instance as AddUserModal };
