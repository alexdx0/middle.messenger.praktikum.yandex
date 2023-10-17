import { RegisterComponents } from "@Core/RegisterComponents";

import { Router } from "./appRouting";
import "./style.scss";

RegisterComponents();
Router.start();

// Handlebars.registerPartial("ContextPopup", ContextPopup as unknown as Template<unknown>);

// const blockPages: Partial<Record<string, typeof Block<Record<string, unknown>>>> = {
//   SigninPage: Pages.SigninPage,
//   LoginPage: Pages.LoginPage,
//   MainLayout: Pages.MainLayout,
//   ProfilePage: Pages.ProfilePage,
//   EditProfilePage: Pages.ProfilePage,
//   ErrorPage: Pages.ErrorPage,
//   NotFoundPage: Pages.ErrorPage,
// };

// function navigate(page: keyof typeof blockPages) {
//   const app = document.getElementById("root")!;

//   const BlockComponent = blockPages[page];

//   let component;
//   switch (page) {
//   case "EditProfilePage":
//     component = new BlockComponent!({ edit: true });
//     break;

//   case "ErrorPage":
//     component = new BlockComponent!({ code: "500", description: "Мы уже фиксим" });
//     break;

//   case "NotFoundPage":
//     component = new BlockComponent!({ code: "404", description: "Не туда попали" });
//     break;

//   default:
//     component = new BlockComponent!();
//     break;
//   }

//   app.innerHTML = "";
//   app?.append(component.getContent()!);
// }

// navigate("SigninPage");

// document.addEventListener("click", e => {
//   const target = e.target as HTMLButtonElement;
//   const page = target.getAttribute("linkTo");
//   if (page) {
//     navigate(page as keyof typeof blockPages);

//     e.preventDefault();
//     e.stopImmediatePropagation();
//   }
// });

// const SigninRoute = new Route("/signin", Pages.SigninPage as typeof Block, { rootQuery: "root" });
// SigninRoute.render();

// setTimeout(() => {
//   Router.go("/messenger");
// }, 2000);
