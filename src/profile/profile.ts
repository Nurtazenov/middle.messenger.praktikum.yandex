import './Profile.scss'
export function setProfile(element: HTMLDivElement) {

      element.innerHTML = `
    <section class="main_profile">
        <fieldset class="card">
            <legend>
               <h2>Ваш профиль </h2>
            </legend>
            <p><img src="/src/Navbar/user.webp"
            
            /></p>
            
       <h2> <strong>Ваше имя</strong></h2>
            <br/>
            <p>Почта</p>
            <hr>
            <p>Логин</p>
            <hr>
            <p>Имя</p>
            <hr>
            <p>Фамилия</p>
            <hr>
            <p>Имя в почте</p>
            <hr>
            <p>Телефон</p>
            <br>
            <p><a>Изменить данные</a></p>
            <hr>
            <p><a>Изменить пароль</a></p>
            <hr>
            <a>Выйти</a>

        </fieldset>
    </section>

`
}