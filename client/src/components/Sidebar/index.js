import { useEffect } from 'react';
import { useSocket } from '../../context/SocketContext';
import Channels from '../Channels';
import OnlineUser from '../OnlineUser.js';

const Sidebar = () => {
  const { socket, users } = useSocket();

  useEffect(() => {
    socket.getUsers();
  }, [users]);

  return (
    <div className="w-1/5 h-screen overflow-auto">
      <div className="h-2/3 overflow-auto text-black font-medium border-b-2 border-teal-100">
        <h1 className="text-black font-medium mb-5 pt-5 pl-2 ">Channels</h1>
        <Channels />
      </div>
      <div className="h-1/3 overflow-auto ">
        <h1 className="text-black font-medium mb-5 px-5 py-2">Online Users</h1>
        {users &&
          users?.onlineUsers.map((user) => {
            return <OnlineUser user={user} key={Object.keys(user)[0]} />;
          })}
      </div>
    </div>
  );
};

export default Sidebar;
