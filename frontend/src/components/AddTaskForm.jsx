import { useState } from "react";
import { createTask } from "../../services/fetchData";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AddTaskForm = () => {
  const [formData, setFormData] = useState({ task: "", status: "Pending" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (data) => {
    const res = await createTask(data);
    if (res.status === 500) {
      setFormData({ task: "", status: "" });
    }
    setFormData({ task: "", status: "" });
    toast.success("Added successfully");
    navigate("/");
  };

  return (
    <div>
      <form className="form">
        <div className="fields">
          <div className="">
            <h3>Add Task</h3>
          </div>
          <div>
            <label htmlFor="task">Task</label>
            <input
              type="text"
              name="task"
              className="textField"
              value={formData.task}
              onChange={handleChange}
            />
          </div>
          <div className="status">
            <label htmlFor="status">Status</label>
            <select name="status" onClick={handleChange}>
              <option>Pending</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>
          </div>
        </div>
        <div>
          <button type="button" onClick={() => handleSubmit(formData)}>
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTaskForm;
