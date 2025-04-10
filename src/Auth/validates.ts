interface IValidates {
    title:string,
    name:string,
    type:string,
    pattern:string,
    hint:string,
}
interface ValidatesRules {
    inputs:IValidates[]
}
export const validates:ValidatesRules = {
    inputs : [
   {
        title:"Почта",
        name: "email",
        type:"email",
        pattern:"/^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/",
        hint:"латиница, может включать цифры и спецсимволы вроде дефиса и подчёркивания, обязательно должна быть «собака» (@) и точка после неё, но перед точкой обязательно должны быть буквы."
    },
   {
        title:"Логин",
        name:"login",
        type:"text",
        pattern:"(?=.*[a-z]|[A-Z])[a-zA-Z0-9\\-_]{3,20}",
        hint:"от 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, без пробелов, без спецсимволов (допустимы дефис и нижнее подчёркивание)."
    },
    {
        title:"Имя",
        name:"first_name",
        type:"text",
        pattern:"^[A-ZА-Я]+[A-Za-zА-Яа-я\\-]*",
        hint:"латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис)."
    },
    {
        title:"Фамилия",
        name:"second_name",
        type:"text",
        pattern:"^[A-ZА-Я]+[A-Za-zА-Яа-я\\-]*",
        hint:"латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис)."
    },
    {
        title:"Номер телефона",
        name:"phone",
        type:"tel",
        pattern:"^[\\+]?[0-9]{10,15}",
        hint:"от 10 до 15 символов, состоит из цифр, может начинается с плюса."
    },
    {
        title:"Пароль",
        name:"password",
        type:"password",
        pattern:"((?=.*\\d)(?=.*[A-Z]).{8,40})",
        hint:"от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра."
    },
    {
        title:"Повторите пароль",
        name:"password_again",
        type:"password",
        pattern:"((?=.*\\d)(?=.*[A-Z]).{8,40})",
        hint:"Повторите пароль"
    },
],

}

