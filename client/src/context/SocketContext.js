import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  let socketRef = useRef();

  const [users, setUsers] = useState();
  const [user, setUser] = useState();
  const [channels, setChannels] = useState([]);
  const [messages, setMessages] = useState([]);
  const [channel, setChannel] = useState();

  class Socket {
    constructor(socket) {
      this.socket = socket;
    }

    login(name) {
      setUser(name);
      return this.socket.current.emit('login', name);
    }

    getUsers() {
      return this.socket.current.on('users', (obj) => {
        setUsers(obj);
      });
    }

    joinChannel(channel, user) {
      setChannel(channel);
      return this.socket.current.emit('join-channel', { channel, user });
    }

    getChannels() {
      return this.socket.current.on('get-channels', ({ channels }) => {
        setChannels(channels);
      });
    }

    messages() {
      return this.socket.current.on('message', (obj) => {
        setMessages([...messages, obj]);
      });
    }

    sendMessage(channelId, user, message) {
      return this.socket.current.emit('send-message', {
        channelId,
        user,
        message
      });
    }

    addChannel(channel) {
      return this.socket.current.emit('add-channel', channel);
    }
  }

  const socket = new Socket(socketRef);
  useEffect(() => {
    socketRef.current = io(process.env.REACT_APP_SERVER_URL);
  }, []);

  return (
    <SocketContext.Provider
      value={{ socket, users, channels, messages, channel, user }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
