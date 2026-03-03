import { useTasks } from "../contexts/TasksProvider";
import Task from "./Task";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Tasks = () => {
  const data = useTasks();
  const [filter, setFilter] = useState("All");
  const navigate = useNavigate();

  const handleFilter = (e) => {
    setFilter(e.target.value);
  };

  let filteredTasks =
    filter === "All" ? data : data?.filter((task) => task.status === filter);

  return (
    <div className="flex flex-col gap-2">
      <h4>Tasks</h4>
      <div>
        <div>
          <select onClick={handleFilter}>
            <option>All</option>
            <option>Pending</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>
        </div>
        <div>
          {filteredTasks.map((task) => (
            <Task key={task.task} task={task} />
          ))}
        </div>
        {filteredTasks.length === 0 && <p>No tasks Found...</p>}
      </div>
      <div>
        <button className="btn-add" onClick={() => navigate("/task")}>
          Add
        </button>
      </div>
    </div>
  );
};

export default Tasks;
