
const queries = require('../db/queries')
const dbConnection = require('../db/connection')
const util = require("../Util/utility")

exports.getStoreList = async (req, res) => {
  try {
    const storeListQuery = queries.queryList.GET_STORE_LIST_QUERY;
    const result = await dbConnection.dbQuery(storeListQuery);

    return res.status(200).json(result.rows); // Send JSON directly instead of stringifying

  } catch (err) {

    console.log("Error " + err);
    return res.status(500).send({ error: "Faild to list store 🥲" });
  }
}


exports.saveStore = async (req, res) => {
  try {
    const createdBy = 'admin';
    const createdOn = new Date().toISOString(); // Use ISO string for consistency
    //req.body
    const storeName = req.body.storeName;
    const address = req.body.address;
    if (!storeName || !address) {
      return res.status(500).send({ error: " store name and Address are required, can't be empty ⛔" })
    }
    //STORE_ID, STORE_NAME, STORE_CODE, ADDRESS,  CREATED_BY, CREATED_ON

    const storeCode = util.generateStoreCode();
    const values = [storeName, storeCode, address, createdBy, createdOn]
    const saveStoreQuery = queries.queryList.SAVE_STORE_QUERY;
    await dbConnection.dbQuery(saveStoreQuery, values);
    return res.status(201).send('Succssufully Store Saved  ✅');

  } catch (err) {

    console.log("Error " + err);
    return res.status(500).send({ error: "Faild to Save store 🥲" });

  }

}