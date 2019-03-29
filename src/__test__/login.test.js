import React from 'react';
import {shallow} from 'enzyme';
import Login from '../screens/login';
import '/home/admin1/fundoo/Client/src/setupTest.js'
/**
 * describe what we are testing
 **/
describe('Login Component', () => {
  /**
   * make our assertion and what we expect to happen 
   **/
  it('should render without throwing an error', () => {
    expect(shallow( < Login / > ).exists()).toBe(true)
  })
  /**
   * within the Login components describe function
   **/
  it('renders a email input', () => {
    expect(shallow( < Login / > ).find('#input1').length).toEqual(1)
  })
  it('renders a password input', () => {
    expect(shallow( < Login / > ).find('#input').length).toEqual(1)
  })
  /**
   * within the Login components describe function
   **/
  describe('Email input', () => {
    it('should respond to change event and change the state of the Login Component', () => {
      const wrapper = shallow( < Login / > );
      wrapper.find('#input1').simulate('change', {
        target: {
          name: 'Email',
          value: 'prashi@gmail.com'
        }
      });
      expect(wrapper.state('Email')).toEqual('prashi@gmail.com');
    })
  })
  describe('Password input', () => {
    it('should respond to change event and change the state of the Login Component', () => {
      const wrapper = shallow( < Login / > );
      wrapper.find('#input')
        .simulate('change', {
          target: {
            name: 'Password',
            value: '123456'
          }
        });
      expect(wrapper.state('Password')).toEqual('123456');
    })
  })
})