import React, { useState,useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container,InputLabel } from '@material-ui/core'
import Input from '@material-ui/core/Input'
import Button from '@material-ui/core/Button'
import {Redirect} from "react-router-dom";
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    }
}));

function UserForm()
{
    const classes = useStyles();

    useEffect(()=> {
        fetchFruitItems();
    },[]);

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [fruitId,setFruitId] = useState([]);
    const [validUserchoice,setValidUserchoice] = useState(false);
    const [userAmount,setUserAmount] = useState([]);
    const [fruitItems,setFruitItems] = useState([]);
    const [showCheckboxes,setShowCheckboxes] = useState(false);
    var multiSelectMap = new Map();

    const fetchFruitItems = async () => {
        const fetchTheItems = await fetch(
            `http://localhost:8090/fruit/all`
        ); 
        const items = await fetchTheItems.json();
        setFruitItems(items);
        for(var i=0;i<items.length;i++)
        {
            multiSelectMap.set(items[i]._id,false);
        }
        console.log(items);

    }

    const setChosenAmount = (amount) => {
        if(amount===0) setChosenAmount([]);
        else
        setUserAmount(amount)
    }

    const submitHandler = (e) => {
        for(var entry of multiSelectMap.entries())
        {
            var key=entry[0],value=entry[1];
            if(value===true)
            {
               fruitId.push(key);
               setValidUserchoice(true);
            }
        }
        if(validUserchoice===true)
        setIsSubmitted(true);
    }

    const handleMultiSelectChange = (id) => {
        if(multiSelectMap.get(id)===false)
        {
        multiSelectMap.set(id,true);
        } 
        else 
        {
            multiSelectMap.set(id,false);
        }
    }

    const handleShowCheckboxes = () => {
        if(showCheckboxes===true)
        {
            setShowCheckboxes(false);
        }
        else
        setShowCheckboxes(true);
    }

    return (
        <div>
           <h3>Grab Your Fruits!</h3><br/>
           <form onSubmit = {submitHandler}>
            <Container>
            <InputLabel htmlFor="userAmount" required><b>Amount</b> </InputLabel>
            <Input type="number" name="userAmount" value={userAmount} required readonly/>
            <br/><br/>
            <Button variant="contained"  onClick={()=>setChosenAmount(0)}>Clear</Button>
            <br/><br/>
            <InputLabel htmlFor="fruitId" required><b>Fruit</b> </InputLabel>

            {/* <Select
          required
          onChange={handleShowCheckboxes}
           >
            <MenuItem selected>Select one or more fruits </MenuItem>
            </Select>

            { showCheckboxes && 
                fruitItems.map(item=> (
                   // <MenuItem value={item._id}>{item.fruitName}</MenuItem>
                   <div>
                    <Checkbox
                    checked={multiSelectMap.get(item._id)}
                    onChange={handleMultiSelectChange(item._id)}
                    name="checkedB"
                    color="primary"
                    />
                     {item.fruitName}
                    </div>
                ))
            } */}

             <TreeView
             defaultCollapseIcon={<ExpandMoreIcon />}
             defaultExpandIcon={<ChevronRightIcon />}
              multiSelect
            >
            <TreeItem nodeId="1" label="select one or more fruits">
            { fruitItems.map(item=> (
                   // <MenuItem value={item._id}>{item.fruitName}</MenuItem>
                   <div>
                 
                    <Checkbox
                    checked={multiSelectMap.get(item._id)}
                    onChange={handleMultiSelectChange(item._id)}
                    name="checkedB"
                    color="primary"
                    />
                     {item.fruitName}
                    </div>
                ))
            }
            </TreeItem>
            </TreeView>
            
        
        <br/><br/>
        <Button variant="contained" color="primary" onClick={()=>setChosenAmount(20)}>₹20</Button> &nbsp;
        <Button variant="contained" color="primary" onClick={()=>setChosenAmount(50)}>₹50</Button> &nbsp;
        <Button variant="contained" color="primary" onClick={()=>setChosenAmount(100)}>₹100</Button> &nbsp;
        <Button variant="contained" color="primary" onClick={()=>setChosenAmount(200)}>₹200</Button> &nbsp;
        <Button variant="contained" color="primary" onClick={()=>setChosenAmount(500)}>₹500</Button>
            <br/><br/>
            <Button variant="outlined" type = "submit" data-testid="button"> Submit </Button>
            </Container>
        </form>
        <br/>
        {isSubmitted && <Redirect to={`result/${userAmount}/${fruitId}`}/>}
        </div>
    )
}

export default UserForm