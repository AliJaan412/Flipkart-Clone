import { createContext, useState } from 'react';

export const LoginContext = createContext(null);

const ContextProvider = ({children}) => {

    const [ account, setAccount ] = useState(() => localStorage.getItem('account') || '');
    const [ token, setToken ] = useState(() => localStorage.getItem('token') || '');

    const login = (username, authToken) => {
        localStorage.setItem('account', username);
        localStorage.setItem('token', authToken);
        setAccount(username);
        setToken(authToken);
    };

    const logout = () => {
        localStorage.removeItem('account');
        localStorage.removeItem('token');
        setAccount('');
        setToken('');
    };

    return (
        <LoginContext.Provider value={{ account, token, login, logout }}>
            {children}
        </LoginContext.Provider>
    )
}

export default ContextProvider;