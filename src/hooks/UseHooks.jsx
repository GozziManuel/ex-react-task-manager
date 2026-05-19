import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UseHooks(
  tasks,
  setTasks,
  InputValidation,
  setInputValidation,
  errorElimation,
  setErrorElimation,
  dataForPut,
  setDataForPut,
) {
  // GETTING DATA WITH async/await

  const [tasksHooks, setTasksHooks] = useState([]);
  const handleAsync = async (url) => {
    const result = await fetch(url);
    const obj = await result.json();
    return obj;
  };

  const recivingData = async () => {
    const Tasks = await handleAsync(`http://localhost:3001/tasks`);
    return Tasks;
  };
  useEffect(() => {
    const resultTasks = async () => {
      const RealTask = await recivingData();
      setTasksHooks(RealTask);
    };
    resultTasks();
  }, []);

  //
  // AddTask

  const addTask = (JsonData) => {
    const PostData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(JsonData),
    };

    fetch(`http://localhost:3001/tasks`, PostData)
      .then((response) => response.json())
      .then((data) => {
        setInputValidation(data);
        if (data.success === true && data.task) {
          setTasks((curr) => [...curr, data.task]);
        }
      })
      .catch((err) => console.error(err));
  };

  //
  //
  // RemoveTask
  const removeTask = (index) => {
    const PostData = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch(`http://localhost:3001/tasks/${index}`, PostData)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.success === true) {
          const removedObj = tasks.filter((el) => el.id !== index);
          setErrorElimation(data);
          setTasks(removedObj);
        }
      })
      .catch((err) => console.error(err));
  };
  //
  //
  //
  // UptadeTask
  const updateTask = (index, newObj) => {
    const PostData = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newObj),
    };

    fetch(`http://localhost:3001/tasks/${index}`, PostData)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setDataForPut(data);
        setTasks((curr) => curr.map((t) => (t.id === index ? data.task : t)));
      })
      .catch((err) => console.error(err));
  };

  return { updateTask, addTask, removeTask };
}
