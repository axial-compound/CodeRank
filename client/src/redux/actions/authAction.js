export const loginSuccess = (userId,username,token) => ({
    type: 'LOGIN_SUCCESS',
    payload: {userId,username,token},
});

export const logout = () => ({
    type: 'LOGOUT'
});