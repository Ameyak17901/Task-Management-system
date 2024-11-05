import { useState } from "react";
import { styled } from "styled-components";
import { createTask } from "../../services/fetchData";
import { useNavigate } from "react-router-dom";

const StyledBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledButtonBox = styled.div`
  display: flex;
  justify-content: center;
  width: 150px;
  align-items: center;
`;

const StyledField = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

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
    navigate("/");
  };

  return (
    <StyledBox>
      <form className="form">
        <div className="fields">
          <div className="">
            <h3>Add Task</h3>
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
              <option>Pending</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>
          </div>
        </div>
        <StyledButtonBox>
          <button
            className="btn"
            type="button"
            onClick={() => handleSubmit(formData)}
          >
            Add
          </button>
        </StyledButtonBox>
      </form>
    </StyledBox>
  );
};

export default AddTaskForm;
