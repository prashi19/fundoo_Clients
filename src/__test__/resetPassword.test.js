import React from 'react';
import {
    shallow
} from 'enzyme';
import ResetPassword from '../screens/reset';
import '../setupTest.js'
/**
 * describe what we are testing
 **/
describe('ResetPassword Component', () => {
    /**
     * make our assertion and what we expect to happen 
     **/
    it('should render without throwing an error', () => {
        expect(shallow( < ResetPassword / > )
                .exists())
            .toBe(true)
    })
    /**
     * within the ResetPassword components describe function
     **/
    it('renders a password input', () => {
        expect(shallow( < ResetPassword / > ).find('#password').length).toEqual(1)
    })
    it('renders a newPassword password input', () => {
        expect(shallow( < ResetPassword / > ).find('#newPassword').length).toEqual(1)
    })
    /**
     * within the ResetPassword components describe function
     **/
    describe('Password input', () => {
        it('should respond to change event and change the state of the ResetPassword Component', () => {
            const wrapper = shallow( < ResetPassword / > );
            wrapper.find('#password')
                .simulate('change', {
                    target: {
                        name: 'Password',
                        value: '123456'
                    }
                });
            expect(wrapper.state('Password')).toEqual('123456');
        })
    })
    describe('newPasswordPassword input', () => {
        it('should respond to change event and change the state of the ResetPassword Component', () => {
            const wrapper = shallow( < ResetPassword / > );
            wrapper.find('#newPassword')
                .simulate('change', {
                    target: {
                        name: 'ConfirmPassword',
                        value: '123456'
                    }
                });
            expect(wrapper.state('ConfirmPassword')).toEqual('123456');
        })
    })
})