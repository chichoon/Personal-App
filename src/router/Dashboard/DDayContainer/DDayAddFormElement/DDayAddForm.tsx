import { useState, FormEvent, ChangeEvent, useRef, Dispatch, SetStateAction } from 'react';
import { useClickAway } from 'react-use';
import cx from 'classnames';

import { useAppDispatch } from 'hooks';
import { ColorPalette, CustomDatePicker } from 'components';

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
  const [color, setColor] = useState('#B90000');
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

  const handleColorSet = (color: string) => {
    setColor(color);
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
    <form onSubmit={handleFormSubmit} className={styles.ddayFormWrapper}>
      <div className={styles.formLeft}>
        <input type='text' maxLength={10} value={title} onChange={handleTitleChange} placeholder='디데이 이름 (10자)' />
        <input type='text' maxLength={1} value={icon} onChange={handleIconChange} placeholder='식별 문자' />
        <button
          type='button'
          style={{ backgroundColor: color }}
          className={styles.paletteButton}
          onClick={handleColorClick}
          ref={paletteRef}
        >
          <ColorFillIcon />
          <span className={cx({ [styles.isFillWhite]: color === '#ffffff' })}>{color}</span>
          {isColorPaletteShown && <ColorPalette onColorSet={handleColorSet} />}
        </button>
        <CustomDatePicker selected={dday} today={today} onChange={handleDDayChange} />
      </div>
      <button type='submit' className={styles.submitButton}>
        추가
      </button>{' '}
      <button type='button' className={styles.submitButton} onClick={handleCancelClick}>
        취소
      </button>
    </form>
  );
};

// TODO: 색상버튼, 날짜버튼 우측으로 래핑
// TODO: 커스텀훅?

export default DDayAddForm;
