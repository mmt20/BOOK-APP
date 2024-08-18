const express = require('express')
const router = express.Router()

var BookContrl = require('../controller/bookController')



router.get('/books', BookContrl.getBookList);
router.get('/books/details/:bookId', BookContrl.getBookDetails);
router.post('/books/save', BookContrl.saveBook);
router.put('/books/update', BookContrl.UpdateBook);
router.delete('/books/delete/:bookId', BookContrl.deleteBook);


module.exports = router;