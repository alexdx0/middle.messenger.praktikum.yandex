import { Block, Router } from "@Core";
import * as Pages from "@Pages";

type BlockType = typeof Block;

const appRoutes: Record<string, BlockType> = {
  "/": Pages.LoginPage as BlockType,
  "/sign-up": Pages.SignUpPage as BlockType,
  "/settings": Pages.ProfilePage as BlockType,
  "/messenger": Pages.MainLayout as BlockType,
  "/error": Pages.ErrorPage as BlockType,
  "/change-password": Pages.ChangePasswordPage as BlockType,
};

const router = new Router("#root");

Object.keys(appRoutes).forEach(route => router.use(route, appRoutes[route]));

export { router as Router };
