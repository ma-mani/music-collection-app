import './App.css';

import {useEffect, useState} from 'react';

import AlbumList from './Components/AlbumList';
import Header from './Components/Header';
import SearchBar from './Components/SearchBar';
import {Album} from './types/data';

function App() {
    const [data, setData] = useState<Album[]>([]);
    const [isLoading, setIsLoading] = useState<Boolean>(false);
    const [queryName, setQueryName] = useState('');
    const [currentPage, setCurrentPage] = useState('FEATURE');

    const handleSearchName = (data: string) => {
        setQueryName(data);
        setCurrentPage('SEARCHED');
    };

    useEffect(() => {
        async function fetchData() {
            const URL =
                currentPage === 'FEATURE'
                    ? 'https://neuefische-spotify-proxy.vercel.app/api/featured'
                    : `https://neuefische-spotify-proxy.vercel.app/api/search?artist=${queryName}`;
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
    }, [queryName, currentPage]);

    return (
        <main className='app'>
            {isLoading ? (
                <p style={{fontSize: 50}}>Is Loading ...</p>
            ) : (
                <>
                    <Header>Music Collector</Header>
                    <SearchBar onSearchName={handleSearchName} />
                    <AlbumList
                        data={data}
                        title={
                            currentPage === 'SEARCHED'
                                ? `Results for: ${queryName}`
                                : 'Featured'
                        }
                    />
                </>
            )}
        </main>
    );
}

export default App;
