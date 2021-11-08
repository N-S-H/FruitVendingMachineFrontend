import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import FruitTable from './FruitTable';
import InventoryTable from './InventoryTable';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AvailabilityModal from '../AvailabilityComponent/AvailabilityModal';


const useStyles = makeStyles((theme) => ({
    root: {
        marginLeft: theme.spacing(30)
    },
    fruitAccordion: {
      width: '80%',
      backgroundColor: '#fcfeff'
    },
    heading: {
      fontSize: theme.typography.pxToRem(20),
      fontWeight: theme.typography.fontWeightRegular,
      marginLeft: theme.spacing(70)
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
    const top = 50+rand();
    const left = 50+rand();

    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }


function Admin() {
    const classes = useStyles();

    const [modalStyle] = useState(getModalStyle);
    const [modalOpen,setModalOpen] = useState(false);

    const handleModalOpen = () => {
      setModalOpen(true);
    };
  
    const handleModalClose = () => {
      setModalOpen(false);
    };


   return(
       <div>
       <div className={classes.root}>
           <br/><br/>
        <Accordion className={classes.fruitAccordion}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          >
          <Typography className={classes.heading}>Fresh Mart Fruits</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <FruitTable/>
        </AccordionDetails>
      </Accordion>
           <br/><br/>
           <Accordion className={classes.fruitAccordion}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          >
          <Typography className={classes.heading}>Fresh Mart Inventory</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <InventoryTable/>
        </AccordionDetails>
      </Accordion>
     </div>
     <div>
         <br/><br/>
                <Link style={{textDecoration:'none'}} href={`/inventoryform`}>
                <Button variant="contained" color="primary">
                    Enter Inventory
                </Button>
                </Link>
                <br/><br/>
                <Button variant="contained" onClick={()=>handleModalOpen()}>
                    View Availability
                </Button>
                <Modal
            open={modalOpen}
            onClose={handleModalClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            <div style={modalStyle} className={classes.paper}>
            <Typography variant="subtitle1" id="simple-modal-title">Hi! These are the fruits and the corresponding quantity present in fresh mart vending machine</Typography>
             <p id="simple-modal-description">
              <AvailabilityModal/>
            </p>
            </div>
          </Modal>
                <br/><br/><br/>
                </div>
    </div>
   );
}

export default Admin;