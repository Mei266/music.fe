import DefaultLayout from '../Layout/DefaultLayout';
import CreatePlayList from '../pages/createplaylist';
import Heart from '../pages/heart';
import Home from '../pages/home';
import PlayList from '../pages/listplaylist';
import Login from '../pages/login';
import Profile from '../pages/profile';
import Register from '../pages/register';

export const publicRoutes = [
    { path: '/', element: Login },
    { path: '/register', element: Register },
    { path: '/user/profile', element: Profile, layout: DefaultLayout },
    { path: '/home', element: Home, layout: DefaultLayout },
    { path: '/heart', element: Heart, layout: DefaultLayout },
    { path: '/playlist/:id', element: CreatePlayList, layout: DefaultLayout },
    { path: '/playlist', element: PlayList, layout: DefaultLayout },
];
