import React, { Fragment } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { EventClickArg } from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";
import { ThemeButton } from "../../CustomMUI";
import EventIcon from "@material-ui/icons/Event";
import AddEvent from "../DriveFiles/AddEvent";

const Schedule: React.FC = () => {
  const [open, setOpen] = React.useState(false);

  const handleEventClick = (clickInfo: EventClickArg) => {
    console.log(clickInfo.event.start);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Fragment>
      <Grid
        container
        // alignItems="flex-start"
        justify="space-between"
        direction="row"
      >
        <Grid item>
          <Typography variant="h6" gutterBottom>
            Schedule
          </Typography>
        </Grid>
        <Grid item>
          <ThemeButton
            startIcon={<EventIcon />}
            onClick={() => setOpen(true)}
            style={{
              borderTopLeftRadius: "5px",
              borderBottomLeftRadius: "5px",
              borderTopRightRadius: "0px",
              borderBottomRightRadius: "0px",
            }}
          >
            Add Event
          </ThemeButton>
          <ThemeButton
            startIcon={<EventIcon />}
            onClick={() => setOpen(true)}
            style={{
              borderTopLeftRadius: "0px",
              borderBottomLeftRadius: "0px",
              borderTopRightRadius: "5px",
              borderBottomRightRadius: "5px",
            }}
          >
            Add Class
          </ThemeButton>
        </Grid>
      </Grid>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin]}
        initialView="timeGridWeek"
        headerToolbar={{
          left: "today prev,next",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        events={[]}
        eventClick={handleEventClick}
        slotMinTime="07:00:00"
      />
      <AddEvent
        open={open}
        handleClose={handleClose}
        handleClickOpen={handleClickOpen}
      />
    </Fragment>
  );
};

export default Schedule;
