const { errorLog } = require(__basedir + "/lib/errorHandler")

const langs = { python: "python3", c_cpp: "cpp", java: "java", javascript: "nodejs" }

const runCodeApi = async (req, res) => {
    try {
        const { lang, code } = req.body
        if (!langs[lang]) {
            return res.sendStatus(400)
        }
        const url = 'https://online-code-compiler.p.rapidapi.com/v1/';
        const options = {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'X-RapidAPI-Key': process.env.RAPIDAPI_TOKEN,
                'X-RapidAPI-Host': 'online-code-compiler.p.rapidapi.com'
            },
            body: JSON.stringify({
                language: langs[lang],
                version: 'latest',
                code,
                input: null
            })
        };

        const output = await fetch(url, options)
        const body = await output.json()
        res.json(body)
    } catch (error) {
        errorLog(error);
        res.sendStatus(500)
    }
}

const listLangsApi = async (req, res) => {
    try {
        const url = 'https://online-code-compiler.p.rapidapi.com/v1/languages/';
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': process.env.RAPIDAPI_TOKEN,
                'X-RapidAPI-Host': 'online-code-compiler.p.rapidapi.com'
            }
        };
        const output = await fetch(url, options);
        const body = await output.json();
        res.json(body)
    } catch (error) {
        errorLog(error);
        res.sendStatus(500)
    }
}


module.exports = { runCodeApi, listLangsApi }