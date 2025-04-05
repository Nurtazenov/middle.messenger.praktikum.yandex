import './auth.scss';

export const setRegister = (element: HTMLDivElement) => {
  element.innerHTML = `
    <div class="container">
        <form class="registration-form"  id = "getReg">
            <h1>Регистрация</h1>
            <div class="form-group">
                <label for="email">Почта:</label>
                <input type="email" id="email" pattern = "/^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/"name="email" placeholder="" required>
                <span>латиница, может включать цифры и спецсимволы вроде дефиса и подчёркивания, обязательно должна быть «собака» (@) и точка после неё, но перед точкой обязательно должны быть буквы.</span>
            </div>
            <div class="form-group">
                <label for="login">Логин:</label>
                <input type="text" id="login" pattern='(?=.*[a-z]|[A-Z])[a-zA-Z0-9\\-_]{3,20}' name="login"  required >
                <span>от 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, без пробелов, без спецсимволов (допустимы дефис и нижнее подчёркивание).</span>
            </div>
            <div class="form-group">
                <label for="first_name">Имя:</label>
                <input type="text" id="first_name" pattern ='^[A-ZА-Я]+[A-Za-zА-Яа-я\\-]*' name="first_name"  required >
                <span>латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис).</span>
            </div>
            <div class="form-group">
                <label for="second_name">Фамилия:</label>
                <input type="text" id="second_name" pattern = '^[A-ZА-Я]+[A-Za-zА-Яа-я\\-]*' name="last_name"  required>
                <span>латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис).</span>
            </div>
             <div class="form-group">
                <label for="phone">Номер телефона:</label>
                <input type="tel" id="phone" name="phone"
                 required pattern = '^[\\+]?[0-9]{10,15}' >
                 <span>от 10 до 15 символов, состоит из цифр, может начинается с плюса.</span>
            </div>
         
            <div class="form-group">
                <label for="password">Пароль:</label>
                <input type="password" id="password" name="password" required pattern = '((?=.*\\d)(?=.*[A-Z]).{8,40})' >
                <span>от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра.</span>
                <span class="show-password" onclick="togglePassword()">Show</span>
            </div>
            <div class="form-group">
                <label for="password_again">Повторите пароль:</label>
                <input type="password" id="password_again" name="password_again" pattern = '((?=.*\\d)(?=.*[A-Z]).{8,40})'  required>

            </div>
            <button type="submit" id="register-button">Зарегистрироваться</button>
            <a>Войти</a>
        </form>

    </div>
  `;

  const form = document.getElementById('getReg') as HTMLFormElement;
  form.addEventListener('submit', (event: Event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const data: Record<string, string> = {};
    formData.forEach((value, key) => {
      data[key] = value.toString();
    });
    console.log(data);
  });

}


  // заполняем список инпутов
//   input.innerHTML = inputsHtml;
// }





