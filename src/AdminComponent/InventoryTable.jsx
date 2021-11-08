import React, { useState, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton';
import axios from 'axios';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    maxWidth: 900,
    marginLeft: '15%'
  },
  root: {
    flexGrow: 1,
  }
});

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#5662a3',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
 
}))(TableRow);

function InventoryTable() {
  const classes = useStyles();
    useEffect(()=> {
        fetchInventoryItems();
        fetchFruitItems();
    },[]);

    const [inventoryItems,setInventoryItems] = useState([]);
    const [fruitItems,setFruitItems] = useState([]);

    const fetchInventoryItems = async () => {
        const fetchTheItems = await fetch(
            `http://localhost:8090/inventory/all`
        ); 
        const items = await fetchTheItems.json();
        setInventoryItems(items);
        console.log(items);

    }

    const fetchFruitItems = async () => {
        const fetchTheItems = await fetch(
            `http://localhost:8090/fruit/all`
        ); 
        const items = await fetchTheItems.json();
        setFruitItems(items);
        console.log(items);

    }

    function fetchFruitName(id) 
    {
         for(var i=0;i<fruitItems.length; i++) {
             if(fruitItems[i]._id === id) {
                 return fruitItems[i].fruitName;
             }
         }
    }


    const handleDeleteClick = (itemId) => {
      axios.delete(`http://localhost:8090/inventory/delete/${itemId}`)
     .then( response => {
        console.log(response.data)
        fetchInventoryItems();
        fetchFruitItems();
     })


}
    
   return(
       <div className={classes.root}>
      <TableContainer>
        <Table className={classes.table} aria-label="a dense table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="left"><b>Inventory Id</b></StyledTableCell>
              <StyledTableCell align="left"><b>Fruit Name</b></StyledTableCell>
              <StyledTableCell align="left"><b>Entry Time</b></StyledTableCell>
              <StyledTableCell align="left"><b>Quantity</b></StyledTableCell>
              <StyledTableCell align="left"><b>Remaining Shelf Days</b></StyledTableCell>
              <StyledTableCell align="left"><b>Delete</b></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody data-testid="tablebody-event">
            {inventoryItems.map((item) => (
                <StyledTableRow key={item.id} hover>
                <StyledTableCell  align="left">{item._id}</StyledTableCell>
                <StyledTableCell  align="left">{fetchFruitName(item.fruitId)}</StyledTableCell>
                <StyledTableCell  align="left">{item.entryTime}</StyledTableCell>
                <StyledTableCell align="left">{item.quantity}</StyledTableCell> 
                <StyledTableCell align="left">{item.remainingShelfDays}</StyledTableCell> 
                  <StyledTableCell align="left">
                  <Tooltip title = "delete the inventory item">
                 <IconButton size="small" onClick={()=>handleDeleteClick(item._id)}>
                  <DeleteIcon/>
                 </IconButton>
                 </Tooltip>
                  </StyledTableCell> 
              </StyledTableRow>)
            )}
          </TableBody>
        </Table>
      </TableContainer>
     </div>
   );
}

export default InventoryTable;