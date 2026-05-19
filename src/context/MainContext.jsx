import { createContext, useContext, useEffect, useState } from "react";
import UseHooks from "../hooks/useHooks";

const MainContext = createContext();

export default function MainProvider({ children }) {
  //
  //
  // Getting Data
  const [tasks, setTasks] = useState([]);
  const [InputValidation, setInputValidation] = useState({});
  const [errorElimation, setErrorElimation] = useState(null);
  const [dataForPut, setDataForPut] = useState(null);

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
      setTasks(RealTask);
    };
    resultTasks();
  }, []);

  //
  //

  //
  //
  // custom Hooks (pass tasks and setTasks to avoid circular import)
  const { updateTask, addTask, removeTask } = UseHooks(
    tasks,
    setTasks,
    InputValidation,
    setInputValidation,
    errorElimation,
    setErrorElimation,
    dataForPut,
    setDataForPut,
  );

  const values = {
    tasks,
    setTasks,
    updateTask,
    addTask,
    removeTask,
    InputValidation,
    setInputValidation,
    errorElimation,
    setErrorElimation,
    dataForPut,
    setDataForPut,
  };
  return <MainContext.Provider value={values}>{children}</MainContext.Provider>;
}

export function useMain() {
  return useContext(MainContext);
}
