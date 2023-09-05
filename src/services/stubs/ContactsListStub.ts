import { ContactsListItemModel } from "@models/ContactsListItemModel";

const stub: ContactsListItemModel[] = [
  {
    name: "Жора",
    messagesCount: 0,
    messages: [
      {
        time: "23:15",
        content: "Hello",
      },
    ],
    time: "23:15",
  },
  {
    name: "Коля",
    messagesCount: 1,
    messages: [
      {
        time: "10:51",
        content: `Посмотри на этот курс от Яндекс. Мне кажется, это выгодное и интересное предложение во всех смыслах. 
        Будет непросто, но оно того стоит`,
      },
    ],
    time: "10:51",
  },
  {
    name: "Витя",
    messagesCount: 0,
    messages: [
      {
        time: "8:34",
        content: "Да",
      },
    ],
    time: "8:34",
  },
];

export default stub;
