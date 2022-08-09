import { useEffect, useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useSocket } from '../../context/SocketContext';
import Channel from './Channel';

const Channels = () => {
  const { socket, channels } = useSocket();
  const [channelList, setChannelList] = useState(channels);

  useEffect(() => {
    socket.getChannels();
    setChannelList(channels);
  }, [channels]);

  function onDragEnd(result) {
    if (!result.destination) {
      return;
    }

    const items = Array.from(channelList);
    const [reordered] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reordered);
    setChannelList(items);
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable
        droppableId={String(Math.random() * 100)}
        key={String(Math.random() * 100)}
      >
        {(provided) => (
          <div
            className="w-full h-full"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {channels &&
              channelList.map((channel, index) => {
                return (
                  <Channel
                    channel={channel}
                    key={channel.channelID}
                    index={index}
                  />
                );
              })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Channels;
