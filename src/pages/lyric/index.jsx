import axios from "axios";
import { baseApi } from "../../constant";
import { useState } from "react";
import { useParams } from "react-router-dom";

function Lyric() {
    const [music, setMusic] = useState("")
    const { id } = useParams();
    axios.get(`${baseApi}/music/id`).then((res) => {
        setMusic(res.data)
    })
    return <div></div>;
}

export default Lyric;
