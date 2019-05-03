/****************************************************************************************
 *  @Purpose        :  To create a dashboard and it contains other components.
 *  @file           : dashboard.jsx
 *  @author         : PRASHANTH S
 *  @version        : v0.1
 *  @since          : 22-03-2019
 *****************************************************************************************/
import React, { Component } from "react";
import "../App.css";
import PrimarySearchAppBar from "../components/appbar";
import CreateNotes from "../components/createNote";
import Notes from "../components/notes";
import { askForPermissioToReceiveNotifications } from '../push-notification';
export default class DashBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slideCards: false,
      cardStyles: false,
      reminder: false,
      archive: false,
      trash: false,
      label:"",
    };
    this.slideCards = this.slideCards.bind(this);
    this.getNewNote = this.getNewNote.bind(this);
    this.handlecardStyles = this.handlecardStyles.bind(this);
    this.noteToCards = React.createRef();
    console.log();
  }

  slideCards = () => {
    try {
      this.setState({ slideCards: !this.state.slideCards });
    } catch (err) {
      console.log("error at slideCards in dashBoard");
    }
  };
  handlecardStyles = () => {
    console.log("result in handle styles------------>");
    this.setState({ cardStyles: !this.state.cardStyles });
  };

  getNewNote(newCard) {
    console.log("new card", newCard);
    try {
      this.noteToCards.current.displayNewCard(newCard);
    } catch (err) {
      console.log("error at getNewNote in dashBoard");
    }
  }

  handleNavigation = (reminder, archive, trash) => {
    if (archive === true || trash === true || reminder===true) {
      this.setState({ archive: archive, trash: trash ,reminder :reminder });
    } else {
      this.setState({ archive: false, trash: false , reminder:false});
    }
  };


  componentWillMount=()=>{
    askForPermissioToReceiveNotifications();
  }

  render() {
    const slidingCards = this.state.slideCards ? "afterSlide" : "beforeSlide";
    return (
      <div className={slidingCards}>
        <div>
          <PrimarySearchAppBar
            props={this.props}
            slideCards={this.slideCards}
            notePropsToApp={this.handlecardStyles}
            handleNavigation={this.handleNavigation}               
          />
        </div>
        
          {this.state.archive || this.state.trash ? (
            <div id="dashboard_navigation">
              <Notes
                noteProps={this.state.cardStyles}
                ref={this.noteToCards}
                navigateArchived={this.state.archive}
                navigateTrashed={this.state.trash}
                navigateReminder={this.state.reminder}                
              />
            </div>
          ) : (
              <div id="dashboard_createdisp">
                <CreateNotes getNewNote={this.getNewNote} />
                <Notes
                  noteProps={this.state.cardStyles}
                  ref={this.noteToCards}
                  navigateArchived={this.state.archive}
                  navigateTrashed={this.state.trash}
                  navigateReminder={this.state.reminder}
                  labelValue={this.state.label}
                />
              </div>
            )}
        </div>
    );
  }
}
