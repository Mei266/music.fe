import DefaultLayout from '../Layout/DefaultLayout';
import CreatePlayList from '../pages/createplaylist';
import Heart from '../pages/heart';
import Home from '../pages/home';
import PlayList from '../pages/listplaylist';
import Login from '../pages/login';
import Lyric from '../pages/lyric';
import Profile from '../pages/profile';
import Register from '../pages/register';
import Search from '../pages/search';

export const publicRoutes = [
    { path: '/login', element: Login },
    { path: '/register', element: Register },
    { path: '/user/profile', element: Profile, layout: DefaultLayout },
    { path: '/', element: Home, layout: DefaultLayout },
    { path: '/search', element: Search, layout: DefaultLayout },
    { path: '/heart', element: Heart, layout: DefaultLayout },
    { path: '/playlist/:id', element: CreatePlayList, layout: DefaultLayout },
    { path: '/playlist', element: PlayList, layout: DefaultLayout },
    { path: '/lyric/:id', element: Lyric, layout: DefaultLayout },
];
