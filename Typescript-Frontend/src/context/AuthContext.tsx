import { createContext, useReducer, useEffect, ReactNode } from "react";

interface CurrentUserContextType {
  user: any;
  dispatch: Function;
}
export const AuthContext = createContext<CurrentUserContextType | null>({
  user: {},
  dispatch: () => {},
});

export const authReducer = (
  state: any,
  action: { type: any; payload: any }
) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
};
interface Props {
  children?: ReactNode;
  // any props that come into the component
}
export const AuthContextProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: [],
  });

  useEffect(() => {
    const laclV = localStorage.getItem("user") || "{}";
    console.log(laclV);
    const user = JSON.parse(laclV) || "";

    if (user) {
      dispatch({ type: "LOGIN", payload: user });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
