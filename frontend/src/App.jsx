import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Tasks from "./components/Tasks";
import TasksProvider from "./contexts/TasksProvider";
import EditTaskForm from "./components/EditTaskForm";
import AddTaskForm from "./components/AddTaskForm";

function App() {
  return (
    <BrowserRouter>
      <TasksProvider>
        <Routes>
          <Route path="/" element={<Tasks />} />
          <Route
            path="/task/:id"
            element={
              <div className="styleForm">
                <EditTaskForm />
              </div>
            }
          />
          <Route
            path="/task"
            element={
              <div className="styleForm">
                <AddTaskForm />
              </div>
            }
          />
        </Routes>
      </TasksProvider>
    </BrowserRouter>
  );
}

export default App;