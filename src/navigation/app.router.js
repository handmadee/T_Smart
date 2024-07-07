import React, { useContext, useState, useEffect } from "react";
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import Splash from "../../Splash";
import AuthNav from "./Auth.nav";
import HomeNav from "./Home.nav";
import { addAuth, authSelector } from "../redux/token/slice.token";
import { checkToken } from "../apis/authApi";
import { NetworkStatusContext } from "../redux/NetworkStatusContext";
import { showMessage } from "react-native-flash-message";

const AppRouters = () => {
    const isConnected = useContext(NetworkStatusContext);
    const [splash, setSplash] = useState(true);
    const { getItem } = useAsyncStorage('auth');
    const auth = useSelector(authSelector);
    const dispatch = useDispatch();

    const checkLogin = async () => {
        try {
            const res = await getItem();
            if (res) {
                const token = JSON.parse(res);
                console.log({
                    message: `Message now :: []`,
                    account: token
                })
                const accessTokenValid = await checkToken(token?.accesstoken);
                if (accessTokenValid) {
                    dispatch(addAuth(token));
                } else {
                    const refreshTokenValid = await checkToken(token?.refreshtoken);
                    if (refreshTokenValid) {
                        dispatch(addAuth(token));
                    }
                }
            }
        } catch (error) {
            console.log("Error checking login:", error);
        }
    };

    useEffect(() => {
        showMessage({
            message: isConnected ? 'Kết nối internet' : 'Không có kết nối internet',
            type: isConnected ? 'success' : 'danger',
        });
    }, [isConnected]);

    useEffect(() => {
        checkLogin();
        setTimeout(() => {
            setSplash(false);
        }, 3000);
    }, []);

    return (
        <>
            {splash ? (
                <Splash />
            ) : auth.accesstoken ? (
                <HomeNav />
            ) : (
                <AuthNav />
            )}
        </>
    );
}

export default AppRouters;
