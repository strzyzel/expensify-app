import { createStore } from 'redux';

const incrementCount = ({ incrementBy = 1 } = {}) => ({ 
    type: "INCREMENT",
    incrementBy
});

const decrementCount = ({ decrementBy = 1 } = {}) => ({ 
    type: "DECREMENT",
    decrementBy
});

const setCount = ({ count } = {}) => ({
    type: "SET",
    count
});

const resetCount = () => ({
    type: "RESET",
    count: 0
});

const store = createStore((state = { count: 0}, action) => {
    switch (action.type) {
        case "INCREMENT":
            return {
                count: state.count+action.incrementBy
            };
        case "DECREMENT":
            return {
                count: state.count-action.decrementBy
            };
        case "RESET":
            return {
                count: 0
            }
        case "SET":
            return {
                count: action.count
            }
        default:
            return state;
    }
});
console.log(store.getState());
store.dispatch(incrementCount({ incrementBy: 10}));
store.dispatch(decrementCount());
store.dispatch(resetCount());
store.dispatch(setCount({ count: 101 }))
console.log(store.getState());
