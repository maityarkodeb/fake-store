import { useState, useEffect } from 'react';
import Login from './Login';
import Store from './Store';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    checkIfLoggedIn();
  }, []);

  const checkIfLoggedIn = () => {
    if (localStorage.getItem("login-token") === null) {
      setIsLoggedIn(false);
    } else {
      setIsLoggedIn(true);
    }
  }

  return (
    <div>
      {!isLoggedIn ? <Login loggedIn={checkIfLoggedIn} /> : <Store loggedIn={checkIfLoggedIn} />}
    </div>
  );
}

export default App;
