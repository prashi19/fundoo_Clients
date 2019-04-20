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

export function setReminder(data) {
  console.log("reminder data from front-end==>", data);
  var headers = {
      "token": localStorage.getItem("token")
  }
  return axios.put('/reminder',
      data, {
          headers: headers
      }
  )
}

export function updateArchiveStatus(data) {
  console.log("archive data from front-end==>", data);
  var headers = {
      "token": localStorage.getItem("token")
  }
  return axios.put('/isArchived',
      data, {
          headers: headers
      }
  )
}

export function updateTrashStatus(data) {
  console.log("trash data from front-end==>", data);
  var headers = {
      "token": localStorage.getItem("token")
  }
  return axios.put('/isTrashed',
      data, {
          headers: headers
      }
  )
}


export function updateTitle(data) {
  var headers = {
      "token": localStorage.getItem("token")
  }
  return axios.put('/editTitle',
      data, {
          headers: headers
      }
  )
}
export function updateDescription(data) {
  var headers = {
      "token": localStorage.getItem("token")
  }
  return axios.put('/editDescription',
      data, {
          headers: headers
      }
  )
}

export function updatePin(data) {
  console.log("pinned data from front-end==>", data);
  var headers = {
      "token": localStorage.getItem("token")
  }
  return axios.put('/isPinned',
      data, {
          headers: headers
      }
  )
}
/*********************************************************************************************** */

export function otherArray(notesData) {
  let otherArr = [];
  for (let i = 0; i < notesData.length; i++) {
      if (!notesData[i].archive && !notesData[i].trash) {
          otherArr.push(notesData[i]);
      }
  }
  return otherArr;
}

export function reminderArray(notesData) {
  let reminderArr = [];
  for (let i = 0; i < notesData.length; i++) {
      if (notesData[i].reminder !== "" && !notesData[i].trash) {
          reminderArr.push(notesData[i]);
      }
  }
  return reminderArr;
}

export function archiveArray(notesData) {
  let archiveArr = [];
  for (let i = 0; i < notesData.length; i++) {
      if (notesData[i].archive) {
          archiveArr.push(notesData[i]);
      }
  }
  return archiveArr;
}


export function trashArray(notesData) {
  let trashArr = [];
  for (let i = 0; i < notesData.length; i++) {
      if (notesData[i].trash) {
          trashArr.push(notesData[i]);
      }
  }
  return trashArr;
}

export function pinArray(notesData) {
  let pinArr = [];
  for (let i = 0; i < notesData.length; i++) {
      if (notesData[i].pinned) {
          pinArr.push(notesData[i]);
      }
  }
  return pinArr;
}

