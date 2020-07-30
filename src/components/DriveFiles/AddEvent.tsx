import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { SaveButton, CancelButton } from "../../CustomMUI";
import EventForm from "./EventForm";

interface IAddEventProps {
  open: boolean;
  handleClose: () => void;
  handleClickOpen: () => void;
}

const AddEvent: React.FC<IAddEventProps> = (props) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };
  return (
    <div>
      <Button
        variant="outlined"
        color="primary"
        onClick={props.handleClickOpen}
      >
        Open form dialog
      </Button>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add Event</DialogTitle>
        <DialogContent>
          <EventForm />
        </DialogContent>
        <DialogActions>
          <SaveButton onClick={props.handleClose}>Save Event</SaveButton>
          <CancelButton onClick={props.handleClose}>Cancel</CancelButton>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddEvent;
