const myLibrary = [
  // {
  //   author: "J.K Rowling",
  //   title: "Harry Potter",
  //   pages: 150,
  //   status: false
  // },
  // {
  //   author: "Cal Newport",
  //   title: "Digital Minimalism",
  //   pages: 187,
  //   status: true
  // }
];

const container = document.querySelector("#book-container");
const form = document.querySelector("#form");

//Constructor

function Book(title, author, pages, status) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
};

//add book library

Book.prototype.addBookToLibrary = function () {
  const newBook = {};
  const { title, author, pages } = this;
  let { status } = this;

  newBook.title = title;
  newBook.author = author;
  if (isNaN(pages)) {
    //validate numbers
    alert("Please Enter a number for pages:");
    return;
  }
  else {
    newBook.pages = pages;
  }

  if (status === "Yes".toLowerCase()) {
    status = "Read";
    newBook.status = status;
  } else if (status === "No".toLowerCase()) {
    status = "Not Yet Read";
    newBook.status = status;
  } else {
    // handled by showAlert()
    return;
  }

  myLibrary.push(newBook);
  return newBook;
};

Book.prototype.displayBooks = function (books) {
  const { title, author, pages } = this;
  let { status } = this;
  const div = document.createElement("div");

  for (let book of books) {
    div.innerHTML = `
      <p>Title: ${book.title}</p>
      <p>Author: ${book.author}</p>
      <p>Pages: ${book.pages}</p>
      <p>Status?: ${book.status}</p>
      <button class="delete">Remove</button>
    `;
    div.classList.add("books");
  }
  container.append(div);
};

Book.prototype.clearFields = function () {
  document.querySelector("#author").value = "";
  document.querySelector("#title").value = "";
  document.querySelector("#numOfPages").value = "";
  document.querySelector("#readStatus").value = "";
}

//Helper function to remove book

remove = function (element) {
  if (element.classList.contains("delete")) {
    element.parentElement.remove();
  }
};

// Alerts

displayAlert = function (message, className) {
  const div = document.createElement("div");
  div.className = `${className}`;
  div.appendChild(document.createTextNode(message));
  const firstPTag = document.querySelectorAll("p")[0];
  const section = document.querySelector("section");
  document.body.insertBefore(div, section);

  setTimeout(() => {
    document.querySelector(`.${className}`).remove();
  }, 3000);
};


form.addEventListener("submit", function (evt) {
  evt.preventDefault();

  const author = document.querySelector("#author").value;
  const title = document.querySelector("#title").value;
  const pages = document.querySelector("#numOfPages").value;
  let status = document.querySelector("#readStatus").value;

  if (title === "" || author === "" || pages === "" || status === "") {
    displayAlert("Please fill in all fields", "error");
  } else {
    const book1 = new Book(title, author, pages, status);

    book1.addBookToLibrary();
    book1.displayBooks(myLibrary);

    // display success message
    displayAlert("Book added to list", "success");

    //after clear the fields
    book1.clearFields();
  }
});

container.addEventListener("click", function (evt) {
  remove(evt.target);
  displayAlert("Book removed", "success");
});


// get user input using prompt()
// const title = prompt("Book Title: ");
// const author = prompt("Author's Name: ");
// const pages = parseInt(prompt("Number of pages: "));
// const readStatus = prompt("Have you read: ");

// get user input from form

  // newBook.readStatus = readStatus;
  // switch (status) {
  //   case "Yes".toLowerCase():
  //     status = "Read";
  //     newBook.status = status;
  //     break;
  //   case "No".toLowerCase():
  //     status = "Not Yet Read";
  //     newBook.status = status;
  //     break;
  //   default:
  //     alert("Invalid, Please enter Yes or No");
  //     break;
  // }
