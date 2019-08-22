import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';
const ExpenseListItem = ({ id, description, amount, createdAt }) => {
    return (<div>
        <Link to={`/edit/${id}`}>
            <p>Description: {description}</p>
        </Link>
        <p>Amount: {numeral(amount / 100).format('$0,0.00')}</p>
        <p>Created at: {moment(createdAt).format('MMMM Do, YYYY')}</p>
    </div>)
};

export default ExpenseListItem;