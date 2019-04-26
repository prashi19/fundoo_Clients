import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import { MenuItem } from "@material-ui/core";
import EditLabel from "../components/editLabel";


const drawerWidth = 220;

const styles = theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth,
    marginTop: 59,
    [theme.breakpoints.up("sm")]: {
      marginTop: 66
    }

  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  },

  menuItem: {
    "&:focus": {
      backgroundColor: "#feefc3"
      // backgroundColor:"red"
    }
  }
});

class PersistentDrawerLeft extends React.Component {
  state = {
    open: false,
    navigateArchived: false,
    navigateTrashed: false,
    navigateReminder: false,
    label: []
  };

  // handleClick=evt=>{
  //   this.props.name(evt);
  // }
  newLabels = (value) => {
    this.setState({ label: value })
  }


  handleEditLabel = (evt) => {
    this.props.name(evt)
    this.setState({ open: !this.state.open })
  }

  async handleArchived(evt) {
    await this.setState({
      navigateReminder: false,
      navigateArchived: true,
      navigateTrashed: false
    })
    this.props.name(evt);
    this.props.handleNavigation(this.state.navigateReminder, this.state.navigateArchived, this.state.navigateTrashed);
  }

  async handleTrashed(evt) {
    await this.setState({

      navigateReminder: false,
      navigateArchived: false,
      navigateTrashed: true
    })
    this.props.name(evt);
    this.props.handleNavigation(this.state.navigateReminder, this.state.navigateArchived, this.state.navigateTrashed);
  }


  async handleNotes(evt) {
    await this.setState({

      navigateReminder: false,
      navigateArchived: false,
      navigateTrashed: false
    })
    this.props.name(evt);
    this.props.handleNavigation(this.state.navigateReminder, this.state.navigateArchived, this.state.navigateTrashed);
  }

  async handleReminder(evt) {
    await this.setState({

      navigateReminder: true,
      navigateArchived: false,
      navigateTrashed: false
    })
    this.props.name(evt);
    this.props.handleNavigation(this.state.navigateReminder, this.state.navigateArchived, this.state.navigateTrashed);
  }

  render() {
    let displayLabels = this.state.label;
    if (this.state.label !== "") {
      displayLabels = this.state.label.map((key) =>
        <MenuItem style={{ display: "flex", flexDirection: "row", color: "#202124", fontFamily: "Google Sans, Roboto, Arial, sans-serif", fontSize: ".875rem" }} onClick={() => this.displaySearchLabels(key.label)} key={key.label}>
          <img src={require('../assets/menuEdit.svg')} alt="label icon" style={{ marginRight: "50px" }} />
          <div style={{ marginRight: "50px", marginBottom: "10px", marginTop: "10px", fontWeight: "550" }}>
            {key.label}
          </div>
        </MenuItem>
      )
    }
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          open={this.props.appBarProps}
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <MenuItem id="noteMenu" className={classes.menuItem} onClick={() => this.handleNotes("fundoo")}>
            <img
              src={require("../assets/menuNote.svg")}
              alt="note icon"
              style={{ marginRight: "30px" }}
            />
            Notes
          </MenuItem>
          <MenuItem id="reminderMenu" className={classes.menuItem} onClick={() => this.handleReminder("Reminder")}>
            <img
              src={require("../assets/menuReminder.svg")}
              alt="reminder icon"
              style={{ marginRight: "30px" }}
            />
            Reminders
          </MenuItem>
          <div
            style={{
              borderBottom: "1px solid lightgrey",
              borderTop: "1px solid lightgrey"
            }}
          >
            <div
              style={{
                padding: "3.5% 8%",
                fontSize: "12px",
                marginBottom: "15px",
                marginTop: "10px",
                fontFamily: "arial",
                color: "gray"
              }}
            >
              LABELS
            </div>
            <div>
              <MenuItem id="labelMenu" className={classes.menuItem} onClick={() => this.handleEditLabel("Label")}>
                <img
                  src={require("../assets/menuEdit.svg")}
                  alt="edit icon"
                  style={{ marginRight: "30px" }}
                />
                Edit Labels
              </MenuItem>
            </div>
          </div>
          <MenuItem id="archiveMenu" className={classes.menuItem} onClick={() => this.handleArchived("Archive")}>
            <img
              src={require("../assets/menuArchive.svg")}
              alt="archive icon"
              style={{ marginRight: "30px" }}
            />
            Archive
          </MenuItem>
          <MenuItem id="trashIcon" className={classes.menuItem} onClick={() => this.handleTrashed("Trash")}>
            <img
              src={require("../assets/menuTrash.svg")}
              alt="trash icon"
              style={{ marginRight: "30px" }}
            />
            Trash
          </MenuItem>
        </Drawer>
        <EditLabel
          newLabels={this.newLabels}
          label={this.state.label}
          // showLabels={this.showLabels}
          drawerPropstoEditLabels={this.state.open}
          labelToggle={this.handleEditLabel} />
      </div>
    );
  }
}
PersistentDrawerLeft.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(PersistentDrawerLeft);
