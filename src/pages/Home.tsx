import { useEffect, useState } from 'react';

import AlbumList from '../Components/AlbumList';
import { Album } from '../types/data';

interface Props {
    onToggleId: (id: string) => void;
    savedAlbumIds: string[];
}

const Home = ({onToggleId, savedAlbumIds}: Props) => {
    const baseURL = 'https://neuefische-spotify-proxy.vercel.app/api';
    const [isLoading, setIsLoading] = useState<Boolean>(false);
    const [data, setData] = useState<Album[]>([]);

    useEffect(() => {
        async function fetchData() {
            const URL = `${baseURL}/featured`;
            setIsLoading(true);
            try {
                const res = await fetch(URL);
                if (!res.ok) throw new Error('fetching does not work');
                const data = await res.json();
                setData(data);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchData();
    }, []);
    return (
        <>
            {isLoading ? (
                <p className='loader'></p>
            ) : (
                <AlbumList
                    onToggleId={onToggleId}
                    data={data}
                    title={'Featured'}
                    savedAlbumIds={savedAlbumIds}
                    emptyComponent={<p>No Albums :/</p>}
                />
            )}
        </>
    );
};

export default Home;
