import Cookies from 'js-cookie';

// Get logged-in user ID from cookies
const getUserId = () => Cookies.get('userId');

// Get user-specific data from localStorage
export const getUserData = <T>(key: string): T | null => {
  const userId = getUserId();
  if (userId) {
    const data = localStorage.getItem(`${key}_${userId}`);
    return data ? JSON.parse(data) : null;
  }
  return null;
};

// Save user-specific data to localStorage
export const saveUserData = <T>(key: string, data: T) => {
  const userId = getUserId();
  if (userId) {
    localStorage.setItem(`${key}_${userId}`, JSON.stringify(data));
  }
};

//Remove user-specific data from localStorage
export const removeUserData = (key: string) => {
  const userId = getUserId();
  if (userId) {
    localStorage.removeItem(`${key}_${userId}`);
  }
};
