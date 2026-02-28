import { useEffect, useState } from "react";
import { getTasks } from "../services";

export const useTask = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const refreshTasks = async () => {
    try {
      setLoading(true);
      const response = await getTasks();
      setTasks(response.data.data.results);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshTasks();
  }, []);

  return {
    tasks,
    loading,
    refreshTasks,
  };
};