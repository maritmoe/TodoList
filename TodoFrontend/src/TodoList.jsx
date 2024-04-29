import { useState } from "react";
import PropTypes from "prop-types";
import { List, InputLabel, Select, MenuItem } from "@mui/material";

import TodoListItem from "./TodoListItem";

function TodoList({ data, onUpdate, onDelete, setEditingId }) {
  const [showComplete, setShowComplete] = useState(true);

  const getFilteredTodos = () => {
    if (showComplete) {
      return data;
    }
    return data.filter((item) => !item.todoComplete);
  };

  const handleChangeShowCompleteView = () => {
    setShowComplete((prevData) => !prevData);
  };

  return (
    <>
      <h2>Todo List</h2>
      <InputLabel id="show-complete-view-label">Filter</InputLabel>
      <Select
        labelId="show-complete-view-label"
        id="show-complete-view"
        value={showComplete}
        label="Filter Todos"
        onChange={handleChangeShowCompleteView}
      >
        <MenuItem value={true}>Show all</MenuItem>
        <MenuItem value={false}>Show non complete</MenuItem>
      </Select>
      <List sx={{ width: "100%", maxWidth: 360 }}>
        {getFilteredTodos().map((item) => (
          <TodoListItem
            item={item}
            onUpdate={onUpdate}
            onDelete={onDelete}
            setEditingId={setEditingId}
            key={item.id}
          />
        ))}
      </List>
    </>
  );
}

export default TodoList;

TodoList.propTypes = {
  data: PropTypes.array,
  onUpdate: PropTypes.func,
  onDelete: PropTypes.func,
  setEditingId: PropTypes.func,
};
