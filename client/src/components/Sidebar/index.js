import { useEffect, useState } from 'react';
import { useSocket } from '../../context/SocketContext';
import Channels from '../Channels';
import OnlineUser from '../OnlineUser.js';
import { nanoid } from 'nanoid';
import Modal from '../Modal';

const Sidebar = () => {
  const { socket, users } = useSocket();
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState({
    channelId: nanoid(),
    name: '',
    img: ''
  });

  useEffect(() => {
    socket.getUsers();
  }, [users]);

  const setValue = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="w-1/5 h-screen overflow-auto">
      <div className="h-2/3 overflow-auto text-black font-medium border-b-2 border-teal-100">
        <h1 className="text-black font-medium mb-5 pt-5 pl-2 ">Channels</h1>
        <button
          className="w-40 h-10 rounded mb-5 bg-green-400 text-white block mx-auto"
          onClick={() => setOpen(true)}
        >
          Add Channel
        </button>

        <Modal open={open} setOpen={setOpen} title="Add Channel">
          <form
            className="flex flex-col justify-around h-full"
            onSubmit={(e) => {
              e.preventDefault();
              socket.addChannel(values);
            }}
          >
            <input
              name="name"
              placeholder="Name"
              className="w-40 h-9 p-2 outline-none border focus:border-teal-200 bg-slate-100 mb-2"
              onChange={(e) => setValue(e)}
            />
            <input
              name="img"
              placeholder="Image Url"
              className="w-40 h-9 p-2 outline-none border focus:border-teal-200 bg-slate-100 mb-2"
              onChange={(e) => setValue(e)}
            />
            <button
              type="submit"
              className="bg-teal-200 border-none outline-none w-40 h-12 rounded text-white hover:bg-teal-300 transition-colors disabled:bg-red-300"
              onClick={() => setOpen(false)}
            >
              Login
            </button>
          </form>
        </Modal>
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
