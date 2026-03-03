/* eslint-disable react/prop-types */
import { MdModeEditOutline, MdDeleteOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { deleteTask } from "../../services/fetchData";

const colorTypes = {
  Pending: "red",
  "In Progress": "blue",
  Completed: "green",
};

const Task = ({ task }) => {
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    await deleteTask(id);
    toast.success("Deleted successfully...");
  };

  return (
    <div>
      <p>{task.task}</p>
      <p>
        <span style={{ backgroundColor: colorTypes[task.status] }}>
          {task.status}
        </span>
      </p>
      <div>
        <button onClick={() => navigate(`/task/${task.id}`, { state: task })}>
          <MdModeEditOutline />
        </button>
        <button onClick={() => handleDelete(task.id)}>
          <MdDeleteOutline />
        </button>
      </div>
    </div>
  );
};

export default Task;
