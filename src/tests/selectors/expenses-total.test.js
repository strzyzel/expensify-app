import expensesTotal from '../../selectors/expenses-total';
import { expenses } from '../fixtures/expenses';

test('should return 0 if there is no expenses', () => {
    const result = expensesTotal([]);
    expect(result).toEqual(0);
});

test('should return total of single expense if there is only one in array', () => {
    const result = expensesTotal([expenses[0]]);
    expect(result).toEqual(expenses[0].amount);
});

test('should return total of multiple expenses', () => {
    const result = expensesTotal([expenses[0], expenses[1]]);
    expect(result).toEqual(expenses[0].amount + expenses[1].amount);
});