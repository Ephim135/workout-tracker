import React, { useEffect, useState } from 'react';

const Login: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleSubmitClick = async () => {
        const response = await fetch("http://127.0.0.1:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
        });

        const data = await response.json();
        console.log("Server response:", data);
    };

    return (
        <div className="container">
            <label htmlFor="uname">Username</label>
            <input type="text" placeholder='Enter Username' name='uname' value={username} onChange={(e)=>setUsername(e.target.value)} required/>

            <label htmlFor="psw">Pasword</label>
            <input type="password" placeholder='Enter Password' name='psw' value={password} onChange={(e)=>setPassword(e.target.value)} required/>

            <button type='submit' onClick={handleSubmitClick}>Login</button>
        </div>
    )
}  

export default Login;