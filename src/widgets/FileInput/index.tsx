import { useState, useRef, ForwardRefRenderFunction, forwardRef, useImperativeHandle } from 'react';
import { InputLabel, TextField, InputAdornment } from '@material-ui/core';
import styles from './index.module.scss';
import { Handles } from '../../types/index';
import { FileUpload } from 'utilities/images/icons';
interface Props {
    custRef:any,
    name: string,
    label_text?: string,
    placeholder?: string,
    fileSelectedHandler: Function,
    fileTypes?: Array<String>;
}

const FileInput: ForwardRefRenderFunction<Handles, Props> = ({ label_text, placeholder, fileSelectedHandler, fileTypes = [''] }: Props, ref) => {
    useImperativeHandle(ref, () => ({
        checkFile: () => {
            if (photoUrl) {
                return true;
            }
            setErrorText('Select a file');
            showError();
            return false;
        },
        removeFile: () => {
            setPhotoUrl('');
            if (custRef.current) {
                custRef.current.value = '';
            }
        }
    }));
    const custRef = useRef<HTMLInputElement>(null);
    const [errorText, setErrorText] = useState<string>('');
    const [error, setError] = useState<Boolean>(false);
    const [photoUrl, setPhotoUrl] = useState<string>('');

    const showError = () => {
        fileSelectedHandler(null);
        setPhotoUrl('');
        setError(true);
    };
    let size = 2000000;
    const onChange = e => {

        if (e.target.files[0].size > size) {
            setErrorText('*File is too large, please pick a smaller file');
            showError();
        }
        else if (e.target.files[0] === undefined) {
            setErrorText('*Select a file');
            showError();
        }
        else if (fileTypes.includes(e.target.files[0].name.split('.').pop())) {
            fileSelectedHandler(e.target.files[0]);
            setPhotoUrl(JSON.stringify(e.target.files[0].name));
            setError(false);
            setErrorText('');

        }
        else {
            setErrorText(`File type should be: ${fileTypes?.join(', ')}`);
            showError();
        }


    };

    const onClick = () => {
        custRef?.current?.click();
    };
    return (<div className={`${styles.commonInputfields} ${styles.fileIntcommon}`}>
        <input type='file' hidden style={{ display: 'none' }} ref={custRef} onChange={(e) => {
            onChange(e);
        }} />
        <InputLabel className={styles.label_text} htmlFor='file'>{label_text}</InputLabel>
        <TextField
            name='file_name'
            margin="normal"
            fullWidth
            InputProps={{
                placeholder: (photoUrl ? photoUrl : placeholder),
                error: true,
                disabled: true,
                disableUnderline: true,
                className: (error) ? styles.error_text_field : styles.text_field,
                onClick: onClick,
                startAdornment: (
                    <InputAdornment position="start">

                        <div className={`${styles.chooseFile}`}>
                            <div className={`${styles.innerChooseFile}`}><FileUpload className={styles.innerChooseFileColor} /><span className="ml-2">Choose a file </span>
                            </div>
                        </div>
                    </InputAdornment>
                )
            }} />
        {error ? (
            <div className={styles.helperText}>
                <img className={styles.error_outline_icon} src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnN2Z2pzPSJodHRwOi8vc3ZnanMuY29tL3N2Z2pzIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgeD0iMCIgeT0iMCIgdmlld0JveD0iMCAwIDI3Ljk2MyAyNy45NjMiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMiA1MTIiIHhtbDpzcGFjZT0icHJlc2VydmUiIGNsYXNzPSIiPjxnPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgoJPGcgaWQ9ImMxMjlfZXhjbGFtYXRpb24iPgoJCTxwYXRoIGQ9Ik0xMy45ODMsMEM2LjI2MSwwLDAuMDAxLDYuMjU5LDAuMDAxLDEzLjk3OWMwLDcuNzI0LDYuMjYsMTMuOTg0LDEzLjk4MiwxMy45ODRzMTMuOTgtNi4yNjEsMTMuOTgtMTMuOTg0ICAgIEMyNy45NjMsNi4yNTksMjEuNzA1LDAsMTMuOTgzLDB6IE0xMy45ODMsMjYuNTMxYy02LjkzMywwLTEyLjU1LTUuNjItMTIuNTUtMTIuNTUzYzAtNi45Myw1LjYxNy0xMi41NDgsMTIuNTUtMTIuNTQ4ICAgIGM2LjkzMSwwLDEyLjU0OSw1LjYxOCwxMi41NDksMTIuNTQ4QzI2LjUzMSwyMC45MTEsMjAuOTEzLDI2LjUzMSwxMy45ODMsMjYuNTMxeiIgZmlsbD0iI2M0MDEwMSIgZGF0YS1vcmlnaW5hbD0iIzAwMDAwMCIgc3R5bGU9IiIgY2xhc3M9IiI+PC9wYXRoPgoJCTxwb2x5Z29uIHBvaW50cz0iMTUuNTc5LDE3LjE1OCAxNi4xOTEsNC41NzkgMTEuODA0LDQuNTc5IDEyLjQxNCwxNy4xNTggICAiIGZpbGw9IiNjNDAxMDEiIGRhdGEtb3JpZ2luYWw9IiMwMDAwMDAiIHN0eWxlPSIiIGNsYXNzPSIiPjwvcG9seWdvbj4KCQk8cGF0aCBkPSJNMTMuOTk4LDE4LjU0NmMtMS40NzEsMC0yLjUsMS4wMjktMi41LDIuNTI2YzAsMS40NDMsMC45OTksMi41MjgsMi40NDQsMi41MjhoMC4wNTZjMS40OTksMCwyLjQ2OS0xLjA4NSwyLjQ2OS0yLjUyOCAgICBDMTYuNDQxLDE5LjU3NSwxNS40NjgsMTguNTQ2LDEzLjk5OCwxOC41NDZ6IiBmaWxsPSIjYzQwMTAxIiBkYXRhLW9yaWdpbmFsPSIjMDAwMDAwIiBzdHlsZT0iIiBjbGFzcz0iIj48L3BhdGg+Cgk8L2c+Cgk8ZyBpZD0iQ2FwYV8xXzIwN18iPgoJPC9nPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjwvZz48L3N2Zz4=" alt="Error Icon" />
            &nbsp;{errorText}</div>
        ) : null}
    </div>);

};

export default forwardRef(FileInput);
