import React, { useState } from 'react';

const Register: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const response = await fetch('http://127.0.0.1:3000/api/register', {
method: 'POST',
headers: {
    'Content-Type': 'application/json',
},
body: JSON.stringify({ username, password}),
        });

    const data = await response.json();

    if (data.success) {
        alert('Registration successful!')
    } else {
        alert('Registration failed.')
    }
    }
};