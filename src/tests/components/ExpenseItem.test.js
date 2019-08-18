import React from 'react';
import { shallow } from 'enzyme';
import ExpenseListItem from '../../components/ExpenseItem';
import { expenses } from '../fixtures/expenses';
test('should render Expense Item correctly', () => {
    const wrapper = shallow(<ExpenseListItem {...expenses[0]}/>);
    expect(wrapper).toMatchSnapshot();
});