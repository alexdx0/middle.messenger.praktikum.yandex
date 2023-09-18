import "./style.scss";

import * as Pages from "@Pages";
import { RegisterComponents } from "@utils/RegisterComponents";
import { Block } from "@Core";

RegisterComponents();

const blockPages: Partial<Record<keyof typeof Pages, typeof Block>> = {
  SigninPage: Pages.SigninPage,
  LoginPage: Pages.LoginPage,
  MainLayout: Pages.MainLayout,
  ProfilePage: Pages.ProfilePage,
  ErrorPage: Pages.ErrorPage,
};

function navigate(page: keyof typeof blockPages) {
  const app = document.getElementById("root")!;

  const Component = blockPages[page];
  const component = new Component!();
  app.innerHTML = "";
  app?.append(component.getContent()!);
}

navigate("LoginPage");

// document.addEventListener("click", e => {
//   const target = e.target as HTMLButtonElement;
//   const page = target.getAttribute("linkTo");
//   if (page) {
//     navigate(page as keyof typeof blockPages);

//     e.preventDefault();
//     e.stopImmediatePropagation();
//   }
// });
