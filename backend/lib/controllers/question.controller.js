const { existsSync, readFileSync } = require("fs")
const { errorLog } = require(__basedir + "/lib/errorHandler")

const dataDir = __basedir + "/data/question_data"
const codeDir = __basedir + "/data/driver_codes"

const langs = { python: "py", cpp: "cpp", java: "java", javascript: "js" }

const getQuestion = async (req, res) => {
    try {
        const filePath = `${dataDir}/${req.params.question}.json`
        if (!existsSync(filePath)) {
            return res.sendStatus(404)
        }
        const question = require(filePath)
        res.json(question)
    } catch (error) {
        errorLog(error);
        res.sendStatus(500)
    }
}

const getDriverCode = async (req, res) => {
    try {
        const filePath = `${codeDir}/${req.params.question}.${langs[req.params.lang]}`
        if (!existsSync(filePath)) {
            return res.sendStatus(404)
        }
        const code = readFileSync(filePath, "utf-8")
        res.send(code)
    } catch (error) {
        errorLog(error);
        res.sendStatus(500)
    }
}

module.exports = { getQuestion, getDriverCode }