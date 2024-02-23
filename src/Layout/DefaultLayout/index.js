import styles from './styles.module.scss';
import classNames from 'classnames/bind';
import Navbar from '../Navbar';
import Header from '../Header';
import Footer from '../Footer';
import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    const { state } = useContext(AuthContext);

    // const navigate = useNavigate();
    // if(state['isLogin'] === false){
    //     console.log(state['isLogin'])
    //     navigate('/')
    // }
    return (
        <div className={cx('wrapper')}>
            <div className={cx('left')}>
                <Navbar />
            </div>
            <div className={cx('right')}>
                <Header />
                <div className={cx('right-content')}>{children}</div>
            </div>
            {state['isPlay'] ? <Footer /> : ''}
        </div>
    );
}

export default DefaultLayout;
