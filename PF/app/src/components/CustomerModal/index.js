import React,{useState} from 'react';
import Modal from 'rsuite/Modal';
import { Link } from 'react-router-dom';
import { SmallPrimaryButton,SmallSecodaryButton } from '../misc/Buttons';


const CustomerModal=({modalBody, 
    modalBottonLabel, modalBottonLink, 
    modalOpen,setModalOpen})=>{

    return(
        <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
            <Modal.Body>
                <b>{modalBody}</b>
            </Modal.Body>
            <Modal.Footer>
                <Link to={modalBottonLink}>
                    <SmallPrimaryButton onClick={() => setModalOpen(false)} >
                        {modalBottonLabel}
                    </SmallPrimaryButton>
                </Link>
                <SmallSecodaryButton className='m-2' onClick={() => setModalOpen(false)} >
                    Cancel
                </SmallSecodaryButton>
            </Modal.Footer>
        </Modal>
    );

}

export default CustomerModal;