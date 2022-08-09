import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useSocket } from '../context/SocketContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const { socket } = useSocket();
  const navigate = useNavigate();

  const Login = (e) => {
    e.preventDefault();
    socket.login(username);
    navigate('/', { replace: true });
  };

  return (
    <div className=" w-screen h-screen bg-teal-100 flex items-center justify-center shadow-3xl">
      <div className="w-60 h-64 rounded-xl flex items-center bg-white p-3 shadow-3xl animate-custom">
        <div className="flex justify-center w-full h-2/4">
          <form className="flex flex-col justify-around h-full">
            <input
              type="text"
              id="name"
              required
              placeholder="Name"
              className="w-40 h-9 p-2 outline-none border focus:border-teal-200 bg-slate-100"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <button
              disabled={!username}
              className="bg-teal-200 border-none outline-none w-40 h-12 rounded text-white hover:bg-teal-300 transition-colors disabled:bg-red-300"
              onClick={(e) => Login(e)}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
