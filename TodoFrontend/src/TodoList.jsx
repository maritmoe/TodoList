import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  TextField,
  Button,
  Box,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Switch,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

function TodoList({ name, data, onCreate, onUpdate, onDelete, error }) {
  const [formData, setFormData] = useState({
    id: "",
    description: "",
    todoComplete: false,
  });
  const [editingId, setEditingId] = useState(null);
  const [showComplete, setShowComplete] = useState(true);

  useEffect(() => {
    if (editingId === null) {
      setFormData({ id: "", description: "", todoComplete: false });
    } else {
      const currentItem = data.find((item) => item.id === editingId);
      setFormData(currentItem);
    }
  }, [editingId, data]);

  const handleFormChange = (event) => {
    const { name, value, checked } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name == "todoComplete" ? checked : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (editingId !== null) {
      onUpdate(formData);
    } else {
      onCreate(formData);
    }
    setFormData({ id: "", description: "", todoComplete: false });
    setEditingId(null);
  };

  const getFilteredTodos = () => {
    if (showComplete) {
      return data;
    }
    return data.filter((item) => !item.todoComplete);
  };

  const handleToggleComplete = (event, item) => {
    const { name, checked } = event.target;
    onUpdate({ ...item, [name]: checked });
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
  };

  const handleCancelEdit = () => {
    setFormData({ id: "", description: "", todoComplete: false });
    setEditingId(null);
  };

  const handleChangeShowCompleteView = () => {
    setShowComplete((prevData) => !prevData);
  };

  return (
    <Box
      className="Box"
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h2>New {name}</h2>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 8,
        }}
      >
        <TextField
          sx={{ ml: 1 }}
          label="Description"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleFormChange}
        />
        <Button sx={{ mr: 1 }} variant="contained" type="submit">
          {editingId === null ? "Create" : "Update"}
        </Button>
        {editingId !== null && (
          <Button
            sx={{ mr: 1 }}
            variant="contained"
            color="secondary"
            onClick={handleCancelEdit}
          >
            Cancel
          </Button>
        )}
      </form>
      {error && <div>{error.message}</div>}
      <h2>{name} List</h2>
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
          <ListItem
            key={item.id}
            secondaryAction={
              <>
                <Switch
                  name="todoComplete"
                  checked={item.todoComplete}
                  onChange={(event) => handleToggleComplete(event, item)}
                  inputProps={{ "aria-label": "todo complete" }}
                />
                <IconButton
                  edge="end"
                  aria-label="edit"
                  onClick={() => handleEdit(item)}
                >
                  <Edit />
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => onDelete(item.id)}
                >
                  <Delete />
                </IconButton>
              </>
            }
          >
            <ListItemText
              primary={item.description}
              secondary={item.todoComplete ? "Is complete" : "Have to be done"}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default TodoList;

TodoList.propTypes = {
  name: PropTypes.string,
  data: PropTypes.array,
  onCreate: PropTypes.func,
  onUpdate: PropTypes.func,
  onDelete: PropTypes.func,
  error: PropTypes.object,
};
