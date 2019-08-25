import { 
    startAddExpense, 
    addExpense, 
    editExpense, 
    startEditExpense, 
    removeExpense, 
    startRemoveExpense, 
    setExpenses, 
    startSetExpenses 
} from '../../../src/actions/expenses';
import { expenses } from '../fixtures/expenses';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import database from '../../firebase/firebase';

const uid = 'testuid';
const defaultAuthState = { auth: { uid }};
const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
    const expensesData = {};
    expenses.forEach(({ id, description, note, amount, createdAt}) => {
        expensesData[id] = { description, note, amount, createdAt };
    });
    database.ref(`users/${uid}/expenses`).set(expensesData).then(() => done());
})

test('should setup remove expense action object', () => {
    const action = removeExpense({ id: "someId" });
    expect(action).toEqual({
        type: "REMOVE_EXPENSE",
        id: "someId"
    });
});

test('should remove expense from firebase', (done) => {
    const store = createMockStore(defaultAuthState);
    const action = startRemoveExpense({ id: expenses[2].id });
    store.dispatch(action).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: "REMOVE_EXPENSE",
            id: expenses[2].id
        });
        return database.ref(`users/${uid}/expenses/${expenses[2].id}`).once('value')
    }).then(snapshot => {
        expect(snapshot.val()).toBeFalsy();
        done();
    });
});

test('should setup edit expense action object', () => {
    const action = editExpense("someId", { note: "New note"});
    expect(action).toEqual({
        type: "EDIT_EXPENSE",
        id: "someId",
        updates: { note: "New note" }
    });
});

test('should edit expense in the database', (done) => {
    const store = createMockStore(defaultAuthState);
    const action = startEditExpense(expenses[1].id, { amount: 2137 });
    store.dispatch(action).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: "EDIT_EXPENSE",
            id: expenses[1].id,
            updates: { amount: 2137 }
        });
        return database.ref(`users/${uid}/expenses/${expenses[1].id}`).once('value')
    }).then(snapshot => {
        expect(snapshot.val().amount).toBe(2137);
        done();
    });
});

test('should setup add expense action object with provided values', () => {
    const action = addExpense(expenses[2]);
    expect(action).toEqual({
        type: "ADD_EXPENSE",
        expense: expenses[2]
    });
});

test('should add expense to database and store', (done) => {
    const store = createMockStore(defaultAuthState);
    const expenseData = {
      description: 'Mouse',
      amount: 3000,
      note: 'This one is better',
      createdAt: 1000
    };
  
    store.dispatch(startAddExpense(expenseData)).then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({ 
          type: 'ADD_EXPENSE',
          expense: {
              id: expect.any(String),
              ...expenseData
          }
      });
      database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value')
        .then((snapshot) => {
            expect(snapshot.val()).toEqual(expenseData);
            done();
        });
    });
  });


test('should add expense with default values to database and store', (done) => {
    const store = createMockStore(defaultAuthState);
    const expenseDefaults = {
      description: '',
      amount: 0,
      note: '',
      createdAt: 0
    };
  
    store.dispatch(startAddExpense({})).then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({ 
          type: 'ADD_EXPENSE',
          expense: {
              id: expect.any(String),
              ...expenseDefaults
          }
      });
      database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value')
        .then((snapshot) => {
            expect(snapshot.val()).toEqual(expenseDefaults);
            done();
        });
    });
});

test('should setup set expense action object with data', () => {
    const action = setExpenses(expenses);
    expect(action).toEqual({
      type: 'SET_EXPENSES',
      expenses
    });
  });  

  test('should fetch expenses from database', (done) => {
      const store = createMockStore(defaultAuthState);
      store.dispatch(startSetExpenses()).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'SET_EXPENSES',
            expenses
        });
        done();
      });
  });