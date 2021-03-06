import React, { Component } from "react";
import {
  Card,
  MuiThemeProvider,
  createMuiTheme,
  Snackbar,
  IconButton, Chip
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import TrashOptions from "../components/trashOption"

import DialogBox from "../components/cardDialog";
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
export default class TrashNavigator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openSnackBar: false
    };
  }
  /**
   * @description:use to auto close snackBar
   */
  handleSnackClose = () => {
    try {
      this.setState({
        openSnackBar: false
      });
    } catch (err) {
      console.log("error at handleSnackClose in login");
    }
  };
  render() {
    let cardsView = this.props.noteProps ? "listCards" : "cards";
    return (
      <MuiThemeProvider theme={theme}>
        <div>
          <label
            style={{
              fontFamily: "georgia",
              fontSize: "18px",
              color: "grey",
              marginRight: "760px"
            }}
          >
          </label>
          <div className="trash_cardview">
            {this.props.trashArray.reverse().map(key => {
              return (
                <Card
                  className={cardsView}
                  style={{
                    backgroundColor: key.color,
                    borderRadius: "15px",
                    border: "1px solid #dadce0",
                    wordBreak: "break-word"
                  }}
                >
                  <div className="DispCont">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between"
                      }}
                    >
                      <b> {key.title}</b>
                    </div>
                    <div style={{ paddingBottom: "10px", paddingTop: "10px" }}>
                      {key.description}
                    </div>
                    {/* {key.reminder ? (
                      <Chip
                        label={key.reminder}
                        onDelete={() => this.props.reminder("", key._id)}
                      />
                    ) : null} */}
                  </div>
                  <div>
                    {key.label.length > 0 ?
                      key.label.map((key1, index) =>
                        <div key={index} >
                          <Chip
                            label={key1}
                          />
                        </div>
                      )
                      :
                      null}
                  </div>
                  <div id="displaycontentdiv">
                    <TrashOptions
                      restore={this.props.trashNote}
                      noteID={key._id}
                      deleteNote={this.props.deleteNote}
                    />
                  </div>
                </Card>
              );
            })}
            <DialogBox
              ref={this.props.cardsToDialogBox}
              parentProps={this.props.openDialog}
              closeEditBox={this.props.closeEditBox}
              archiveNote={this.props.archiveNote}
              reminder={this.props.reminderNote}
              trashNote={this.props.trashNote}
              editDescription={this.props.editDescription}
              createNotePropsToTools={this.props.getColor}
            />
          </div>
          <Snackbar
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right"
            }}
            open={this.state.openSnackBar}
            autoHideDuration={6000}
            onClose={this.handleSnackClose}
            variant="error"
            ContentProps={{
              "aria-describedby": "message-id"
            }}
            message={<span id="message-id"> Note Unarchived</span>}
            action={[
              <div>
                <IconButton
                  key="close"
                  aria-label="Close"
                  color="inherit"
                  onClick={this.handleSnackClose}
                >
                  <CloseIcon />
                </IconButton>
              </div>
            ]}
          />
        </div>
      </MuiThemeProvider>
    );
  }
}
