import React from 'react';
import styles from '../../styles/PostWrapper.scss';

const PostWrapper = ({children}) => {
    return (
        <div className={styles.PostWrapper}>
            {children}
        </div>
    );
};

export default PostWrapper;