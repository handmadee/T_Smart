// NetworkStatusContext.js
import React, { createContext, useState, useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';

const NetworkStatusContext = createContext();

const NetworkStatusProvider = ({ children }) => {
    const [isConnected, setIsConnected] = useState(true);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            setIsConnected(state.isConnected);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <NetworkStatusContext.Provider value={isConnected}>
            {children}
        </NetworkStatusContext.Provider>
    );
};

export { NetworkStatusContext, NetworkStatusProvider };
