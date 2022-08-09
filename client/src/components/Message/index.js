import React from 'react';
import { useSocket } from '../../context/SocketContext';
import classnames from 'classnames';
import { currentTime } from '../../utils';

const Message = ({ message }) => {
  const { user } = useSocket();

  const isMe = () => {
    if (message.user == user) {
      return true;
    }
    return false;
  };

  return (
    <div className="w-full h-auto mb-2 float-left">
      {message.user == 'bot' ? (
        <div className="w-40 h-7 flex items-center justify-center text-white text-sm bg-cyan-400 rounded-md my-0 mx-auto">
          {message.message}
        </div>
      ) : (
        <div
          className={classnames('flex flex-col h-full w-1/2 px-2 ', {
            'float-right': isMe()
          })}
        >
          <div
            className={classnames('flex items-center ', {
              'flex-row-reverse': isMe()
            })}
          >
            <img
              src="https://cdn0.iconfinder.com/data/icons/set-ui-app-android/32/8-512.png"
              className="w-9 h-9 rounded-[50%]"
            />
            <span className="text-sm font-medium">{message.user}</span>
            <span className="text-xs text-gray-400 mx-2">{currentTime()}</span>
          </div>
          <div
            className={classnames(
              'w-max p-2 bg-green-400 rounded-b-lg text-white',
              {
                'ml-auto mr-8  rounded-tl-lg': isMe(),
                'ml-8 rounded-tr-lg': !isMe()
              }
            )}
          >
            {message.message}
          </div>
        </div>
      )}
    </div>
  );
};

export default Message;
