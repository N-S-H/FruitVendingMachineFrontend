import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import { Typography } from '@material-ui/core';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';

const useStyles = makeStyles({
    root: {
        flexGrow: 1
    },
    paperComponent: {
        maxWidth: 500,
        marginLeft: '35%',
        padding: '2%',
        backgroundColor: '#f2f5f5'
      }
  });

function UserResult({match}) {
    const classes = useStyles();
    const id = match.params.id;
    const amount = match.params.amount;
    const [userResult,setUserResult] = useState([]);
    const [resultLength,setResultLength] = useState([]);

    useEffect(()=> {
      fetchUserResult();
  },[]);

  const fetchUserResult = async () => {
    const fetchTheItems = await fetch(
        `http://localhost:8090/fruit/select/${amount}/${id}`
    )
    
    const items = await fetchTheItems.json();
    setUserResult(items);
    const length = Object.keys(items.fruitAvailabilityList).length
    if(length>0)
    {
    setResultLength(length);
    }
    else
    {
        setResultLength(0);
    }
    console.log(items); 
}

   return(
       <div className={classes.root}>
           <h4> Take Away! </h4>
           <br/><br/>
            {resultLength>0 &&
           <div>
            <SentimentVerySatisfiedIcon style={{ fontSize: 60 }}/>
            <br/>
           <Typography variant="subtitle1" gutterBottom> Hurray! Grab Your Fruits </Typography>
           <br/><br/>
           <Paper elevation={3} className={classes.paperComponent}>
              {userResult.fruitAvailabilityList.map((item)=> (
                   <Typography variant="h6"><b>{item.quantity} {item.fruitName}</b></Typography>  
              ))} 
           </Paper>
           </div>
           }
           { resultLength===0 &&
              <div>
                <SentimentVeryDissatisfiedIcon style={{ fontSize: 60 }}/><br/>
               <Typography variant="subtitle1" gutterBottom> Oops! Could not find any fruits! Sorry for the inconvinience!</Typography>
              </div>
           } 
           <br/><br/>
            <Typography variant="h6"> You save <b>₹{userResult.remainingBalance}</b></Typography>
            <br/><br/>
            <Typography variant="h5" gutterBottom>Thanks for using Fresh Mart Fruit Vending machine! Have a great day!</Typography>
            <br/><br/>
            <Link style={{textDecoration:'none'}} href={`/user`}>
           <Button variant="contained">
               Grab more fruits!
           </Button>
           </Link>
     </div>
   );
}

export default UserResult;