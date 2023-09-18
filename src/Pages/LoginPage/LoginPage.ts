import { Block } from "@Core";

import LoginPageHbs from "./LoginPage.hbs";

export class LoginPage extends Block {
  constructor() {
    super({
      validate: {
        login: (value: string) => value.length < 3 && value.length !== 0
          ? "Length of login should not be less 3 letters."
          : "",
      },
      onBlur: () => this.log(),
      // onLogin: (event) => {
      //     event.preventDefault();
      //     const login =  this.refs.login.value();
      //     const password =  this.refs.password.value();

      //     console.log({
      //         login,
      //         password
      //     })
      // }
    });
  }

  private log() {
    const value = ((this.refs?.input as this)?._element as HTMLInputElement)?.value;
    console.log("!!!", value);
  }

  protected render() {
    return LoginPageHbs;
  }
}
