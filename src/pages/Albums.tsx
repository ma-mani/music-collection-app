import { useEffect, useState } from 'react';

import AlbumList from '../Components/AlbumList';
import { Album } from '../types/data';

interface Props {
    onToggleId: (id: string) => void;
    savedAlbumIds: string[];
}

const Albums = ({onToggleId, savedAlbumIds}: Props) => {
    const [savedData, setSavedData] = useState<Album[]>([]);
    const [isLoading, setIsLoading] = useState<Boolean>(false);

    const baseURL = 'https://neuefische-spotify-proxy.vercel.app/api';

    useEffect(() => {
        async function fetchSavedData() {
            setIsLoading(true);
            try {
                const res = await fetch(
                    `${baseURL}/albums?ids=${JSON.stringify(savedAlbumIds)}`,
                );
                if (!res.ok) throw new Error('fetching does not work');
                const data = await res.json();
                setSavedData(data);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchSavedData();
    }, [savedAlbumIds]);

    return (
        <>
            {isLoading ? (
                <p className='loader'></p>
            ) : (
                <AlbumList
                    onToggleId={onToggleId}
                    data={savedData}
                    title={'Featured'}
                    savedAlbumIds={savedAlbumIds}
                    emptyComponent={<p>Here are your saved Albums</p>}
                />
            )}
        </>
    );
};

export default Albums;
