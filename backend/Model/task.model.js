const mongoose = require("mongoose");

const taskSchema = mongoose.Schema(
  {
    name: String,
    description: String,
    checklist: [
      {
        item: String,
        completed: {
          type: Boolean,
          default: false,
        },
      },
    ],
    comments: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        comment: String,
      },
    ],
    project: String,
    assignTo: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    dueDate: String,
    labels: [String],
    userID: String,
  },
  {
    versionKey: false,
  }
);

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
