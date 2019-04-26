import React, { Component } from 'react';
import Archiveicon from '../assets/menuArchive.svg';
import { Snackbar, IconButton, Tooltip } from '@material-ui/core';
// import CloseIcon from '@material-ui/icons/Close';
export default class Archive extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            isArchived: false,
            snackBarMessage: "",
            openSnackBar: false,
        }

        this.handleArchive=this.handleArchive.bind(this)
    }
  async  handleArchive (){
        console.log("(this.props.archiveStatusd", this.state.isArchived);
        if (this.props.archiveStatus === false) {
           // this.state.isArchived = true;
          await this.setState({ isArchived: true });
            this.setState({
                openSnackBar: true,
                snackBarMessage: "Note Archived"
            });
            console.log("this.state.isArchived changed", this.state.isArchived);
            this.props.archiveNote(this.state.isArchived, this.props.noteID)
        }
        else {
          //  this.state.isArchived = false;
          await  this.setState({ isArchived: false });
            console.log(" this.state.isArchived changle else", this.state.isArchived);
            this.props.archiveNote(this.state.isArchived, this.props.noteID)
        }
    }
    /**
    * @description:use to auto close snackBar
    */
    handleSnackClose = () => {
        try {
            this.setState({
                openSnackBar: false
            })
        } catch (err) {
            console.log("error at handleSnackClose in login");
        }
    };
    render() {
        // const { open } = this.state.open;
        return (
            this.state.isArchived ?
                <div>
                    <img 
                    // src={require("../assets/archive.jsx")}
                    src={Archiveicon}
                        onClick={
                            this.handleArchive
                        }
                     alt="archive note icon"
                    className="archiveIcon"
                    />
                    <Snackbar
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        open={this.state.openSnackBar}
                        autoHideDuration={3000}
                        onClose={this.handleSnackClose}
                        variant="error"
                        ContentProps={{
                            'aria-describedby': 'message-id',
                        }}
                        message={<span id="message-id">  {this.state.snackBarMessage}</span>}
                        action={[
                            <div >
                                <IconButton
                                    key="close"
                                    aria-label="Close"
                                    color="inherit"
                                    onClick={this.handleSnackClose}
                                >
                                    {/* <CloseIcon /> */}
                                </IconButton>
                            </div>
                        ]}
                    />
                </div>
                :
                <div>
                    <Tooltip title="Archive Note" onClick={
                        this.handleArchive
                    }>
                        <img 
                        // src={require("../assets/archive.jsx")}
                        //{Archiveicon}
                        src={Archiveicon}
                            alt="archive note icon"
                        />
                    </Tooltip>
                </div>
        )
    }
}