import { Avatar, Button } from '@mui/material';
import { FaPlayCircle } from 'react-icons/fa';
import { BsThreeDots } from 'react-icons/bs';
import { CiHeart } from 'react-icons/ci';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { baseApi, rootBackend } from '../../constant';
import { AuthContext } from '../../context/AuthContext';

function Aritst() {
    const [artist, setArtist] = useState(null);
    const [musics, setMusics] = useState(null);
    const [refesh, setRefesh] = useState(0);
    const [follow, setFollow] = useState(null);
    const { state, playMusic } = useContext(AuthContext);

    const { id } = useParams();

    useEffect(() => {
        axios.get(`${baseApi}/artist/${id}/popular`).then((res) => {
            setArtist(res.data.artist);
            setMusics(res.data.music_list);
        });
    }, []);

    useEffect(() => {
        axios.get(`${baseApi}/user/${state['userid']}/follow`).then((res) => {
            setFollow(res.data);
        });
    }, [refesh]);

    const handleAddFollow = () => {
        axios.post(`${baseApi}/follow`, { user: state['userid'], artist: id }).then((res) => {
            // setRefeshHeart(refeshHeart + 1);
            setRefesh(refesh + 1);
        });
    };

    const handleRemoveFollow = () => {
        axios.post(`${baseApi}/follow/delete`, { user: state['userid'], artist: id }).then((res) => {
            // setRefeshHeart(refeshHeart + 1);
            setRefesh(refesh + 1);
        });
    };

    return (
        <div style={{ color: 'white' }}>
            <div style={{ height: '280px', display: 'flex', alignItems: 'center' }}>
                <Avatar
                    sx={{ width: '208px', height: '208px', margin: '0 38px' }}
                    alt="Artist"
                    src={`${rootBackend}${artist?.image}`}
                />
                <div>
                    <h1 style={{ fontSize: '48px' }}>{artist?.name}</h1>
                    <span>Number listen</span>
                </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <FaPlayCircle style={{ margin: '0 48px 0 38px', width: '64px', height: '64px' }} />
                {follow?.find((item) => item.id === artist.id) ? (
                    <Button
                        onClick={handleRemoveFollow}
                        size="small"
                        sx={{ color: 'white', borderColor: 'white', textTransform: 'none', borderRadius: '20px' }}
                        variant="outlined"
                    >
                        Following
                    </Button>
                ) : (
                    <Button
                        onClick={handleAddFollow}
                        size="small"
                        sx={{ color: 'white', borderColor: 'white', textTransform: 'none', borderRadius: '20px' }}
                        variant="outlined"
                    >
                        Follow
                    </Button>
                )}
                <BsThreeDots style={{ width: '34px', height: '34px', marginLeft: '48px' }} />
            </div>
            <div style={{ padding: '0 38px' }}>
                <div style={{ fontSize: '30px', fontWeight: '600', margin: '28px 0' }}>Popular</div>
                {musics?.map((item, idx) => {
                    return (
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                padding: '6px 38px 6px 0',
                                margin: '10px 0',
                            }}
                        >
                            <div style={{ width: '8%', textAlign: 'center' }}>{idx + 1}</div>
                            <div style={{ width: '10%' }}>
                                <img
                                    style={{ width: '38px', height: '38px' }}
                                    src={`${rootBackend}${item?.image}`}
                                    alt="image"
                                />
                            </div>
                            <div style={{ width: '40%' }}>{item?.name}</div>
                            <div style={{ width: '20%' }}>{item?.number_listens}</div>
                            <div style={{ width: '8%' }}>
                                <CiHeart style={{ width: '24px', height: '24px' }} />
                            </div>
                            <div style={{ width: '8%' }}>{item?.duration}</div>
                            <div style={{ width: '8%' }}>
                                <BsThreeDots />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Aritst;
