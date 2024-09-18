import { createBook, deleteBookbyID, getAllBooks, getBookByID, updateBookbyID } from "./handler.js";

const routes = [
    {
        method: "GET",
        path: "/books",
        handler: getAllBooks
    },
    {
        method: "GET",
        path: "/books/{bookId}",
        handler: getBookByID
    },
    {
        method: "POST",
        path: "/books",
        handler: createBook
    },
    {
        method: "PUT",
        path: "/books/{bookId}",
        handler: updateBookbyID
    },
    {
        method: "DELETE",
        path: "/books/{bookId}",
        handler: deleteBookbyID
    },
]

export default routes