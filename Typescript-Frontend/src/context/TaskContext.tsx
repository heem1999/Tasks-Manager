import { ReactNode, createContext, useReducer } from "react";

interface TaskContextType {
  title: string;
  description: string;
  date: string;
  status: string;
  _id?: string;
  dispatch: Function;
}
interface TaskContextTypeall {
  tasks: TaskContextType[];
  dispatch: Function;
}

export const TasksContext = createContext<TaskContextTypeall | null>({
  tasks: [],
  dispatch: () => {},
});

export const tasksReducer = (
  state: any,
  action: { type: any; payload: any }
) => {
  switch (action.type) {
    case "SET_TASKS":
      return {
        tasks: action.payload,
      };
    case "CREATE_TASK":
      return {
        tasks: [action.payload, ...state.tasks],
      };
    case "DELETE_TASK":
      return {
        tasks: state.tasks.filter(
          (w: TaskContextType) => w._id !== action.payload._id
        ),
      };
    default:
      return state;
  }
};

interface Props {
  children?: ReactNode;
  // any props that come into the component
}
export const TasksContextProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(tasksReducer, {
    tasks: null,
  });

  return (
    <TasksContext.Provider value={{ ...state, dispatch }}>
      {children}
    </TasksContext.Provider>
  );
};
