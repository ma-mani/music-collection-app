import './Navigation.css';

export type PageName = 'home' | 'search' | 'albums';

interface Props {
    onClickPage: (page: PageName) => void;
    currentPage: PageName;
}

const pageNames: PageName[] = ['home', 'search', 'albums'];

const Navigation = ({onClickPage, currentPage}: Props) => {
    return (
        <nav className='navigation'>
            <ul>
                {pageNames.map((pageName: PageName) => (
                    <li key={pageName}>
                        <a
                            className={currentPage === pageName ? 'active' : ''}
                            onClick={(event) => {
                                event.preventDefault();
                                onClickPage(pageName);
                            }}
                            href={`#${pageName}`}
                        >
                            {pageName}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Navigation;
