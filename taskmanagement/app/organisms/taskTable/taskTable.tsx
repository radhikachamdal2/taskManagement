import {
  Paper,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Table,
  Checkbox,
  TableBody,
} from "@mui/material";
import React from "react";

interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
}

interface TaskTableProps {
  tasks: Task[];
  taskHeaders: string[];
}

const TaskTable: React.FC<TaskTableProps> = ({ tasks, taskHeaders }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {taskHeaders?.map((header, index) => (
              <TableCell key={index}>{header}</TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {tasks?.map((item, index) => (
            <TableRow key={item.id}>
              <TableCell>
                <Checkbox checked={false} />
              </TableCell>
              <TableCell>{item.title}</TableCell>
              <TableCell>{item.description}</TableCell>
              <TableCell>{item.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TaskTable;
