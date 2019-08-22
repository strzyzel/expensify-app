import React from 'react';
import { shallow } from 'enzyme';
import { ExpensesSummary } from '../../components/ExpensesSummary';

test('should correctly render summary with one expense', () => {
    const wrapper = shallow(<ExpensesSummary expenseCount={1} expensesTotal={252}/>);
    expect(wrapper).toMatchSnapshot();
});

test('should correctly render summary with multiple expenses', () => {
    const wrapper = shallow(<ExpensesSummary expensesCount={3} expensesTotal={500}/>);
    expect(wrapper).toMatchSnapshot();
});