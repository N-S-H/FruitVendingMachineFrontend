import React, { useState, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import axios from 'axios';
import ModalPriceEditForm from '../FormComponent/ModalPriceEditForm'

const useStyles = makeStyles((theme)=> ({
  table: {
    minWidth: 650,
    maxWidth: 800,
    marginLeft: '20%'
  },
  root: {
    flexGrow: 1,
  },
  paper: {
    position: 'absolute',
    width: 900,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  }
}));

function rand() {
    return Math.round(Math.random() * 20) - 10;
  }
  
function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }

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

function FruitTable() {
  const classes = useStyles();
    useEffect(()=> {
        fetchFruitItems();
    },[]);

    const [fruitItems,setFruitItems] = useState([]);
    const [modalStyle] = useState(getModalStyle);
    const [modalOpen,setModalOpen] = useState(false);
    const [modalFruitId,setModalFruitId] = useState([]);

    const fetchFruitItems = async () => {
        const fetchTheItems = await fetch(
            `http://localhost:8090/fruit/all`
        ); 
        const items = await fetchTheItems.json();
        setFruitItems(items);
        console.log(items);

    }

    const handleModalOpen = (fruitId) => {
        setModalFruitId(fruitId);
        setModalOpen(true);
      };
    
      const handleModalClose = () => {
          setModalFruitId([]);
        setModalOpen(false);
        fetchFruitItems();
      };


    const handleDeleteClick = (itemId) => {
      axios.delete(`http://localhost:8090/fruit/delete/${itemId}`)
     .then( response => {
        console.log(response.data)
        fetchFruitItems();
     })
}
    
   return(
       <div className={classes.root}>
      <TableContainer>
        <Table className={classes.table} aria-label="a dense table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="left"><b>Fruit Name</b></StyledTableCell>
              <StyledTableCell align="left"><b>Price Per Unit</b></StyledTableCell>
              <StyledTableCell align="left"><b>Calories</b></StyledTableCell>
              <StyledTableCell align="left"><b>Edit Pice</b></StyledTableCell>
              <StyledTableCell align="left"><b>Delete Fruit</b></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody data-testid="tablebody-event">
            {fruitItems.map((item) => (
                <StyledTableRow key={item._id} hover>
                <StyledTableCell  align="left">{item.fruitName}</StyledTableCell>
                <StyledTableCell  align="left">₹{item.pricePerFruit}</StyledTableCell>
                <StyledTableCell align="left">{item.calorificValuePerFruit}</StyledTableCell> 
                <StyledTableCell align="left">
                <Tooltip title = "edit the fruit price">
                 <IconButton size="small" onClick={()=>handleModalOpen(item._id)}>
                 <EditIcon/>
                 </IconButton>
                 </Tooltip>
                 <Modal
            open={modalOpen && modalFruitId===item._id}
            onClose={handleModalClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            <div style={modalStyle} className={classes.paper}>
            <Typography variant="subtitle1" id="simple-modal-title">Hi admin, please edit the price of fruit and save changes</Typography>
             <p id="simple-modal-description">
              <ModalPriceEditForm fruit={item}/>
            </p>
            </div>
          </Modal>
                 
                  </StyledTableCell> 
                  <StyledTableCell align="left">
                  <Tooltip title = "delete the fruit">
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

export default FruitTable;