import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import { MenuItem } from "@material-ui/core";

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
    marginTop: 70
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
    }
  }
});

class PersistentDrawerLeft extends React.Component {
  state = {
    open: false
  };

  render() {
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
          <MenuItem id="noteMenu" className={classes.menuItem}>
            <img
              src={require("../assets/menuNote.svg")}
              alt="note icon"
              style={{ marginRight: "30px" }}
            />
            Notes
          </MenuItem>
          <MenuItem id="reminderMenu" className={classes.menuItem}>
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
              <MenuItem id="labelMenu" className={classes.menuItem}>
                <img
                  src={require("../assets/menuEdit.svg")}
                  alt="edit icon"
                  style={{ marginRight: "30px" }}
                />
                Edit Labels
              </MenuItem>
            </div>
          </div>
          <MenuItem id="archiveMenu" className={classes.menuItem}>
            <img
              src={require("../assets/menuArchive.svg")}
              alt="archive icon"
              style={{ marginRight: "30px" }}
            />
            Archive
          </MenuItem>
          <MenuItem id="trashIcon" className={classes.menuItem}>
            <img
              src={require("../assets/menuTrash.svg")}
              alt="trash icon"
              style={{ marginRight: "30px" }}
            />
            Trash
          </MenuItem>
        </Drawer>
      </div>
    );
  }
}

PersistentDrawerLeft.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(PersistentDrawerLeft);
