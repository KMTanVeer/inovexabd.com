const TOKEN_KEY = 'admin_jwt_token';

export const AdminAuth = {
  getToken: () => localStorage.getItem(TOKEN_KEY),
  
  setToken: (token: string) => {
    localStorage.setItem(TOKEN_KEY, token);
  },
  
  logout: () => {
    localStorage.removeItem(TOKEN_KEY);
  },
  
  verify: async () => {
    const token = AdminAuth.getToken();
    if (!token) return false;
    
    try {
      const res = await fetch('/api/auth/verify', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      return res.ok;
    } catch {
      return false;
    }
  }
};
