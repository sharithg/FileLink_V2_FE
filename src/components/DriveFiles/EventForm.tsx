import React from "react";
import Grid from "@material-ui/core/Grid";
import { TheTextField } from "../../CustomMUI";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

interface Props {}

const EventForm = (props: Props) => {
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    new Date()
  );

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <React.Fragment>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TheTextField
              required
              label="Event Name"
              variant="outlined"
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              id="date-picker-inline"
              label="Date"
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <TheTextField
              id="time"
              label="Start Time"
              type="time"
              defaultValue="07:30"
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 300, // 5 min
              }}
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <TheTextField
              id="time"
              label="End Time"
              type="time"
              defaultValue="07:30"
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 300, // 5 min
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TheTextField
              required
              label="Description"
              variant="outlined"
              fullWidth
            />
          </Grid>
        </Grid>
      </React.Fragment>
    </MuiPickersUtilsProvider>
  );
};

export default EventForm;
