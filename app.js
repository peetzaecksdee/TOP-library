class Book {
	constructor(title, author, pages, hasRead) {
		this.title = title;
		this.author = author;
		this.pages = pages;
		this.hasRead = hasRead;
	}
}

class YourLibrary {
	constructor() {
		this.yourLibrary = [];
	}

	isInLibrary(book) {
		return this.yourLibrary.some((yourBook) => yourBook.title === book.title);
	}

	addBook(book) {
		if (!this.isInLibrary(book)) {
			this.yourLibrary.push(book);
		}
	}

	getBook(title) {
		return this.yourLibrary.find((yourBook) => yourBook.title === title);
	}

	removeBook(title) {
		this.yourLibrary = this.yourLibrary.filter((book) => book.title !== title);
	}
}

function updateCardGrid() {
	resetCardGrid();
	for (const book of yourLibrary.yourLibrary) {
		addBookToGrid(book);
	}
}

function resetCardGrid() {
	cardGrid.innerHTML = "";
}

function getBookFromInput() {
	const inputTitle = bookName.value;
	const inputAuthor = bookAuthor.value;
	const inputPages = bookPages.value;
	const inputHasRead = bookRead.checked;
	return new Book(inputTitle, inputAuthor, parseInt(inputPages), inputHasRead);
}

function closeForm() {
	addBookDialog.close();
	addBookForm.reset();
}

function addBookToLibrary(event) {
	event.preventDefault();
	const newBook = getBookFromInput();

	if (yourLibrary.isInLibrary(newBook)) {
		alert("The book is already in the library!");
		return;
	}

	yourLibrary.addBook(newBook);
	updateCardGrid();

	closeForm();
}

function removeBook(book) {
	yourLibrary.removeBook(book.title);
	updateCardGrid();
}

function isBookRead(hasRead, btn) {
	switch (hasRead) {
		case true:
			btn.classList.add("btn-green");
			btn.classList.remove("btn-red");
			break;
		default:
			btn.classList.add("btn-red");
			btn.classList.remove("btn-green");
	}
}

function addBookToGrid(book) {
	const container = document.createElement("div");
	const title = document.createElement("span");
	const author = document.createElement("span");
	const pages = document.createElement("span");
	const hasRead = document.createElement("button");
	const removeBtn = document.createElement("button");

	container.classList.add("card");
	title.classList.add("title");
	author.classList.add("author");

	title.textContent = `"${book.title}"`;
	author.textContent = `By ${book.author}`;
	pages.textContent = `${book.pages} pages`;
	hasRead.textContent = book.hasRead;
	isBookRead(book.hasRead, hasRead);
	removeBtn.textContent = "Remove";

	container.appendChild(title);
	container.appendChild(author);
	container.appendChild(pages);
	container.appendChild(hasRead);
	container.appendChild(removeBtn);
	cardGrid.appendChild(container);

	removeBtn.onclick = () => removeBook(book);
	hasRead.onclick = () => {
		book.hasRead = !book.hasRead;
		hasRead.textContent = book.hasRead;
		isBookRead(book.hasRead, hasRead);
	};
}

const yourLibrary = new YourLibrary();
const addBookBtn = document.getElementById("add");
const cardGrid = document.querySelector(".cards");
const addBookDialog = document.getElementById("addBook");
const addBookForm = addBookDialog.querySelector("#addBookForm");
const confirmBtn = addBookForm.querySelector("#confirmBtn");
const cancelBtn = addBookForm.querySelector("#cancelBtn");
const bookName = addBookForm.querySelector("#title");
const bookAuthor = addBookForm.querySelector("#author");
const bookPages = addBookForm.querySelector("#pages");
const bookRead = addBookForm.querySelector("#hasRead");

addBookForm.addEventListener("submit", addBookToLibrary);
addBookBtn.addEventListener("click", () => {
	addBookDialog.showModal();
});
cancelBtn.addEventListener("click", () => {
	closeForm();
});
