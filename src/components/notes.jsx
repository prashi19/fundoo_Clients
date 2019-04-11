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
  updateArchiveStatus,
  updateTrashStatus
} from "../services/noteServices";
import AlertDialog from "../components/cardDialog";
import "../App.css";

const theme = createMuiTheme({
  overrides: {
    MuiChip: {
      root: {
        fontSize: 14,
        marginTop: 20,
        height: 25,
        backgroundColor: "rgba(0, 0, 0, 0.10)",
        padding: 0
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
    this.setState({ openDialog: true });
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

  render() {
    let notesArray = otherArray(this.state.notes);
    let cardsView = this.props.noteProps ? "listCards" : "cards";
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
                      style={{
                        backgroundColor: notesArray[key].color,
                        borderRadius: "15px",
                        border: "1px solid #dadce0"
                      }}
                    >
                      <div id="dispNote">
                        <div
                          onClick={this.handleOpenDialog}
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
                      </div>
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
                      <div id="displaycontentdiv">
                        <Tools
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
        </MuiThemeProvider>
        <AlertDialog open={this.state.openDialog} />
      </div>
    );
  }
}
