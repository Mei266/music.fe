import axios from 'axios';
import React, { createContext, useEffect } from 'react';
import { baseApi } from '../constant';

export const AuthContext = createContext({});

/**
 * This is a provider for AuthContext.
 * It will handle the login and logout process.
 * You can use it like this: <AuthContextProvider>...</AuthContextProvider> and then you can use the AuthContext in your component.
 * For example: const { state, login, logout } = useContext(AuthContext);
 * state is an object that contains userId, token, username, isLogin.
 * login is a function that will set the userId, token, username, isLogin to true and save it to localStorage.
 * logout is a function that will set the userId, token, username, isLogin to false and remove it from localStorage.
 */
export const AuthContextProvider = ({ children }) => {
    const [musicId, setMusicId] = React.useState(null);
    const [isPlay, setIsPlay] = React.useState(false);
    const [isHeart, setIsHeart] = React.useState(false);
    const [isGift, setIsGift] = React.useState(false);
    const [isLogin, setIsLogin] = React.useState(localStorage.getItem('isLogin'));
    const [isBupple, setIsBupple] = React.useState(false);
    const [isAnh, setIsAnh] = React.useState(false);
    const [refeshA, setRefeshA] = React.useState(0);
    const [musics, setMusics] = React.useState([]);
    const [indexList, setIndexList] = React.useState(false);
    const [userid, setUserid] = React.useState(localStorage.getItem('userid'));
    // const [artists, setArtists] = React.useState([]);

    // useEffect(() => {
    //     axios.get(`${baseApi}/user/${userid}/follow`).then((res) => {
    //         console.log('userid: ', userid);
    //         console.log('ar: ', res.data);
    //         setArtists(res.data);
    //     });
    // }, [refeshA]);
    const musicNumber = 53;
    const normal = 2;
    const playMusic = (id, musics) => {
        setMusics(musics);
        setIsPlay(true);
        setMusicId(id);
    };
    const inGift = () => {
        setIsGift(true);
        setIsHeart(false);
    };

    const login = (userid) => {
        setIsLogin(true);
        setUserid(userid);
    };

    const addBupple = () => {
        setIsBupple(true);
    };

    const removeBupple = () => {
        setIsBupple(false);
    };

    const limited = () => {
        setIsAnh(true);
    };

    const insertAfterIdOne = (newItem) => {
        // console.log('newItem: ', newItem);
        // const newItem = song;
        if (newItem?.id != musicId) {
            const index = musics.findIndex((item) => item.id === musicId);
            const index_check = musics.findIndex((item) => item.id === newItem?.id);
            let updatedMusics = [...musics];
            if (index_check !== -1) {
                updatedMusics.splice(index_check, 1);
            }
            // const res = [...musics.slice(0, index + 1), newItem, ...musics.slice(index + 1)]; // Chèn newItem vào sau phần tử có id là 1
            updatedMusics.splice(index + 1, 0, newItem);
            console.log('updatedMusics: ', updatedMusics);
            setMusics(updatedMusics);
        }
    };

    const removeMusicsInQueue = (newItem) => {
        const index_check = musics.findIndex((item) => item.id === newItem?.id);
        if (index_check !== -1) {
            const tmp = musics;
            console.log('index_check: ', index_check);
            tmp.splice(index_check, 1);
            console.log('newQueue: ', musics);
            setMusics(tmp);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                state: {
                    musicId,
                    isPlay,
                    isHeart,
                    isGift,
                    isLogin,
                    isBupple,
                    musicNumber,
                    normal,
                    isAnh,
                    musics,
                    indexList,
                    userid,
                    refeshA,
                    // artists,
                },
                playMusic,
                inGift,
                login,
                addBupple,
                removeBupple,
                limited,
                setMusics,
                setMusicId,
                setIndexList,
                insertAfterIdOne,
                removeMusicsInQueue,
                setRefeshA,
                // setArtists,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
