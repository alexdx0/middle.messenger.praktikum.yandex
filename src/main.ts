import "./style.scss";

import * as Pages from "@Pages";
import { RegisterPartials } from "@utils/RegisterPartials";
import contacts from "@services/stubs/ContactsListStub";

RegisterPartials();

const pagesWithContext: Record<string, [(context?: Record<string, unknown>) => string, object]> = {
  login: [Pages.LoginPage, {}],
  main: [Pages.MainLayout, {
    contacts,
  }],
  profile: [Pages.ProfilePage, {
    name: "Ivan",
    edit: false,
  }],
  editProfile: [Pages.ProfilePage, {
    name: "Ivan",
    edit: true,
  }],
  signin: [Pages.SigninPage, {}],
  error: [Pages.ErrorPage, {
    code: "500",
    description: "Мы уже фиксим",
  }],
  notFound: [Pages.ErrorPage, {
    code: "404",
    description: "Не туда попали",
  }],
};

function navigate(page: string) {
  const [source, context] = pagesWithContext[page];
  const container = document.getElementById("root")!;
  container.innerHTML = source(context as Record<string, unknown>);
}

navigate("signin");

document.addEventListener("click", e => {
  const target = e.target as HTMLButtonElement;
  const page = target.getAttribute("linkTo");
  if (page) {
    navigate(page);

    e.preventDefault();
    e.stopImmediatePropagation();
  }
});
