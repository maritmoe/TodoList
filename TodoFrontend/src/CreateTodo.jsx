import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { TextField, Button } from "@mui/material";
function CreateTodo({ data, onCreate, editingId, setEditingId, onUpdate }) {
  const [formData, setFormData] = useState({
    id: "",
    description: "",
    todoComplete: false,
  });

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

  const handleCancelEdit = () => {
    setFormData({ id: "", description: "", todoComplete: false });
    setEditingId(null);
  };
  return (
    <>
      <h2>New Todo</h2>
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
    </>
  );
}

export default CreateTodo;

CreateTodo.propTypes = {
  data: PropTypes.array,
  onCreate: PropTypes.func,
  onUpdate: PropTypes.func,
  editingId: PropTypes.number,
  setEditingId: PropTypes.func,
};
