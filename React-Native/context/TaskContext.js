import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { BASE_URL } from "../config/config";
import { AuthContext } from "./AuthContext";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const [token, setToken] = useState(null);

  const config_Token = {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  };

  const getTasks = () => {
    setIsLoading(true);
    axios
      .get(`${BASE_URL}/api/tasks`, config_Token)
      .then((res) => {
        setTasks(res.data);
        setIsLoading(false);
        setErrorMessage("");
      })
      .catch((e) => {
        console.log(`login error ${e} `);
        setErrorMessage(e.response.data);
        setIsLoading(false);
      });
  };

  const addTask = (title, description, status, date) => {
    console.log(title, description, status, date);
    console.log(token);
    setIsLoading(true);
    axios
      .post(
        `${BASE_URL}/api/tasks`,
        { title, description, status, date },
        config_Token
      )
      .then((res) => {
        setTasks([...tasks, res.data]);
        console.log(tasks);
        setIsLoading(false);
        setErrorMessage("");
      })
      .catch((e) => {
        console.log(`login error ${e} `);
        setErrorMessage(e.response.data);
        setIsLoading(false);
      });
  };

  const removeTask = (task_id) => {
    setIsLoading(true);
    axios
      .delete(`${BASE_URL}/api/tasks/${task_id}`, config_Token)
      .then((res) => {
        const updatedTsk = tasks.filter(function (item) {
          return item._id !== res.data._id;
        });
        setTasks(updatedTsk);
        console.log(updatedTsk);
        setIsLoading(false);
        setErrorMessage("");
      })
      .catch((e) => {
        console.log(`login error ${e} `);
        setErrorMessage(e.response.data);
        setIsLoading(false);
      });
  };

  const editTask = (title, description, status, date, task_id) => {
    setIsLoading(true);
    axios
      .patch(
        `${BASE_URL}/api/tasks/${task_id}`,
        { title, description, status, date },
        config_Token
      )
      .then((res) => {
        const updatedTsk = tasks.filter(function (item) {
          return item._id !== res.data._id;
        });
        setTasks([...updatedTsk, res.data]);
        console.log(tasks);
        setIsLoading(false);
        setErrorMessage("");
      })
      .catch((e) => {
        console.log(`login error ${e} `);
        setErrorMessage(e.response.data);
        setIsLoading(false);
      });
  };
  useEffect(() => {
    // AsyncStorage.get("userInfo").then((userInfo)=>{
    //   console.log(userInfo);
    // })
    getToken();
    //
  }, []);

  const getToken = async () => {
    let userInfo = await AsyncStorage.getItem("userInfo");
    userInfo = JSON.parse(userInfo);
    console.log(userInfo.token);
    setToken(userInfo.token);
    getTasks();
  };
  return (
    <TaskContext.Provider
      value={{
        errorMessage,
        isLoading,
        tasks,
        getTasks,
        addTask,
        removeTask,
        editTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
