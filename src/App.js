import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { publicRoutes } from './route';
import DefaultLayout from './Layout/DefaultLayout';
import { Fragment } from 'react';
import GlobalStyles from './components/GlobalStyles';
import { AuthContextProvider } from '../src/context/AuthContext';
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
    return (
        <GoogleOAuthProvider clientId="273793571512-hvctv3lqojvl6ud9es26oso7cke6f0in.apps.googleusercontent.com">
            <AuthContextProvider>
                <BrowserRouter>
                    <Routes>
                        {publicRoutes.map((route, index) => {
                            const Page = route.element;
                            let Layout = DefaultLayout;

                            if (route.layout) {
                                Layout = route.layout;
                            } else if (!route.layout) {
                                Layout = Fragment;
                            }

                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        <GlobalStyles>
                                            <Layout>
                                                <Page />
                                            </Layout>
                                        </GlobalStyles>
                                    }
                                />
                            );
                        })}
                    </Routes>
                </BrowserRouter>
            </AuthContextProvider>
        </GoogleOAuthProvider>
    );
}

export default App;
