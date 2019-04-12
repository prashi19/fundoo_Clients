import React, { Component } from "react";
import "../App.css";
import Card from "@material-ui/core/Card";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import Snackbar from "@material-ui/core/Snackbar";
import { forgotPassword } from "../services/userServices";

export default class Forgot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Email: "",
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

  handleSnackClose = () => {
    try {
      this.setState({
        openSnackBar: false
      });
    } catch (err) {
      console.log("snackBar error");
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.Email === "") {
      this.setState({
        openSnackBar: true,
        snackBarMessage: "Please enter your Email"
      });
    } else if (
      !/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/.test(this.state.Email)
    ) {
      this.setState({
        openSnackBar: true,
        snackBarMessage: "Enter valid Email"
      });
    } else {
      forgotPassword(this.state.Email);
    }
  };

  handleSnackClose = () => {
    this.setState({
      openSnackBar: false
    });
  };

  render() {
    return (
      <div className="main">
        <div id="card">
          <Card className="for_content">
            <div>
              <img
                id="for_logo"
                src={require("../assets/Fundoo")}
                alt="Fundoo"
              />
            </div>
            <br />
            <div>
              <h4>Reset your password</h4>
              <h6>Enter your email to recover</h6>
            </div>
            <br />
            <div id="text-field">
              <TextField
                id="input1"
                label="Email"
                type="text"
                name="Email"
                margin="normal"
                variant="outlined"
                value={this.state.Email}
                onChange={this.onChange}
              />
            </div>
            <br />
            <div id="button">
              <button
                id="button2"
                class="btn btn-primary"
                type="submit"
                onClick={this.handleSubmit}
              >
                {" "}
                Submit{" "}
              </button>
              <br />
              <br />
            </div>
            <br />
            <br />
          </Card>
        </div>

        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right"
          }}
          open={this.state.openSnackBar}
          autoHideDuration={5000}
          onClose={this.handleSnackClose}
          variant="error"
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={<span id="message-id"> {this.state.snackBarMessage} </span>}
          action={[
            <div>
              <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                onClick={this.handleSnackClose}
              />
            </div>
          ]}
        />
      </div>
    );
  }
}
