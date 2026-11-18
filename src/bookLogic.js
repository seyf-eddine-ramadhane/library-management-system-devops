
export function addBook(books, book) {
    if (!book.title?.trim() || !book.author?.trim()) {
        throw new Error("Title and author are required");
    }

    if (!Number.isInteger(Number(book.year)) ||
        Number(book.year) < 1 ||
        Number(book.year) > 9999) {
        throw new Error("Invalid publication year");
    }

    const newBook = {
        id: book.id ?? Date.now(),
        title: book.title.trim(),
        author: book.author.trim(),
        year: Number(book.year),
        borrowed: false
    };

    return [...books, newBook];
}

export function deleteBook(books, id) {
    return books.filter(book => book.id !== id);
}

export function toggleBorrow(books, id) {
    return books.map(book =>
        book.id === id
            ? { ...book, borrowed: !book.borrowed }
            : book
    );
}

export function searchBooks(books, query) {
    const term = query.toLowerCase().trim();

    return books.filter(book =>
        book.title.toLowerCase().includes(term) ||
        book.author.toLowerCase().includes(term)
    );
}

export function getStatistics(books) {
    return {
        total: books.length,
        available: books.filter(book => !book.borrowed).length,
        borrowed: books.filter(book => book.borrowed).length
    };
}

export function updateBook(books, id, changes) {
    const title = changes.title?.trim();
    const author = changes.author?.trim();
    const year = Number(changes.year);

    if (!title || !author) {
        throw new Error("Title and author are required");
    }

    if (!Number.isInteger(year) || year < 1 || year > 9999) {
        throw new Error("Invalid publication year");
    }

    return books.map(book =>
        book.id === id
            ? { ...book, title, author, year }
            : book
    );
}
