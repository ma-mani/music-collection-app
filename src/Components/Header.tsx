import './Header.css';

interface Props {
    children: React.ReactNode;
}

const Header = ({children}: Props) => {
    return (
        <>
            <header className='header'>
                <h1>{children}</h1>
            </header>
        </>
    );
};

export default Header;
