
import { test } from "node:test";
import assert from "node:assert/strict";

import {
    addBook,
    deleteBook,
    toggleBorrow,
    searchBooks,
    getStatistics
} from "../src/bookLogic.js";

const sampleBook = {
    id: 1,
    title: "Clean Code",
    author: "Robert Martin",
    year: 2008,
    borrowed: false
};

test("Should add a new book", () => {
    const result = addBook([], sampleBook);
    assert.equal(result.length, 1);
    assert.equal(result[0].title, "Clean Code");
});

test("Should reject a book without a title", () => {
    assert.throws(
        () => addBook([], { ...sampleBook, title: "" }),
        /Title and author are required/
    );
});

test("Should delete a book", () => {
    const result = deleteBook([sampleBook], 1);
    assert.equal(result.length, 0);
});

test("Should borrow and return a book", () => {
    const borrowed = toggleBorrow([sampleBook], 1);
    assert.equal(borrowed[0].borrowed, true);

    const returned = toggleBorrow(borrowed, 1);
    assert.equal(returned[0].borrowed, false);
});

test("Should search books by title or author", () => {
    const result = searchBooks([sampleBook], "clean");
    assert.equal(result.length, 1);
});
