/*******************************************************************************
 *  @Purpose        : To create note services that will perform CRUD operations.
 *  @file           : noteServices.js
 *  @author         : PRASHANTH S
 *  @version        : v0.1
 *  @since          : 26-03-2019
 *******************************************************************************/
import axios from "axios";
/**
 * @description:To create a new note
 * @param {*used to send data or note to server} data
 */
export function createNote(data) {
  console.log("create note data from front-end==>", data);
  console.log("localStorage.getItem(token)", localStorage.getItem("token"));
  var headers = {
    "Content-Type": "application/json",
    token: localStorage.getItem("token")
  };

  // axios.post(Helper.getUserAPI(), data, {headers: headers})

  return axios.post("/createNote", data, {
    headers: headers
  });
}
/**
 * @description:To get the created notes
 */
export function getNotes() {
  console.log("get notes from front-end");
  return axios.get("/getNotes", {
    headers: {
      token: localStorage.getItem("token")
    }
  });
}

export function updateColor(data) {
    console.log("color data from front-end==>", data);
    var headers = {
        'Content-Type': 'application/json',
        "token": localStorage.getItem("token")
    }
    return axios.put('/updateColor',
        data, {
            headers: headers
        }
    )
}

/*********************************************************************************************** */

export function otherArray(notesData) {
  let otherArr = [];
  for (let i = 0; i < notesData.length; i++) {  
          otherArr.push(notesData[i]); 
  }
  return otherArr;
}