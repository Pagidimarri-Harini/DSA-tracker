const { runCode } = require(__basedir + "/lib/run-code");
const { supportedLanguages } = require(__basedir + "/lib/run-code/instructions");
const { info } = require(__basedir + "/lib/run-code/info");
const { errorLog } = require(__basedir + "/lib/errorHandler")

const langs = { python: "py", c_cpp: "cpp", java: "java", javascript: "js" }

const runCodeApi = async (req, res) => {
    try {
        const { lang, code } = req.body
        if (!langs[lang]) {
            return res.sendStatus(400)
        }
        const output = await runCode({ language: langs[lang], code: code })
        res.json(output)
    } catch (error) {
        errorLog(error);
        res.sendStatus(500)
    }
}

const listLangsApi = async (req, res) => {
    try {
        const body = []
        for (const language of supportedLanguages) {
            body.push({
                language,
                info: await info(language),
            })
        }

        res.json({ supportedLanguages: body })
    } catch (error) {
        errorLog(error);
        res.sendStatus(500)
    }
}

module.exports = { runCodeApi, listLangsApi }