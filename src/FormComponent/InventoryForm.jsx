import React, { useState,useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { Container,InputLabel } from '@material-ui/core'
import Input from '@material-ui/core/Input'
import Button from '@material-ui/core/Button'
import { Alert, AlertTitle } from '@material-ui/lab';
import Link from '@material-ui/core/Link';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

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


function InventoryForm() {
    const classes = useStyles();

    useEffect(()=> {
        fetchFruitItems();
    },[]);

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [fruitId,setFruitId] = useState([]);
    const [quantity,setQuantity] = useState([]);
    const [fruitItems,setFruitItems] = useState([]);
    const [numericError,setNumericError] = useState(false);

    const fetchFruitItems = async () => {
        const fetchTheItems = await fetch(
            `http://localhost:8090/fruit/all`
        ); 
        const items = await fetchTheItems.json();
        setFruitItems(items);
        console.log(items);

    }

    const submitHandler = (e) => {
        e.preventDefault();
        if(quantity<=0 || quantity-Math.floor(quantity)!==0) {
            setNumericError(true)
        }
        else {
            axios.post(`http://localhost:8090/inventory/add`, {
                fruitId: fruitId,
                quantity: quantity
            })
            .then( response => {
              console.log(response.data);
        })
        setIsSubmitted(true);
        setNumericError(false);
        setFruitId([])
        setQuantity([])
    }
    }

    const alertHandler = (e) => {
        e.preventDefault();
        setIsSubmitted(false);
    }

    const numericAlertHandler = (e) => {
        e.preventDefault();
        setNumericError(false);
    }

    
    return (
       <div className={classes.root}>
           <h2>Inventory Entry Form</h2><br/><br/>
         <form onSubmit = {submitHandler}>
            <Container>
            <br/><br/>
            <InputLabel htmlFor="fruitId" required><b>Fruit:</b> </InputLabel>
            <Select
          value={fruitId}
          onChange={e => setFruitId(e.target.value)}
          required
           >
            {
                fruitItems.map(item=> (
                    <MenuItem value={item._id}>{item.fruitName}</MenuItem>
                ))
            }
        </Select>
            <br/><br/>
            <InputLabel htmlFor="quantity" required><b>Quantity:</b> </InputLabel>
            <Input type="number" name="quantity" min={1} step={1} value={quantity}  onChange={e => setQuantity(e.target.value)} required/>
            <br/><br/>
            <Button variant="outlined" type = "submit" data-testid="button"> Submit </Button>
            </Container>
        </form>
        <br/>
        <Link style={{textDecoration:'none'}} href={`/admin`}>
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
       {isSubmitted && <Alert severity="success" onClose={alertHandler}><strong>Inventory entry is successful!</strong> close the alert!</Alert>} 
       {numericError && <Alert severity="error" onClose={numericAlertHandler}><strong>The quantity should not be less than 1 and it should not contain decimal digits!</strong> close the alert!</Alert>}
       </div>
    );
}

export default InventoryForm;