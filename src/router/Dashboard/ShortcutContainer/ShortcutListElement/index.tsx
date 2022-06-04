import { useState } from 'react';

import { IShortcut } from 'types/information';
import { Button } from 'components';
import { useAppDispatch } from 'hooks';
import { deleteShortcut } from 'states/information';
import { DeleteConfirmModal } from 'router/Dashboard/_shared';

import { XIcon } from 'assets/svgs';
import styles from './shortcutListElement.module.scss';

interface IProps {
  item: IShortcut;
  index: number;
}

const ShortcutListElement = ({ item, index }: IProps) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const dispatch = useAppDispatch();

  const handleXButtonClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleDeleteButtonClick = () => {
    dispatch(deleteShortcut(index));
    setIsDeleteModalOpen(false);
  };

  const handleCancelButtonClick = () => {
    setIsDeleteModalOpen(false);
  };

  return (
    <li className={styles.shortcutElementWrapper}>
      <div className={styles.shortcutTop}>
        <img src={`https://api.statvoo.com/favicon/?url=${item.url}`} alt='domain favicon' />
        <button type='button' className={styles.deleteButton} onClick={handleXButtonClick}>
          <XIcon />
        </button>
      </div>
      <p className={styles.shortcutBottom}>{item.title}</p>
      {isDeleteModalOpen && (
        <DeleteConfirmModal title={item.title} setIsDeleteModalOpen={setIsDeleteModalOpen}>
          <>
            <Button type='button' onClick={handleDeleteButtonClick}>
              확인
            </Button>
            <Button type='button' onClick={handleCancelButtonClick}>
              취소
            </Button>
          </>
        </DeleteConfirmModal>
      )}
    </li>
  );
};

export default ShortcutListElement;
