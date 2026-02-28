const Task = require("../models/task.model");

/**
 * Create a new task
 */
const createTask = async (taskBody) => {
  const task = await Task.create(taskBody);
  return task;
};

/**
 * Get tasks with pagination, filtering, sorting
 */
const getTasks = async (query) => {
  const { status, sortBy, page = 1, limit = 10 } = query;

  const filter = {};

  if (status) {
    filter.status = status;
  }

  let sort = {};
  if (sortBy) {
    const [field, order] = sortBy.split(":");
    sort[field] = order === "desc" ? -1 : 1;
  } else {
    sort.createdAt = -1;
  }

  const skip = (page - 1) * limit;

  const tasks = await Task.find(filter)
    .sort(sort)
    .skip(skip)
    .limit(Number(limit));

  const totalResults = await Task.countDocuments(filter);

  return {
    results: tasks,
    page: Number(page),
    limit: Number(limit),
    totalPages: Math.ceil(totalResults / limit),
    totalResults,
  };
};

/**
 * Get single task by ID
 */
const getTaskById = async (taskId) => {
  const task = await Task.findById(taskId);
  return task;
};

/**
 * Update task
 */
const updateTask = async (taskId, updateBody) => {
  const task = await Task.findByIdAndUpdate(taskId, updateBody, {
    new: true,
    runValidators: true,
  });

  return task;
};

/**
 * Delete task
 */
const deleteTask = async (taskId) => {
  const task = await Task.findByIdAndDelete(taskId);
  return task;
};

/**
 * Attach file to task
 */
const attachFile = async (taskId, fileData) => {
  const task = await Task.findById(taskId);

  if (!task) {
    return null;
  }

  task.attachments.push(fileData);
  await task.save();

  return task;
};

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  attachFile,
};