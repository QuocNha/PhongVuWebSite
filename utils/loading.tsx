/*
*BZ00027            090621     Install react-loading for project

*/
import React from 'react';
import ReactLoading from 'react-loading';
import styles from './Loading.module.scss';

const Loading = ( props) => {
    const loadingStyle = {
        zIndex: "999",
        position: "fixed",
        backgroundColor: "rgba(0, 0, 0, 0.3)",
      };
      return (
           <div id="myLoading" hidden={true} className={styles.loadingStyle} >
              <ReactLoading
                type="spin"
                color="#33cabb"
                height="128px"
                className="center-middle"
                width="128px"
              />
            </div>
      )
    

}
Loading.proTypes = {
    isLoading: Boolean,
  }
export default Loading;