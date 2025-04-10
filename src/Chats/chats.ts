document.querySelector<HTMLDivElement>('')!.innerHTML = `
  <div>
  <form action="" method="get">
  <input name="message" id="message" placeholder="Искать здесь..." type="search" pattern = "/^.+$/">
  <button type="submit">Поиск</button>
</form>
    <ol>
        <a><li>Ваши переписки</li></a>
    </ol>

  </div>
`;
