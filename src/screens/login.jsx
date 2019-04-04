import React, { Component } from "react";
import "../App.css";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import Snackbar from "@material-ui/core/Snackbar";
import { userLogin } from "../services/userServices";
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Email: "",
      Password: "",
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
  /**
   *  @description:it will display the entered password.
   */
  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };
  /**
   *  @description: it will close the snackbar.
   */
  handleSnackClose = () => {
    try {
      this.setState({
        openSnackBar: false
      });
    } catch (err) {
      console.log("snackBar error");
    }
  };

  /**
   * @description:it will redirect to registration page.
   */
  registerclick = event => {
    try {
      event.preventDefault();
      this.props.history.push("/register");
    } catch (err) {
      console.log("error at registerclick in registration");
    }
  };

  forgotclick = event => {
    try {
      event.preventDefault();
      this.props.history.push("/forgot");
    } catch (err) {
      console.log("error at gorgotclick ");
    }
  };

  /**
   * @description:it will check all the following condition.
   * If the condition is satisfied then the login is success.
   */
  handleSubmit = event => {
    event.preventDefault();
    if (!this.state.Email) {
      this.setState({
        openSnackBar: true,
        snackBarMessage: "email cannot be empty..!"
      });
    } else if (!this.state.Password) {
      this.setState({
        openSnackBar: true,
        snackBarMessage: "Password cannot be empty..!"
      });
    } else if (
      !/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/.test(this.state.Email)
    ) {
      this.setState({
        openSnackBar: true,
        snackBarMessage: "Invalid Email..!"
      });
    } else if (this.state.Password.length < 6) {
      this.setState({
        openSnackBar: true,
        snackBarMessage: "Password must be of atleast 6 characters long..!"
      });
    } else {
      var data = {
        Email: this.state.Email,
        Password: this.state.Password
      };
      userLogin(data)     
        .then(response => {
          console.log("respons----->",response);
          localStorage.clear();
          localStorage.setItem("firstName",response.data.result.firstName);              
          localStorage.setItem("Email",this.state.Email);
          localStorage.setItem("token",response.data.token.token);
          localStorage.setItem("user_id",response.data.result._id);
         
          this.setState({
            openSnackBar: true,
            snackBarMessage: "Login Successfull!!"
          });
          this.props.history.push("/dashBoard");
        })
        .catch(err => {
          console.log(err);
          this.setState({
            openSnackBar: true,
            snackBarMessage: "Login failed!!"
          });
        });
    }
  };

  render() {
    return (
      <div className="main">
        <div id="card">
          <Card className="content">
            <div>
              <img
                id="logo"
                src={require("/home/admin1/fundoo/Client/src/assets/Fundoo.png")}
                alt="Fundoo"
              />
            </div>
            <br />
            <div>
              <h4>Sign in</h4>
              <h6>to continue to Fundoo</h6>
            </div>
            <br />
            <div>
              <TextField
                className="text-filed"
                id="input1"
                label="Email"
                type="text"
                name="Email"
                auto complete="true"
                margin="normal"
                variant="outlined"
                value={this.state.Email}
                onChange={this.onChange}
              />
            </div>

            <div id="password1">
              <TextField
                id="input"
                label="Password"
                name="Password"
                margin="normal"
                variant="outlined"
                type={this.state.showPassword ? "text" : "password"}
                value={this.state.password}
                onChange={this.onChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="Toggle password visibility"
                        onClick={this.handleClickShowPassword}
                      >
                        {this.state.showPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </div>
            <br />
            <div id="button">
              <Button id="button1" color="primary" onClick={this.forgotclick}>
                Forgot password?
              </Button>
              <button
                id="button2"
                className="btn btn-primary"
                type="submit"
                onClick={this.handleSubmit}
              >
                {" "}
                Login{" "}
              </button>
              <br />
              <br />
            </div>
            <div>
              <Button id="button3" color="primary" onClick={this.registerclick}>
                Create account
              </Button>
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
