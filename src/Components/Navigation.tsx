import './Navigation.css';

import SongList from './SongList';

const Navigation = () => {
    return (
        <nav className='navigation'>
            <ul>
                <li>
                    <a href='#home'>Home</a>
                </li>
                <li>
                    <a href='#search'>Search</a>
                </li>
                <li>
                    <a href='#albums'>Albums</a>
                </li>
            </ul>
        </nav>
    );
};

export default Navigation;
