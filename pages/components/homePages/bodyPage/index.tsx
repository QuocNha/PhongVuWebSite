/*
*BZ0004            032521     create a structure for the homepage
*BZ0007            040421     Create Menu Sale for the homepage
*BZ0012            230521     Create Menu list product
*/
import React, { useState } from 'react';
import styles from './bodyPages.module.scss';
import { InputLabel,Input,Grid,TextField, Divider, Typography, Button, Paper, MenuItem, Collapse, IconButton, Badge, ListItem, ListItemIcon, List, ListItemText } from '@material-ui/core';

const bodyPage = ()  =>{
     const [arrayProduct,SetProduct]=useState([1,2,3,4,5]);
 return <React.Fragment>
      <div id={styles.homeBody}>
          <div className={styles.textHourse}>
            <h1> Design For Product</h1>
          </div>
       {/* BEGIN BZ0007  */}
          <div className={styles.menuTypeHourse}>
           <div className={styles.containerHourse}>
                <div className={styles.img}>
                </div>
                <div className={styles.title}>Drink Menu</div>
            </div>
          </div>
       {/* END BZ0007  */}
       {/* BEGIN BZ0012 */}
          <div id={styles.productList}>
          <h1  className={styles.productTitleText}>List Room</h1>
          <div className={styles.productContainer}>
          {arrayProduct.map((item) => {
               return <React.Fragment>              
              <div className={styles.card}>
                   <div className={styles.productTitle}>
                        Product 1

                   </div>
                   <div className={styles.productImage}>
                   <img src="img_girl.jpg" alt="Girl in a jacket" width="500" height="600"></img>

                   </div>
                   <div className={styles.productText}>
                        Product Description 
                        

                   </div>
                   <div >
                             <button className={styles.buyProductButton}>Buy Now</button>
                    </div>

              </div>
          </React.Fragment>

          })}

          </div>
          
              
          </div>
       {/* END BZ0012 */}
      </div>
        
 </React.Fragment>
}
export default bodyPage;