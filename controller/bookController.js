const queries = require('../db/queries')
const dbConnection = require('../db/connection')
const util = require("../Util/utility")
const Logger = require("../services/logger.service")
const auditService = require("../audit/audit.service");
const auditAction = require("../audit/auditAction");

const logger = new Logger('bookController')

exports.getBookList = async (req, res) => {
  let auditOn = util.dateFormat()
  try {
    const bookListQuery = queries.queryList.GET_BOOK_LIST_QUERY;
    const result = await dbConnection.dbQuery(bookListQuery);
    logger.info("Return Book List", result.rows);
    auditService.prepareAudit(auditAction.actionList.GET_BOOK_LIST, result.rows, null, "postman", auditOn);
    return res.status(200).json(result.rows);

  } catch (err) {

    console.log("Error " + err);
    auditService.prepareAudit(auditAction.actionList.GET_BOOK_LIST, null, JSON.stringify(err), "postman", auditOn);
    return res.status(500).send({ error: "Faild to Get Books 🥲" });
  }
}

exports.getBookDetails = async (req, res) => {
  try {
    const bookId = req.params.bookId;
    const bookDetailsQuery = queries.queryList.GET_BOOK_DETAILS_QUERY;
    const result = await dbConnection.dbQuery(bookDetailsQuery, [bookId]);

    return res.status(200).json(result.rows);

  } catch (err) {

    console.log("Error " + err);
    return res.status(500).send({ error: "Faild to Get Book Details 🥲" });
  }
}

exports.saveBook = async (req, res) => {
  try {
    const createdBy = 'admin';
    const createdOn = new Date().toISOString(); // Use ISO string for consistency
    //req.body
    const title = req.body.title;
    const description = req.body.description;
    const author = req.body.author;
    const publisher = req.body.publisher;
    const pages = req.body.pages;
    const storeCode = req.body.storeCode;

    if (!title || !author || !publisher || !storeCode) {
      return res.status(500).send({ error: " title, auther, publisher and storeCode  are required, can't be empty ⛔" })
    }


    const values = [title, description, author, publisher, pages, storeCode, createdBy, createdOn]




    const saveBookQuery = queries.queryList.SAVE_BOOK_QUERY;
    await dbConnection.dbQuery(saveBookQuery, values);
    return res.status(201).send('Succssufully Book Created  ✅');

  } catch (err) {

    console.log("Error " + err);
    return res.status(500).send({ error: "Faild to Create Book 🥲" });

  }

}

exports.UpdateBook = async (req, res) => {
  try {
    const createdBy = 'admin';
    const createdOn = new Date().toISOString();


    //req.body
    const bookId = req.body.bookId;
    const title = req.body.title;
    const description = req.body.description;
    const author = req.body.author;
    const publisher = req.body.publisher;
    const pages = req.body.pages;
    const storeCode = req.body.storeCode;

    if (!bookId || !title || !author || !publisher || !storeCode) {
      return res.status(500).send({ error: "bookId, title, auther, publisher and storeCode  are required, can't be empty ⛔" })
    }


    const values = [title, description, author, publisher, pages, storeCode, createdBy, createdOn, bookId]




    const updateBookQuery = queries.queryList.UPDATE_BOOK_QUERY;
    await dbConnection.dbQuery(updateBookQuery, values);
    return res.status(201).send('Succssufully Book Updated  ✅');

  } catch (err) {

    console.log("Error " + err);
    return res.status(500).send({ error: "Faild to Update Book 🥲" });

  }

}

exports.deleteBook = async (req, res) => {

  const bookId = req.params.bookId;


  try {
    //validate not empty
    if (!bookId) {
      return res.status(500).send({ error: "can't Delete empty bookId ❌" })
    }
    const deleteBookQuery = queries.queryList.DELETE_BOOK_QUERY;
    await dbConnection.dbQuery(deleteBookQuery, [bookId]);
    return res.status(200).send('Succssufully Book Deleted 👍');
  } catch (err) {

    console.log("Error" + err);
    return res.status(500).send({ error: `Filed to Delete Book with id: ${bookId}  ❌` })
  }


}