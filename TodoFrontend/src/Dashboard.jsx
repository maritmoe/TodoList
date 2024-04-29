import { useState, useContext } from "react";
import PropTypes from "prop-types";

import { ColorModeContext } from "./App";
import CreateTodo from "./CreateTodo";
import TodoList from "./TodoList";

import { useTheme } from "@mui/material/styles";
import { Box, IconButton } from "@mui/material";
import { LightMode, DarkMode } from "@mui/icons-material";

function Dashboard({ data, onCreate, onUpdate, onDelete, error }) {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  const [editingId, setEditingId] = useState(null);

  return (
    <Box
      className="Box"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <IconButton
        sx={{ width: "48px", height: "48px", ml: "80%" }}
        onClick={colorMode.toggleColorMode}
        color="inherit"
      >
        {theme.palette.mode === "dark" ? <LightMode /> : <DarkMode />}
      </IconButton>
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
