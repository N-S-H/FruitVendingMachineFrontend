import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import AvailabilityModal from '../AvailabilityComponent/AvailabilityModal';
import UserFruitTable from './UserFruitTable';
import UserForm from './UserForm';


const useStyles = makeStyles((theme) => ({
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
    const top = 50+rand();
    const left = 50+rand();

    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }


function User() {
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
                <UserForm/>
                <br/><br/><br/>
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
            <Typography variant="subtitle1" id="simple-modal-title">Hi User! please view the fruits and the corresponding quantity present in stock in Fresh Mart</Typography>
             <p id="simple-modal-description">
              <AvailabilityModal/>
            </p>
            </div>
          </Modal>
                <br/><br/><br/><br/>
                <UserFruitTable/>
                <br/><br/><br/><br/>
                </div>
    </div>
   );
}

export default User;