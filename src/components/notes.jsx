import React, { Component } from "react";
import {
  Card,
  MuiThemeProvider,
  createMuiTheme,
  Chip
} from "@material-ui/core";
import Tools from "../components/tools";
import {
  getNotes,
  updateColor,
  otherArray,
  setReminder,
  archiveArray,
  trashArray,
  reminderArray,
  pinArray,
  updateArchiveStatus,
  updateTrashStatus,
  updateDescription,
  updateTitle,
  updatePin, deleteNoteForever,
  // saveLabel
} from "../services/noteServices";
import EditPin from "../components/editpin"
import PinAndOthers from "../components/notePin"
import DialogBox from "../components/cardDialog";
import ArchivedNavigator from "../components/archiveNavigator";
import TrashNavigator from "../components/trashNavigator";
import ReminderNavigator from "../components/reminderNavigator";
// import { NotificationManager } from 'react-notifications';
import "../App.css";

const theme = createMuiTheme({
  overrides: {
    MuiChip: {
      root: {
        fontSize: 14,
        marginTop: 20,
        height: 25,
        backgroundColor: "rgba(0, 0, 0, 0.10)",
        padding: 10,

      },
      deleteIcon: {
        width: 20,
        height: 20
      }
    }
  },
  typography: {
    useNextVariants: true
  }
});

export default class Cards extends Component {
  constructor() {
    super();
    this.state = {
      notes: [],
      openDialog: false,
      label: false
    };
    this.cardsToDialogBox = React.createRef();
  }

  async handleClick(note) {
    console.log("note--------------------->", note);
    this.cardsToDialogBox.current.getData(note);
    await this.setState({ openDialog: true });
  }

  componentDidMount() {
    getNotes()
      .then(result => {
        this.setState({
          notes: result.data.data
        });
        console.log("getNotes result from back-end", result);
      })
      .catch(error => {
        alert(error);
      });
  }
  getColor = (value, noteId) => {
    const color = {
      noteID: noteId,
      color: value
    };
    updateColor(color)
      .then(result => {
        let newArray = this.state.notes;
        for (let i = 0; i < newArray.length; i++) {
          if (newArray[i]._id === noteId) {
            console.log("new Array--->", newArray[i]._id, "noteID--->", noteId);
            newArray[i].color = result.data.data;
            this.setState({
              notes: newArray
            });
          }
        }
      })
      .catch(error => {
        alert(error);
      });
  };
  displayNewCard = newCard => {
    this.setState({
      notes: [...this.state.notes, newCard]
    });
  };
  handleOpenDialog = () => {
    this.setState({ openDialog: !this.state.openDialog });
  };
  handleClose = () => {
    this.setState({ openDialog: false });
  };
  closeDialogBox = e => {
    this.setState({ openDialog: false });
  };


  reminderNote = (value, noteId) => {
    const reminder = {
      noteID: noteId,
      reminder: value
    };
    setReminder(reminder)
      .then(result => {
        let newArray = this.state.notes;
        for (let i = 0; i < newArray.length; i++) {
          if (newArray[i]._id === noteId) {
            newArray[i].reminder = result.data.data;
            this.setState({
              notes: newArray
            });
          }
        }
      })
      .catch(error => {
        alert(error);
      });
  };

  archiveNote = (value, noteId) => {
    const isArchived = {
      noteID: noteId,
      archive: value
    };
    updateArchiveStatus(isArchived)
      .then(result => {
        let newArray = this.state.notes;
        for (let i = 0; i < newArray.length; i++) {
          if (newArray[i]._id === noteId) {
            newArray[i].archive = result.data.data;
            // newArray[i].pinned = false;
            newArray[i].trash = false;
            this.setState({
              notes: newArray
            });
          }
        }
      })
      .catch(error => {
        alert(error);
      });
  };

  trashNote = (value, noteId) => {
    const isTrashed = {
      noteID: noteId,
      trash: value
    };
    updateTrashStatus(isTrashed)
      .then(result => {
        let newArray = this.state.notes;
        for (let i = 0; i < newArray.length; i++) {
          if (newArray[i]._id === noteId) {
            newArray[i].trash = result.data.data;
            // newArray[i].pinned = false;
            newArray[i].archive = false;
            this.setState({
              notes: newArray
            });
          }
        }
      })
      .catch(error => {
        alert(error);
      });
  };

  editTitle = (noteId, value) => {
    const title = {
      noteID: noteId,
      title: value
    };
    console.log("title-->", title);

    updateTitle(title)
      .then(result => {
        let newArray = this.state.notes;
        for (let i = 0; i < newArray.length; i++) {
          if (newArray[i]._id === noteId) {
            newArray[i].title = result.data.data;
            this.setState({
              notes: newArray
            });
          }
        }
      })
      .catch(error => {
        alert(error);
      });
  };
  editDescription = (noteId, value) => {
    const description = {
      noteID: noteId,
      description: value
    };
    updateDescription(description)
      .then(result => {
        let newArray = this.state.notes;
        for (let i = 0; i < newArray.length; i++) {
          if (newArray[i]._id === noteId) {
            newArray[i].description = result.data.data;
            this.setState({
              notes: newArray
            });
          }
        }
      })
      .catch(error => {
        alert(error);
      });
  };

  pinNote = (value, noteId) => {
    const isPinned = {
      noteID: noteId,
      pinned: value
    }

    updatePin(isPinned)
      .then((result) => {
        let newArray = this.state.notes
        for (let i = 0; i < newArray.length; i++) {
          if (newArray[i]._id === noteId) {
            newArray[i].archive = false;
            newArray[i].trash = false;
            newArray[i].pinned = result.data.data;
            this.setState({
              notes: newArray
            })
          }
        }

      })
      .catch((error) => {
      });
  }

  deleteNote = (noteId) => {
    const obj = {
      noteID: noteId,
    }
    deleteNoteForever(obj)
      .then((result) => {
        let newArray = this.state.notes
        for (let i = 0; i < newArray.length; i++) {
          if (newArray[i]._id === obj.noteID) {
            newArray.splice(i, 1);
            this.setState({
              notes: newArray
            })
          }
        }
      })
      .catch((error) => {
        // NotificationManager.error(error);
        alert(error)
      });
  }

//   addLabelToNote = (noteId, value) => {
//     const addLabel = {
//         noteID: noteId,
//         label: value
//     }
//     saveLabel('/saveLabelToNote', addLabel)
//         .then((result) => {
//             console.log("labellllllllllllll", result);

//             let newArray = this.state.notes
//             for (let i = 0; i < newArray.length; i++) {
//                 if (newArray[i]._id === noteId) {
//                     newArray[i].label = result.data.data;
//                     this.setState({
//                         notes: newArray
//                     })
//                 }
//             }
//         })
//         .catch((error) => {
//             NotificationManager.error(error);
//             // alert(error)
//         });
// }
// deleteLabelFromNote = (value, noteId) => {
//     const deleteLabel = {
//         pull: true,
//         value: value,
//         noteID: noteId
//     }
//     saveLabel('/saveLabelToNote', deleteLabel)
//         .then((result) => {
//             let newArray = this.state.notes
//             for (let i = 0; i < newArray.length; i++) {
//                 if (newArray[i]._id === noteId) {
//                     newArray[i].label = result.data.data;
//                     this.setState({
//                         notes: newArray
//                     })
//                 }
//             }
//         })
//         .catch((error) => {
//             NotificationManager.error(error);
//             // alert(error)
//         });
// }
// makeLabelFalse = () => {
//     this.setState({ label: false })
// }

  render() {
    let notesArray = otherArray(this.state.notes);
    let cardsView = this.props.noteProps ? "listCards" : "cards";
    if (this.props.navigateArchived) {
      return (
        <ArchivedNavigator
          archiveArray={archiveArray(this.state.notes)}
          othersArray={otherArray}
          getColor={this.getColor}
          noteProps={this.props.noteProps}
          reminder={this.reminderNote}
          archiveNote={this.archiveNote}
          pinNote={this.pinNote}
          addLabelToNote={this.addLabelToNote}
          deleteLabelFromNote={this.deleteLabelFromNote}
          editTitle={this.editTitle}
          editDescription={this.editDescription}
        />
      );
    } else if (this.props.navigateTrashed) {
      return (
        <TrashNavigator
          trashArray={trashArray(this.state.notes)}
          othersArray={otherArray}
          getColor={this.getColor}
          noteProps={this.props.noteProps}
          reminder={this.reminderNote}
          trashNote={this.trashNote}
          pinNote={this.pinNote}
          deleteNote={this.deleteNote}
          addLabelToNote={this.addLabelToNote}
          deleteLabelFromNote={this.deleteLabelFromNote}
          editTitle={this.editTitle}
          editDescription={this.editDescription}
        />
      );
    } else if (this.props.navigateReminder) {
      return (
        <ReminderNavigator
          reminderArray={reminderArray(this.state.notes)}
          othersArray={otherArray}
          getColor={this.getColor}
          noteProps={this.props.noteProps}
          reminder={this.reminderNote}
          trashNote={this.trashNote}
          pinNote={this.pinNote}
          archiveNote={this.archiveNote}
          addLabelToNote={this.addLabelToNote}
          deleteLabelFromNote={this.deleteLabelFromNote}
          editTitle={this.editTitle}
          editDescription={this.editDescription}
        />
      )
    }
    return (
      <div className="root">
        <MuiThemeProvider theme={theme}>
          {notesArray.length === 0 && pinArray(this.state.notes).length === 0 ?
            <div className="NoteDiv">
              <div id="blurimage3">
                <img src={require('../assets/menuNote.svg')} alt="note icon"
                  style={{ width: "inherit" }}
                />
              </div>
              <div id="text3" style={{ fontFamily: "georgia", color: "grey", fontSize: "25px", width: "inherit" }}>
                Notes you add appear here
                                    </div>
            </div>
            :
            null
          }
          {pinArray(this.state.notes).length !== 0 ?
            <PinAndOthers
              createNotePropsToTools={this.getColor}
              pinArray={pinArray(this.state.notes)}
              pinNote={this.pinNote}
              othersArray={otherArray(this.state.notes)}
              getColor={this.getColor}
              noteProps={this.props.noteProps}
              reminder={this.reminderNote}
              trashNote={this.trashNote}
              archiveNote={this.archiveNote}
              uploadImage={this.uploadImage}
              editTitle={this.editTitle}
              editDescription={this.editDescription}
              addLabelToNote={this.addLabelToNote}
              deleteLabelFromNote={this.deleteLabelFromNote}
            />
            :
            <div className="CardsView">
              {Object.keys(notesArray)
                .slice(0)
                .reverse()
                .map(key => {
                  return (
                    <div key={key}>
                      <Card
                        className={cardsView}
                        id="notesfont"
                        style={{
                          backgroundColor: notesArray[key].color,
                          borderRadius: "15px",
                          border: "1px solid #dadce0",

                        }}
                      >
                        <div>
                          <div
                            onClick={() => this.handleClick(notesArray[key])}
                            style={{
                              display: "flex",
                              justifyContent: "space-between"
                            }}
                          >
                            <b> {notesArray[key].title}</b>
                          </div>
                          <div>
                            <EditPin
                              cardPropsToPin={this.pinNote}
                              noteID={notesArray[key]._id}
                              pinStatus={notesArray[key].pinned}
                            />
                          </div>
                          <div
                            onClick={() => this.handleClick(notesArray[key])}
                            style={{ paddingBottom: "10px", paddingTop: "10px" }}
                          >
                            {notesArray[key].description}
                          </div>
                        </div>

                        {/* <div id="dispNote">
                         <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            wordBreak: "break-word"
                          }}
                        >
                          <b> {notesArray[key].title}</b>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            wordBreak: "break-word"
                          }}
                        >
                          {notesArray[key].description}
                        </div> 
                      </div>*/}
                        <div>
                          {/* <img src={clockIcon} alt="clockIcon" /> */}
                          {notesArray[key].reminder ? (
                            <Chip
                              label={notesArray[key].reminder}
                              onDelete={() =>
                                this.reminderNote("", notesArray[key]._id)
                              }
                            />
                          ) : null}

                          {/* {notesArray[key].label.length > 0 ?
                            notesArray[key].label.map((key1, index) =>
                              <div key={index} >
                                <Chip
                                  label={key1}
                                  onDelete={() => this.deleteLabelFromNote(key1, notesArray[key]._id)}
                                />
                              </div>
                            )
                            :
                            null} */}
                        </div>
                        <div className="displaycontentdiv">
                          <Tools id="noteToolSize"
                            createNotePropsToTools={this.getColor}
                            noteID={notesArray[key]._id}
                            note={notesArray[key].note}
                            reminder={this.reminderNote}
                            archiveNote={this.archiveNote}
                            archiveStatus={notesArray[key].archive}
                            trashNote={this.trashNote}
                            trashStatus={notesArray[key].trash}
                            addLabelToNote={this.addLabelToNote}
                            deleteLabelFromNote={this.deleteLabelFromNote}
                            // showNotification={this.addNotification}
                          />
                        </div>
                      </Card>
                    </div>
                  );
                })}
            </div>
          }
          <DialogBox
            ref={this.cardsToDialogBox}
            close={this.handleClose}
            parentProps={this.state.openDialog}
            handleEdit={this.handleClick}
            closeEditBox={this.closeDialogBox}
            editTitle={this.editTitle}
            editDescription={this.editDescription}
            createNotePropsToTools={this.getColor}
            reminderNote={this.reminderNote}
            // showNotification={this.addNotification}
            archiveNote={this.archiveNote}
            trashNote={this.trashNote}
            ispinned={this.ispinned}
            addLabelToNote={this.addLabelToNote}
            deleteLabelFromNote={this.deleteLabelFromNote}
          />
        </MuiThemeProvider>
      </div>
    );
  }
}
