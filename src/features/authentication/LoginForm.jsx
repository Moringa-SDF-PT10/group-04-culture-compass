import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ users }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      navigate('/countries'); // Redirect to Countries page
    } else {
      setMessage('Invalid username or password');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input 
        type="email" 
        placeholder="Email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
      />
      <input 
        type="password" 
        placeholder="Password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
      />
      <button onClick={handleLogin}>Login</button>
      <p>{message}</p>
    </div>
  );
};

export default LoginForm;