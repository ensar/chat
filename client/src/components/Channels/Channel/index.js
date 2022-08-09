import { Draggable } from 'react-beautiful-dnd';
import { useSocket } from '../../../context/SocketContext';

const Channel = ({ channel, index }) => {
  const { socket, user } = useSocket();

  const join = (channel) => {
    return socket.joinChannel(channel, user);
  };

  return (
    <Draggable
      key={channel.channelId}
      draggableId={channel.channelId}
      index={index}
    >
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          key={channel.channelId}
          className="flex items-center w-full h-12 px-3 border-y border-l-green-300 hover:bg-gradient-to-r from-green-400 to-green-200 mb-1 group"
          onClick={() => join(channel)}
        >
          <img
            src={channel.img}
            className="bg-cover rounded-[50%] h-full mr-2"
          />
          <span className="text-black group-hover:text-white">
            {channel.name}
          </span>
        </div>
      )}
    </Draggable>
  );
};

export default Channel;
