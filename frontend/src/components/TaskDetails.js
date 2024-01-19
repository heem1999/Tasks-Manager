import { useTasksContext } from "../hooks/useTasksContext";
import { useAuthContext } from "../hooks/useAuthContext";

// date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { BASE_URL } from "../config/config";

const TaskDetails = ({ task, handleEditClick }) => {
  const { dispatch } = useTasksContext();
  const { user } = useAuthContext();

  const handleClick = async () => {
    if (!user) {
      return;
    }

    const response = await fetch(BASE_URL + "/api/tasks/" + task._id, {
      mode: "cors",
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_TASK", payload: json });
    }
  };
  const handleEdit = () => {
    handleEditClick(task);
  };
  return (
    <div
      className="task-details"
      style={
        task.status === "0" ? { background: "#fff" } : { background: "#9dfeba" }
      }
    >
      <h4>{task.title}</h4>
      <p>
        <strong>description: </strong>
        {task.description}
      </p>
      <p>
        <strong>date: </strong>
        {task.date}
      </p>
      <p>
        <strong>status: </strong>
        {task.status === "0" ? "Not Done" : "Done"}
      </p>
      <p>
        <strong>Created at: </strong>
        {formatDistanceToNow(new Date(task.createdAt), { addSuffix: true })}
      </p>

      <span className="material-symbols-outlined">
        <button className="edit" onClick={handleEdit}>
          Edit
        </button>
        &nbsp;
        <button className="delete" onClick={handleClick}>
          Delete
        </button>
      </span>
    </div>
  );
};

export default TaskDetails;
