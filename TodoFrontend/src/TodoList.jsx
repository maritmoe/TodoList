import { useState } from "react";
import PropTypes from "prop-types";
import { List, InputLabel, Select, MenuItem } from "@mui/material";

import { useTranslation } from "react-i18next";
import "./i18n/config.js";

import TodoListItem from "./TodoListItem";

function TodoList({ data, onUpdate, onDelete, setEditingId }) {
  const [showComplete, setShowComplete] = useState(true);

  const { t } = useTranslation();

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
      <h2>{t("todo-list")}</h2>
      <InputLabel id="show-complete-view-label">{t("filter")}</InputLabel>
      <Select
        labelId="show-complete-view-label"
        id="show-complete-view"
        value={showComplete}
        label="Filter Todos"
        onChange={handleChangeShowCompleteView}
      >
        <MenuItem value={true}>{t("show-all")}</MenuItem>
        <MenuItem value={false}>{t("show-non-complete")}</MenuItem>
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
