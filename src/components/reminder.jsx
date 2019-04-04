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
    ClickAwayListener
} from "@material-ui/core";
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
export default class reminder extends Component {
    state = {
        anchorEl: null,
        open: false,
        placement: null
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
    setTodayReminder = () => {
        this.handleClose();
        let ampm = parseInt(new Date().getHours()) >= 8 ? "PM" : "AM";
        var date = new Date().toDateString();
        var reminder1 = date + ", 8 " + ampm;
        console.log("today reminder data=====>", reminder1);
        this.props.reminder(reminder1, this.props.noteID);
    };
    setTomorrowReminder = () => {
        this.handleClose();
        let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "Mon"];
        var date = new Date().toDateString();
        date = date.replace(
            new Date().getDate().toString(),
            new Date().getDate() + 1
        );
        date = date.replace(
            days[new Date().getDay() - 1],
            days[new Date().getDay()]
        );
        var reminder1 = date + ", 8 AM";
        console.log("tomorow reminder data====>", reminder1);
        this.props.reminder(reminder1, this.props.noteID);
    };

    render() {
        const setAMPM = this.props.parentToolsProps;
        const { anchorEl, open, placement } = this.state;
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

                                            <MenuItem className="currentDate">
                                                <div>Home</div>
                                                <div>Mumbai</div>
                                            </MenuItem>
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
