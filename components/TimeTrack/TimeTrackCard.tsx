// TimeTrack.tsx

import React, { useState } from 'react';
import classNames from 'classnames';
import styles from './timetrack.module.scss';
import { TimeTrackDataType } from '@/types/types';

export interface TimeTrackCardProps {
    className?: string;
    timeTrack: TimeTrackDataType;
}

export const TimeTrackCard = ({ className, timeTrack }: TimeTrackCardProps) => {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);

    const handleCheckboxChange = (value: string) => {
      setSelectedOption(value === selectedOption ? null : value);
    };

    return (
        <div className={classNames(styles.root, className)}>
            <div className={styles.divMain}>
                <span className={styles.spanMain}>
                    <div className={styles.divLeft}>
                        <span className={styles.spanLeft}>
                            <label className={styles.numberLabel}>
                                <h1 className={styles.number}>{timeTrack.id}</h1>
                            </label>
                            <h2 className={styles.topic}>{timeTrack.title}</h2>
                      </span>
                    </div>
                    <div className={styles.divRight}>
                      <span className={styles.spanRight}>
                        <label className={classNames(styles.checkbox, styles.checkboxGreen)}>
                          <input
                            type="checkbox"
                            value="option1"
                            checked={selectedOption === 'option1'}
                            onChange={() => handleCheckboxChange('option1')}
                          />
                        </label>
                        <label className={classNames(styles.checkbox, styles.checkboxYellow)}>
                          <input
                            type="checkbox"
                            value="option2"
                            checked={selectedOption === 'option2'}
                            onChange={() => handleCheckboxChange('option2')}
                          />
                        </label>
                        <label className={classNames(styles.checkbox, styles.checkboxRed)}>
                          <input
                            type="checkbox"
                            value="option3"
                            checked={selectedOption === 'option3'}
                            onChange={() => handleCheckboxChange('option3')}
                          />
                        </label>
                        <label className={styles.timeLeft}><h4 className={styles.h4TimeLeft}>{timeTrack.time}</h4></label>
                      </span>
                    </div>
                </span>
            </div>
        </div>
    );
};
