import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  Paper,
} from "@mui/material";

import {
  Edit,
  Download,
  Delete,
  CheckCircle,
} from "@mui/icons-material";

const TaskTable = ({
  tasks,
  onMarkAsDone,
  onDownloadFile,
  onEdit,
  onDelete,
}) => {
  return (
    <TableContainer component={Paper} sx={{ mt: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><b>Title</b></TableCell>
            <TableCell><b>Status</b></TableCell>
            <TableCell><b>File</b></TableCell>
            <TableCell><b>Actions</b></TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task._id}>
              <TableCell>{task.title}</TableCell>

              <TableCell>
                <Chip
                  label={task.status}
                  color={
                    task.status === "completed"
                      ? "success"
                      : "warning"
                  }
                />
              </TableCell>

              <TableCell>
                {task.attachments?.length > 0 && (
                  <IconButton
                    onClick={() =>
                      window.open(
                        `http://localhost:8082/${task.attachments[0].filepath}`
                      )
                    }
                  >
                    <Download color="primary" />
                  </IconButton>
                )}
              </TableCell>

              <TableCell>
                {task.status !== "completed" && (
                  <IconButton
                    onClick={() => onMarkAsDone(task)}
                  >
                    <CheckCircle color="success" />
                  </IconButton>
                )}

                <IconButton onClick={() => onEdit(task)}>
                  <Edit color="secondary" />
                </IconButton>

                <IconButton
                  onClick={() => onDelete(task._id)}
                >
                  <Delete color="error" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TaskTable;