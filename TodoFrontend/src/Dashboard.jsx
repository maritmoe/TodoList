import { useState } from "react";
import PropTypes from "prop-types";
import CreateTodo from "./CreateTodo";
import TodoList from "./TodoList";
import { Box } from "@mui/material";

function Dashboard({ data, onCreate, onUpdate, onDelete, error }) {
  const [editingId, setEditingId] = useState(null);

  return (
    <Box
      className="Box"
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <CreateTodo
        data={data}
        onCreate={onCreate}
        editingId={editingId}
        setEditingId={setEditingId}
        onUpdate={onUpdate}
      />
      {error && <div>{error.message}</div>}
      <TodoList
        data={data}
        onUpdate={onUpdate}
        onDelete={onDelete}
        setEditingId={setEditingId}
      />
    </Box>
  );
}

export default Dashboard;

Dashboard.propTypes = {
  data: PropTypes.array,
  onCreate: PropTypes.func,
  onUpdate: PropTypes.func,
  onDelete: PropTypes.func,
  error: PropTypes.object,
};
