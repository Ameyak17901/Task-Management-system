/* eslint-disable react/prop-types */
import { styled } from "styled-components";
import { MdModeEditOutline, MdDeleteOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { deleteTask } from "../../services/fetchData";

const colorTypes = {
  Pending: "red",
  "In Progress": "blue",
  Completed: "green",
};

const StyledActions = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-right: 2px;
`;

const StyledStatus = styled.span`
  padding: 5px;
  border: 1px solid black;
  border-radius: 26px;
  color: white;
`;

const StyledButton = styled.button`
  width: fit-content;
  height: fit-content;
  border-radius: 5rem;
  background-color: inherit;
  color: black;
`;

const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  border-radius: 5px;
  width: 250px;
  background-color: #ffffffaf;
  box-shadow: 1px 1px;
`;

const Task = ({ task }) => {
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    const res = await deleteTask(id);
    console.log(res);
    toast.success("Deleted successfully...");
  };

  return (
    <StyledCard>
      <p>{task.task}</p>
      <p>
        <StyledStatus style={{ backgroundColor: colorTypes[task.status] }}>
          {task.status}
        </StyledStatus>
      </p>
      <StyledActions>
        <StyledButton
          onClick={() => navigate(`/task/${task.id}`, { state: task })}
        >
          <MdModeEditOutline />
        </StyledButton>
        <StyledButton onClick={() => handleDelete(task.id)}>
          <MdDeleteOutline />
        </StyledButton>
      </StyledActions>
    </StyledCard>
  );
};

export default Task;
