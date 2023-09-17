import "./style.scss";

import * as Pages from "@Pages";
// import contacts from "@services/stubs/ContactsListStub";
import { RegisterComponents } from "@utils/RegisterComponents";
import { Block } from "@Core";
// import { RegisterPartials } from "@utils/RegisterPartials";

// RegisterPartials();
RegisterComponents();
// registerComponent("Button", Components.Button);
// registerComponent("FormInput", Components.FormInput);

// const pagesWithContext: Record<string, [(context?: Record<string, unknown>) => string, object]> = {
//   login: [Pages.LoginPage, {}],
//   main: [Pages.MainLayout, {
//     contacts,
//   }],
//   profile: [Pages.ProfilePage, {
//     name: "Ivan",
//     edit: false,
//   }],
//   editProfile: [Pages.ProfilePage, {
//     name: "Ivan",
//     edit: true,
//   }],
//   signin: [Pages.SigninPage, {}],
//   error: [Pages.ErrorPage, {
//     code: "500",
//     description: "Мы уже фиксим",
//   }],
//   notFound: [Pages.ErrorPage, {
//     code: "404",
//     description: "Не туда попали",
//   }],
// };

const blockPages: Partial<Record<keyof typeof Pages, typeof Block>> = {
  SigninPage: Pages.SigninPage,
  LoginPage: Pages.LoginPage,
  MainLayout: Pages.MainLayout,
  ProfilePage: Pages.ProfilePage,
  ErrorPage: Pages.ErrorPage,
};

// function navigate(page: string) {
//   const [source, context] = pagesWithContext[page];
//   const container = document.getElementById("root")!;
//   container.innerHTML = source(context as Record<string, unknown>);
// }

function newNavigate(page: keyof typeof blockPages) {
  const app = document.getElementById("root")!;

  // if (page === "list") {
  //   const container = document.getElementById("root")!;
  //   container.innerHTML = Handlebars.compile(blockPages[page])({});
  //   return;
  // }

  const Component = blockPages[page];
  const component = new Component!();
  app.innerHTML = "";
  app?.append(component.getContent()!);
}

// navigate("signin");
newNavigate("MainLayout");

document.addEventListener("click", e => {
  const target = e.target as HTMLButtonElement;
  const page = target.getAttribute("linkTo");
  if (page) {
    newNavigate(page as keyof typeof blockPages);

    e.preventDefault();
    e.stopImmediatePropagation();
  }
});
