import { useEffect, useRef, useState } from 'react';
import { useSocket } from '../../context/SocketContext';
import Message from '../Message';

const Chat = () => {
  const { socket, messages, channel, user } = useSocket();
  const [messageValue, setMessageValue] = useState('');
  const ref = useRef();

  useEffect(() => {
    socket.messages();
    scrollToBottom();
  }, [messages, channel]);

  const scrollToBottom = () => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  };

  const sendMessage = (e) => {
    e.preventDefault();

    if (messageValue.trim() != '') {
      socket.sendMessage(channel.channelId, user, messageValue.trimStart());
      setMessageValue('');
    }
    return false;
  };

  return (
    <div className="w-4/5 bg-gray-100">
      {channel && (
        <div className="w-full h-chat overflow-y-auto" ref={ref}>
          <div className="w-full h-12 flex items-center px-5 bg-gradient-to-r from-green-400 to-green-200">
            <img
              src={channel.img}
              className="bg-cover rounded-[50%] h-full mr-2"
            />
            <span className="text-white font-semibold text-lg ">
              {channel.name}
            </span>
          </div>

          {messages &&
            messages.map((message, i) => {
              return <Message message={message} key={i} />;
            })}
          <div className="fixed bottom-0 bg-white w-4/5 h-12 px-4">
            <form className="w-full h-full flex justify-between items-center">
              <input
                type="text"
                placeholder="Send Message"
                className="flex-1 h-full border-none outline-none"
                value={messageValue}
                onChange={(e) => setMessageValue(e.target.value)}
              />
              <button type="submit" onClick={(e) => sendMessage(e)}>
                <img
                  src="/assets/send.png"
                  className="w-10 h-10 p-2 rounded-[50%] bg-green-300 hover:bg-green-400"
                />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;
