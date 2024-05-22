import React, { useState, useEffect } from "react";
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import Splash from "../../Splash";
import AuthNav from "./Auth.nav";
import { addAuth, authSelector } from "../redux/token/slice.token";
import HomeNav from "./Home.nav";
import { checkToken } from "../apis/authApi";

const AppRouters = () => {
    const [splash, setSplash] = useState(true);
    const { getItem } = useAsyncStorage('auth');
    const auth = useSelector(authSelector);
    const dispatch = useDispatch();
    // Check token 
    const checkLogin = async () => {
        try {
            const res = await getItem();
            console.log("Hello")
            console.log(res)
            if (res) {
                const token = JSON.parse(res)?.accesstoken;
                if (token) {
                    const isToken = await checkToken(token);
                    console.log(isToken)
                    if (isToken) {
                        console.log(res)
                        dispatch(addAuth(JSON.parse(res)));

                    }
                }
            }
        } catch (error) {
            console.log(error)
        }
    };
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