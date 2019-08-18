import moment from 'moment';
import { setTextFilter, sortByAmount, sortByDate, setStartDate, setEndDate } from '../../actions/filters';

test('should set text as filter', () => {
    const result = setTextFilter('chujec');
    expect(result).toEqual({
        type: "SET_TEXT_FILTER",
        text: 'chujec'
    })
});

test('should set text as filter with default', () => {
    const result = setTextFilter();
    expect(result).toEqual({
        type: "SET_TEXT_FILTER",
        text: ''
    })
});

test('should set sort by amount action object', () => {
    const result = sortByAmount();
    expect(result).toEqual({
        type: "SORT_BY_AMOUNT"
    })
}); 

test('should set sort by date action object', () => {
    const result = sortByDate();
    expect(result).toEqual({
        type: "SORT_BY_DATE"
    })
}); 

test('should set start date action object', () => {
    const result = setStartDate(moment(0));
    expect(result).toEqual({
        type: "SET_START_DATE",
        startDate: moment(0)
    });
});

test('should set end date action object', () => {
    const result = setEndDate(moment(0));
    expect(result).toEqual({
        type: "SET_END_DATE",
        endDate: moment(0)
    });
});