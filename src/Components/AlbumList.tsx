import './AlbumList.css';

import { Album } from '../types/data';
import AlbumCard from './AlbumCard';

interface Props {
    data: Album[];
    title: string;
}

const AlbumList = ({data, title}: Props) => {
    return (
        <div className='album'>
            <h2>{title}</h2>
            <ul className='albumlist'>
                {data.map((item) => (
                    <AlbumCard
                        key={item.id}
                        artist={item.artist}
                        title={item.title}
                        image={item.image}
                        tracks={item.tracks}
                    />
                ))}
            </ul>
        </div>
    );
};

export default AlbumList;
