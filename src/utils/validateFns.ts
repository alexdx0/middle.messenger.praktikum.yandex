export const validateFns = {
  /** И для поля first_name, и для поля second_name */
  name: (value: string) => {
    const regex = /^[A-Za-zА-ЯЁ][a-zA-ZА-ЯЁё-]*$/m;
    return regex.test(value)
      ? ""
      : `Латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, 
      нет спецсимволов (допустим только дефис)`;
  },

  login: (value: string) => {
    const regex = /(?!^\d+$)^[a-zA-Z0-9-_]{3,20}$/m;
    return regex.test(value)
      ? ""
      : `От 3 до 20 символов, латиница, может содержать цифры, 
    но не состоять из них, без пробелов, без спецсимволов (допустимы дефис и нижнее подчёркивание)`;
  },

  email: (value: string) => {
    // https://stackoverflow.com/questions/201323/how-can-i-validate-an-email-address-using-a-regular-expression
    // eslint-disable-next-line no-control-regex
    const regex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    return regex.test(value)
      ? ""
      : `Латиница, может включать цифры и спецсимволы вроде дефиса и подчёркивания, 
    обязательно должна быть «собака» (@) и точка после неё, но перед точкой обязательно должны быть буквы`;
  },

  password: (value: string) => {
    const regex = /^(?=.*[A-Z])(?=.*\d).{8,40}$/m;
    return regex.test(value)
      ? ""
      : "От 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра";
  },

  phone: (value: string) => {
    const regex = /^\+?\d{10,15}$/m;
    return regex.test(value)
      ? ""
      : "От 10 до 15 символов, состоит из цифр, может начинается с плюса";
  },

  message: (value: string) => {
    const regex = /^.+$/m;
    return regex.test(value)
      ? ""
      : "Не должно быть пустым";
  },
};
