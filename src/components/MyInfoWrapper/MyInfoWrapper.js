import React from 'react';
import styles from '../../styles/MyInfoWrapper.scss';

const MyInfoWrapper = ({krw}) => {
    return (
        <div className={styles.MyInfoWrapper}>
            <div>
                현재 KRW : {krw} 원
            </div>
        </div>
    );
};

export default MyInfoWrapper;