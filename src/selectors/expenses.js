import moment from 'moment';
export default (expenses, { text, sortBy, startDate, endDate }) => {
    return expenses.filter((expense) => {
        const createdAt = moment(expense.createdAt);
        const startDateMatch = startDate ? createdAt.isSameOrAfter(startDate, 'day') : true;
        const endDateMatch = endDate ? createdAt.isSameOrBefore(endDate, 'day') : true;
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());
        return startDateMatch && endDateMatch && textMatch;
    }).sort((a, b) => {
        if(sortBy === 'date') {
            return a.createdAt < b.createdAt ? 1 : -1;
        } else if(sortBy === 'amount') {
            return a.amount < b.amount ? 1 : -1;
        }
    });
};