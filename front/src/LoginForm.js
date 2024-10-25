import React, { useState } from 'react';

function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    async function handleLogin() {
        try {
            const response = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
     
            console.log('Login successful:', data);
            setErrorMessage(''); // Clear any previous error messages
          
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('Login failed. Please check your username and password.'); // Update error message
        }
    }

    return (
        <div>
            <h2>Login</h2>
            <form
                onSubmit={(e) => {
                    e.preventDefault(); // Prevent the default form submission
                    handleLogin(); // Call handleLogin when the form is submitted
                }}
            >
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} {/* Display error message if any */}
        </div>
    );
}

export default LoginForm;
