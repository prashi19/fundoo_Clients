import React, { Component } from "react";
import { IconButton, Tooltip, Card } from "@material-ui/core";
/**
 * @description:Defining the colors using rgb-color code
 */
const colorCodesAndNames = [
  { name: "default", colorCode: "rgb(255, 255, 255)" },
  { name: "Red", colorCode: "rgb(242,139,130)" },
  { name: "Orange", colorCode: "rgb(247,188,2)" },
  { name: "Yellow", colorCode: "rgb(252,244,117)" },
  { name: "Green", colorCode: "rgb(204,255,143)" },
  { name: "Teal", colorCode: "rgb(167,255,235)" },
  { name: "Blue", colorCode: "rgb(203,240,248)" },
  { name: "Dark Blue", colorCode: "rgb(174,203,250)" },
  { name: "Purple", colorCode: "rgb(215,174,251)" },
  { name: "Pink", colorCode: "rgb(251,207,232)" },
  { name: "Brown", colorCode: "rgb(230,201,168)" },
  { name: "Gray", colorCode: "rgb(232,234,237)" }
];
export default class ColorBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHovering: false
    };
    this.handleMouseHover = this.handleMouseHover.bind(this);
  }

  /**
   * @description:it will handle the selecting color event
   * @param {*changing color event} event
   */
  handleColor = event => {
    try {
      console.log("changing color", this.props.noteID);
      this.props.toolsPropsToColorpallete(
        event.target.value,
        this.props.noteID
      );
    } catch (err) {
      console.log("error at handleColor in colorBox");
    }
  };

  handleMouseHover() {
    this.setState(this.toggleHoverState);
  }

  toggleHoverState(state) {
    return {
      isHovering: !state.isHovering
    };
  }

  render() {
    const changeCardColor = colorCodesAndNames.map(colorKey => (
      <Tooltip title={colorKey.name}>
        <IconButton
          style={{ backgroundColor: colorKey.colorCode, margin: "2px" }}
          value={colorKey.colorCode}
          onClick={this.handleColor}
        />
      </Tooltip>
    ));
    return (
      <div
        className="ColorBox"
        onMouseEnter={this.handleMouseHover}
        onMouseLeave={this.handleMouseHover}
      >
        <Tooltip title="Change Color">
          <img
            src={require("../assets/colorBox.svg")}
            id="ToolButton"
            alt="change color"
          />
        </Tooltip>
        <div>
          {this.state.isHovering ? (
            <Card className="colorPalleteCard">{changeCardColor}</Card>
          ) : null}
        </div>
      </div>
    );
  }
}
