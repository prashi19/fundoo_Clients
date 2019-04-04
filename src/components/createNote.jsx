import React, { Component } from "react";
import "../App.css";
import {
  Input,
  Card,
  createMuiTheme,
  MuiThemeProvider,
  Button,Chip
} from "@material-ui/core";
import { createNote } from "../services/noteServices";
import Tools from "./tools";

const theme = createMuiTheme({
  overrides: {
    MuiPaper: {
      rounded: {
        borderRadius: "15px"
      },
      elevation1: {
        boxShadow: "0 3px 5px rgba(0,0,0,0.20)"
      }
    }
  },
  typography: {
    useNextVariants: true
  }
});
export default class CreateNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openNote: false,
      title: "",
      description: "",
      reminder: "",
      archive: false,
      color: "rgb(255, 255, 255)",
      newNote: {}
    };
    this.handleTitle = this.handleTitle.bind(this);
    this.handleDescription = this.handleDescription.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleColor = this.handleColor.bind(this);
    this.handleReminder = this.handleReminder.bind(this);
    this.handleArchive = this.handleArchive.bind(this);
  }

  handleTitle(evt) {
    try {
      this.setState({ title: evt.target.value });
    } catch (err) {
      console.log("error at handleTitle in createNotes");
    }
  }
  handleDescription(evt) {
    try {
      this.setState ({ description: evt.target.value });
    } catch (err) {
      console.log("error at handleDescription in createNotes");
    }
  }
  handleColor(value) {
    try {
      this.setState({ color: value });
    } catch (err) {
      console.log("error at handleColor in createNotes");
    }
  }

  handleReminder(value) {
    try {
      this.setState({ reminder: value });
    } catch (err) {
      console.log("error at handleReminder in createNotes");
    }
  }
  reminderNote = () => {
    this.setState({ reminder: "" })
}

handleArchive(value) {
  try {
      this.setState({ archive: value });
  } catch (err) {
      console.log("error at handleArchive in createNotes");
  }
}

  handleToggle() {
    try {
      this.setState({ openNote: !this.state.openNote });
      if (
        this.state.title !== "" ||
        this.state.description !== "" ||
        this.state.color !== "rgb(255, 255, 255)"
      ) {
        const note = {
          userId: localStorage.getItem("user_id"),
          title: this.state.title,
          description: this.state.description,
          color: this.state.color,
          reminder: this.state.reminder,
          archive: this.state.archive,
        };
        createNote(note)
          .then(result => {
            console.log("create note result from back-end====>", result);
            this.setState({
              newNote: result.data.data.note
            });
            this.props.getNewNote(this.state.newNote);
          })
          .catch(error => {
            alert(error);
          });
        this.setState({
          title: "",
          description: "",
          color: "rgb(255, 255, 255)",
          reminder: "",
          archive: false,
        });
      }
    } catch (err) {
      console.log("error at handleToggle in createNotes");
    }
  }

  render() {
    return !this.state.openNote ? (
      <MuiThemeProvider theme={theme}>
        <div id="createNoteParent">
          <Card className="createNote">
            <div className="staticCreateNote">
              <Input
                className="noteInputBase1"
                multiline
                disableUnderline={true}
                placeholder="Take a note..."
                id="description"
                readOnly={true}
                onClick={this.handleToggle}
                value=""
              />
            </div>
          </Card>
        </div>
      </MuiThemeProvider>
    ) : (
      <MuiThemeProvider theme={theme}>
        <div id="createNoteParent">
          <Card
            className="createNote1"
            style={{ backgroundColor: this.state.color }}
          >
            <div className="createNotePinIcon">
              <Input
                className="noteInputBase"
                multiline
                disableUnderline={true}
                id="title"
                placeholder="Title"
                value={this.state.title}
                onChange={this.handleTitle}
              />
            </div>
            <Input
              className="noteInputBase"
              multiline
              disableUnderline={true}
              placeholder="Take a note..."
              id="description"
              value={this.state.description}
              onChange={this.handleDescription}
            />
            {this.state.reminder ? (
              <Chip
                label={this.state.reminder}
                onDelete={() => this.reminderNote()}
              />
            ) : null}
            <div className="cardToolsClose">
              <Tools
                reminder={this.handleReminder}
                createNotePropsToTools={this.handleColor}
                archiveNote={this.handleArchive}
                archiveStatus={this.state.archive}
              />
              <Button id="close" onClick={this.handleToggle}>
                Close
              </Button>
            </div>
          </Card>
        </div>
      </MuiThemeProvider>
    );
  }
}
