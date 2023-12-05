import './App.css';

import AlbumCardList from './Components/AlbumCardList';
import Header from './Components/Header';
import {data} from './db';

function App() {
    return (
        <main className='app'>
            <Header>Music Collector</Header>
            <AlbumCardList data={data} />
        </main>
    );
}

export default App;
