import "./auth.scss";
export function setRegister(element: HTMLDivElement) {
    
  element.innerHTML = `
    <div class="container">
        <form class="registration-form"  id = "getReg">
            <h1>Регистрация</h1>
            <div class="form-group">
                <label for="email">Почта:</label>
                <input type="email" id="email" pattern = "/^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/"name="email" placeholder="Введите вашу почту">
            </div>
            <div class="form-group">
                <label for="login">Ваш логин:</label>
                <input type="text" id="login" pattern='(?=.*[a-z]|[A-Z])[a-zA-Z0-9\\-_]{3,20}' name="login" placeholder="Введите ваш логин" >
            </div>
            <div class="form-group">
                <label for="first_name">Ваше имя:</label>
                <input type="text" id="first_name" pattern ='^[A-ZА-Я]+[A-Za-zА-Яа-я\\-]*' name="first_name" placeholder="Введите ваше имя:" >
            </div>
            <div class="form-group">
                <label for="last_name">Ваше фамилия:</label>
                <input type="text" id="last_name" pattern = '^[A-ZА-Я]+[A-Za-zА-Яа-я\\-]*' name="last_name" placeholder="Введите ваше фамилия:" >
            </div>
             <div class="form-group">
                <label for="phone">Ваш номер телефона:</label>
                <input type="tel" id="phone" name="phone"
                 placeholder="Введите ваш номер телефона:"required pattern = '^[\\+]?[0-9]{10,15}'>
            </div>
          <label class="input-file">
	   	<input type="file" id="avatar" name="avatar" >
 	   	<span class="input-file-btn">Фотография вашего аватара</span>           
 	</label>
            <div class="form-group">
                <label for="password">Ваш пароль:</label>
                <input type="password" id="password" name="password" placeholder="Create a password" required pattern = '((?=.*\\d)(?=.*[A-Z]).{8,40})' >
                <span class="show-password" onclick="togglePassword()">Show</span>
            </div>
            <div class="form-group">
                <label for="password_again">Повторите пароль:</label>
                <input type="password" id="password_again" name="password_again" pattern = '((?=.*\\d)(?=.*[A-Z]).{8,40})' placeholder="Повторите пароль" required>

            </div>
            <button type="submit" id="register-button">Зарегистрироваться</button>
            <a>Войти</a>
        </form>

    </div>
`;
const form = document.getElementById('getReg') as HTMLFormElement;
form.addEventListener('submit',function(event:any){
    event.preventDefault();
    const formData = new FormData(form);
    const data:Record<string,string> = {};
    formData.forEach((value, key) => {
        data[key] = value.toString();
});
    console.log(data)
})



}
