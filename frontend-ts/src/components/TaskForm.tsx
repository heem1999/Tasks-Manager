import { useState } from "react";
import { useTasksContext } from "../hooks/useTasksContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { BASE_URL } from "../config/config";
import LoadingSpinner from "./LoadingSpinner";

const TaskForm = () => {
  const { dispatch } = useTasksContext();
  const { user } = useAuthContext();

  const [title, setTitle] = useState("");

  const [date, setDate] = useState("");
  const [status, setStatus] = useState("0");
  const [description, setDescription] = useState("");

  const [error, setError] = useState("");
  const [emptyFields, setEmptyFields] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }
    setIsLoading(true);
    const task = { title, description, date, status };

    const response = await fetch(BASE_URL + "/api/tasks", {
      mode: "cors",
      method: "POST",
      body: JSON.stringify(task),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.token}`,
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
      setTitle("");
      setDescription("");
      setDate("");
      setStatus("0");
      setError("");
      setEmptyFields([]);
      dispatch({ type: "CREATE_TASK", payload: json });
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Task</h3>
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
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className={emptyFields.includes("status") ? "error" : ""}
      >
        <option value="0">Not Done</option>
        <option value="1">Done</option>
      </select>

      <button disabled={isLoading}>Add Task</button>
      {isLoading ? <LoadingSpinner /> : null}
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default TaskForm;
