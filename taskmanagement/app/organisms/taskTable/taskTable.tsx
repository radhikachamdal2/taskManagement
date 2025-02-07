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
import React, { useState } from "react";

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
  const [checked, setChecked] = useState(false);

  const handleCheckbox = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    const checkedVal = event.target.checked;

    if (checkedVal) {
      setChecked((prevState) => ({
        ...prevState,
        [id]: true,
      }));
    }
  };

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
                  id={item.id}
                  checked={checked[item.id]}
                  onChange={(event) => {
                    handleCheckbox(event, item.id);
                    onCheckboxChange(item);
                  }}
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
