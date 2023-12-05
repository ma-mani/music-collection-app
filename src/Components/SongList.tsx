import './SongList.css';

import {Track} from '../types/data';

interface Props {
    tracks: Track[];
}

const SongList = ({tracks}: Props) => {
    return (
        <>
            {tracks.map((track) => {
                return (
                    <div key={track.id} className='tracks'>
                        <span>
                            {track.track_number}. {track.name}
                        </span>
                        <span>{track.duration}</span>
                    </div>
                );
            })}
        </>
    );
};

export default SongList;
