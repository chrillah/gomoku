import { FC} from 'react';

interface PopUpProps {
  message: string | null;
  buttonLabel: string | null;
  onButtonClick: () => void;
}

const PopUp: FC<PopUpProps> = ({ message, onButtonClick, buttonLabel }) => {

  return (
    <div className='pop-up-wrapper'>
      <h1 className='pop-up-title'>{message}</h1>
      <button className='app-button' onClick={() => onButtonClick()}>
        {buttonLabel}
      </button>
    </div>
  );
};

export default PopUp;
