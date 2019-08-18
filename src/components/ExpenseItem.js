import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
const ExpenseListItem = ({ id, description, amount, createdAt }) => {
    return (<div>
        <Link to={`/edit/${id}`}><p>Description: {description}</p></Link>
        <p>Amount: {amount}</p>
        <p>Created at: {new Date(createdAt).toISOString()}</p>
    </div>)
};

export default ExpenseListItem;