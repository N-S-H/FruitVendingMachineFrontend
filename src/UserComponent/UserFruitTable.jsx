import React, { useState, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme)=> ({
  table: {
    minWidth: 650,
    maxWidth: 800,
    marginLeft: theme.spacing(60)
  },
  root: {
    flexGrow: 1,
  }
}));


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

function UserFruitTable() {
  const classes = useStyles();
    useEffect(()=> {
        fetchFruitItems();
    },[]);

    const [fruitItems,setFruitItems] = useState([]);

    const fetchFruitItems = async () => {
        const fetchTheItems = await fetch(
            `http://localhost:8090/fruit/all`
        ); 
        const items = await fetchTheItems.json();
        setFruitItems(items);
        console.log(items);

    }

    return(
        <div className={classes.root}>
        <Typography variant="h5" gutterBottom>Fruits at Fresh Mart</Typography>
        <br/>
       <TableContainer>
         <Table className={classes.table} aria-label="a dense table">
           <TableHead>
             <TableRow>
               <StyledTableCell align="left"><b>Fruit Name</b></StyledTableCell>
               <StyledTableCell align="left"><b>Price Per Unit</b></StyledTableCell>
               <StyledTableCell align="left"><b>Calories</b></StyledTableCell>
             </TableRow>
           </TableHead>
           <TableBody data-testid="tablebody-event">
             {fruitItems.map((item) => (
                 <StyledTableRow key={item._id} hover>
                 <StyledTableCell  align="left"><b>{item.fruitName}</b></StyledTableCell>
                 <StyledTableCell  align="left"><b>₹{item.pricePerFruit}</b></StyledTableCell>
                 <StyledTableCell align="left"><b>{item.calorificValuePerFruit}</b></StyledTableCell> 
               </StyledTableRow>)
             )}
           </TableBody>
         </Table>
       </TableContainer>
      </div>
    );

}
    


export default UserFruitTable;