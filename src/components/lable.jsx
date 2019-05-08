import React, { Component } from 'react';
import { MenuItem, Popper, Paper, Fade, Checkbox } from '@material-ui/core';
import { getLabels } from '../services/noteServices';
// import { NotificationManager } from 'react-notifications';
export default class NoteLabels extends Component {
    constructor() {
        super();
        this.state = {
            anchorEl: null,
            open: false,
            placement: null,
            label: [],
            labelName: ""
        }
    }
    addLabelPopup = () => {
        this.setState(state => ({
            anchorEl: this.props.anchorEl,
            open: !state.open,
        }));
    }
    componentDidMount() {
        getLabels()
            .then((result) => {
                this.setState({
                    label: result.data.data
                })
                // console.log("getLabels result from back-end", result);
            })
            .catch((error) => {
                // NotificationManager.error(error);
                alert(error)
            });
    }
    showLabels = (value) => {
        // console.log("show lablesssssssssss",value);
        this.setState({
            label: [...this.state.label, value]
        })
    }
    closeLabelPopper = () => {
        this.setState({
            open: false
        })
    }

    selectLabel(noteID, label) {
        this.setState({
            open: false,
        })
        this.props.addLabelToNote(noteID, label)
    }
    render() {
        let displayLabels = this.state.label;
        // console.log("display labels-->", displayLabels);
        if (this.state.label !== "") {
            displayLabels = this.state.label.filter(x => x.label.includes(this.state.labelName)).map((key, i) =>
                <MenuItem style={{ display: "flex", flexDirection: "row", }}>
                    <Checkbox onClick={() => this.selectLabel(this.props.noteID, key.label)} key={i} />
                    <div style={{ color: "black", marginRight: "50px", fontFamily: "arial", fontSize: "1rem", marginBottom: "10px", marginTop: "10px" }}>
                        {key.label}
                    </div>
                </MenuItem>
            )
        }
        const { anchorEl, open } = this.state;
        return (
            <div>
                <Popper open={open} anchorEl={anchorEl} placement={'right'} transition style={{ zIndex: 5500 }}>
                    {({ TransitionProps }) => (
                        <Fade {...TransitionProps} timeout={0}>
                            <Paper className="moreOptionsPopper" style={{ paddingTop: "10px" }}>
                                {/* <ClickAwayListener onClick={() => this.closeLabelPopper()}> */}
                                <div style={{ color: "#3c4043", fontSize: "15px", fontWeight: "500", fontFamily: "'Roboto',arial,sans-serif", paddingLeft: "10px", paddingRight: "10px" }}>
                                    Label Note
                                        <div className="closeLabel" onClick={this.closeLabelPopper}>
                                        <img src={require("../assets/close.svg")} alt="close"></img>

                                    </div>
                                </div>
                                <div>
                                    <input className="LabelSearch" style={{paddingTop:"10px"}}
                                        id="LabelSearchInput"
                                        maxLength="50"
                                        placeholder="enter the label name"
                                        value={this.state.labelName}
                                        onChange={(e) => { this.setState({ labelName: e.target.value }) }}
                                    />
                                    <div className="searchLabel" style={{paddingTop:"10px"}}>
                                        <img src={require("../assets/search.svg")} alt="search"></img>
                                    </div>
                                </div>
                                <div>
                                    {displayLabels}
                                </div>
                                {/* </ClickAwayListener> */}
                            </Paper>
                        </Fade>
                    )}
                </Popper>
            </div>
        )
    }
}