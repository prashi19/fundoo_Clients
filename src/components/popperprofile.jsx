import React, { Component } from "react";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import Tooltip from "@material-ui/core/Tooltip";
import { Button } from "@material-ui/core";
import "../App.css";
import CropProfile from './CropProfile';
import { deleteToken } from '../push-notification';
/**
 * @description:This method is used to Logout ui..
 */
export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      open: false,   
      placement: null,
      profilePic: "",
      openProfileDialog:false,
    };
  }

  handleOpenDialog=()=>{
    this.setState({
      openProfileDialog:true
    });
  }
  handleCloseDialog=()=>{
    this.setState({openProfileDialog:false});
  }
  /**
   * @description:it will close the current action event
   */
  handleClose = event => {
    try {
      if (this.anchorEl.contains(event.target)) {
        return;
      }
      this.setState({ open: false });
    } catch (err) {
      console.log("error at handleClose in userProfile");
    }
  };
  /**
   * @description:it will redirect to registration page
   */
  handlelogout = event => {
    try {
      event.preventDefault();
      deleteToken();
      localStorage.clear();
      this.props.props.props.history.push("/login");
    } catch (err) {
      console.log("error at registrationclick in userProfile");
    }
  };
  /**
   * @description:it will redirect to login page
   */
  handleregister = event => {
    try {
      event.preventDefault();
      this.props.props.props.history.push("/register");
    } catch (err) {
      console.log("error at loginclick in userProfile");
    }
  };

  componentDidMount() {
    if (localStorage.getItem("profilePic") !== "undefined") {
      this.setState({
        profilePic: localStorage.getItem("profilePic")
      });
    }
  }
  /**
   * @description:it will open the userProfile
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
      console.log("error at handleClick in userProfile");
    }
  };


  setCropedPic=value=>{
    this.setState({
      profilePic:value
    });
  }
  render() {
    const { anchorEl, open, placement } = this.state;
    const firstName = localStorage.getItem("firstName");
    const initial = firstName.substring(0, 1);
    return (
      <div>
        <Popper
          open={open}
          anchorEl={anchorEl}
          placement={placement}
        >
              <Paper id="papperlogout">
                  <div
                    className="pop"
                    style={{
                      width: "fit-content",
                      padding: "15px",
                      marginTop: "13px"
                    }}
                  >
                    <div id="userProfileDetails">
                      <IconButton id="avatar">
                        <Tooltip title="Change Profile">
                          <Avatar
                            style={{
                              rotate:"right",
                              width: "100px",
                              height: "100px",
                              backgroundColor: "blur"
                            }}
                            onClick={this.handleOpenDialog}                     
                          >
                            {this.state.profilePic !== "" ? (
                              <img
                                style={{
                                  width: "-webkit-fill-available",
                                  height: "-webkit-fill-available"
                                }}
                                src={this.state.profilePic}
                                alt="change Profile pic"
                              />
                            ) : (
                              <b style={{ fontSize: "33px" }}>{initial}</b>
                            )}{" "}
                            {/* <span className="changepic">Change</span> */}
                          </Avatar>
                        </Tooltip>
                      </IconButton>
                      <CropProfile
                        setCropedPic={this.setCropedPic}
                        open={this.state.openProfileDialog}
                        onClose={this.handleCloseDialog}/>

                      <div className="popinfo">
                        <p style={{ marginBottom: "0px" }}>
                          {firstName}
                          <br />{" "}
                        </p>
                        <small style={{ marginBottom: "0px" }}>
                          {localStorage.getItem("Email")}{" "}
                        </small>
                      </div>
                    </div>
                    
                    <div id="profilebutton">
                      <Button onClick={this.handleregister}>Add account</Button>
                      <Button onClick={this.handlelogout}>Sign out</Button>
                    </div>
                  </div>
              </Paper>
        </Popper>
        <div className="iconButton">
          <Tooltip
            title={"Fundoo Account   :" + localStorage.getItem("firstName")}
          >
            <Avatar
              style={{
                width: "35px",
                height: "35px",
                backgroundColor: "blur"
              }}
              onClick={this.handleClick("bottom-end")}
            >
              {this.state.profilePic !== "" ? (
                <img
                  style={{
                    width: "-webkit-fill-available",
                    height: "-webkit-fill-available"
                  }}
                  src={this.state.profilePic}
                  alt="change Profile pic"
                />
              ) : (
                initial
              )}
            </Avatar>
          </Tooltip>
        </div>
      </div>
    );
  }
}
