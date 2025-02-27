document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
  <p><h1>Имя вашего собеседника</h1></p>
    <div>
    Поле вашей переписки
    </div>
    <footer>
    <form>
       <input type="text" id="message" name="message"
       placeholder="Введите сообщение>
          
    <button type="submit">Отправить</button>
    </form>
    </footer>
  </div>
`

