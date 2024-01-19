import { useEffect, useState } from "react";
import { useTasksContext } from "../hooks/useTasksContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { BASE_URL } from "../config/config";
import LoadingSpinner from "./LoadingSpinner";

const EditTaskForm = ({ task, handleEditClick }) => {
  const { dispatch } = useTasksContext();
  const { user } = useAuthContext();

  const [title, setTitle] = useState("");

  const [date, setDate] = useState("");
  const [status, setStatus] = useState("0");
  const [description, setDescription] = useState("");

  const [error, setError] = useState(null);
  const [updated, setUpdated] = useState(false);
  const [emptyFields, setEmptyFields] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setTitle(task.title);
    setDescription(task.description);
    setDate(task.date);
    setStatus(task.status);
    setUpdated(false);
  }, [task]);

  const handleCancel = async (e) => {
    e.preventDefault();
    handleEditClick([]);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }
    setIsLoading(true);

    const update_task = { title, description, date, status };
    const response = await fetch(BASE_URL + "/api/tasks/" + task._id, {
      mode: "cors",
      method: "PATCH",
      body: JSON.stringify(update_task),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false); // Hide loading screen
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }
    if (response.ok) {
      setIsLoading(false); // Hide loading screen
      dispatch({ type: "DELETE_TASK", payload: task });
      dispatch({ type: "CREATE_TASK", payload: json });
      setTitle("");
      setDescription("");
      setDate("");
      setStatus("0");
      setError(null);
      setUpdated(true);
      setEmptyFields([]);
      setTimeout(() => {
        handleEditClick([]);
      }, 3000);
    }
  };

  return (
    <form className="edit-form" onSubmit={handleSubmit}>
      <h3>Edit Task</h3>
      <label>Title:</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes("title") ? "error" : ""}
      />
      <label>Description:</label>
      <input
        type="text"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        className={emptyFields.includes("description") ? "error" : ""}
      />
      <label>Date:</label>
      <input
        type="date"
        onChange={(e) => setDate(e.target.value)}
        value={date}
        className={emptyFields.includes("date") ? "error" : ""}
      />
      <label>status:</label>
      <select
        data-date-format="mm/dd/yyyy"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className={emptyFields.includes("status") ? "error" : ""}
      >
        <option value="0">Inactive</option>
        <option value="1">Active</option>
      </select>
      <button disabled={isLoading}>Edit Task</button>
      &nbsp;
      <button onClick={handleCancel}>Cancel</button>
      {isLoading ? <LoadingSpinner /> : null}
      {error && <div className="error">{error}</div>}
      {updated && <div className="updated">Updated successfully!</div>}
    </form>
  );
};

export default EditTaskForm;
