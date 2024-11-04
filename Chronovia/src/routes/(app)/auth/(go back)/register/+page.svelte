<script>
import { onMount } from 'svelte';

let username = '';
let password = '';
let message = '';
let token = '';

const apiUrl = 'http://localhost:3000'; // Change this to your API URL

async function register() {
    const response = await fetch(`${apiUrl}/register`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    if (response.ok) {
    message = `Registration successful! Welcome, ${data.user.username}`;
    token = data.token; // Store the token for future requests
    } else {
    message = data.message || 'Registration failed';
    }
}

async function login() {
    const response = await fetch(`${apiUrl}/login`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    if (response.ok) {
    message = `Login successful! Welcome back, ${data.user.username}`;
    token = data.token; // Store the token for future requests
    } else {
    message = data.message || 'Login failed';
    }
}

async function logout() {
    const response = await fetch(`${apiUrl}/logout`, {
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${token}`, // Include the token in the header
    },
    });

    if (response.ok) {
    message = 'Logout successful!';
    token = ''; // Clear the token
    } else {
    message = 'Logout failed';
    }
}
</script>

<main>
<h1>Register page</h1>
<form on:submit|preventDefault={register}>
    <h2>Register</h2>
    <input type="text" bind:value={username} placeholder="Username" required />
    <input type="password" bind:value={password} placeholder="Password" required />
    <button type="submit">Register</button>
</form>

<button on:click={logout}>Logout</button>

{#if message}
    <p>{message}</p>
{/if}
</main>

<style>
main {
    padding: 1em;
    max-width: 400px;
    margin: auto;
    display: flex; /* Use flexbox */
    flex-direction: column; /* Stack items vertically */
    align-items: center; /* Center items horizontally */
    text-align: center; /* Center text */
}
.inputs {
    display: flex;
    flex-direction: column;
  }

  input {
    display: block;
    margin: 0.5em 0;
    padding: 0.5em;
    border: 1px solid #444; /* Dark border */
    border-radius: 4px;
    background-color: #1e1e1e; /* Dark input background */
    color: #ffffff; /* Light text color */
    font-size: 1em;
    max-width: 300px;
  }

  input::placeholder {
    color: #888; /* Placeholder color */
  }

  button {
    padding: 0.5em;
    border: none;
    border-radius: 4px;
    background-color: #6200ea; /* Button background color */
    color: #ffffff; /* Button text color */
    font-size: 1em;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  button:hover {
    background-color: #3700b3; /* Darker shade on hover */
  }

  p {
    text-align: center;
    margin-top: 1em;
    
</style>
    