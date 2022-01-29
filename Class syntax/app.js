class Book {
    constructor(title, author, pages, hasRead){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.hasRead = hasRead;
    }

    info() {
        let hasReadStr;
        if (this.hasRead) {
            hasReadStr = 'already read';
        } else {
            hasReadStr = 'not read yet';
        }
        return `${this.title} by ${this.author}, ${this.pages} pages, ${hasReadStr}`
    }

}

class Library {
    constructor() {
        this.books = [];

    }


    toggleHasRead(e) {
        if(e.target.className == "has-read") {
            e.target.className = "has-not-read";
            e.target.innerText = "Not Read";
        } else {
            e.target.className = "has-read";
            e.target.innerText = "Read";
        }
    }

    createBook() {
        let title = document.getElementById('title').value;
        let author = document.getElementById('author').value;
        let pages = document.getElementById('pages').value;
        let hasRead = document.getElementById('hasRead').checked;

        return new Book(title, author, pages, hasRead);
    }


    createBookDiv(book) {
        let bookDiv = document.createElement('div');
        let title = document.createElement('h3');
        let author = document.createElement('h3');
        let pages = document.createElement('h3');
        let hasReadBtn = document.createElement('button');
        let rmvBtn = document.createElement('button');

        title.innerText = `Title: ${book.title}`;
        author.innerText = `Author: ${book.author}`;
        pages.innerText = `${book.pages} pages`;

        if(book.hasRead) {
            hasReadBtn.classList.add('has-read');
            hasReadBtn.innerText = "Read";
        } else {
            hasReadBtn.classList.add('has-not-read');
            hasReadBtn.innerText = "Not Read";
        }

        hasReadBtn.addEventListener('click', this.toggleHasRead);

        rmvBtn.classList.add('rmv-btn');
        rmvBtn.innerText = 'Remove';
        rmvBtn.addEventListener('click', (e)=>{
            this.removeBook(e);
        });

        bookDiv.appendChild(title);
        bookDiv.appendChild(author);
        bookDiv.appendChild(pages);
        bookDiv.appendChild(hasReadBtn);
        bookDiv.appendChild(rmvBtn);
        bookDiv.bookObject = book;
        contentDiv.appendChild(bookDiv);
    }

    resetForm() {
        document.getElementById('title').value = null;
        document.getElementById('author').value = null;
        document.getElementById('pages').value = null;
        document.getElementById('hasRead').checked = false;
    }

    addBook(e) {
        console.log(e.target);
        let newBook = this.createBook();
        // newBook.index = library.length;
        this.books.push(newBook);
        this.createBookDiv(newBook);
        this.resetForm();
        closeForm();
        console.log(this.books);
    }

    removeBook(e) {
        //horrible but it works (fix it later)
        console.log(e.target.parentNode.bookObject);
        e.target.parentNode.parentNode.removeChild(e.target.parentNode);

        //remove from library
        let bookObj = e.target.parentNode.bookObject;
        let index = this.books.indexOf(bookObj);
        if(index > -1){
            this.books.splice(index, 1);
        }
        console.log(`${bookObj.title} book has been removed`);
        console.log(this.books);
    }

}

function openForm() {
    bookForm.style.display = 'flex';
}

function closeForm() {
    bookForm.style.display = 'none';
}


const bookForm = document.getElementById('new-book-form');
const contentDiv = document.querySelector('.content');
const library = new Library();


bookForm.addEventListener('submit', (e)=>{
    library.addBook(e);
});