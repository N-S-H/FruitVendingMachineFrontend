import React, { useState,useEffect} from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 650,
        maxWidth: 800,
        margin: '2%'
      },
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

function ModalPriceEditForm(props) {
    const classes = useStyles();
    const [availability,setAvailability] = useState([]);

    useEffect(()=> {
        fetchAvailabilityItems();
    },[]);


    const fetchAvailabilityItems = async () => {
        const fetchTheItems = await fetch(
            `http://localhost:8090/inventory/viewAvailability`
        ); 
        const items = await fetchTheItems.json();
        setAvailability(items);
        console.log(items);

    }



    return (
       <div className={classes.root}>
         <TableContainer>
        <Table className={classes.table} aria-label="a dense table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="left"><b>Fruit</b></StyledTableCell>
              <StyledTableCell align="left"><b>Quantity</b></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody data-testid="tablebody-event">
            {availability.map((item) => (
                <StyledTableRow key={item.fruitId} hover>
                <StyledTableCell  align="left">{item.fruitName}</StyledTableCell>
                <StyledTableCell  align="left">{item.quantity}</StyledTableCell>
              </StyledTableRow>)
            )}
          </TableBody>
        </Table>
      </TableContainer>
       </div>
    );
}

export default ModalPriceEditForm;