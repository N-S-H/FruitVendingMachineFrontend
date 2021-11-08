import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles({
    paperComponent: {
      maxWidth: 900,
      marginLeft: '22%',
      padding: '2%'
    }
  });

function Entry() {
    const classes = useStyles();
    useEffect(()=> {
      refreshInventoryDatabase();
  },[]);

  const refreshInventoryDatabase = async () => {
    const refreshInventory = await fetch(
        `http://localhost:8090`
    ); 

}

   return(
       <div>
           <h3> Welcome to Fresh Mart Vending Machine! </h3>
           <br/><br/>
           <Paper elevation={3} className={classes.paperComponent}>
              <b>Hi User!</b> <br/><br/>
              Fruits are sources of essential nutrients that are underconsumed, including potassium, dietary fiber, vitamin C, and folate.
              <br/><br/>
              Are you looking for the best fruits with in your budget? Well! We serve your purpose with our fruit vending machine  
           </Paper>
           <br/><br/>
           <Link style={{textDecoration:'none'}} href={`/user`}>
           <Button variant="contained" color="secondary">
                Enter as User
           </Button>
           </Link>
            <br/><br/>
            <Link style={{textDecoration:'none'}} href={`/loginform`}>
           <Button>
               Login as Admin
           </Button>
           </Link>
     </div>
   );
}

export default Entry;