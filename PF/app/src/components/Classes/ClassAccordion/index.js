import React,{useState, useContext} from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { Box } from '@mui/material';
import toast, { Toaster } from "react-hot-toast";
import CustomerModal from '../../CustomerModal';
import SubscriptionContext from '../../../Context/SubscriptionContext';
import tw from "twin.macro";
import './style.css'

const config = require('../../../TFCConfig.json');

const LinkDiv = tw.div`
  text-lg my-0 lg:text-sm lg:my-0
  font-semibold tracking-wide transition duration-300
  pb-0 border-transparent hover:border-primary-500 hocus:text-primary-500
`;

const ClassAccordion=({classes,is_authenticated, access_token,
    // is_subscribed, 
    userSchedule, userClassHistory,
    userAction, setUserAction})=>{

    const { isSub } = useContext(SubscriptionContext);

    let userScheduleSet=new Set(userSchedule);
    let userClassHistorySet=new Set(userClassHistory);

    const [expanded, setExpanded] = useState(false);

    const [modalOpen, setModalOpen] = useState(false);

    const handleExpand = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const classAction = (class_id, for_future, action) =>{
        if (!isSub){
            setModalOpen(true);;
            return;
        }
        setUserAction(!userAction);
        const reqUrl = 'http://localhost:8000/api/classes/'+class_id+'/'+action;
        const postBody = {
            'for_future':for_future
        };
        const requestMetadata = {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${access_token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postBody)
        };
    
        fetch(reqUrl, requestMetadata)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (!data.detail){
                    toast.error('unknow error', config.TOASTER_STYLE);
                }else if (data.detail.success){
                    toast.success(data.detail.success, config.TOASTER_STYLE);
                }else if (data.detail.error){
                    toast.error(data.detail.error, config.TOASTER_STYLE);
                }else{
                    toast.error('unknow error', config.TOASTER_STYLE);
                }
        }).catch((e)=>{
            toast.error(e, config.TOASTER_STYLE);
        });
    }

    return (
        <>
        <Toaster
        position="top-center"
        reverseOrder={false}
        />
        <CustomerModal modalBody={'Sorry, you need have a valid subscription to make actions to classes'}
        modalBottonLabel={'Subscribe a Plan'}
        modalBottonLink={`/plans`}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}/>
        <br/>
        <div className='my-classes-div'>
        <Box justifyContent="center" display="flex" >
        <Box sx={{
        width: '85%',
        height: '70%',
        }}>
        {classes&&classes.map((course,index)=>(
            <Accordion key={course.id} expanded={expanded === 'panel'+course.id} onChange={handleExpand('panel'+course.id)}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={"panel"+course.id+"bh-content"}
              id={"panel"+course.id+"bh-header"}
            >
                <Typography sx={{ width: '33%', flexShrink: 0 }}>
                <b>{course.class_parent.name}</b>
                </Typography>
                <Typography sx={{ color: 'text.secondary'}} >
                <b>{course.date}</b>&nbsp;&nbsp;
                {course.start_time} &nbsp;~&nbsp; {course.end_time}&nbsp;&nbsp;
                available spots: {course.available_slot}&nbsp;&nbsp;&nbsp;&nbsp;
                </Typography>
    
            </AccordionSummary>
            <AccordionDetails>
            <Typography sx={{ color: 'text.secondary'}}>
                <b>Description: </b>{course.description}<br/>
                <b>Coach: </b> {course.coach}
            </Typography>
            
            {/* {is_authenticated&& (!(userClassHistorySet.has(course.id))) && */}
            <Box display="flex" 
            justifyContent="center">
            <DropdownButton  variant='info' 
            disabled={!(is_authenticated && (!(userClassHistorySet.has(course.id) || userScheduleSet.has(course.id))) && (!course.is_cancelled))}
            title='Enroll' className='m-1 text-center' id={`dropdown-enroll-${course.id}`}>
                <Dropdown.Item onClick={() => classAction(course.id,"0","enroll")}>
                    <LinkDiv>Single Class Instance</LinkDiv>
                </Dropdown.Item>
                <Dropdown.Item onClick={() => classAction(course.id,"1","enroll")}>
                    <LinkDiv>All Future Instances</LinkDiv>
                </Dropdown.Item>
            </DropdownButton>
            {/* {(userScheduleSet.has(course.id)) &&  */}
            <DropdownButton variant='warning'
            disabled={!(is_authenticated && userScheduleSet.has(course.id))}
            title='Drop' className='m-1 text-center' id={`dropdown-drop-${course.id}`}>
                <Dropdown.Item onClick={() => classAction(course.id,"0","drop")}>
                    <LinkDiv>Single Class Instance</LinkDiv>
                </Dropdown.Item>
                <Dropdown.Item onClick={() => classAction(course.id,"1","drop")}>
                    <LinkDiv>All Future Instances</LinkDiv>
                </Dropdown.Item>
            </DropdownButton>
            </Box>
            </AccordionDetails>
          </Accordion>
        ))}
        </Box>
        </Box>
        </div>
        </>
      );
};

export default ClassAccordion;