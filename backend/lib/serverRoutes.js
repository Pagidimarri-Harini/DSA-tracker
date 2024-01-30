module.exports = (app) => {
  // ----------- add input validation!!
  app.use("/", require(__basedir + "/lib/routes/question.routes.js"))
  app.use("/", require(__basedir + "/lib/routes/topic.routes.js"))
  app.use("/", require(__basedir + "/lib/routes/user.routes.js"))
};
