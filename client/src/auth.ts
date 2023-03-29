import axios from 'axios';

export async function isAuthenticated() {
  try {
    const response = await axios.get('http://localhost:8000/user', { withCredentials: true });
    const user = response.data;
    return user !== null && user !== undefined;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function logout() {
  try {
    const response = await axios.post('http://localhost:8000/logout', {}, { withCredentials: true });
    return true; // User was logged out successfully
  } catch (error) {
    return false; // Error occurred while logging out
  }
}
