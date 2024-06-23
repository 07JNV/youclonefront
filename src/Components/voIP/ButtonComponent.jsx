import "./voip.css";
import React from 'react';
import { useNavigate } from 'react-router-dom';


const ButtonComponent = () => {
    const navigate = useNavigate();

    const handleClick = () => {
      navigate('/voip');
    };
  return (
    <button className="fixed-button" onClick={handleClick}>
    Call Friend
   </button>
  );
};

export default ButtonComponent;
