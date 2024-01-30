const { existsSync, mkdirSync, appendFileSync } = require('fs')

const errDir = '/.errorlogs'

const errorLog = (errObj) => {
    try {
        const errorFile = __basedir + errDir + `/errorlogs-${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}.log`
        errObj.msg = errObj.message
        errObj.nm = errObj.name
        errObj.stk = errObj.stack
        errObj.loggedAt = Date.now()
        !existsSync(__basedir + errDir) && mkdirSync(__basedir + errDir)
        appendFileSync(errorFile, JSON.stringify(errObj) + "\n", "utf-8")
    } catch (error) { console.log(errObj); }
}

module.exports = { errorLog }