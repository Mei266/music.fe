import { useState } from 'react';
import styles from './gift.css';
import { TypeAnimation } from 'react-type-animation';

function Gift() {
    const [isDisplay, setIsDisplay] = useState(false);
    return (
        <div>
            <div className="container">
                <div className="back">
                    <div className="topTriangle"></div>
                </div>

                <div
                    className="card"
                    onMouseEnter={() => {
                        setIsDisplay(true);
                    }}
                    onMouseLeave={() => {
                        setIsDisplay(false);
                    }}
                >
                    <div className="title1">♥</div>
                    {/* <div className="desc">Love From Nice</div> */}
                    <div className="desc">Message</div>
                    <div>
                        {isDisplay ? (
                            <TypeAnimation
                                sequence={[
                                    // 'Chúng ta đã đi cùng nhau cũng gần được 1000 days ùi ha, cũm có lúc vui, buồn, hạnh phúc, nhưm quan trọng là lúc nào chúm ta cũm có nhau. Có nhữm lúc do sự bướng bỉnh của anh mà đã làm iem phải bùn, cảm ưn iem zì vẫn kiên trì, iu thưn a. A sẽ iu iem nhìu hưn mỗi ngày. HAPPY 1000 DAYS',
                                    '',
                                    1000,
                                ]}
                                wrapper="span"
                                cursor={false}
                                repeat={Infinity}
                                style={{
                                    fontSize: '14px',
                                    display: 'inline-block',
                                    textAlign: 'center',
                                    color: 'pink',
                                    marginLeft: '4px',
                                }}
                            />
                        ) : (
                            ''
                        )}
                    </div>
                </div>

                <div className="front_container">
                    <div className="front"></div>
                </div>
            </div>
        </div>
    );
}

export default Gift;
