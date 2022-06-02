import { useState, FormEvent, ChangeEvent, useRef, Dispatch, SetStateAction } from 'react';
import { useClickAway } from 'react-use';
import { ColorResult, TwitterPicker } from 'react-color';

import { useAppDispatch } from 'hooks';
import { CustomDatePicker } from 'components';

import { ColorFillIcon } from 'assets/svgs';
import styles from './ddayAddForm.module.scss';

interface IProps {
  setIsAddButtonShown: Dispatch<SetStateAction<boolean>>;
  setIsFormShown: Dispatch<SetStateAction<boolean>>;
}

const today = new Date();

const DDayAddForm = ({ setIsAddButtonShown, setIsFormShown }: IProps) => {
  const [title, setTitle] = useState('');
  const [dday, setDDay] = useState(today);
  const [color, setColor] = useState('#ffffff');
  const [icon, setIcon] = useState('');
  const [isColorPaletteShown, setIsColorPaletteShown] = useState(false);
  const paletteRef = useRef(null);
  const dispatch = useAppDispatch();

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  const handleIconChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIcon(e.currentTarget.value);
  };

  const handleDDayChange = (date: Date) => {
    setDDay(date);
  };

  const handleColorChange = (e: ColorResult) => {
    setColor(e.hex);
    setIsColorPaletteShown(false);
  };

  const handleColorClick = () => {
    setIsColorPaletteShown(true);
  };

  const handleCancelClick = () => {
    setIsFormShown(false);
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(title);
    setIsAddButtonShown(false);
  };

  useClickAway(paletteRef, () => {
    setIsColorPaletteShown(false);
  });

  return (
    <form onSubmit={handleFormSubmit}>
      <div className={styles.formLeft}>
        <input type='text' value={title} onChange={handleTitleChange} placeholder='디데이 이름' />
        <input type='text' maxLength={1} value={icon} onChange={handleIconChange} placeholder='식별 문자' />
      </div>
      <button type='button' className={styles.paletteButton} onClick={handleColorClick} ref={paletteRef}>
        <ColorFillIcon style={{ fill: color }} />
        <span>{color}</span>
        {isColorPaletteShown && <TwitterPicker color={color} onChangeComplete={handleColorChange} />}
      </button>
      <CustomDatePicker selected={dday} today={today} onChange={handleDDayChange} />
      <button type='submit' className={styles.submitButton}>
        추가
      </button>{' '}
      <button type='button' className={styles.submitButton} onClick={handleCancelClick}>
        취소
      </button>
    </form>
  );
};

export default DDayAddForm;