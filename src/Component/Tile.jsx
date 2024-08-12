import React, {useState} from 'react';
import './Board.css'

function Tile({border, value, onClick, preview}) {

    const [hidden, setHidden] = useState(true);
    const content = () => {
        if (value === null){
            return hidden ? null : <div className='preview'>{preview}</div>;
        }
        else{
            return <div className={value === 'X' ? 'x-color' : 'o-color'}>{value}</div>;
        }
    };
  return (
    <div className={`tile ${border}`}  onClick={onClick}  onMouseEnter={() => setHidden(false)}
    onMouseLeave={() => setHidden(true)}>
      {content()}
    </div>
  )
}

export default Tile
