import React, { useState, useEffect, Fragment, ChangeEvent } from "react";
import { Link } from "react-router-dom";
import Divider from "@material-ui/core/Divider";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ScheduleIcon from "@material-ui/icons/Schedule";
import LinkIcon from "@material-ui/icons/Link";
import ClassIcon from "@material-ui/icons/Class";
import AddIcon from "@material-ui/icons/Add";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { connect } from "react-redux";
import { addClass } from "../../actions/classAction";
import { setCurrClass } from "../../actions/classAction";
import { makeStyles } from "@material-ui/core/styles";
import SaveIcon from "@material-ui/icons/Save";
import DeleteIcon from "@material-ui/icons/Delete";
import { CancelButton, SaveButton, TheTextField } from "../../CustomMUI";
import { IClasses, IRootState } from "../../actions/types";
import { StringSanitizer } from "../../common";

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

interface ISidebarProps {
  current_class: string | null;
  classes: Array<IClasses>;
  classes_loaded: boolean;
  addClass: (class_name: { name: string }) => void;
  setCurrClass: (dash_id: string) => void;
}

function isEmptyOrSpaces(str: string) {
  return str === null || str.match(/^ *$/) !== null;
}

const Sidebar: React.FC<ISidebarProps> = (props) => {
  const classes = useStyles();

  const dashboard = [
    {
      text: "Schedule",
      link: "/dashboard/schedule",
      sel: "schedule",
    },
    {
      text: "Quick Links",
      link: "/dashboard/quicklinks",
      sel: "quicklinks",
    },
  ];
  const [add_class, setAddClass] = useState(false);
  const [class_name, setClassName] = useState("");
  const [is_disbled_add, setDisabledAdd] = useState(true);
  const [is_error_text, setErrorText] = useState(false);
  const [helper_text, setHelperText] = useState("");
  const [selected, setSelectItem] = useState("sc");

  const handleAddClass = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => {
    event.preventDefault();
    setAddClass(true);
  };

  const handleSave = () => {
    props.addClass({ name: class_name });
    setClassName("");
    setAddClass(false);
  };

  const handleChange = (event: ChangeEvent) => {
    const target = event.target as HTMLTextAreaElement;
    let input = new StringSanitizer(target.value);

    if (input.isEmptyOrSpaces()) {
      setClassName(target.value);
      setDisabledAdd(true);
      setErrorText(false);
      setHelperText("");
    } else if (input.hasSpecialChars()) {
      setClassName(target.value);
      setDisabledAdd(true);
      setErrorText(true);
      setHelperText("Class cannot have special characters");
    } else {
      setClassName(target.value);
      setDisabledAdd(false);
      setErrorText(false);
      setHelperText("");
    }
  };

  return (
    <div>
      <div />
      <span>
        <img
          src={"https://file-link.s3.us-east-2.amazonaws.com/FileLinklogo.svg"}
          style={{
            height: "40px",
            width: "199px",
            margin: "0.84em 0.5em 0.85em 0.5em",
          }}
        />
      </span>
      <Divider />
      <MenuList
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Dashboard
          </ListSubheader>
        }
        disableListWrap
      >
        {dashboard.map((dash) => (
          <MenuItem
            button
            onClick={() => props.setCurrClass(dash.sel)}
            selected={dash.sel === props.current_class}
            key={dash.sel}
            component={Link}
            to={dash.link}
          >
            <ListItemIcon>
              {dash.text === "Schedule" ? <ScheduleIcon /> : <LinkIcon />}
            </ListItemIcon>
            <ListItemText primary={dash.text} />
          </MenuItem>
        ))}
      </MenuList>

      <Divider />
      <MenuList
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            My Classes
          </ListSubheader>
        }
      >
        {props.classes.map((col_class, index) => (
          <MenuItem
            button
            onClick={() => props.setCurrClass(col_class.name)}
            selected={col_class.name === props.current_class}
            key={col_class.id}
            component={Link}
            to={`/dashboard/class/${col_class.name.toLowerCase()}`}
          >
            <ListItemIcon>
              <ClassIcon style={{ color: col_class.color }} />
            </ListItemIcon>
            <ListItemText primary={col_class.name} />
          </MenuItem>
        ))}
      </MenuList>
      {add_class ? (
        <Fragment>
          <MenuItem>
            <TheTextField
              name="input_class"
              error={is_error_text}
              value={class_name}
              onChange={handleChange}
              inputProps={{ autoFocus: true }}
              label="Enter class name"
              helperText={helper_text}
            />
          </MenuItem>
          <MenuItem>
            <SaveButton
              onClick={handleSave}
              variant="contained"
              color="primary"
              size="small"
              name="input_doc"
              disabled={is_disbled_add}
              className={classes.button}
              startIcon={<SaveIcon />}
            >
              Add
            </SaveButton>
            <CancelButton
              variant="contained"
              size="small"
              className={classes.button}
              startIcon={<DeleteIcon />}
              onClick={() => {
                setClassName("");
                setAddClass(false);
              }}
            >
              Cancel
            </CancelButton>
          </MenuItem>
        </Fragment>
      ) : (
        <MenuItem button onClick={handleAddClass}>
          <ListItemIcon>
            <AddIcon />
          </ListItemIcon>
          <ListItemText primary={"Add Class"} />
        </MenuItem>
      )}
    </div>
  );
};

const mapStateToProps = (state: IRootState) => ({
  current_class: state.classes.current_class,
  classes_loaded: state.classes.classes_loaded,
});

export default connect(mapStateToProps, { addClass, setCurrClass })(Sidebar);
