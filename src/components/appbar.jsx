import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import { fade } from "@material-ui/core/styles/colorManipulator";
import { withStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import PersistentDrawerLeft from "../components/drawer";
import Profile from "../components/popperprofile";
import { Tooltip } from "@material-ui/core";
import CardsView from "../components/cardView";

const styles = theme => ({
  root: {
    width: "100%"
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    opacity: 0.7,
    marginLeft: -12,
    marginRight: 20
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  search: {
    opacity: 0.7,
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.black, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.grey, 0.25)
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing.unit * 3,
      width: "750px"
    }
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit",
    width: "100%"
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200
    }
  },
  refresh: {
    opacity: 0.6
  },

  setting: {
    opacity: 0.6
  },

  list: {
    opacity: 0.6
  }
});

class PrimarySearchAppBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      openPopper: false,
      name: "fundoo"
    };
  }

  handleToggle = () => {
    this.props.slideCards();
    this.setState({ open: !this.state.open });
  };

  handleRefresh(event) {
    event.preventDefault();
    window.location.reload();
  }

  handleAppbar = () => {
    this.props.notePropsToApp();
  };
  handleName = evt => {
    this.setState({ name: evt });
  };
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="fixed" color="default" id="AppBar">
          <Toolbar>
            <IconButton className={classes.menuButton} id="Button" color="inherit" onClick={this.handleToggle}>
              <Tooltip title="Main Menu">
                <MenuIcon />
              </Tooltip>
            </IconButton>

            {this.state.name === "fundoo" ? (
              <img
                src={"https://img.icons8.com/color/48/000000/google-keep.png"}
                alt="Fundoo"
              />
            ) : null}


            {/* <img
              src={"https://img.icons8.com/color/48/000000/google-keep.png"}
              alt="Fundoo"
            /> */}
            <div id="typo">
              <Typography
                className={classes.title}
                variant="h6"
                color="inherit"
                noWrap
              >
                {this.state.name}
              </Typography></div>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <Tooltip title="Search">
                  <SearchIcon />
                </Tooltip>
              </div>

              <InputBase
                placeholder="Search"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}
              />

            </div>

            <div className={classes.grow} />
            <div className={classes.refresh}>
              <IconButton id="Button1" onClick={this.handleRefresh}>
                <Tooltip title="Refresh">
                  <img src={require("../assets/refresh.svg")} alt="Refresh" />
                </Tooltip>
              </IconButton>
            </div>

            <div className={classes.list}>
              <CardsView appPropstoCardsView={this.handleAppbar} />
            </div>
            <IconButton id="Button" onClick={this.handlePopper}>
              <Tooltip title="Fundoo Account">
                <Profile props={this.props} />
              </Tooltip>
            </IconButton>
          </Toolbar>
        </AppBar>
        <PersistentDrawerLeft
          appBarProps={this.state.open}
          name={this.handleName}
          handleNavigation={this.props.handleNavigation}
        />
      </div>
    );
  }
}

PrimarySearchAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PrimarySearchAppBar);
