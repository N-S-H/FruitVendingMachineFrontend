import React from 'react';
import './App.css';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
const useStyles = makeStyles((theme)=> ({
    root: {
      flexGrow: 1,  
    },
    header: {
        marginLeft: theme.spacing(60)
    },
    homebutton: {
        marginLeft: theme.spacing(10)
    }
}));


function Nav(){
    const navstyle = {
        color:'white'
    };
const classes = useStyles();

return(
        <nav>
        <h2 className={classes.header}>Fresh Mart Vending Machine</h2>
        <Link  className={classes.homebutton} style={{textDecoration:'none'}} href={`/`}>
          <Button  variant="contained">
            Home
          </Button>
          </Link>
    </nav>
);
}
export default Nav;