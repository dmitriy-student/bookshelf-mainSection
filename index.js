const mainContainer = document.querySelector(".main-container");

function getTrending() {
  const BASE_URL = "https://books-backend.p.goit.global/books/top-books";
  return fetch(BASE_URL).then((resp) => {
    if (!resp.ok) {
      throw new Error(resp.statusText);
    }
    return resp.json();
  });
}

getTrending()
  .then((data) => {
    mainContainer.insertAdjacentHTML("beforeend", createMarkup(data));
    if (data.page !== data.total_pages) {
      paginationBtn.hidden = false;
    }
  })
  .catch((err) => console.log(err));

function createMarkup(arr) {
  return arr
    .map((obj, i) => {
      const booksMarkup = obj.books.map(
        (obj) => `<li>
    <a href="#">
        <img src="${obj.book_image}" alt="book_image"  width="180">
        <h3>${obj.title}</h3>
        <p>${obj.contributor}</p>
    </a>
</li>`
      );
      return `<ul>
      <p>${i + 1} - ${obj.list_name}</p>
      ${booksMarkup}
      <a href="#">see more</a>
      </ul>`;
    })
    .join("");
}
