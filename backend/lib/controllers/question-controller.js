const fs = require("fs")
const { errorLog } = require(__basedir + "/lib/errorHandler")

const dataDir = __basedir + "/data"

const getQuestion = async (req, res) => {
    try {
        const filePath = dataDir + "/" + req.params.question.replace(/-/gi, "_") + ".json"
        if (!fs.existsSync(filePath)) {
            return res.sendStatus(404)
        }
        const question = fs.readFileSync(filePath, "utf-8")
        const parsed = JSON.parse(question)
        res.json(parsed)
    } catch (error) {
        errorLog(error);
        res.sendStatus(500)
    }
}

module.exports = { getQuestion }