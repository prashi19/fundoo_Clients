import React, { Component } from 'react';
import { MenuItem, Popper, Fade, Paper, Tooltip, ClickAwayListener, createMuiTheme, MuiThemeProvider } from "@material-ui/core";
const theme = createMuiTheme({
    overrides: {
        MuiPaper: {
            root: {
                margin: "0px",
                zIndex: "1"
            },
        },
    },
    typography: {
        useNextVariants: true,
    },
})
export default class TrashOptions extends Component {
    constructor() {
        super();
        this.state = {
            anchorEl: null,
            open: false,
            placement: null,
        }
    }
    /**
     * @description:it will open the more options event and in that 
                    we can select add the labels and delete notes operations
     * @param {*open the more options event} event 
     */
    clickMoreOptions = (event) => {
        try {
            const { currentTarget } = event;
            this.setState(state => ({
                anchorEl: currentTarget,
                open: !state.open,

            }));
        } catch (err) {
            console.log("error at clickMoreOptions in trashOption");
        }
    }
    /**
    * @description:it will close the color popper box
    */
    closeLabelPopper = () => {
        try {
            this.setState({
                open: false
            })
        } catch (err) {
            console.log("error at closeLabelPopper in trashOption");
        }
    }
    handleRestore = () => {
        this.closeLabelPopper();
        this.props.restore(false, this.props.noteID)

    }
    handleDelete = () => {
        this.closeLabelPopper();
        this.props.deleteNote(this.props.noteID)
    }
    render() {
        const { anchorEl, open } = this.state;
        return (
            <MuiThemeProvider theme={theme}>
                <div id="ToolButton">
                    <Tooltip title="More Options">
                        <img src={require('../assets/moreOption.svg')}
                            onClick={this.clickMoreOptions}
                            className="moreOptionsIcon"
                            alt="more options icon" />
                    </Tooltip>
                    <Popper open={open} anchorEl={anchorEl} placement={'bottom-start'} transition style={{ zIndex: 1 }}>
                        {({ TransitionProps }) => (
                            <Fade {...TransitionProps} timeout={0}>
                                <Paper className="moreOptionsPopper">
                                    <ClickAwayListener onClickAway={() => this.closeLabelPopper()}>
                                        <div id="moreOptionsMenu">
                                            <MenuItem id="moreOptionsMenu" onClick={this.handleRestore}>Restore Note</MenuItem>
                                            <MenuItem id="moreOptionsMenu" onClick={this.handleDelete}>Delete Forever</MenuItem>
                                        </div>
                                    </ClickAwayListener>
                                </Paper>
                            </Fade>
                        )}
                    </Popper>
                </div>
            </MuiThemeProvider>
        )
    }
}