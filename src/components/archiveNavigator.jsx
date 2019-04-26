import React, { Component } from "react";
import {
  Card,
  MuiThemeProvider,
  createMuiTheme,
  Chip,
  Snackbar,
  IconButton
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import Tools from "../components/tools";
import DialogBox from "../components/cardDialog";
// import { archiveArray } from '../services/noteServices';
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
export default class ArchivedNavigator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openSnackBar: false,
      open:false,
    };
    this.cardsToDialogBox = React.createRef();
  }
  openDialog = (key) => {
    this.cardsToDialogBox.current.getData(key)
    this.setState({
      open: true
    })
  }
  close = () => {
    this.setState({
      open: false
    })
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
    let cardsView= this.props.noteProps ? "listCards" : "cards";
    return(
      <div>
        {
          this.props.archiveArray.length<1?
        <div>
         
        </div>
        :
        <div>
          <MuiThemeProvider theme={theme}>
        <div>
          <div className="archive_cardview">
            {this.props.archiveArray.map(key => {
              return (
                <Card 
                onClick={this.props.onClick}
                  className={cardsView}
                  style={{
                    backgroundColor: key.color,
                    borderRadius: "15px",
                    border: "1px solid #dadce0",
                    wordBreak: "break-word"
                  }}
                >
                  <div className="DispCont">
                    <div onClick={()=>this.openDialog(key)}
                      style={{
                        display: "flex",
                        justifyContent: "space-between"
                      }}
                    >
                      <b> {key.title}</b>
                    </div>
                    <div onClick={()=>this.openDialog(key)} style={{ paddingBottom: "10px", paddingTop: "10px" }}>
                      {key.description}
                    </div>
                    {key.reminder ? (
                      <Chip
                        label={key.reminder}
                        onDelete={() => this.props.reminder("", key._id)}
                      />
                    ) : null}
                  </div>
                  <div id="displaycontentdiv">
                    <Tools
                      createNotePropsToTools={this.props.getColor}
                      note={key}
                      noteID={key._id}
                      reminder={this.props.reminder}
                      trashNote={this.props.trashNote}
                      archiveStatus={key.archive}
                      archiveNote={this.props.archiveNote}
                    />
                  </div>
                </Card>
              );
            })}
            <DialogBox
              ref={this.cardsToDialogBox}
              parentProps={this.state.open}
              close={this.close}
              archiveNote={this.props.archiveNote}
              reminder={this.props.reminderNote}
              trashNote={this.props.trashNote}
              editTitle={this.props.editTitle}
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
          </div>
          }
      </div>
      
    );
  }
}
