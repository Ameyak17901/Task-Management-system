import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { editTask } from "../../services/fetchData";
import toast from "react-hot-toast";

const colorTypes = ["Pending", "In Progress", "Completed"];

const StyledBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledField = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const StyledButtonBox = styled.div`
  display: flex;
  justify-content: center;
  width: 150px;
  align-items: center;
`;

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
    <StyledBox>
      <form className="form">
        <div className="fields">
          <div className="">
            <h3>Edit</h3>
          </div>
          <StyledField>
            <label htmlFor="task">Task</label>
            <input
              type="text"
              name="task"
              className="textField"
              value={formData.task}
              onChange={handleChange}
            />
          </StyledField>
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
        <StyledButtonBox>
          <button
            className="btn"
            type="button"
            onClick={() => handleSubmit(formData)}
          >
            Update
          </button>
        </StyledButtonBox>
      </form>
    </StyledBox>
  );
};

export default EditTaskForm;
