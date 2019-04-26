import React, { Component } from "react";
import Popper from "@material-ui/core/Popper";
import Fade from "@material-ui/core/Fade";
import {
    MenuItem,
    Paper,
    Tooltip,
    ListItem,
    createMuiTheme,
    MuiThemeProvider,
    ClickAwayListener,
    Button
} from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
const theme = createMuiTheme({
    overrides: {
        MuiMenuItem: {
            root: {
                borderbottomrightradius: 0,
                bordertoprightradius: 0,
                height: "13px",
                marginTop: "8px",
                marginBottom: "8px",
                width: "268px",
                fontSize: "12px"
            }
        },
        MuiPaper: {
            root: {
                zIndex: "1"
            }
        }
    },
    typography: {
        useNextVariants: true
    }
});


const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
});
class Reminder extends Component {
    state = {
        anchorEl: null,
        open: false,
        placement: null,
        date: ""
    };
    /**
     * @description:it handles the onclick on reminder event
     */
    handleClick = placement => event => {
        try {
            const { currentTarget } = event;
            this.setState(state => ({
                anchorEl: currentTarget,
                open: state.placement !== placement || !state.open,
                placement
            }));
        } catch (err) {
            console.log("error at handleClick in reminder");
        }
    };
    /**
     * @description:it handles the close the current event
     */
    handleClose = () => {
        try {
            this.setState(state => ({ open: !state.open }));
        } catch (err) {
            console.log("error at handleClose in reminder");
        }
    };
    handleChange=(date) => event =>{
        this.setState({[date]:new Date(event.target.value).toLocaleString()});
    }
    sendDate=event=>{
        event.preventDefault();
        // this.props.showNotification("Note Status", "Reminder set", "success");
        this.props.reminder(this.state.date, this.props.noteID);
        this.handleClose();
    }
    setTodayReminder = () => {
        var date = new Date().toLocaleDateString();
        var split = date.split("/");
        split[1] = Number(split[1] - 1)
        var reminder = new Date(split[2], split[1], split[0], 20, 0, 0).toLocaleString();
        // this.props.showNotification("Note Status", "Reminder set", "success");
        this.props.reminder(reminder, this.props.noteID);
        this.handleClose();
    };
    setTomorrowReminder = () => {

        var date = new Date().toLocaleDateString();
        var split = date.split("/");
        split[0] = Number(split[0] + 1)
        split[1] = Number(split[1] - 1)
        var reminder1 = new Date(split[2], split[1], split[0], 20, 0, 0).toLocaleString();
        // this.props.showNotification("Note Status", "Reminder set", "success");
        this.props.reminder(reminder1, this.props.noteID);
        this.handleClose();
    };

    render() {
        const setAMPM = this.props.parentToolsProps;
        const { anchorEl, open, placement } = this.state;
        const { classes } = this.props;
        return (
            <MuiThemeProvider theme={theme}>
                <div className="reminderdiv">
                    <Tooltip title="Remind me">
                        <img
                            src={require("../assets/reminder.svg")}
                            className="reminderIcon"
                            onClick={this.handleClick("bottom-start")}
                            alt="remider icon"
                        />
                    </Tooltip>
                    <Popper
                        open={open}
                        anchorEl={anchorEl}
                        placement={placement}
                        transition
                        style={{ zIndex: 9999 }}
                    >
                        {({ TransitionProps }) => (
                            <Fade {...TransitionProps} timeout={350}>
                                <Paper id="reminderPopper">
                                    <ClickAwayListener onClickAway={this.handleClose}>
                                        <div>
                                            <ListItem className="listRemindr">Reminder:</ListItem>
                                            <MenuItem
                                                className="currentDate"
                                                onClick={() => this.setTodayReminder()}
                                            >
                                                <div>Later today</div>
                                                <div>8:00 {setAMPM}</div>
                                            </MenuItem>
                                            <MenuItem
                                                className="currentDate"
                                                onClick={() => this.setTomorrowReminder()}
                                            >
                                                <div>Tomorrow</div>
                                                <div>8:00 AM</div>
                                            </MenuItem>
                                            <form className={classes.container} noValidate>
                                                <TextField
                                                    id="datetime-local"
                                                    label="Next appointment"
                                                    type="datetime-local"
                                                    defaultValue="2019-04-24T10:30"
                                                    onChange={this.handleChange("date")}
                                                    className={classes.textField}
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                />
                                                <Button onClick={this.sendDate}>save</Button>
                                            </form>
                                        </div>
                                    </ClickAwayListener>
                                </Paper>
                            </Fade>
                        )}
                    </Popper>
                </div>
            </MuiThemeProvider>
        );
    }
}
export default withStyles(styles)(Reminder);