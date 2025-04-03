document.querySelector<HTMLDivElement>('')!.innerHTML = `
  <div>
  <form action="" method="get">
  <div class="form-group">
                    <label for="message">Переписки</label>
                <input type="search" id="message" placeholder="Искать здесь..." pattern = '^[A-ZА-Я]+[A-Za-zА-Яа-я\\-]*' name="message" >
            </div>
  <button type="submit">Поиск</button>
</form>
    <ol>
        <a><li>Ваши переписки</li></a>
    </ol>

  </div>
`;
