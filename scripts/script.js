const bookContainer = document.getElementById("book-container");

fetch("https://striveschool-api.herokuapp.com/books")
  .then(reObj => reObj.json())
  .then(books => {
    books.forEach(book => {
      const card = document.createElement("div");
      card.className = "card";
      const img = document.createElement("img");
      img.src = book.img;
      img.className = "card-img-top";
      img.alt = book.title;
      card.appendChild(img);
      const cardBody = document.createElement("div");
      cardBody.className = "card-body";
      card.appendChild(cardBody);
      const title = document.createElement("h5");
      title.className = "card-title";
      title.innerText = book.title;
      cardBody.appendChild(title);
      const price = document.createElement("p");
      price.className = "card-text";
      price.innerText = `$${book.price.toString()}`;
      cardBody.appendChild(price);
      const discardBtn = document.createElement("button");
      discardBtn.className = "btn btn-primary";
      discardBtn.innerText = "Scarta";
      discardBtn.addEventListener("click", discardBook);
      cardBody.appendChild(discardBtn);
      const buyBtn = document.createElement("button");
      buyBtn.className = "btn btn-primary";
      buyBtn.innerText = "Compra ora";
      buyBtn.addEventListener("click", () => addToCart(book));
      cardBody.appendChild(buyBtn);
      const col = document.createElement("div");
      col.className = "col d-flex";
      col.appendChild(card);
      bookContainer.appendChild(col);
    });
  })
  .catch(err => console.log(err));

const discardBook = e => {
  e.target.closest(".col").remove();
};

const cart = document.getElementById("cart");

const addedBooks = JSON.parse(localStorage.getItem("cart"));

const removeFromCart = (e, bookTitle) => {
  const idx = addedBooks.indexOf(bookTitle);
  addedBooks.splice(idx, 1);
  localStorage.setItem("cart", JSON.stringify(addedBooks));
  e.target.closest("li").remove();
};

addedBooks.forEach(bookTitle => {
  const addedBook = document.createElement("li");
  addedBook.innerText = bookTitle;
  const removeFromCartBtn = document.createElement("button");
  removeFromCartBtn.className = "btn btn-primary";
  removeFromCartBtn.innerText = "Remove";
  removeFromCartBtn.addEventListener("click", e => {
    removeFromCart(e, bookTitle);
  });
  addedBook.appendChild(removeFromCartBtn);
  cart.appendChild(addedBook);
});

const addToCart = book => {
  const addedBook = document.createElement("li");
  addedBook.innerText = book.title;
  const removeFromCartBtn = document.createElement("button");
  removeFromCartBtn.className = "btn btn-primary";
  removeFromCartBtn.innerText = "Remove";
  removeFromCartBtn.addEventListener("click", e => {
    removeFromCart(e, book.title);
  });
  addedBook.appendChild(removeFromCartBtn);
  cart.appendChild(addedBook);
  addedBooks.push(book.title);
  localStorage.setItem("cart", JSON.stringify(addedBooks));
};
