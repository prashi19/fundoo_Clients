import React, { Component } from "react";
import "../App.css";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { resetPassword } from "../services/userServices";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import Snackbar from "@material-ui/core/Snackbar";
export default class Reset extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Password: "",
      ConfirmPassword: "",
      snackBarMessage: "",
      showPassword: false
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    // e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  }

  handleClickShowPassword = () => {
    try {
      this.setState(state => ({ showPassword: !state.showPassword }));
    } catch (err) {
      console.log("error at handleClickShowPassword in reset");
    }
  };

  handleSnackClose = () => {
    try {
      this.setState({
        openSnackBar: false
      });
    } catch (err) {
      console.log("snackBar error");
    }
  };

  loginclick = event => {
    try {
      event.preventDefault();
      this.props.history.push("/login");
    } catch (err) {
      console.log("error at loginclick in registration");
    }
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.Password === "") {
      this.setState({
        openSnackBar: true,
        snackBarMessage: "Password cannot be empty"
      });
    } else if (this.state.ConfirmPassword === "") {
      this.setState({
        openSnackBar: true,
        snackBarMessage: "Confirm Password cannot be empty"
      });
    } else if (this.state.Password.length < 6) {
      this.setState({
        openSnackBar: true,
        snackBarMessage: "Password must be of atleast 6 characters long"
      });
    } else if (this.state.ConfirmPassword.length < 6) {
      this.setState({
        openSnackBar: true,
        snackBarMessage: "Confirm Password must be of atleast 6 characters long"
      });
    } else if (this.state.Password !== this.state.ConfirmPassword) {
      this.setState({
        openSnackBar: true,
        snackBarMessage: "Password and Confirm password must be same"
      });
    } else {
      event.preventDefault();
      let current_url = window.location.pathname;
      let verify_user_token = current_url.substr(15);
      console.log(verify_user_token);
      console.log("current ", current_url);
      resetPassword(this.state.Password, verify_user_token)
        .then(response => {
          console.log(response);
          this.setState({
            openSnackBar: true,
            snackBarMessage: "Password changed successfully"
          });
          this.props.history.push("/login");
        })
        .catch(err => {
          console.log(err);
          this.setState({
            openSnackBar: true,
            snackBarMessage: "Please Try Again.."
          });
        });
    }
  };

  render() {
    return (
      <div>
        <div className="main">
          <Card className="content">
            <div>
              <img
                id="reg_logo"
                src={require("../assets/Fundoo.png")}
                alt="Fundoo"
              />
            </div>
            <br />
            <div id="reg_hed">
              <h3>Account recovery</h3>
              <h6>Enter the new password to Sign in Fundoo Account</h6>
            </div>
            <br />
            <div className="res_center">
              {/* <div className="text-field">
                      <TextField
                      id="password"
                        // className="res_input4"
                        label="Password"
                        type={this.state.showPassword ? "text" : "password"}
                        name="Password"
                        margin="normal"
                        variant="outlined"
                        value={this.state.Password}
                        onChange={this.onChange}
                      />
                    </div> */}
              <div className="res_password">
                <TextField
                  id="password"
                  // className="res_input4"
                  label="Password"
                  type={this.state.showPassword ? "text" : "password"}
                  name="Password"
                  margin="normal"
                  variant="outlined"
                  value={this.state.Password}
                  onChange={this.onChange}
                />
              </div>
              <div className="password">
                <TextField
                  id="newPassword"
                  // className="res_input4"
                  label="Confirm"
                  type={this.state.showPassword ? "text" : "password"}
                  name="ConfirmPassword"
                  margin="normal"
                  variant="outlined"
                  value={this.state.ConfirmPassword}
                  onChange={this.onChange}
                />
                {/* </div> */}
                {/* <div className="reg_textfield6"> */}
                <IconButton
                  id="reg_eye"
                  aria-label="Toggle password visibility"
                  onClick={this.handleClickShowPassword}
                >
                  {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </div>
              <div id="reg_button2">
                <button
                  id="reg_button2"
                  class="btn btn-primary"
                  type="submit"
                  onClick={this.handleSubmit}
                >
                  {" "}
                  Submit{" "}
                </button>
                <br />
              </div>
              <div>
                <Button id="button3" color="primary" onClick={this.loginclick}>
                  Sign in instead
                </Button>
                <br /> <br />
              </div>
            </div>
          </Card>
        </div>
        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
          open={this.state.openSnackBar}
          autoHideDuration={2000}
          onClose={this.handleSnackClose}
          variant="error"
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={<span id="message-id"> {this.state.snackBarMessage} </span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={this.handleSnackClose}
            >
              {/* <CloseIcon /> */}
            </IconButton>
          ]}
        />
      </div>
    );
  }
}
