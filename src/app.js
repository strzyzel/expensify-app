import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter'
import configureStore from './store/configureStore';
import { addExpense, removeExpense, editExpense } from './actions/expenses';
import { setTextFilter, sortByAmount, sortByDate, setStartDate, setEndDate } from './actions/filters';
import getVisibleExpenses from './selectors/expenses';
import 'normalize-css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';

const store = configureStore();

const expenseOne = store.dispatch(addExpense({
    description: "Cigarettes",
    note: "Per month",
    amount: 300,
    createdAt: new Date().getTime()
}));

const expenseTwo = store.dispatch(addExpense({
    description: "Alcohol",
    note: "Per month",
    amount: 1000,
    createdAt: new Date().getTime()
}));

const expenseThree = store.dispatch(addExpense({
    description: "Balcony",
    note: "Lol",
    amount: 2000,
    createdAt: 12049012
}));


//store.dispatch(removeExpense({ id: expenseOne.expense.id }))
store.dispatch(sortByAmount());
//store.dispatch(setStartDate(121049013));
console.log(getVisibleExpenses(store.getState().expenses, store.getState().filters))

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));
