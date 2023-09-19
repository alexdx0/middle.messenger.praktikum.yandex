export const validateFns = {
  /** И для поля first_name, и для поля second_name */
  name: (value: string) => {
    // TODO regex
    const regex = /^.+$/;
    return regex.test(value)
      ? ""
      : `Латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, 
      нет спецсимволов (допустим только дефис)`;
  },

  login: (value: string) => {
    const regex = /(?!^\d+$)^[a-zA-Z0-9-_]{3,20}$/;
    return regex.test(value)
      ? ""
      : `От 3 до 20 символов, латиница, может содержать цифры, 
    но не состоять из них, без пробелов, без спецсимволов (допустимы дефис и нижнее подчёркивание)`;
  },

  email: (value: string) => {
    // TODO regex
    const regex = /^.+$/;
    return regex.test(value)
      ? ""
      : `Латиница, может включать цифры и спецсимволы вроде дефиса и подчёркивания, 
    обязательно должна быть «собака» (@) и точка после неё, но перед точкой обязательно должны быть буквы`;
  },

  password: (value: string) => {
    // TODO regex
    const regex = /^.+$/;
    return regex.test(value)
      ? ""
      : "От 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра";
  },

  phone: (value: string) => {
    // TODO regex
    const regex = /^.+$/;
    return regex.test(value)
      ? ""
      : "От 10 до 15 символов, состоит из цифр, может начинается с плюса";
  },

  message: (value: string) => {
    // TODO regex
    const regex = /^.+$/;
    return regex.test(value)
      ? ""
      : "Не должно быть пустым";
  },

};
