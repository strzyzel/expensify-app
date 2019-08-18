import React from 'react';
import ExpenseForm from '../../components/ExpenseForm';
import moment from 'moment';
import { shallow } from 'enzyme';
import { expenses } from '../fixtures/expenses';
test('should render expense form page correctly', () => {
    const wrapper = shallow(<ExpenseForm />);
    expect(wrapper).toMatchSnapshot();
});

test('should rended ExpenseForm correctly with expense data', () => {
    const wrapper = shallow(<ExpenseForm expense={expenses[1]} />);
    expect(wrapper).toMatchSnapshot();
});

test('should render error if invalid form', () => {
    const wrapper = shallow(<ExpenseForm />);
    expect(wrapper).toMatchSnapshot();
    wrapper.find('form').simulate('submit', {
        preventDefault: () => { }
    });
    expect(wrapper.state('error').length).toBeGreaterThan(0);
    expect(wrapper).toMatchSnapshot();
});

test('should set description on input change', () => {
    const value = "New description";
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find("input").at(0).simulate('change', {
        target: { value }
    });
    expect(wrapper.state("description")).toBe(value);
});

test('should set note on input change', () => {
    const value = "New note";
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find("textarea").simulate('change', {
        target: { value }
    });
    expect(wrapper.state("note")).toBe(value);
});

test('should set amount if valid input', () => {
    const value = "120.11";
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find("input").at(1).simulate('change', {
        target: { value }
    });
    expect(wrapper.state("amount")).toBe(value);
});

test('should not set amount if invalid input', () => {
    const value = "120.1091";
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find("input").at(1).simulate('change', {
        target: { value }
    });
    expect(wrapper.state("amount")).toBe("");
});

test('should call onSubmit for valid form submission', () => {
    const onSubmitSpy = jest.fn();
    const wrapper = shallow(<ExpenseForm  expense={expenses[0]} onSubmit={onSubmitSpy}/>);
    wrapper.find('form').simulate('submit', {
        preventDefault: () => { }
    });
    expect(wrapper.state("error")).toBe("");
    expect(onSubmitSpy).toHaveBeenLastCalledWith({
        description: expenses[0].description,
        amount: expenses[0].amount,
        note: expenses[0].note,
        createdAt: expenses[0].createdAt
    })
});

test('should set new date on date change', () => {
    const now = moment();
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('withStyles(SingleDatePicker)').prop('onDateChange')(now);
    expect(wrapper.state('createdAt')).toEqual(now);
});

test('should set true on focus change', () => {
    const focused = true;
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('withStyles(SingleDatePicker)').prop('onFocusChange')( {focused });
    expect(wrapper.state('calendarFocused')).toBe(focused);
});