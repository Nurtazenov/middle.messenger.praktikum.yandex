import "./auth.scss";
export function setLogin(element: HTMLDivElement) {
  element.innerHTML = `
   <div class="container">
        <form >
            <h1>Авторизация</h1>

            <div class="form-group">
                <label for="email">Ваш логин:</label>
                <input type="email" id="email" name="email" placeholder="Enter your email" required>
            </div>

            <div class="form-group">
                <label for="password">Ваш пароль
                </label>
                <input type="password" id="password" name="password" placeholder="Create a password" required>

            </div>


            <button type="submit" id="register-button">Авторизоваться</button>
            <a>Нет аккаунта?</a>
        </form>

    </div>
`;
}
