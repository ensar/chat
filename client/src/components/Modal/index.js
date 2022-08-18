import classNames from 'classnames';

const Modal = ({ open, setOpen, title, children }) => {
  return (
    <div
      className={classNames('w-screen h-screen z-10 absolute top-0 left-0', {
        //prettier-ignore
        'hidden': !open
      })}
    >
      <div className="w-full h-full bg-black absolute opacity-40"></div>
      <div className="modal">
        <button
          className="absolute right-3 top-1 text-lg hover:text-red-500"
          onClick={() => setOpen(false)}
        >
          x
        </button>
        <h1 className="my-4 text-green-400 text-xl">{title}</h1>
        {children}
      </div>
    </div>
  );
};

export default Modal;
