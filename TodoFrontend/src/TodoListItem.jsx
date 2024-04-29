import PropTypes from "prop-types";
import { ListItem, ListItemText, IconButton, Switch } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

function TodoListItem({ item, onUpdate, onDelete, setEditingId }) {
  const handleToggleComplete = (event, item) => {
    const { name, checked } = event.target;
    onUpdate({ ...item, [name]: checked });
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
  };
  return (
    <>
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
              sx={{ width: "48px", height: "48px" }}
              edge="end"
              aria-label="edit"
              onClick={() => handleEdit(item)}
            >
              <Edit />
            </IconButton>
            <IconButton
              sx={{ width: "48px", height: "48px" }}
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
    </>
  );
}

export default TodoListItem;

TodoListItem.propTypes = {
  item: PropTypes.object,
  onUpdate: PropTypes.func,
  onDelete: PropTypes.func,
  setEditingId: PropTypes.func,
};
