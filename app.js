function Book (title, author, pages, hasRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasRead = hasRead;
}

Book.prototype.info = function () {
    let hasReadStr;
    if (this.hasRead) {
        hasReadStr = 'already read';
    } else {
        hasReadStr = 'not read yet';
    }
    return `${this.title} by ${this.author}, ${this.pages} pages, ${hasReadStr}`
};

function openForm() {
    bookForm.style.display = 'flex';
}

function closeForm() {
    bookForm.style.display = 'none';
}

function createBook() {
    let title = document.getElementById('title').value;
    let author = document.getElementById('author').value;
    let pages = document.getElementById('pages').value;
    let hasRead = document.getElementById('hasRead').checked;

    return new Book(title, author, pages, hasRead);
}

function createBookDiv(book) {
    let bookDiv = document.createElement('div');
    bookDiv.innerText = book.info();
    contentDiv.appendChild(bookDiv);
}

function resetForm() {
    document.getElementById('title').value = null;
    document.getElementById('author').value = null;
    document.getElementById('pages').value = null;
    document.getElementById('hasRead').checked = false;
}

function addBook(e) {
    console.log(e.target);
    let newBook = createBook();
    library.push(newBook);
    createBookDiv(newBook);
    resetForm();
    closeForm();
}


const bookForm = document.getElementById('new-book-form');
const contentDiv = document.querySelector('.content');
const library = [];

// // populate for testing 
// library[0] = new Book("Wonder", "wonder's author", 305, true);
// library[1] = new Book("One piece", "eichiro oda", 1036, true);
// library[2] = new Book("Love is war", "i for got", 232, false);
// //

// library.forEach((book) => {
//     createBookDiv(book);
// });

bookForm.addEventListener('submit', addBook);
