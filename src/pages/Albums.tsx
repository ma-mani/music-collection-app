import {useEffect, useState} from 'react';
import useLocalStorageState from 'use-local-storage-state';

import AlbumList from '../Components/AlbumList';
import {Album} from '../types/data';

const Albums = () => {
    const [savedData, setSavedData] = useState<Album[]>([]);
    const [isLoading, setIsLoading] = useState<Boolean>(false);

    const [savedAlbumIds, setSavedAlbumIds] = useLocalStorageState<string[]>(
        'savedAlbumIds',
        {
            defaultValue: [],
        },
    );

    const baseURL = 'https://neuefische-spotify-proxy.vercel.app/api';

    const handleToggleSavedAlbum = (newId: string) => {
        if (savedAlbumIds.includes(newId)) {
            // remove id
            setSavedAlbumIds((prevAlbumIds) =>
                prevAlbumIds.filter((prevId) => prevId !== newId),
            );
        } else {
            // add id
            setSavedAlbumIds((prevAlbumIds) => [newId, ...prevAlbumIds]);
        }
    };

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
                    onToggleId={handleToggleSavedAlbum}
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
