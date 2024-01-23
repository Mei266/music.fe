import { useContext, useEffect, useState } from 'react';
import PlayListItem from './PlayListItem';
import { baseApi } from '../../constant';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

function PlayList() {
    const [playlist, setPlaylist] = useState([]);

    const { state } = useContext(AuthContext);
    useEffect(() => {
        axios.get(`${baseApi}/playlist/author/${state['userid']}`).then((res) => {
            setPlaylist(res.data);
        });
    }, []);

    return (
        <div
            style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center',
                paddingBottom: '40px',
            }}
        >
            {playlist.map((item, idx) => {
                return (
                    <PlayListItem
                        description={item.description}
                        id={item.id}
                        title={item.title}
                        musics={item.music_list}
                    />
                );
            })}
        </div>
    );
}

export default PlayList;
