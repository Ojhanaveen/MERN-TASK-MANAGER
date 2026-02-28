import { Container, Box, Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import TaskTable from "./TaskTable";
import TaskModal from "./TaskModal";
import { LoadingIndicator } from "./LoadingIndicator";

import { useTask } from "../hooks/useTask";
import { useTaskManager } from "../hooks/useTaskManager";

const TaskManager = () => {
  const { tasks, loading, refreshTasks } = useTask();

  const {
    open,
    editingTask,
    setOpen,
    handleOpenAdd,
    handleOpenEdit,
    handleDelete,
    handleMarkAsDone,
    handleSubmit,
  } = useTaskManager(refreshTasks);

  return (
    <Container sx={{ mt: 4 }}>
      {loading ? (
        <LoadingIndicator />
      ) : tasks.length ? (
        <TaskTable
          tasks={tasks}
          onDelete={handleDelete}
          onMarkAsDone={handleMarkAsDone}
          onEdit={handleOpenEdit}
        />
      ) : (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="60vh"
        >
          No tasks found!
        </Box>
      )}

      <Fab
        color="primary"
        onClick={handleOpenAdd}
        sx={{
          position: "fixed",
          bottom: 16,
          right: 16,
        }}
      >
        <AddIcon />
      </Fab>

      <TaskModal
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={handleSubmit}
        editingTask={editingTask}
      />
    </Container>
  );
};

export default TaskManager;