const mongoose = require('mongoose');
const { errorLog } = require(__basedir + "/lib/errorHandler")

async function dbConn() {
    try {
        await mongoose.connect(process.env.DB_URI);
        return console.log("connected to database");
    } catch (error) {
        errorLog(error)
        console.error("could not connect to database");
    }
}

module.exports = dbConn;