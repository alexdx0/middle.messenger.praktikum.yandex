import { ChatModel } from "@models/ChatModel";

const stub: ChatModel[] = [
  {
    id: 5,
    title: "Жора",
    avatar: "",
    unread_count: 0,
    created_by: 0,
    last_message: {
      user: {
        first_name: "Жора",
        second_name: "",
        avatar: "",
        email: "my@email.com",
        login: "userLogin",
        phone: "8(911)-222-33-22",
      },
      time: "23:15",
      content: "Hello",
    },
  },
  {
    id: 6,
    title: "Коля",
    avatar: "",
    unread_count: 0,
    created_by: 0,
    last_message: {
      user: {
        first_name: "Коля",
        second_name: "",
        avatar: "",
        email: "my@email.com",
        login: "userLogin",
        phone: "8(911)-222-33-22",
      },
      time: "10:51",
      content: `Посмотри на этот курс от Яндекс. Мне кажется, это выгодное и интересное предложение во всех смыслах. 
        Будет непросто, но оно того стоит`,
    },
  },
  {
    id: 6,
    title: "Витя",
    avatar: "",
    unread_count: 1,
    created_by: 0,
    last_message: {
      user: {
        first_name: "Витя",
        second_name: "",
        avatar: "",
        email: "my@email.com",
        login: "userLogin",
        phone: "8(911)-222-33-22",
      },
      time: "8:34",
      content: "Да",
    },
  },
];

export default stub;
