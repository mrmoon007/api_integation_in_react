import './styles/globals.css'
import { useRoutes } from 'react-router-dom';
import routes from './routes/route';

function App() {

  const  isLoggedIn  = localStorage.getItem('accessToken');
    //const  isLoggedIn  = false;

    const routing = useRoutes(routes(isLoggedIn));

    return (
        <>
            {routing}
        </>
    );
}

export default App
