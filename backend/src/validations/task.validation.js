const Joi = require("joi");

const createTask = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().optional(),
    status: Joi.string()
      .valid("pending", "in-progress", "completed")
      .optional(),
    dueDate: Joi.date().optional(),
  }),
};

const updateTask = {
  body: Joi.object().keys({
    title: Joi.string().optional(),
    description: Joi.string().optional(),
    status: Joi.string()
      .valid("pending", "in-progress", "completed")
      .optional(),
    dueDate: Joi.date().optional(),
  }),
};

const getTasks = {
  query: Joi.object().keys({
    status: Joi.string()
      .valid("pending", "in-progress", "completed")
      .optional(),
    sortBy: Joi.string().optional(),
    page: Joi.number().integer().min(1).optional(),
    limit: Joi.number().integer().min(1).optional(),
  }),
};

module.exports = {
  createTask,
  updateTask,
  getTasks,
};