const mainContainer = document.querySelector(".main-container");
const categoriesContainer = document.querySelector(".categories");

// Main Top Books

function apiRequestTopBooks() {
  const BASE_URL = "https://books-backend.p.goit.global/books/top-books";
  return fetch(BASE_URL).then((resp) => {
    if (!resp.ok) {
      throw new Error(resp.statusText);
    }
    return resp.json();
  });
}

apiRequestTopBooks()
  .then((data) => {
    mainContainer.insertAdjacentHTML("beforeend", createMarkupTopBooks(data));
    if (data.page !== data.total_pages) {
      paginationBtn.hidden = false;
    }
  })
  .catch((err) => console.log(err));

function createMarkupTopBooks(arr) {
  return arr
    .map((obj) => {
      const booksMarkup = obj.books
        .map(
          (obj) => `<li class="top-books_list list">
    <a href="#" class="top-books_link link">
        <img src="${obj.book_image}" alt="book_image"  width="180">
        <h3 class="top-books_title">${obj.title}</h3>
        <p class="top-books_author">${obj.contributor}</p>
    </a>
</li>`
        )
        .join("");
      return `<ul class="top-books">
      <p class="top-books_category">${obj.list_name}</p>
      <div class="top-books_container">${booksMarkup}</div>
      <a href="#" class="top-books_button link">see more</a>
      </ul>`;
    })
    .join("");
}

// Categories list

function apiRequestCategoriesList() {
  const BASE_URL = "https://books-backend.p.goit.global/books/category-list";
  return fetch(BASE_URL).then((resp) => {
    if (!resp.ok) {
      throw new Error(resp.statusText);
    }
    return resp.json();
  });
}

apiRequestCategoriesList()
  .then((data) => {
    categoriesContainer.insertAdjacentHTML(
      "beforeend",
      createMarkupCategoriesList(data)
    );
    if (data.page !== data.total_pages) {
      paginationBtn.hidden = false;
    }
  })
  .catch((err) => console.log(err));

function createMarkupCategoriesList(arr) {
  return arr.map((obj) => `<li class="">${obj.list_name}</li>`).join("");
}
