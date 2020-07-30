import React, { Fragment, useState, useEffect, ChangeEvent } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { red } from "@material-ui/core/colors";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  ListSubheader,
  Grid,
  IconButton,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import SaveIcon from "@material-ui/icons/Save";
import DeleteIcon from "@material-ui/icons/Delete";
import { setCurrentAddFile } from "../../actions/reactActions";
import { deleteFile, addFile } from "../../actions/filesAction";
import { TheTextField, CancelButton, SaveButton } from "../../CustomMUI";
import { IRootState } from "../../actions/types";
import { IFiles, IClasses } from "../../actions/types";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    // maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  button: {
    margin: theme.spacing(1),
  },
}));

interface IListItemLink {
  href: string;
  target: string;
}

const ListItemLink: React.FC<IListItemLink> = (props) => {
  const { href, target } = props;
  return (
    <ListItem button component="a" href={href} target={target}>
      {props.children}
    </ListItem>
  );
};
interface IAddFilesProps {
  files: Array<IFiles>;
  list_header: string;
  current_class: string;
  file_icon_url: string;
  file_type: string;
  current_add_file: string | null;
  classes: Array<IClasses>;
  setCurrentAddFile: (file_type: string) => void;
  addFile: (file: object) => void;
  deleteFile: (id: number) => void;
}

function isEmptyOrSpaces(str: string) {
  return str === null || str.match(/^ *$/) !== null;
}

const AddFile: React.FC<IAddFilesProps> = (props) => {
  const {
    files,
    list_header,
    current_class,
    file_icon_url,
    file_type,
    current_add_file,
    classes,
  } = props;

  const classesStyle = useStyles();
  const [file_name, setFileName] = useState("");
  const [mimeType, setMimeType] = useState("");
  const [open, setOpen] = useState(false);
  const [delete_file, setDeleteFile] = useState("");
  const [delete_file_id, setDeleteFileId] = useState(-1);
  const [is_disabled_add, setDisabledAdd] = useState(true);

  useEffect(() => {
    if (file_type === "docs") {
      setMimeType("application/vnd.google-apps.document");
    }
    if (file_type === "sheets") {
      setMimeType("application/vnd.google-apps.spreadsheet");
    }
    if (file_type === "slides") {
      setMimeType("application/vnd.google-apps.presentation");
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddFile = () => {
    console.log(current_add_file);
    console.log(file_type);
    props.setCurrentAddFile(file_type);
  };

  const handleSave = () => {
    console.log(file_name);
    // event.preventDefault();
    if (!/^\d+$/.test(file_name)) {
      let add_class_id = classes.filter(
        (col_class) => col_class.name === current_class
      );
      const file = {
        file_type,
        file_name,
        college_class: add_class_id[0].id,
      };
      console.log(file_name);
      props.addFile(file);
    }
    setFileName("");
    props.setCurrentAddFile("");
  };

  const handleDeleteFile = (name: string, id: number) => {
    setDeleteFile(name);
    setDeleteFileId(id);
    setOpen(true);
  };

  const handleDeleteFileConfirm = () => {
    deleteFile(delete_file_id);
    setOpen(false);
  };

  const handleChange = (event: ChangeEvent) => {
    const target = event.target as HTMLTextAreaElement;
    if (isEmptyOrSpaces(target.value)) setDisabledAdd(true);
    else setDisabledAdd(false);
    setFileName(target.value);
  };

  return (
    <Fragment>
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <Grid
            container
            // alignItems="flex-start"
            justify="space-between"
            direction="row"
          >
            <ListSubheader component="div" id="nested-list-subheader">
              {list_header}
            </ListSubheader>
            <IconButton aria-label="add" onClick={handleAddFile}>
              <AddIcon />
            </IconButton>
          </Grid>
        }
        className={classesStyle.root}
      >
        <Divider />
        {files
          .filter(
            (file) =>
              classes.filter((cls) => cls.id === file.college_class)[0].name ===
              current_class
          )
          .filter((file) => file.file_type === mimeType)
          .map((file) => (
            <Fragment>
              <ListItem>
                <ListItemLink href={file.file_view_link} target="_blank">
                  <ListItemIcon>
                    <img src={file.file_icon_link} alt="" />
                  </ListItemIcon>
                  <ListItemText primary={file.file_name} />
                </ListItemLink>
                <IconButton
                  aria-label="delete"
                  onClick={() => handleDeleteFile(file.file_name, file.id)}
                >
                  <DeleteIcon style={{ color: red[500] }} />
                </IconButton>
              </ListItem>
            </Fragment>
          ))}
      </List>
      {current_add_file === file_type ? (
        <ListItem>
          <ListItemIcon>
            <img src={file_icon_url} alt="" />
          </ListItemIcon>
          <TheTextField
            value={file_name}
            onChange={handleChange}
            inputProps={{ autoFocus: true }}
            label="Enter file name"
          />
          <SaveButton
            onClick={handleSave}
            variant="contained"
            color="primary"
            size="small"
            name="input_doc"
            disabled={is_disabled_add}
            className={classesStyle.button}
            startIcon={<SaveIcon />}
          >
            Add
          </SaveButton>
          <CancelButton
            variant="contained"
            size="small"
            className={classesStyle.button}
            startIcon={<DeleteIcon />}
            onClick={() => {
              props.setCurrentAddFile("");
              setFileName("");
            }}
          >
            Cancel
          </CancelButton>
        </ListItem>
      ) : (
        <Fragment />
      )}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete
            <b>{delete_file}</b>? all changes will be lost.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <CancelButton onClick={handleDeleteFileConfirm}>Delete</CancelButton>
          <SaveButton onClick={handleClose} autoFocus>
            Cancel
          </SaveButton>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

const mapStateToProps = (state: IRootState) => ({
  current_add_file: state.react.current_add_file,
  classes: state.classes.classes,
});

export default connect(mapStateToProps, {
  addFile,
  deleteFile,
  setCurrentAddFile,
})(AddFile);
