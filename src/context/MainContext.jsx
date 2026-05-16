import { createContext, useContext, useEffect, useState } from "react";

const MainContext = createContext();

export default function MainProvider({ children }) {
  const [tasks, setTasks] = useState([]);

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

  const values = { tasks, setTasks };
  return <MainContext.Provider value={values}>{children}</MainContext.Provider>;
}

export function useMain() {
  return useContext(MainContext);
}
