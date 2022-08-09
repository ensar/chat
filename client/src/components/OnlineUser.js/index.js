import React from 'react';

const OnlineUser = ({ user }) => {
  return (
    <div className="flex items-center w-full h-12 px-3 border-y bg-gradient-to-r from-green-400 to-green-200 text-white text-center leading-[48px] mb-1">
      <img
        src="https://cdn0.iconfinder.com/data/icons/set-ui-app-android/32/8-512.png"
        className="bg-cover rounded-[50%] h-full mr-2"
      />
      <span className="text-white">{Object.values(user)[0]}</span>
    </div>
  );
};

export default OnlineUser;
