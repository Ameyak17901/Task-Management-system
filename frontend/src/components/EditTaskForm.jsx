import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { editTask } from "../../services/fetchData";
import toast from "react-hot-toast";

const colorTypes = ["Pending", "In Progress", "Completed"];

const EditTaskForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const task = location.state;
  const [formData, setFormData] = useState({
    task: task?.task || "",
    status: task?.status || "",
  });
  let remainingTypes = colorTypes.filter((type) => type !== formData.status);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (data) => {
    const res = await editTask(data, task.id);
    if (res.status === 200) {
      toast.success("Updated successfully");
      navigate("/");
    }
  };

  return (
    <div>
      <form className="form">
        <div className="fields">
          <div className="">
            <h3>Edit</h3>
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
              <option>{formData.status}</option>
              {remainingTypes.map((type) => (
                <option key={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <button type="button" onClick={() => handleSubmit(formData)}>
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTaskForm;
