import {
  Paper,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Table,
  Checkbox,
  TableBody,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useCallback, useState } from "react";

interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
}

interface TaskTableProps {
  tasks: Task[];
  taskHeaders: string[];
  onCheckboxChange: (task: Task) => void;
}

const TaskTable: React.FC<TaskTableProps> = ({
  tasks,
  taskHeaders,
  onCheckboxChange,
}) => {
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);

  const checkboxHandler = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>, task: Task) => {
      const isChecked = event.target.checked;

      if (isChecked) {
        setSelectedTaskId(task.id);
        onCheckboxChange(task);
        console.log(task.id, "task", task);
      } else {
        setSelectedTaskId(null);
      }
    },

    [selectedTaskId]
  );

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {taskHeaders?.map((header, index) => (
              <StyledTableCell key={index}>{header}</StyledTableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {tasks?.map((item: any, index) => (
            <TableRow key={item.id}>
              <TableCell>
                <Checkbox
                  checked={selectedTaskId === item.id}
                  onChange={(event) => checkboxHandler(event, item)}
                />
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
