function Book(title, author, pages, read){
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    this.info = function(){
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? 'read' : 'not read yet'}`;
    }
}

function addBookToLibrary(book, library) {
    library.push(book);
}

function displayBooks(library) {
    document.querySelector('.book-list').innerHTML = '';
    library.forEach(book => { 
        const bookItem = document.createElement('li');
        bookItem.classList.add('book-item');
        bookItem.innerHTML = 
            `
                <h2>${book.title}</h2>
                <p>Author: ${book.author}</p>
                <p>Pages: ${book.pages}</p>
                <p>Status: ${book.read ? 'Read' : 'Not read yet'}</p>
            `;
        document.querySelector('.book-list').appendChild(bookItem);
    });
}

const modal = document.querySelector('.modal');
const openButton = document.querySelector('.open-button');
const cancelButton = document.querySelector('.cancel-button');
const addBookButton = document.querySelector('.add-book-button');

openButton.addEventListener('click', () => {
    modal.showModal();
});

cancelButton.addEventListener('click', () => {
    modal.close();
});

addBookButton.addEventListener('click', (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const read = document.getElementById('read').checked;

    const newBook = new Book(title, author, pages, read);
    addBookToLibrary(newBook, library);
    displayBooks(library);
    modal.close();
    document.querySelector('form').reset();
});

const library = [];
const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, true);
const nineteenEightyFour = new Book('1984', 'George Orwell', 328, false);
const toKillAMockingbird = new Book('To Kill a Mockingbird', 'Harper Lee', 281, true);
const prideAndPrejudice = new Book('Pride and Prejudice', 'Jane Austen', 279, false);
const theGreatGatsby = new Book('The Great Gatsby', 'F. Scott Fitzgerald', 180, true);

addBookToLibrary(toKillAMockingbird, library);
addBookToLibrary(prideAndPrejudice, library);
addBookToLibrary(theGreatGatsby, library);  
addBookToLibrary(theHobbit, library);
addBookToLibrary(nineteenEightyFour, library);
displayBooks(library);