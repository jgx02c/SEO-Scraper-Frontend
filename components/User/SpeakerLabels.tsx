// MainSetting.tsx
import React, { ChangeEvent, useState } from 'react';
import classNames from 'classnames';
import styles from './SpeakerLabels.module.scss';


interface MainSettingProps {
    className?: string;
    onClose: () => void;
}

export const SpeakerLabels: React.FC<MainSettingProps> = ({ className, onClose }) => {
    

    return (
        <div className={classNames(styles.root, className)}>
          
          <h1>Speaker Labels Coming in V3.</h1>
          <button type="button" className={styles.button} onClick={onClose}>Close</button>
        </div>
    );
};