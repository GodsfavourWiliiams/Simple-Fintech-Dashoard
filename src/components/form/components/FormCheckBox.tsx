import React from "react";
// import { useDispatch } from 'react-redux';
// import { setCheckBox } from '../../../logic/action';

type CheckboxProps = {
  label: string;
  isChecked: boolean;
  labelFont: string;
};

const Checkbox: React.FC<CheckboxProps> = ({ label, isChecked, labelFont }) => {
  //   const dispatch = useDispatch();

  const handleCheckboxChange = () => {
    // dispatch(setCheckBox(!isChecked));
  };

  return (
    <div>
      <label
        className={`flex items-center justify-center gap-1 ${labelFont} text-[#83879B]`}>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
          className="text-black accent-black"
        />
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
