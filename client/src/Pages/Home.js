import { Chat, Sidebar } from '../components';

const Home = () => {
  return (
    <div className="w-screen h-screen">
      <div className="flex">
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
};

export default Home;
