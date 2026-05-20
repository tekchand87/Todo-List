import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [tasks, setTask] = useState([]);
  const [newTask, setNewTask] = useState("");

  const BASE_URL = "http://localhost:3000/tasks";

  // 🔹 Fetch all tasks (defined BEFORE useEffect → fixes your error)
  async function fetchTasks() {
    try {
      const res = await fetch(BASE_URL);
      const data = await res.json();
      setTask(data.tasks);
    } catch (err) {
      console.error(err);
    }
  }

  // 🔹 Run on page load
  useEffect(() => {
    fetchTasks();
  }, []);

  // 🔹 Handle input
  function handleInput(event) {
    setNewTask(event.target.value);
  }

  // 🔹 Add Task (POST)
  async function AddTask() {
    if (newTask.trim() !== "") {
      try {
        await fetch(BASE_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ task: newTask }),
        });

        setNewTask("");
        fetchTasks(); // refresh from DB
      } catch (err) {
        console.error(err);
      }
    }
  }

  // 🔹 Delete Task (DELETE)
  async function handleDelete(id) {
    try {
      await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE",
      });

      fetchTasks(); // refresh
    } catch (err) {
      console.error(err);
    }
  }

  // 🔹 Move Up (frontend only)
  function handleMoveUp(index) {
    if (index > 0) {
      const tempTasks = [...tasks];
      const temp = tempTasks[index];
      tempTasks[index] = tempTasks[index - 1];
      tempTasks[index - 1] = temp;
      setTask(tempTasks);
    }
  }

  // 🔹 Move Down (frontend only)
  function handleMoveDown(index) {
    if (index < tasks.length - 1) {
      const tempTasks = [...tasks];
      const temp = tempTasks[index];
      tempTasks[index] = tempTasks[index + 1];
      tempTasks[index + 1] = temp;
      setTask(tempTasks);
    }
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      AddTask();
    }
  }

  return (
    <div className="container">
      <h1 className="head">Planly</h1>

      <div id="input-work">
        <input
          id="write"
          type="text"
          placeholder="Enter your task"
          value={newTask}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
        />
        <button onClick={AddTask} id="Add">
          Add
        </button>
      </div>

      <div id="work">
        {tasks.map((task, index) => (
          <li key={task._id} id="box">
            <span className="content">{task.task}</span>

            <button onClick={() => handleDelete(task._id)} id="btn-delete">
              delete
            </button>

            <button onClick={() => handleMoveUp(index)} id="btn-up">
              Up
            </button>

            <button onClick={() => handleMoveDown(index)} id="btn-down">
              Down
            </button>
          </li>
        ))}
      </div>
    </div>
  );
}

export default App;
