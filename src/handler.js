import { nanoid } from 'nanoid';
import { dataBuku } from './books.js';

const createBook = (request, h) => {
  const { name, year, author, summary, publisher, pageCount, readPage, reading, } = request.payload;

  const id = nanoid(16);
  const finished = pageCount === readPage;
  const insertedAt = new Date().toISOString();
  const updatedAt = new Date().toISOString();

  const newBook = { name, year, author, summary, publisher, pageCount, readPage, finished, reading, id, insertedAt, updatedAt, };
  if (!name) {
    return h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    })
      .code(400);
  }
  if (readPage > pageCount) {
    return h.response({
      status: 'fail',
      message:
        'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    })
      .code(400);
  }

  dataBuku.push(newBook);
  const isSuccess = dataBuku.filter((book) => book.id === id).length > 0;
  if (isSuccess) {
    return h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    })
      .code(201);
  }
};

const getAllBooks = (request, h) => {
  const { name, finished, reading } = request.query;

  if (dataBuku.length > 0) {
    let result = []
    if (name) {
      result = dataBuku.filter((book) => book.name.toLowerCase().includes(name.toLowerCase()))
      const formatResult = result.map((book) => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher,
      }))
      return h.response({
        status: 'success',
        data: {
          books: formatResult
        }
      }).code(200).header('Content-Type', 'application/json')
    }
    if (finished) {
      const finishedBoolean = finished === '1' ? false : true
      result = dataBuku.filter((book) => book.finished === finishedBoolean)
      const formatResult = result.map((book) => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher,
      }))
      return h.response({
        status: 'success',
        data: {
          books: formatResult
        }
      }).code(200).header('Content-Type', 'application/json')
    }
    if (reading) {
      const readBoolean = reading === '1' ? false : true
      result = dataBuku.filter((book) => book.reading === readBoolean)
      const formatResult = result.map((book) => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher,
      }))
      return h.response({
        status: 'success',
        data: {
          books: formatResult
        }
      }).code(200).header('Content-Type', 'application/json')
    }

    const formatResult = dataBuku.map((book) => ({
      id: book.id,
      name: book.name,
      publisher: book.publisher,
    }))
    return h.response({
      status: 'success',
      data: {
        books: formatResult
      }
    }).code(200).header('Content-Type', 'application/json')
  }
  return h.response({
    status: 'success',
    message: {
      books: []
    }
  }).code(200)

};
const getBookByID = (request, h) => {
  const { bookId } = request.params;
  const book = dataBuku.find((book) => book.id === bookId);

  if (book) {
    return h.response({
      status: 'success',
      data: {
        book,
      },
    }).code(200);
  }
  return h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  }).code(404);
};
const updateBookbyID = (request, h) => {
  const { bookId } = request.params;
  const { name, year, author, summary, publisher, pageCount, readPage, reading, } = request.payload;

  if (!name | name === null | undefined) {
    return h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    }).code(400)
  }

  if (readPage > pageCount) {
    return h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount'
    }).code(400)
  }


  const updatedAt = new Date().toISOString();
  const index = dataBuku.findIndex((book) => book.id === bookId);
  if (index === -1) {
    return h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Id tidak ditemukan',
    }).code(404)

  }
  dataBuku[index] = {
    ...dataBuku[index],
    name, year, author, summary, publisher, pageCount, readPage, reading, updatedAt,
  }
  return h.response({
    status: 'success',
    message: 'Buku berhasil diperbarui',
  }).code(200);
};

const deleteBookbyID = (request, h) => {
  const { bookId } = request.params;
  const index = dataBuku.findIndex((book) => book.id === bookId)
  if (index === -1) {
    return h.response({
      status: 'fail',
      message: 'Buku gagal dihapus. Id tidak ditemukan',
    }).code(404);
  } else {
    dataBuku.splice(index, 1);
    return h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    }).code(200);
  }
}

export { createBook, getAllBooks, getBookByID, updateBookbyID, deleteBookbyID };
