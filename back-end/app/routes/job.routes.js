module.exports = app => {
  const jobs = require("../controllers/job.controller.js");

  var router = require("express").Router();

  // creating a new job
  router.post("/", jobs.create);

  // retrieving ALL jobs
  router.get("/", jobs.findAll);

  // retrieving ALL published jobs
  router.get("/published", jobs.findAllPublished);

  // retrieving only ONE job
  router.get("/:id", jobs.findOne);

  // updating ONE job by id
  router.put("/:id", jobs.update);

  // deleting ONE job
  router.delete("/:id", jobs.delete);

  // deleting ALL jobs
  router.delete("/", jobs.deleteAll);

  app.use('/api/jobs', router);
};
