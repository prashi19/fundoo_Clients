import React from "react";
import { shallow } from "enzyme";
import ForgotPassword from "../screens/forgot";
import "/home/admin1/fundoo/Client/src/setupTest.js";
/**
 * describe what we are testing
 **/
describe("ForgotPassword Component", () => {
  /**
   * make our assertion and what we expect to happen
   **/
  it("should render without throwing an error", () => {
    expect(shallow(<ForgotPassword />).exists()).toBe(true);
  });
  /**
   * within the ForgotPassword components describe function
   **/
  it("renders a email input", () => {
    expect(shallow(<ForgotPassword />).find("#input1").length).toEqual(1);
  });
  /**
   * within the ForgotPassword components describe function
   **/
  describe("Email input", () => {
    it("should respond to change event and change the state of the ForgotPassword Component", () => {
      const wrapper = shallow(<ForgotPassword />);
      wrapper.find("#input1").simulate("change", {
        target: {
          name: "Email",
          value: "prashi@gmail.com"
        }
      });
      expect(wrapper.state("Email")).toEqual("prashi@gmail.com");
    });
  });
});
