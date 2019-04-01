import React, { Component } from "react";
import { Card, MuiThemeProvider, createMuiTheme } from "@material-ui/core";
import Tools from "../components/tools";
import { getNotes, updateColor, otherArray } from "../services/noteServices";

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
      notes: []
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
  render() {
    let notesArray = otherArray(this.state.notes);
    // let cardsView = this.props.noteProps ? "listCards" : "cards";
    return (
      <MuiThemeProvider theme={theme}>
        <div >
          {Object.keys(notesArray)
            .slice(0)
            .reverse()
            .map(key => {
              return (
                <div key={key} id="gap">
                  <Card className="CardsView" style={{ backgroundColor: notesArray[key].color, borderRadius: "15px", border: "1px solid #dadce0"}}
                  >
                    <div>
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
                    </div>
                    <div id="displaycontentdiv">
                      <Tools
                        createNotePropsToTools={this.getColor}
                        noteID={notesArray[key]._id}
                        note={notesArray[key].note}
                      />
                    </div>
                  </Card>
                </div>
              );
            })}
        </div>
      </MuiThemeProvider>
    );
  }
}