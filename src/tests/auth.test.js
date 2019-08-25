import authReducer from '../reducers/auth';

test('should set uid after login', () => {
    const action = {
        type: "LOGIN",
        uid: "abcd"
    };
    const state = authReducer({}, action);
    expect(state.uid).toBe(action.uid);
});

test('should clear uid after logout', () => {
    const action = {
        type: "LOGOUT"
    };
    const state = authReducer('anything', action);
    expect(state).toEqual({});
});