export interface User {
  id: string;
  email: string;
  name?: string;
  profilePicture?: string;
  mobile_no?: string;
}

export interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
}