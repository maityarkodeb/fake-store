import { useState, useEffect } from 'react';

function Store({loggedIn}) {
  const [fullName, setFullName] = useState("");

  useEffect(() => {
    setFullName(localStorage.getItem('fullname'));
  }, []);

  const handleLogOut = () => {
    localStorage.removeItem('login-token');
    localStorage.removeItem('fullname');
    localStorage.removeItem('user-id');
    loggedIn();
  }

  return (
    <div>
      <div>
        <h1>Store</h1>
        <h2>Welcome back {fullName}!</h2>
        <div>
          <button onClick={handleLogOut}>Log Out</button>
        </div>
      </div>
      <div>
        <h2>Products</h2>
        <h2>Categories</h2>
      </div>
    </div>
  );
}

export default Store;