/****************************************************************************************
 *  @Purpose        :  To create a dashboard and it contains other components.
 *  @file           : dashboard.jsx
 *  @author         : RRASHANTH S
 *  @version        : v0.1
 *  @since          : 22-03-2019
 *****************************************************************************************/
import React, { Component } from "react";
import "../App.css";
import PrimarySearchAppBar from "../components/appbar";
import CreateNotes from "../components/createNote";
export default class DashBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slideCards: false
    };
    this.slideCards = this.slideCards.bind(this);
  }

  slideCards() {
    try {
      this.setState({ slideCards: !this.state.slideCards });
    } catch (err) {
      console.log("error at slideCards in dashBoard");
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
        <div className="dash_content">
          <CreateNotes />
        </div>
      </div>
    );
  }
}
