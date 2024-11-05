import { useTasks } from "../contexts/TasksProvider";
import { styled } from "styled-components";
import Task from "./Task";
import { useState } from "react";
import { IoAddCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
const StyledBoard = styled.div`
  display: grid;
  grid-template-columns: 0.2fr 0.2fr 0.2fr 0.2fr;
  gap: 50px;
`;

const StyledBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px;
  margin-top: 1rem;
  width: fit-content;
  z-index: 1000px;
  max-width: 80vw;
`;

const StyledFilter = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const StyledDashboard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2;
`;

const StyledAddTask = styled.div`
  display: flex;
  justify-content: center;
  height: 25px;
  min-width: fit-content;
  background-color: inherit;
`;

const StyledSelect = styled.select`
  background-color: #f0f4f3;
  color: #312e2e;
`;

const Tasks = () => {
  const data = useTasks();
  console.log(data);
  const [filter, setFilter] = useState("All");
  const navigate = useNavigate();

  const handleFilter = (e) => {
    setFilter(e.target.value);
  };

  let filteredTasks =
    filter === "All" ? data : data?.filter((task) => task.status === filter);

  return (
    <StyledDashboard>
      <h4>Tasks</h4>
      <StyledBox>
        <StyledFilter>
          <StyledSelect onClick={handleFilter}>
            <option>All</option>
            <option>Pending</option>
            <option>In Progress</option>
            <option>Completed</option>
          </StyledSelect>
        </StyledFilter>
        <StyledBoard>
          {filteredTasks.map((task) => (
            <Task key={task.id} task={task} />
          ))}
        </StyledBoard>
        {filteredTasks.length === 0 && <p>No tasks Found...</p>}
      </StyledBox>
      <StyledAddTask>
        <button className="btn-add" onClick={() => navigate("/task")}>
          <IoAddCircleOutline />
        </button>
      </StyledAddTask>
    </StyledDashboard>
  );
};

export default Tasks;
