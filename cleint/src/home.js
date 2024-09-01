import React from "react";

function Home() {
    // Retrieve and parse the stored user data from sessionStorage
    const storedUser = sessionStorage.getItem('currentUser');
    const user = storedUser ? JSON.parse(storedUser) : null;

    return (
        <div>
            <h2>Home Component</h2>
            {user ? (
                <p>Role: {user.role}</p>
            ) : (
                <p>No user is logged in</p>
            )}
        </div>
    );
}

export default Home;
