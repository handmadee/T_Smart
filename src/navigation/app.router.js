/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from "react";
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import Splash from "../../Splash";
import AuthNav from "./Auth.nav";
import { addAuth, authSelector } from "../redux/token/slice.token";
import HomeNav from "./Home.nav";
import { checkToken } from "../apis/authApi";



const AppRouters = () => {
    const [splash, setSplash] = React.useState(true);
    const { getItem } = useAsyncStorage('auth');
    const auth = useSelector(authSelector);
    const dispatch = useDispatch();

    React.useEffect(() => {
        checkLogin();
        setTimeout(() => {
            setSplash(false);
        }, 3000);
    }, []);

    // Check token 
    const checkLogin = async () => {
        const res = await getItem();
        console.log({
            res: res

        })
        const token = await JSON.parse(res).accesstoken;
        console.log(token)
        const isToken = await checkToken(token);
        isToken?.data?.isValid && dispatch(addAuth(JSON.parse(res)));
    };
    // Refesh token 

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
