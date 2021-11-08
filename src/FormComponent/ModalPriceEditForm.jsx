import React, { useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { Container,InputLabel } from '@material-ui/core'
import Input from '@material-ui/core/Input'
import Button from '@material-ui/core/Button'
import { Alert} from '@material-ui/lab';
const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    root: {
        '& .MuiTextField-root': {
          margin: theme.spacing(1),
          width: '75ch',
        },
      },
}));


function ModalPriceEditForm(props) {
    const classes = useStyles();
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [fruitName,setFruitName] = useState(props.fruit.fruitName);
    const [price,setPrice] = useState(props.fruit.pricePerFruit);
    const [calories,setCalories] = useState(props.fruit.calorificValuePerFruit);
    const [shelfTime,setShelfTime] = useState(props.fruit.shelfLifeDays);
    const [enabledStatus,setEnabledStatus] = useState(props.fruit.enabled);
    const [fruitId,setFruitId] = useState(props.fruit._id);
    const [numericError,setNumericError] = useState(false);


    const submitHandler = (e) => {
        e.preventDefault();
        if(price<=0)
        {
            setNumericError(true);
        }
        else
        {
        axios.put(`http://localhost:8090/fruit/edit`, {
            _id: fruitId,
            fruitName: fruitName,
            pricePerFruit: price,
            calorificValuePerFruit: calories,
            shelfLifeDays: shelfTime,
            enabled: enabledStatus
        })
        .then( response => {
            setIsSubmitted(true);
            setNumericError(false);
            setPrice(price);
            })
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
         <form onSubmit = {submitHandler}>
            <Container>
            <br/><br/>
            <InputLabel htmlFor="fruitName"><b>Fruit Name:</b> </InputLabel>
            <Input type="text" name="fruitName" value={fruitName} readonly/>
            <br/><br/>
            <InputLabel htmlFor="price" required><b>Fruit Price:</b> </InputLabel>
            <Input type="number" min={0.01} step={0.01} name="price" value={price} onChange={e => setPrice(e.target.value)} required/>
            <br/><br/>
            <Button variant="outlined" type = "submit" data-testid="button"> Submit </Button>
            </Container>
        </form> 
        <br/>
        {isSubmitted && <Alert severity="success" onClose={alertHandler}><strong>Price is successfully changed!</strong> close the modal!</Alert>} 
        {numericError && <Alert severity="error" onClose={numericAlertHandler}><strong>The price should be greater than zero!</strong> close the alert!</Alert>}
       </div>
    );
}

export default ModalPriceEditForm;