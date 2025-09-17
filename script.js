function Book(title, author, pages, read){
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    this.info = function(){
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? 'read' : 'not read yet'}`;
    }

    this.toggleReadStatus = function(){
        this.read = !this.read;
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
                <div class="book-actions">
                    <button class="toggle-read-button" data-id="${book.id}">${book.read ? 'Mark as Unread' : 'Mark as Read'}</button>
                    <button class="remove-book-button" data-id="${book.id}">Remove</button>
                </div>
            `;
        document.querySelector('.book-list').appendChild(bookItem);
    });
}

const modal = document.querySelector('.modal');
const openButton = document.querySelector('.open-button');
const cancelButton = document.querySelector('.cancel-button');
const addBookButton = document.querySelector('.add-book-button');

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-book-button')) {
        removeBook(e.target);
    } else if (e.target.classList.contains('toggle-read-button')) {
        toggleReadStatus(e.target);
    } else if (e.target === openButton) {
        modal.showModal();
    } else if (e.target === cancelButton) {
        modal.close();
    } else if (e.target === addBookButton) {
        addNewBook(e);
    }
});

function removeBook(bookElement) {
    const bookId = bookElement.getAttribute('data-id');
    const bookIndex = library.findIndex(book => book.id === bookId);
    if (bookIndex !== -1) {
        library.splice(bookIndex, 1);
        displayBooks(library);
    }
}

function toggleReadStatus(bookElement) {
    const bookId = bookElement.getAttribute('data-id');
    const book = library.find(book => book.id === bookId);
    book.toggleReadStatus();
    displayBooks(library);
}

openButton.addEventListener('click', () => {
    modal.showModal();
});

cancelButton.addEventListener('click', () => {
    modal.close();
});

function addNewBook(e){
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
}

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