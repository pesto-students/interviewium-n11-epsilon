import styles from "./index.module.scss";
import { Search } from "@material-ui/icons";
import { IconButton, TextField, InputAdornment } from "@material-ui/core";
import { useState } from "react";

interface Props {
  type: string;
  onPress: any;
  placeholder: string;
  className?: any;
  name: string;
  onKeyPress: any;
  onHandelChange?: any;
}
const SearchField = ({
  placeholder,
  className,
  name,
  type,
  onKeyPress,
  onHandelChange,
}: Props) => {
  const [value] = useState<string>(onHandelChange);

  return (
    <div className={styles.commonInputfields}>
      <TextField
        fullWidth
        id={name}
        name={name}
        placeholder={placeholder}
        type={type}
        className={`${styles.text_field} ${className ? className : ""}`}
        onChange={onHandelChange}
        value={value}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            onKeyPress(value);
          }
        }}
        InputProps={{
          disableUnderline: true,
          endAdornment: (
            <InputAdornment position="end" className={styles.basicInt}>
              <IconButton
                onClick={onKeyPress.bind(this, value)}
                className={styles.visibilityIcons}
                aria-label="toggle password visibility"
              >
                <Search className={styles.search_icon} />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
};

export default SearchField;
