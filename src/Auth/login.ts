import './auth.scss';
export function setLogin(element: HTMLDivElement) {
  element.innerHTML = `
   <div class="container">
        <form action ="" method = "POST" id="getLog">
            <h1>Авторизация</h1>
            <div class="form-group">
                <label for="email">Ваш логин:</label>
                <input type="email" id="email" name="email" placeholder="Enter your email" required>
            </div>

            <div class="form-group">
                <label for="password">Ваш пароль</label>
                <input type="password" id="password" name="password" placeholder="Create a password" required>
            </div>
            <button type="submit" id="register-button">Авторизоваться</button>
            <a>Нет аккаунта?</a>
        </form>
    </div>
`;

  const form = document.getElementById('getLog') as HTMLFormElement;
  form.addEventListener('submit', (event:any) => {
    event.preventDefault();
    const formData = new FormData(form);
    const data:Record<string, string> = {};
    formData.forEach((value, key) => {
      data[key] = value.toString();
    });
    console.log(data);
  });
}



