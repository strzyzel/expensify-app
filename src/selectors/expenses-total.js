export default (expenses) => {
    return expenses.length > 0 ? expenses.reduce((a,b) => a+b.amount, 0) : 0; 
};