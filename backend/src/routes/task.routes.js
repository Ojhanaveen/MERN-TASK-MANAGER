const express = require("express");
const router = express.Router();
const taskController = require("../controllers/task.controller");
const upload = require("../middlewares/upload.middleware");

// Create Task
router.post("/", taskController.createTask);

// Get All Tasks
router.get("/", taskController.getTasks);

// Get Single Task
router.get("/:id", taskController.getTaskById);

// Update Task
router.patch("/:id", taskController.updateTask);

// Delete Task
router.delete("/:id", taskController.deleteTask);

// Upload File
router.post(
  "/:id/upload",
  upload.single("file"),
  taskController.uploadFile
);

module.exports = router;