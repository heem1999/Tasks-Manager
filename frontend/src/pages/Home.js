import { useEffect, useState } from "react";
import { useTasksContext } from "../hooks/useTasksContext";
import { useAuthContext } from "../hooks/useAuthContext";

// components
import TaskDetails from "../components/TaskDetails";
import TaskForm from "../components/TaskForm";
import EditTaskForm from "../components/EditTaskForm";
import { BASE_URL } from "../config/config";
import LoadingSpinner from "../components/LoadingSpinner";

const Home = () => {
  const { tasks, dispatch } = useTasksContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch(BASE_URL + "/api/tasks", {
        mode: "cors",
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_TASKS", payload: json });
      }
    };

    if (user) {
      fetchTasks();
    }
  }, [dispatch, user]);

  const [editTask, setEditTask] = useState([]);
  const handleEditClick = (task) => {
    setEditTask(task);
  };

  return (
    <div className="home">
      <div className="tasks">
        {tasks &&
          tasks.map((task) => (
            <TaskDetails
              key={task._id}
              task={task}
              handleEditClick={handleEditClick}
            />
          ))}
      </div>
      {editTask.length === 0 ? (
        <TaskForm />
      ) : (
        <EditTaskForm task={editTask} handleEditClick={handleEditClick} />
      )}

      <LoadingSpinner />
    </div>
  );
};

export default Home;
