import { useState, useEffect } from 'react';

function Store({un, loggedIn}) {
  const [fullName, setFullName] = useState("");

  useEffect(() => {
    fetch('https://fakestoreapi.com/users')
      .then(res => res.json())
      .then(data => {
        console.log(data);
        data.forEach(user => {
          if (user.username === un) {
            setFullName(`${user.name.firstname.toLowerCase().split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')} 
              ${user.name.lastname.toLowerCase().split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')}`);
          }
        });
      });
  }, [un]);

  const handleLogOut = () => {
    localStorage.removeItem('login-token');
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