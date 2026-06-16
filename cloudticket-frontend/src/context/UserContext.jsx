import { createContext, useContext, useState, useEffect } from 'react';
import apiClient from '../api/apiClient';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await apiClient.get('/users');
        setUser(response.data);

        if (response.data.length > 0) {
          setCurrentUser(response.data[0]);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const value = {
    users,
    currentUser,
    setCurrentUser,
    loading,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  ); 
}

export function useUser() {
    const context = useContext(UserContext);
  
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
