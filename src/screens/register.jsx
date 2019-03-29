import React, { Component } from "react";
import "../App.css";
import { Card, TextField, Button } from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";
import { userRegister } from "../services/userServices";
export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      Email: "",
      Password: "",
      ConfirmPassword: "",
      snackBarMessage: "",
      showPassword: false
    };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  onChange(e) {
    // e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  }

  loginclick = event => {
    try {
      event.preventDefault();
      this.props.history.push("/login");
    } catch (err) {
      console.log("error at loginclick in registration");
    }
  };

  handleSubmit = event => {
    try {
      event.preventDefault();
      if (this.state.firstName === "") {
        this.setState({
          openSnackBar: true,
          snackBarMessage: "firstName cannot be empty..!"
        });
      } else if (this.state.lastName === "") {
        this.setState({
          openSnackBar: true,
          snackBarMessage: "lastName cannot be empty..!"
        });
      } else if (this.state.Email === "") {
        this.setState({
          openSnackBar: true,
          snackBarMessage: "email cannot be empty..!"
        });
      } else if (
        !/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/.test(this.state.Email)
      ) {
        this.setState({
          openSnackBar: true,
          snackBarMessage: "Invalid email..!"
        });
      } else if (this.state.Password === "") {
        this.setState({
          openSnackBar: true,
          snackBarMessage: "password cannot be empty..!"
        });
      } else if (this.state.Password.length < 6) {
        this.setState({
          openSnackBar: true,
          snackBarMessage: "password must be of atleast 6 characters long..!"
        });
      } else if (this.state.ConfirmPassword === "") {
        this.setState({
          openSnackBar: true,
          snackBarMessage: "Confirm password cannot be empty..!"
        });
      } else if (this.state.Password !== this.state.ConfirmPassword) {
        this.setState({
          openSnackBar: true,
          snackBarMessage: "password and confirm password must be same..!"
        });
      } else {
        var data = {
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          Email: this.state.Email,
          Password: this.state.Password
        };
        userRegister(data)
          .then(response => {
            console.log("registration response from back-end===>", response);
            this.setState({
              openSnackBar: true,
              snackBarMessage: "Registered Successfully!!"
            });
            this.props.history.push("/login");
          })
          .catch(err => {
            console.log(err);
            this.setState({
              openSnackBar: true,
              snackBarMessage: "Register Failed"
            });
          });
      }
    } catch (err) {
      console.log("error at handleSubmit in registration");
    }
  };

  handleClickShowPassword = () => {
    try {
      this.setState(state => ({ showPassword: !state.showPassword }));
    } catch (err) {
      console.log("error at handleClickShowPassword in registration");
    }
  };
  render() {
    return (
      <div>
        <div className="reg_main">
          <Card className="reg_content">
            <div>
              <img
                id="reg_logo"
                src={require("/home/admin1/fundoo/Client/src/assets/Fundoo.png")}
                alt="Fundoo"
              />
            </div>
            <br />
            <div id="reg_hed">
              <h3>Create your Fundoo Account</h3>
              <h5>to continue to Fundoo</h5>
            </div>
            <br />
            <div className="reg_center">
              <div className="reg_textfield1">
                <TextField
                  id="firstName"
                  className="input1"
                  label="First Name"
                  type="text"
                  name="firstName"
                  margin="normal"
                  variant="outlined"
                  value={this.state.firstName}
                  onChange={this.onChange}
                />
              </div>
              <div className="reg_textfield2">
                <TextField
                  id="lastName"
                  className="input1"
                  label="Last Name"
                  type="text"
                  name="lastName"
                  margin="normal"
                  variant="outlined"
                  value={this.state.lastName}
                  onChange={this.onChange}
                />
              </div>
              <div className="reg_textfield3">
                <TextField
                  id="email"
                  className="input3"
                  label="Email"
                  type="text"
                  name="Email"
                  margin="normal"
                  variant="outlined"
                  value={this.state.Email}
                  onChange={this.onChange}
                />
              </div>
              <div className="reg_textfield4">
                <TextField
                  id="password"
                  className="input4"
                  label="Password"
                  type={this.state.showPassword ? "text" : "password"}
                  name="Password"
                  margin="normal"
                  variant="outlined"
                  value={this.state.Password}
                  onChange={this.onChange}
                />
              </div>
              <div className="reg_textfield5">
                <TextField
                  id="confirm"
                  className="input4"
                  label="Confirm"
                  type={this.state.showPassword ? "text" : "password"}
                  name="ConfirmPassword"
                  margin="normal"
                  variant="outlined"
                  value={this.state.ConfirmPassword}
                  onChange={this.onChange}
                />
              </div>
              <div className="reg_textfield6">
                <IconButton
                  id="reg_eye"
                  aria-label="Toggle password visibility"
                  onClick={this.handleClickShowPassword}
                >
                  {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </div>
              {/* <div id="reg_button1">
              <Button id="button3" color="primary" >Sign in instead</Button><br/>  </div> */}
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
          autoHideDuration={6000}
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
