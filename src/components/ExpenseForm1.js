import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/initialize';
export default class ExpenseForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            description: props.expense ? props.expense.description :  '',
            note: props.expense ? props.expense.note : '',
            amount: props.expense ? (props.expense.amount/100).toString() : '',
            createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
            calendarFocused: false,
            error: undefined
        }

    }
    
    
    onTextInputChange = (e) => {
        const state = {}; state[e.target.name] = e.target.value;
        this.setState(() => state);
    };
    
    onAmountChange = (e) => {
        const amount = e.target.value;
        if(!!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
            this.setState(() => ( { amount } ));
        };
    };

    onDateChange = (createdAt) => {
        if(createdAt) this.setState(() => ({ createdAt }));
    };

    onFocusChange = ({focused}) => {
        this.setState(() => ({ calendarFocused: focused }))
    };

    onSubmit = (e) => {
        e.preventDefault();
        if (!this.state.description || !this.state.amount) {
            this.setState(()=> ({ error: "Provide required values." }));
        } else {
            this.setState(()=> ({ error: undefined }));
            this.props.onSubmit({
                'description': this.state.description,
                'amount': parseFloat(this.state.amount, 10)*100,
                createdAt: this.state.createdAt.valueOf(),
                note: this.state.note
            })
        }
    };
    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    {this.state.error && <p>{this.state.error}</p>}
                    <input
                        type="text"
                        name="description"
                        placeholder="Description"
                        autoFocus
                        value={this.state.description}
                        onChange={this.onTextInputChange}
                    />
                    <input
                        type="text"
                        name="amount"
                        placeholder="Amount"
                        value={this.state.amount}
                        onChange={this.onAmountChange}
                    />
                    <SingleDatePicker 
                        date={this.state.createdAt}
                        onDateChange={this.onDateChange}
                        focused={this.state.calendarFocused}
                        onFocusChange={this.onFocusChange}
                        numberOfMonths={1}
                        isOutsideRange={() => {
                            return false;
                        }}
                    />
                    <textarea 
                        name="note"
                        placeholder="Add a note for your expense (optional)"
                        value={this.state.note}
                        onChange={this.onTextInputChange}
                    ></textarea>
                    <button>Submit</button>
                </form>
            </div>
        )
    }
}