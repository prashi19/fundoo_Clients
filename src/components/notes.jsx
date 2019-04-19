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
  updateArchiveStatus,
  updateTrashStatus,
  updateDescription,
  updateTitle
} from "../services/noteServices";
import DialogBox from "../components/cardDialog";
import ArchivedNavigator from "../components/archiveNavigator";
import TrashNavigator from "../components/trashNavigator";
import ReminderNavigator from "../components/reminderNavigator"
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
      openDialog: false
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
        />
      );
    }else if(this.props.navigateReminder){
      return(
        <ReminderNavigator
        reminderArray={reminderArray(this.state.notes)}
        othersArray={otherArray}
        getColor={this.getColor}
        noteProps={this.props.noteProps}
        reminder={this.reminderNote}
        trashNote={this.trashNote}
        />
      )
    }
    return (
      <div className="root">
        <MuiThemeProvider theme={theme}>
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
                        />
                      </div>
                    </Card>
                  </div>
                );
              })}
          </div>
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
            archiveNote={this.archiveNote}
            trashNote={this.trashNote}
          />
        </MuiThemeProvider>
      </div>
    );
  }
}
