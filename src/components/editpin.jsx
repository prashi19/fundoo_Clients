import React, { Component } from 'react';
// import { Tooltip } from '@material-ui/core';
export default class EditPin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isPinned: false
        }
        this.handleClick = this.handleClick.bind(this);
    }
    /**
     * @description:it will shows the pin status whether it is pinned or not
     */
    componentWillMount() {
        try {
            if (typeof this.props.pinStatus !== "undefined") {
                this.setState({
                    isPinned: this.props.pinStatus
                })
            }
        } catch (err) {
            console.log("error at componentWillMount in editPin");
        }
    }
    /**
     * @description:it will handles the pin event
     */
    async handleClick() {
        try {
            await this.setState({ isPinned: this.props.pinStatus });
            await this.setState({ isPinned: !this.state.isPinned });
            this.props.cardPropsToPin(this.state.isPinned, this.props.noteID)
        } catch (err) {
            console.log("error at handleClick in editPin");
        }
    }
    render() {
        // const { isPinned } = this.state;
        return (
            <div>
                {/* {this.props.pinStatus ?
                    <Tooltip title="Unpin Note" onClick={() => this.handleClick()}>
                        <img src={require('../assets/pinAfter.svg')}
                            alt="pinIcon" />
                    </Tooltip>
                    :
                    <Tooltip title="Pin Note" onClick={() => this.handleClick()}>
                        <img src={require('../assets/pinBefore.svg')}
                            alt="pinIcon" />
                    </Tooltip>
                } */}
            </div>
        )
    }
}
