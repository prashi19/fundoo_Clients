import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { ClickAwayListener } from "@material-ui/core";
import Tools from "../components/tools";

// import { ClickAwayListener } from '@material-ui/core/ClickAwayListener';

class AlertDialog extends React.Component {
  state = {
    open: false
  };
  handleClose = () => {
    this.setState({ open: true });
  };

  render() {
    const { open } = this.props;
    return (
      <div>
          <ClickAwayListener>
        <Dialog
          open={open}
        //   onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Use Google's location service?"}
          </DialogTitle>
          <Tools
                          createNotePropsToTools={this.getColor}
                        //   noteID={notesArray[key]._id}
                        //   note={notesArray[key].note}
                          reminder={this.reminderNote}
                          archiveNote={this.archiveNote}
                        //   archiveStatus={notesArray[key].archive}
                          trashNote={this.trashNote}
                        //   trashStatus={notesArray[key].trash}
                        />
          <DialogContent />
         
        </Dialog>
        </ClickAwayListener>
      </div>
    );
  }
}

export default AlertDialog;
