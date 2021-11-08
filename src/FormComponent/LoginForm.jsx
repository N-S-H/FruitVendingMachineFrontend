import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { Container,InputLabel } from '@material-ui/core'
import Input from '@material-ui/core/Input'
import Button from '@material-ui/core/Button'
import { Alert, AlertTitle } from '@material-ui/lab';
import {Redirect} from "react-router-dom";
import Link from '@material-ui/core/Link';
const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
    Alert: {
        width: '30%',
        marginLeft: theme.spacing(75)
    }
}));


function LoginForm() {
    const classes = useStyles();
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [userName,setUserName] = useState([]);
    const [password,setPassword] = useState([]);
    const [validCredentials,setValidCredentials] = useState(false);

    const submitHandler = (e) => {
        e.preventDefault();
        axios.get(`http://localhost:8090/login/${userName}/${password}`)
        .then(response=> {
            setValidCredentials(response.data)
        })
        setIsSubmitted(true);
    }

    const alertHandler = (e) => {
        e.preventDefault();
        setValidCredentials(false);
        setIsSubmitted(false);
    }

    
    return (
       <div className={classes.root}>
           <h2> Admin Login Form</h2><br/><br/>
         <form onSubmit = {submitHandler}>
            <Container>
            <br/><br/>
            <InputLabel htmlFor="userName" required><b>User Name:</b> </InputLabel>
            <Input type="text" name="userName" value={userName} onChange={e => setUserName(e.target.value)} required/>
            <br/><br/>
            <InputLabel htmlFor="password" required><b>password:</b> </InputLabel>
            <Input type="password" name="password"  value={password} onChange={e => setPassword(e.target.value)} required/>
            <br/><br/>
            <Button variant="outlined" type = "submit" data-testid="button"> Submit </Button>
            </Container>
        </form>
        <br/>
        <Link style={{textDecoration:'none'}} href={`/`}>
        <Button variant="contained" color="primary">
            Back 
        </Button>
        </Link>
        <br/><br/><br/>
        <Alert severity="info" variant="outlined" className={classes.Alert}>
       <AlertTitle>Form Info</AlertTitle>
       * indicates the  <strong>mandatory</strong> fields
       </Alert>
       <br/>
       {isSubmitted && validCredentials===false && <Alert severity="error" onClose={alertHandler}><strong>The credentials are invalid!</strong> close the alert and re-enter!</Alert>} 
       {isSubmitted && validCredentials && <Redirect to={`/admin`}/>}
       </div>
    );
}

export default LoginForm;