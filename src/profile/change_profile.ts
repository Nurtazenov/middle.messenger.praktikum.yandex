document.querySelector<HTMLDivElement>('')!.innerHTML =`
    <div>
        <fieldset>
    <legend>
                 <h2>Редактирование</h2>
            </legend>
        <form class="registration-form">
            <div class="form-group">
                <label for="email">Почта:</label>
                <input type="email" id="email" name="email" placeholder="Введите вашу почту">
            </div>
            <div class="form-group">
                <label for="login">Ваш логин:</label>
                <input type="text" id="login" name="login" placeholder="Введите ваш логин" >
            </div>
            <div class="form-group">
                <label for="first_name">Ваше имя:</label>
                <input type="text" id="first_name" name="first_name" placeholder="Введите ваше имя:" >
            </div>
              <div class="form-group">
                <label for="second_name
                >Ваше имя:</label>
                <input type="text" id="second_name" name="second_name"
                 placeholder="Введите ваше фамилие:"required>
            </div>
             <div class="form-group">
                <label for="phone">Ваш номер телефона:</label>
                <input type="tel" id="phone" name="phone"
                 placeholder="Введите ваш номер телефона:"required>
            </div>
          
  
            <button type="submit" id="register-button">Зарегистрироваться</button>
            <a>Войти</a>
        </form>
        </fieldset>
    </div>

`