import axios from "axios";
export function userLogin(data) {
    return axios.post("/login", data);   
  }
  

  export function userRegister(data) {
    return axios.post("/register", data);
  }

  export function forgotPassword(Email) {
    axios
      .post("/forgot", {
        Email: Email
      })
      .then(function(response) {
        console.log(response);
        alert(" Please check your email.");
      })
      .catch(function(err) {
        console.log(err);
        alert("User Not Found.");
      });
  }

  export function resetPassword(Password, token) {
    console.log("services");
    return axios.post(
      `/resetPassword/${token}`, {'Password':Password},
      { headers: { 'token':token} }
    );
    
  }
  