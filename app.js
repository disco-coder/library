// Array of books
let myLibrary = [];
let localLibrary = JSON.parse(localStorage.getItem("myLibrary") || "[]");

window.addEventListener("load", () => {
    myLibrary = [];
    localLibrary.forEach(book => {
        myLibrary.push(book);
    })
})


// Clickable events
document.addEventListener("click", (event) => {
    let modal = document.querySelector(".modal");
    if (event.target.classList.contains("removeButton")) removeBook();
    if (event.target.id == "addBook") {
        addNewBookToDOM();
        modal.classList.remove("is-active");
    }
    if (event.target.classList.contains("statusButton")) changeStatus();
    if (event.target.classList.contains("addBook")) {
        modal.classList.add("is-active");
    }
    if (event.target.classList.contains("modal-background") || event.target.classList.contains("modal-close") || event.target.classList.contains("cancel")){
        modal.classList.remove("is-active");
    }
});

function changeStatus() {
    let index = event.target.parentElement.parentElement.getAttribute("data-book");
    if (myLibrary[index]["status"] === "Read") {
        myLibrary[index]["status"] = "Unread";
        event.target.classList.remove("is-light");
        event.target.classList.add("is-dark");
    } else {
        myLibrary[index]["status"] = "Read";
        event.target.classList.add("is-light");
        event.target.classList.remove("is-dark");
    }
    render();
}

function addNewBookToDOM() {
    let title = document.getElementById("title").value;
    let author = document.getElementById("author").value;
    let pages = document.getElementById("pages").value;
    let status = document.getElementById("status").value;
    if (!title || !author || !pages) return;
    let newBook = new Book(title, author, pages, status);
    addBookToLibrary(newBook);
    render();
}

function Book(title, author, pages, status) {
    this.title = title
    this.author = author
    this.pages = pages
    this.status = status
}

function addBookToLibrary(...book) {
    myLibrary.push(...book);
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}

function render() {
    resetDOM();
    myLibrary.forEach((book, index) => {
        let tbody = document.querySelector("tbody");
        let tr = document.createElement("tr");
        tr.setAttribute("data-book", index);
        tbody.appendChild(tr);
        for (let prop in book) {
            if (prop === "status") {
                let td = document.createElement("td");
                tr.appendChild(td);
                let statusButton = document.createElement("button");
                if (book[prop] === "Read") statusButton.textContent = "Read";
                if (book[prop] === "Unread") statusButton.textContent = "Unread";
                if (book[prop] === "Read") {
                    statusButton.textContent = "Read";
                    statusButton.classList.add("is-light")
                }
                if (book[prop] === "Unread") {
                    statusButton.textContent = "Unread";
                    statusButton.classList.add("is-dark")
                }

                statusButton.classList.add("statusButton", "button", "is-small")
                td.appendChild(statusButton);
                break;
            }
            let td = document.createElement("td");
            td.textContent = book[prop];
            tr.appendChild(td);
        }
        let tdRemoveButton = document.createElement("td");
        tr.appendChild(tdRemoveButton);
        let removeButton = document.createElement("button");
        removeButton.textContent = "X";
        removeButton.classList.add("removeButton", "delete", "is-vcentered")
        tdRemoveButton.appendChild(removeButton);
    });
}

function resetDOM() {
    let myNode = document.getElementById("body");
    while (myNode.firstChild) {
      myNode.removeChild(myNode.firstChild);
    }
}

function removeBook() {
    myLibrary.splice(event.target.parentElement.parentElement.getAttribute("data-book"), 1);
    render();
}