const express = require("express");
const dbConnect = require("./configue/dbConfigue");
const todoModal = require("./todoSchema/todoModal");
const app = express();
const port = 2000;
dbConnect();
app.use(express.json());

app.post("/createTodo", async (req, res) => {
  let { task } = req.body;
  let createTodo = new todoModal({
    task,
  });
  await createTodo.save();
  res.send({ msg: "Todo created" });
});
app.get("/readTodo", async (req, res) => {
  let getAllTodo = await todoModal.find();
  res.send({ success: "Data fatched successfully", getAllTodo });
});
app.delete("/deleteTodo/:id", async (req, res) => {
  let { id } = req.params;
  let deleteTodo = await todoModal.findOneAndDelete({ _id: id });
  res.send({ msg: "Todo deleted successfully", data: deleteTodo });
});

app.patch("/updatedTodo/:id", async (req, res) => {
  let { id } = req.params;
  let { task } = req.body;
  let updateTodo = await todoModal.findOneAndUpdate(
    { _id: id },
    { task: task },
    { new: true }
  );
  res.send({ msg: "Todo updated successfully", data: updateTodo });
});
app.get("/singleTodo/:id", async (req, res) => {
  let { id } = req.params;
  await todoModal.findOne({ _id: id });
  res.send({ msg: "Single todo is fatched" });
});
app.listen(port, () => {
  console.log("server is running");
});
