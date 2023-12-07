import {useEffect, useState} from 'react';
import useLocalStorageState from 'use-local-storage-state';

import AlbumList from '../Components/AlbumList';
import {Album} from '../types/data';

const Home = () => {
    const baseURL = 'https://neuefische-spotify-proxy.vercel.app/api';
    const [isLoading, setIsLoading] = useState<Boolean>(false);
    const [data, setData] = useState<Album[]>([]);

    const [savedAlbumIds, setSavedAlbumIds] = useLocalStorageState<string[]>(
        'savedAlbumIds',
        {
            defaultValue: [],
        },
    );

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
                    onToggleId={handleToggleSavedAlbum}
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
