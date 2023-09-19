const selectors = {
  btnRole: ".modal [data-role]",
  btnNew: ".new",
  modalInsert: ".modal#insert",
  modalDelete: ".modal#delete",
  library: ".library",
};

const active = "active";

const library = document.querySelector(selectors.library);
const modalInsert = document.querySelector(selectors.modalInsert);
const modalDelete = document.querySelector(selectors.modalDelete);
const btnNew = document.querySelector(selectors.btnNew);
const btnRole = document.querySelectorAll(selectors.btnRole);

library.addEventListener("click", ({ target }) => {
  const book = target.closest(".book");
  const btnClose = target.closest(".close");

  if (!book && !btnClose) return;

  const name = book.querySelector(".name");

  const subbook = modalDelete.querySelector(".subbook");

  if (btnClose) {
    subbook.dataset.after = name.textContent;
    modalDelete.classList.add(active);
  }
});

btnNew.addEventListener("click", () => {
  modalInsert.classList.add(active);
});

btnRole.forEach((btn) => {
  switch (btn.dataset.role) {
    case "close":
      const modal = btn.closest(".modal");
      closeModal(btn, modal);
      break;
  }
});

function closeModal(btn, modal) {
  btn.addEventListener("click", () => {
    modal.classList.remove(active);
  });
}
