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
export default class DashBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slideCards: false,
    };
    this.slideCards = this.slideCards.bind(this);
    this.getNewNote = this.getNewNote.bind(this);
    this.noteToCards = React.createRef();
  }

  slideCards() {
    try {
      this.setState({ slideCards: !this.state.slideCards });
    } catch (err) {
      console.log("error at slideCards in dashBoard");
    }
  }
  

  getNewNote(newCard) {
    console.log("new card", newCard);

    try {
      this.noteToCards.current.displayNewCard(newCard);
    } catch (err) {
      console.log("error at getNewNote in dashBoard");
    }
  }

  render() {
    const slidingCards = this.state.slideCards ? "afterSlide" : "beforeSlide";
    return (
      <div className={slidingCards}>
        <div>
          <PrimarySearchAppBar
            props={this.props}
            slideCards={this.slideCards}
          />
        </div>

        <div className="dashboard">
          <CreateNotes getNewNote={this.getNewNote} />
          <Notes ref={this.noteToCards} />
        </div>
      </div>
    );
  }
}
