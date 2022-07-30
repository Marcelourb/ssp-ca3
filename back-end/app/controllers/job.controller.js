// at controller I will handle with user req (from front)

const db = require("../models");
const Job = db.jobs;
const Op = db.Sequelize.Op;

// creating and saving a new Job
exports.create = (req, res) => {
  // validating request
  if (!req.body.title || !req.body.company || !req.body.description) {
    res.status(400).send({
      message: "Error, content can not be empty!"
    });
    return;
  }

  // creating a Job
  const job = {
    title: req.body.title,
    description: req.body.description,
    company: req.body.company,
    salary: req.body.salary
  };

  // saving Job
  Job.create(job)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Error while creating Job!"
      });
    });
};

// retrieving ALL Jobs
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Job.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Error occurred while retrieving jobs."
      });
    });
};

// finding 1 Job by id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Job.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Job id=" + id
      });
    });
};

// updating a Job by id
exports.update = (req, res) => {
  const id = req.params.id;

  Job.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Job was updated successfully!"
        });
      } else {
        res.send({
          message: `Error. Cannot update Job  id=${id}`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Job with id=" + id
      });
    });
};

// deleting a Job by id
exports.delete = (req, res) => {
  const id = req.params.id;

  Job.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Job was deleted successfully!"
        });
      } else {
        res.send({
          message: `Error. Cannot delete Job id=${id}`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error. Could not delete Job id=" + id
      });
    });
};

// deleting ALL registered Jobs
exports.deleteAll = (req, res) => {
  Job.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Jobs were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all jobs."
      });
    });
};

// finding ALL published Job
exports.findAllPublished = (req, res) => {
  Job.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving jobs."
      });
    });
};
