import React from 'react';
import { Input, MuiThemeProvider, createMuiTheme, Chip } from '@material-ui/core';
import PropTypes from 'prop-types';
import Tools from '../components/tools';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import EditPin from "../components/editpin";
const theme = createMuiTheme({
  overrides: {
    MuiDialog: {
      paper: {
        borderRadius: "20px",
        // boxShadow: "0 3px 5px rgba(0, 0, 0, 0.20)",
        overflowY: "inherit",
        border: "none",
      }
    },
    MuiBackdrop:
    {
      root: {
        backgroundColor: "rgba(11, 11, 11, 0.18)"
      }
    },
    MuiInputBase:
    {
      multiline: {
        padding: "9px 30px 7px",
        wordBreak: "break-word"
      }
    },
    MuiChip: {
      root: {
        fontSize: "12px",
        height: "30px",
        backgroundColor: "rgba(0, 0, 0, 0.10)",
        cursor: "zoom-in",
        marginTop: "15px"
      }
    },
  },
  typography: {
    useNextVariants: true,
  },
})
class ResponsiveDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      note: "",
      title: "",
      description: "",
      color: "",
      archive: "",
      _id: "",
      reminder: "",
      label: "",
      editdate: "",
    };
    this.getData = this.getData.bind(this);
    this.handleTitleClick = this.handleTitleClick.bind(this);
    this.handleDescClick = this.handleDescClick.bind(this);
  }
  async handleTitleClick(evt) {
    await this.setState({ title: evt.target.value })
  }
  async handleDescClick(evt) {
    await this.setState({ description: evt.target.value })
  }
  handleClose = (event) => {
    this.props.editTitle(this.state._id, this.state.title);
    this.props.editDescription(this.state._id, this.state.description);
    this.props.close();
  }

  async DeleteLabel(label, id) {
    let newArr = this.state.label;
    newArr = newArr.filter(item => item !== label);
    await this.setState({
      label: newArr
    });
    this.props.deleteLabelFromNote(label, id)
  }
  getData(note) {
    console.log("note in dialog==>", note);
    var date = note.updatedAt;
    date = new Date(date).toString().split(' ');
    var dd = date[1] + " " + date[2];

    console.log("note date===>", date);
    if (note.title !== undefined || note.description !== undefined) {
      this.setState({
        note: note,
        title: note.title,
        color: note.color,
        description: note.description,
        archive: note.archive,
        _id: note._id,
        reminder: note.reminder,
        label: note.label,
        editdate: dd,
      })
      console.log("edited date===>", dd);

    }
  }
  archiveNote = (value, noteId) => {
    this.setState({ archive: value })
    this.props.archiveNote(value, noteId)
    this.props.close();
  }
  reminderNote = (value, noteId) => {
    this.setState({ reminder: value })
    this.props.reminderNote(value, noteId)
  }

  trashNote = (value, noteId) => {
    this.setState({ trash: value })
    this.props.trashNote(value, noteId)
    this.props.close();
  }

  ispinned = (value, noteID) => {
    this.setState({ pinned: value })
    this.props.ispinned(value, noteID);
  }

  createNotePropsToTools = (value, noteID) => {
    console.log("note id in dialog---->", noteID);
    this.setState({ color: value })
    this.props.createNotePropsToTools(value, noteID)
  }
  render() {
    return (
      <div>
        <MuiThemeProvider theme={theme}>
          <Dialog
            open={this.props.parentProps}
          >
            <div id="dialogbox" style={{ backgroundColor: this.state.color, width: "600px", padding: "16px" }} >
              <div className="createNotePinIcon1">
                <Input
                  className="dialogInputBase"
                  disableUnderline={true}
                  placeholder="Title"
                  multiline
                  value={this.state.title}
                  onChange={this.handleTitleClick}
                />
                <div>
                  <EditPin
                    initialpinstatus={this.state.pinned}
                    noteID={this.state._id}
                    pinstatus={this.ispinned}
                  />
                </div>
              </div>
              <div className="createNotePinIcon2">
                <Input
                  className="dialogInputBase"
                  disableUnderline={true}
                  placeholder="Note"
                  multiline
                  value={this.state.description}
                  onChange={this.handleDescClick}
                />
              </div>
              <div>
                {this.state.reminder ?
                  <Chip id="chipcss"
                    label={this.state.reminder}
                    onDelete={() => this.reminderNote("", this.state._id)}
                  />
                  :
                  null}

                {this.state.label.length > 0 ?
                  this.state.label.map((key1, index) => (
                    <Chip
                      label={key1}
                      onDelete={() => this.DeleteLabel(key1, this.state._id)}
                    />
                  ))
                  : null
                }
              </div>
              <div className="editdate" fontSize="10px">
                <i>Edited{" "}
                  {
                    this.state.editdate
                  }</i>
              </div>
              <div className="cardToolsClose1">
                <Tools
                  createNotePropsToTools={this.createNotePropsToTools}
                  reminder={this.reminderNote}
                  archiveStatus={this.state.archive}
                  archiveNote={this.archiveNote}
                  noteID={this.state._id}
                  trashNote={this.trashNote}
                  trashStatus={this.state.trash}
                  addLabelToNote={this.props.addLabelToNote}
                  deleteLabelFromNote={this.props.deleteLabelFromNote}

                />
                <Button id="dibut" onClick={this.handleClose}>close</Button>
              </div>
            </div>
          </Dialog>
        </MuiThemeProvider>
      </div>
    );
  }
}
ResponsiveDialog.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
};
export default (ResponsiveDialog);