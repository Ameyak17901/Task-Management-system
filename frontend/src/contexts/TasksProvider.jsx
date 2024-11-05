/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
import { getTasks } from "../../services/fetchData";

const TaskContext = createContext();

export function useTasks() {
  return useContext(TaskContext);
}

const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const data = await getTasks();
      setTasks(data.data);
    }
    fetchData();
  }, []);

  return <TaskContext.Provider value={tasks}>{children}</TaskContext.Provider>;
};

export default TasksProvider;
