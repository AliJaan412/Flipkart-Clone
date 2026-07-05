import { createContext, useState, useEffect } from 'react';
import { getProfile } from '../service/api';

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

    useEffect(() => {
        if (!token) return;
        getProfile().then((response) => {
            if (!response) logout();
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <LoginContext.Provider value={{ account, token, login, logout }}>
            {children}
        </LoginContext.Provider>
    )
}

export default ContextProvider;