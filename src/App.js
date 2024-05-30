import "./App.css";
import React, { useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";

function App() {
  const [isCompleted, setIsCompleted] = useState(false);
  const [allTodos, setAllTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [edit, setEdit] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  function handleEdit(index) {
    setEdit(true);
    setEditIndex(index);
    setTitle(allTodos[index].title);
    setDesc(allTodos[index].description);
  }

  function handleClick() {
    if (edit) {
      let updatedItem = {
        ...allTodos[editIndex],
        title: title,
        description: desc,
      };
      setAllTodos((prevTodo) =>
        prevTodo.map((item, index) =>
          index === editIndex ? updatedItem : item
        )
      );
    } else {
      let newTodoItem = {
        title: title,
        description: desc,
        completed: false,
        completedOn: null,
      };

      setAllTodos((prevTodo) => [...prevTodo, newTodoItem]);
    }
    setTitle("");
    setDesc("");
  }

  function handleDelete(index) {
    setAllTodos((prevTodo) => prevTodo.filter((_, i) => i !== index));
  }

  function handleComplete(index) {
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth() + 1;
    let yyyy = now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    let completedOn =
      " " + dd + "-" + mm + "-" + yyyy + " at " + h + ":" + m + ":" + s;
    setAllTodos((prevTodo) =>
      prevTodo.map((item, i) =>
        i === index
          ? { ...item, completed: true, completedOn: completedOn }
          : item
      )
    );
  }

  useEffect(() => {
    const savedTodo = JSON.parse(localStorage.getItem("todolist"));
    if (savedTodo) {
      setAllTodos(savedTodo);
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("todolist", JSON.stringify(allTodos));
  }, [allTodos]);

  return (
    <div className="App">
      <h1>My Todos</h1>

      <div className="todo-wrapper">
        <div className="todo-input">
          <div className="todo-input-item">
            <label>Title:</label>
            <input
              type="text"
              placeholder="Enter your todo title "
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>
          <div className="todo-input-item">
            <label>Description</label>
            <input
              type="text"
              placeholder="Enter your todo description"
              value={desc}
              onChange={(e) => {
                setDesc(e.target.value);
              }}
            />
          </div>
          <div className="todo-input-item">
            <button type="button" className="primaryBtn" onClick={handleClick}>
              {edit ? "update" : "Add"}
            </button>
          </div>
        </div>
        <div className="btn-area">
          <button
            className={`secondaryBtn ${isCompleted === false && "active"}`}
            onClick={() => setIsCompleted(false)}
          >
            Todo
          </button>
          <button
            className={`secondaryBtn ${isCompleted === true && "active"}`}
            onClick={() => setIsCompleted(true)}
          >
            Completed
          </button>
        </div>
        <div className="todo-list">
          {allTodos.length > 0 &&
            allTodos
              .filter((item) => item.completed === isCompleted)
              .map((item, index) => (
                <div className="todo-list-item" key={index}>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <br />
                    {item.completed && <p>Completed on:{item.completedOn}</p>}
                  </div>
                  <div>
                    <AiOutlineDelete
                      className="icon"
                      onClick={() => handleDelete(index)}
                    />
                    {!item.completed && (
                      <>
                        <BsCheckLg
                          className="check-icon"
                          onClick={() => handleComplete(index)}
                        />
                        <AiOutlineEdit
                          className="check-icon"
                          onClick={() => handleEdit(index)}
                        />
                      </>
                    )}
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
}

export default App;
