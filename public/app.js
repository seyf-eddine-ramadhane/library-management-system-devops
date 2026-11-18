
import {
    addBook,
    deleteBook,
    toggleBorrow,
    searchBooks,
    getStatistics,
    updateBook
} from "../src/bookLogic.js";

let books = JSON.parse(localStorage.getItem("libraryBooks")) || [];

const bookForm = document.getElementById("bookForm");
const bookList = document.getElementById("bookList");
const searchInput = document.getElementById("searchInput");

function saveBooks() {
    localStorage.setItem("libraryBooks", JSON.stringify(books));
}

function renderBooks(list = books) {
    bookList.innerHTML = "";

    list.forEach(book => {
        const row = document.createElement("tr");

        const values = [book.title, book.author, book.year];

        values.forEach(value => {
            const cell = document.createElement("td");
            cell.textContent = value;
            row.appendChild(cell);
        });

        const statusCell = document.createElement("td");
        statusCell.textContent = book.borrowed ? "Borrowed" : "Available";
        statusCell.className = "status";
        row.appendChild(statusCell);

        const actionsCell = document.createElement("td");

        const borrowButton = document.createElement("button");
        borrowButton.className = "action-button";
        borrowButton.textContent = book.borrowed ? "Return" : "Borrow";
        borrowButton.addEventListener("click", () => {
            books = toggleBorrow(books, book.id);
            saveBooks();
            renderBooks();
        });

        const editButton = document.createElement("button");
        editButton.className = "action-button";
        editButton.textContent = "Edit";
        editButton.addEventListener("click", () => {
            const title = prompt("New title:", book.title);
            if (title === null) return;

            const author = prompt("New author:", book.author);
            if (author === null) return;

            const year = prompt("New publication year:", book.year);
            if (year === null) return;

            try {
                books = updateBook(books, book.id, { title, author, year });
                saveBooks();
                renderBooks();
            } catch (error) {
                alert(error.message);
            }
        });

        const deleteButton = document.createElement("button");
        deleteButton.className = "action-button delete-button";
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => {
            if (confirm("Delete this book?")) {
                books = deleteBook(books, book.id);
                saveBooks();
                renderBooks();
            }
        });

        actionsCell.append(borrowButton, editButton, deleteButton);
        row.appendChild(actionsCell);
        bookList.appendChild(row);
    });

    const stats = getStatistics(books);
    document.getElementById("totalBooks").textContent = stats.total;
    document.getElementById("availableBooks").textContent = stats.available;
    document.getElementById("borrowedBooks").textContent = stats.borrowed;
}

bookForm.addEventListener("submit", event => {
    event.preventDefault();

    try {
        books = addBook(books, {
            title: document.getElementById("title").value,
            author: document.getElementById("author").value,
            year: document.getElementById("year").value
        });

        saveBooks();
        renderBooks();
        bookForm.reset();
    } catch (error) {
        alert(error.message);
    }
});

searchInput.addEventListener("input", () => {
    renderBooks(searchBooks(books, searchInput.value));
});

renderBooks();
