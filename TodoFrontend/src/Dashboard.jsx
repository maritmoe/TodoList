import { useState, useContext } from "react";
import PropTypes from "prop-types";

import { ColorModeContext } from "./App";
import CreateTodo from "./CreateTodo";
import TodoList from "./TodoList";

import { useTheme } from "@mui/material/styles";
import {
  Box,
  IconButton,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Container,
} from "@mui/material";
import { LightMode, DarkMode } from "@mui/icons-material";

import { useTranslation } from "react-i18next";
import "./i18n/config.js";

function Dashboard({ data, onCreate, onUpdate, onDelete, error }) {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  const [editingId, setEditingId] = useState(null);

  const { t, i18n } = useTranslation();

  const changeLanguage = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <Box
      className="Box"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Container>
        <FormControl>
          <FormLabel id="language-radio-buttons-group-label">
            {t("language")}
          </FormLabel>
          <RadioGroup
            aria-labelledby="language-radio-buttons-group"
            name="language-radio-buttons-group"
            value={i18n.language}
            onChange={changeLanguage}
          >
            <FormControlLabel
              value="en"
              control={<Radio />}
              label={t("english")}
            />
            <FormControlLabel
              value="no"
              control={<Radio />}
              label={t("norwegian")}
            />
          </RadioGroup>
        </FormControl>
        <IconButton
          sx={{ width: "48px", height: "48px" }}
          onClick={colorMode.toggleColorMode}
          aria-label={
            theme.palette.mode === "dark" ? t("light-mode") : t("dark-mode")
          }
          color="inherit"
        >
          {theme.palette.mode === "dark" ? <LightMode /> : <DarkMode />}
        </IconButton>
      </Container>
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
