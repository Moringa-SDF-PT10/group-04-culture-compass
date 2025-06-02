import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUpForm = ({ users, setUsers }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSignUp = () => {
    const newUser = {
      id: users.length + 1,
      name,
      email,
      password,
      isLoggedin: 'false',
    };
    setUsers([...users, newUser]);

    // Clear input fields
    setName('');
    setEmail('');
    setPassword('');

    // Redirect to login page
    navigate('/login', { state: { email, password } });
  };

  return (
    <div className='signup-form'>
      <h2>Sign Up</h2>
      <input 
        type="text" 
        placeholder="Name" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
      />
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
      <button onClick={handleSignUp}>Sign Up</button>
    </div>
  );
};

export default SignUpForm;