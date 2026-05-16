import { useEffect, useState } from "react";

export default function UseHooks() {
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

  const addTask = () => {
    console.log("add");
  };

  //
  //
  // RemoveTask
  const removeTask = (index) => {
    // tasks.filter((t, i) => index === i);
    console.log("remove");
  };

  //
  //
  //
  // UptadeTask
  const updateTask = () => {
    console.log("update");
  };

  return { updateTask, addTask, removeTask };
}
