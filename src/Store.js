function Store({loggedIn}) {

  const handleLogOut = () => {
    localStorage.removeItem('login-token');
    loggedIn(false);
  }

  return (
    <div>
      <h1>Store</h1>
      <div>
        <button onClick={handleLogOut}>Log Out</button>
      </div>
    </div>
  );
}

export default Store;