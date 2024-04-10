import { jwtDecode } from 'jwt-decode';

  function setToken(token) {
    localStorage.setItem('access_token', token);
  }

  export function getToken() {
    try {
      return localStorage.getItem('access_token');
    } catch (err) {
      return null;
    }
  }

  export function removeToken() {
    localStorage.removeItem('access_token');
  }
  

    export function readToken() {
    try {
        const token = getToken();
        return token ? jwtDecode(token) : null;
    } catch (err) {
        return null;
    }
    }

    export function isAuthenticated() {
        const token = readToken();
        return token ? true : false;
    }

    export async function authenticateUser(user, password) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
          method: 'POST',
          body: JSON.stringify({ userName: user, password: password }),
          headers: {
            'content-type': 'application/json',
          },
        });
      
        const data = await res.json();
      
        if (res.status === 200) {
          setToken(data.token);
          return true;
        } else {
          throw new Error(data.message);
        }
      }

      export async function registerUser(user, password, password2) {
        try {
            const response = await fetch('/api/user/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userName: user,
                    password: password,
                    password2: password2
                })
            });
            if (response.ok) {
                return true;
            } else {
                console.error('Error registering user:', response.statusText);
                return false;
            }
        } catch (error) {
            console.error('Error registering user:', error);
            return false;
        }
    }
    
