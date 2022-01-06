import { useState } from "react";
import { IconButton, TextField, InputAdornment } from "@material-ui/core";
import styles from "./index.module.scss";
// import VisibilityOn from '../../utilities/images/icons/visibilityon.png';
// import VisibilityOff from '../../utilities/images/icons/visibilityoff.png';
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";

import { FieldProps } from "../../types/index";

const PasswordTextField = ({
  name,
  label_text,
  placeholder,
  error,
  touched,
  value,
  handleChange,
  handleBlur,
  startAdor = false,
}: FieldProps) => {
  let [focused, setFocused] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const togglePassword = () =>
    setTimeout(() => setShowPassword((prev) => !prev), 10);

  return (
    <div className={styles.commonInputfields}>
      <div
        className={`${
          focused
            ? styles.touched_label_text
            : error && touched
            ? styles.error_label_text
            : styles.label_text
        }`}
      >
        {label_text}
      </div>
      <TextField
        fullWidth
        id={name}
        name={name}
        placeholder={placeholder}
        type={showPassword ? "text" : "password"}
        onChange={handleChange}
        onFocus={() => setFocused(true)}
        onBlur={(e) => {
          handleBlur(e);
          setFocused(false);
        }}
        value={value}
        className={`${
          focused
            ? styles.touched_text_field
            : error && touched
            ? styles.error_text_field
            : styles.text_field
        }`}
        InputProps={{
          disableUnderline: true,
          endAdornment: (
            <InputAdornment position="end" className={styles.basicInt}>
              <IconButton
                className={styles.visibilityIcons}
                aria-label="toggle password visibility"
                onClick={togglePassword}
              >
                {showPassword ? (
                  <p style={{ margin: 0 }}>
                    <VisibilityIcon className={styles.visibilityIcons} />{" "}
                  </p>
                ) : (
                  <p style={{ margin: 0 }}>
                    <VisibilityOffIcon className={styles.visibilityIcons} />
                  </p>
                )}
              </IconButton>
            </InputAdornment>
          ),
          startAdornment: startAdor,
        }}
      />
      {touched && error && !focused ? (
        <div className={styles.helperText}>
          <img
            className={styles.error_outline_icon}
            src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnN2Z2pzPSJodHRwOi8vc3ZnanMuY29tL3N2Z2pzIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgeD0iMCIgeT0iMCIgdmlld0JveD0iMCAwIDI3Ljk2MyAyNy45NjMiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMiA1MTIiIHhtbDpzcGFjZT0icHJlc2VydmUiIGNsYXNzPSIiPjxnPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgoJPGcgaWQ9ImMxMjlfZXhjbGFtYXRpb24iPgoJCTxwYXRoIGQ9Ik0xMy45ODMsMEM2LjI2MSwwLDAuMDAxLDYuMjU5LDAuMDAxLDEzLjk3OWMwLDcuNzI0LDYuMjYsMTMuOTg0LDEzLjk4MiwxMy45ODRzMTMuOTgtNi4yNjEsMTMuOTgtMTMuOTg0ICAgIEMyNy45NjMsNi4yNTksMjEuNzA1LDAsMTMuOTgzLDB6IE0xMy45ODMsMjYuNTMxYy02LjkzMywwLTEyLjU1LTUuNjItMTIuNTUtMTIuNTUzYzAtNi45Myw1LjYxNy0xMi41NDgsMTIuNTUtMTIuNTQ4ICAgIGM2LjkzMSwwLDEyLjU0OSw1LjYxOCwxMi41NDksMTIuNTQ4QzI2LjUzMSwyMC45MTEsMjAuOTEzLDI2LjUzMSwxMy45ODMsMjYuNTMxeiIgZmlsbD0iI2M0MDEwMSIgZGF0YS1vcmlnaW5hbD0iIzAwMDAwMCIgc3R5bGU9IiIgY2xhc3M9IiI+PC9wYXRoPgoJCTxwb2x5Z29uIHBvaW50cz0iMTUuNTc5LDE3LjE1OCAxNi4xOTEsNC41NzkgMTEuODA0LDQuNTc5IDEyLjQxNCwxNy4xNTggICAiIGZpbGw9IiNjNDAxMDEiIGRhdGEtb3JpZ2luYWw9IiMwMDAwMDAiIHN0eWxlPSIiIGNsYXNzPSIiPjwvcG9seWdvbj4KCQk8cGF0aCBkPSJNMTMuOTk4LDE4LjU0NmMtMS40NzEsMC0yLjUsMS4wMjktMi41LDIuNTI2YzAsMS40NDMsMC45OTksMi41MjgsMi40NDQsMi41MjhoMC4wNTZjMS40OTksMCwyLjQ2OS0xLjA4NSwyLjQ2OS0yLjUyOCAgICBDMTYuNDQxLDE5LjU3NSwxNS40NjgsMTguNTQ2LDEzLjk5OCwxOC41NDZ6IiBmaWxsPSIjYzQwMTAxIiBkYXRhLW9yaWdpbmFsPSIjMDAwMDAwIiBzdHlsZT0iIiBjbGFzcz0iIj48L3BhdGg+Cgk8L2c+Cgk8ZyBpZD0iQ2FwYV8xXzIwN18iPgoJPC9nPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjwvZz48L3N2Zz4="
            alt="Error Icon"
          />
          &nbsp;{error}
        </div>
      ) : null}
    </div>
  );
};

export default PasswordTextField;
