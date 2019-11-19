let myLibrary = [];
let hobit = new Book("Hobit", "J.R.R. Tolkien", 420);
let now = new Book("The Power of Now", "Eckhart Tolle", 120);
let form = document.querySelector("form");
addBookToLibrary(hobit, now);
render();


function myFunction() {
    let title = document.getElementById("form").elements[0].value;
    let author = document.getElementById("form").elements[1].value;
    let pages = document.getElementById("form").elements[2].value;
    let newBook = new Book(title, author, pages);
    addBookToLibrary(newBook);
    render();
}
function Book(title, author, pages) {
    this.title = title
    this.author = author
    this.pages = pages
    this.status
}

function addBookToLibrary(...book) {
    myLibrary.push(...book);
}

function render() {
    myLibrary.forEach(book => {
        let tbody = document.querySelector("tbody");
        let tr = document.createElement("tr");
        tbody.appendChild(tr);
        for (let prop in book) {
            let td = document.createElement("td");
            td.textContent = book[prop];
            tr.appendChild(td);
        }
        myLibrary = myLibrary.slice(1);
    });
}