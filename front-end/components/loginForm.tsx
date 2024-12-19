import UserService from '@/services/userService';
import router from 'next/router';
import React, { useState } from 'react';
import { Profile } from '@/types';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [usernameError, setUsernameError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);

    const [statusMessage, setStatusMessage] = useState<string | null>(null);

    const clearErrors = () => {
        setUsernameError(null);
        setPasswordError(null);
        setStatusMessage(null);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        clearErrors();
        if (!validate()) {
            return;
        };

        console.log('Logging in...');

        const response = await UserService.login(username, password);

        if (response.status === 200) {
            const autheticationResponse = await response.json();

            sessionStorage.setItem(
                'loggedInUser',
                JSON.stringify({
                    token: autheticationResponse.token,
                    username: autheticationResponse.username,
                    leaderOfGroups: autheticationResponse.leaderOfGroups,
                    memberOfGroups: autheticationResponse.memberOfGroups,
                })
            );

            setStatusMessage('Login successful. Redirecting to home page...');
            setTimeout(() => {
                router.push('/');
            }, 500);
        } else {
            const message = await response.json();
            setStatusMessage('wrong username or password');
        };
    };

    const validate = () => {
        let valid = true;
        console.log('Validating...');

        if (!username) {
            setUsernameError('Username is required');
            valid = false;
        };
        if (!password) {
            setPasswordError('Password is required');
            valid = false;
        };

        return valid;
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white shadow-md rounded">
            <div className="mb-4">
                <label htmlFor="usernameInput" className="block text-gray-700 font-bold mb-2">
                    Username:
                </label>
                <input
                    id="usernameInput"
                    type="text"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    className="w-full px-3 py-2 border rounded"
                />
                {usernameError && <div className="text-red-500 mt-1">{usernameError}</div>}
            </div>
            <div className="mb-4">
                <label htmlFor="passwordInput" className="block text-gray-700 font-bold mb-2">
                    Password:
                </label>
                <input
                    id="passwordInput"
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="w-full px-3 py-2 border rounded"
                />
                {passwordError && <div className="text-red-500 mt-1">{passwordError}</div>}
            </div>
            <button type="submit">
                Login
            </button>
            {statusMessage && <div>{statusMessage}</div>}
        </form>
    );
};

export default LoginForm;