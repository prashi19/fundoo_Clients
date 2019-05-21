/*******************************************************************************************************
 *  @Purpose        : Here we have to create the cards view for displaying cards in list and grid view.
 *  @file           : cardsView.jsx       
 *  @author         : PRASHANTH S
 *  @version        : v0.1
 *******************************************************************************************************/
import React, { Component } from 'react';
import { IconButton, Tooltip } from '@material-ui/core';
export default class cardsView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            view: false
        }
        this.handleCardsView = this.handleCardsView.bind(this);
    }
    /**
     * @description:it handle the list and grid view event
     * @param {*event for viewing the cardViewIcon} evt 
     */
    handleCardsView = (evt) => {

        evt.preventDefault();
        this.setState({ view: !this.state.view });
        // console.log("haisabshjasbasbjk");

        this.props.appPropstoCardsView();

    }
    render() {
        return (
            this.state.view ?
                <div>
                    <IconButton id="cardViewIcon">
                        <Tooltip title="List View" onClick={this.handleCardsView}>
                            <img src={require('../assets/list.svg')} alt="grid icon" />
                        </Tooltip>
                    </IconButton>
                </div>
                :
                <div>
                    <IconButton id="cardViewIcon">
                        <Tooltip title="Grid View" onClick={this.handleCardsView}>
                            <img src={require('../assets/grid.svg')} alt="grid icon" />
                        </Tooltip>
                    </IconButton>
                </div>
        )
    }
}