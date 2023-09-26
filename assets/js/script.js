const selectors = {
  btnRole: ".modal [data-role]",
  btnNew: ".new",
  modalInsert: ".modal#insert",
  modalDelete: ".modal#delete",
  library: ".library",
  books: "[data-library]",
};

const active = "active";
const prefix = "book_";

const library = document.querySelector(selectors.library);
const books = document.querySelector(selectors.books);
const modalInsert = document.querySelector(selectors.modalInsert);
const modalDelete = document.querySelector(selectors.modalDelete);
const btnNew = document.querySelector(selectors.btnNew);
const btnRole = document.querySelectorAll(selectors.btnRole);

let myLibrary = [];

library.addEventListener("click", ({ target }) => {
  const book = target.closest(".book");
  const btnClose = target.closest(".close");
  const btnRead = target.closest(".read");

  if (!book) return;

  const name = book.querySelector(".name");

  const btnDelete = modalDelete.querySelector("[data-role='delete']");

  if (btnClose) {
    const subbook = modalDelete.querySelector(".subbook");

    if (subbook) {
      subbook.dataset.after = name.textContent;
    }

    if (btnDelete) {
      const id = target.closest("[data-id]");
      btnDelete.dataset.id = id.dataset.id;
    }

    modalDelete.classList.add(active);
  } else if (btnRead) {
    myLibrary[getId(book.dataset.id)].doneBook(true);
  }
});

btnNew.addEventListener("click", () => {
  modalInsert.classList.add(active);
});

btnRole.forEach((btn) => {
  switch (btn.dataset.role) {
    case "close":
      const modal = btn.closest(".modal");
      btnCloseModal(btn, modal);
      break;
    case "insert":
      btn.addEventListener("click", insertBook);
      break;
    case "delete":
      btn.addEventListener("click", ({ target }) => {
        deleteBook(target.dataset.id);
      });
      break;
  }
});

function btnCloseModal(btn, modal) {
  btn.addEventListener("click", () => {
    modal.classList.remove(active);
  });
}

function closeModal(modal) {
  const form = modal.querySelector("form");

  if (form) {
    form.reset();
  }

  modal.classList.remove(active);
}

function insertBook(e) {
  e.preventDefault();

  const name = modalInsert.querySelector("input[name='name']");
  const author = modalInsert.querySelector("input[name='author']");
  const pages = modalInsert.querySelector("input[name='pages']");
  const read = modalInsert.querySelector("input[name='read']");

  addBookToLibrary(name.value, author.value, pages.value, read.checked);
  closeModal(modalInsert);
}

function deleteBook(id) {
  console.log(id);
  myLibrary[getId(id)].removeBook();
  closeModal(modalDelete);
}

function getId(id) {
  return ~~id.split("_")[1];
}

function addBookToLibrary(name, author, pages, read) {
  const book = new Book(name, author, pages, read);
  book.addBook();

  myLibrary.push(book);
}

function Book(name, author, pages, read = false) {
  this.name = name;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = myLibrary.length;
}

Book.prototype.getInfo = function () {
  return [this.name, this.author, this.pages, this.read];
};

Book.prototype.createCart = function (name, author, pages) {
  const cart = document.createElement("div");
  cart.className = "book";
  cart.innerHTML = `<h2 class="name">${name}</h2>`;
  cart.innerHTML += `<p class="author">${author}</p>`;
  cart.innerHTML += `<p class="pages" data-after="${pages}">Страниц:</p>`;
  cart.innerHTML += `<button class="close"></button>`;
  cart.innerHTML += `<button class="read">Завершить</button>`;

  return cart;
};

Book.prototype.addBook = function () {
  const book = this.createCart(this.name, this.author, this.pages);

  if (this.read) {
    book.classList.add("done");
  }

  book.dataset.id = prefix + this.id;

  books.appendChild(book);
};

Book.prototype.removeBook = function () {
  const book = books.querySelector(`[data-id=${prefix}${this.id}]`);

  book.remove();

  myLibrary[this.id] = null;

  console.log(myLibrary);
};

Book.prototype.updateBook = function (name, author, pages, read) {
  myLibrary[this.id][name] = name;
  myLibrary[this.id][author] = author;
  myLibrary[this.id][pages] = pages;

  this.doneBook(read);
};

Book.prototype.doneBook = function (read) {
  myLibrary[this.id][read] = read;

  const book = books.querySelector(`[data-id=${prefix}${this.id}]`);

  if (read) {
    book.classList.add("done");
  } else {
    book.classList.remove("done");
  }
};

function start() {
  addBookToLibrary("Непрерывное развёртывание ПО", "Хамбл, Фарли", "123", true);
  addBookToLibrary("Алгоритмы на Java", "Уэйн, Седжвик", "123");
  addBookToLibrary("Сам себе программист", "Кори Альтхофф", "123", true);
  addBookToLibrary(
    "Кодеры за работой. Размышления о ремесле программиста ",
    "Питер Сейбел",
    "123"
  );
  addBookToLibrary(
    "Предметно-ориентированное проектирование. Структуризация сложных программных систем",
    "Эрик Эванс",
    "123"
  );
  addBookToLibrary("Искусство программирования", "Дональд Кнут", "123", true);
  addBookToLibrary(
    "Структура и интерпретация компьютерных программ",
    "Абельсон, Сассман",
    "123"
  );
  addBookToLibrary(
    "Шаблоны корпоративных приложений",
    "Мартин Фаулер",
    "123",
    true
  );
  addBookToLibrary("Жемчужины программирования", "Джон Бентли", "123");
  addBookToLibrary(
    "Человеческий фактор. Успешные проекты и команды",
    "ДеМарко, Листер",
    "123"
  );
  addBookToLibrary(
    "Head First. Паттерны проектирования",
    "Фримен, Робсон",
    "123",
    true
  );
  addBookToLibrary(
    "Рефакторинг. Улучшение проекта существующего кода",
    "Фаулер, Кент",
    "123"
  );
  addBookToLibrary("Совершенный код", "Стив Макконелл", "123", true);
  addBookToLibrary("Чистый код", "Роберт Мартин", "123");
  addBookToLibrary("Программист-прагматик ", "Томас, Хант", "123", true);
}

start();
