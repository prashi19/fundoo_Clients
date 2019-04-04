/****************************************************************************************
 *  @Purpose        : Here we have to create the tools that required in creating a note.
 *  @file           : tools.jsx       
 *  @author         : PRASHANTH S
 *  @version        : v0.1
 *  @since          : 30-03-2019
 *****************************************************************************************/
import React, { Component } from 'react';
import Reminder from '../components/reminder';
import ColorBox from '../components/colorBox';
import Archive from '../components/archive';
export default class Tools extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
        this.handleToggle = this.handleToggle.bind(this);
    }
    /**
     * @description:it will toggle color event
     */
    handleToggle() {
        try {
            this.setState({ open: !this.state.open });
        } catch (err) {
            console.log("error at handleToggle in tools");
        }
    }
    render() {
        // const setNoteTime = parseInt(new Date().getHours()) >= 8 ? "PM" : "AM";
        return (
          
                <div className="cardTools">
                    <Reminder
                        handleToggle={this.handleToggle}
                        // parentToolsProps={setNoteTime}
                        reminder={this.props.reminder}
                        noteID={this.props.noteID}
                    />
                   
                    <ColorBox
                        handleToggle={this.handleToggle}
                        toolsPropsToColorpallete={this.props.createNotePropsToTools}
                        noteID={this.props.noteID}
                    />
                  
                    <Archive
                        archiveNote={this.props.archiveNote}
                        noteID={this.props.noteID}
                        archiveStatus={this.props.archiveStatus}
                    />
                    
                </div>
        )
    }
}