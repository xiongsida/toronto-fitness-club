import React,{useState} from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { Box } from '@mui/material';
import { Opacity } from '@mui/icons-material';

const ClassAccordion=({classes})=>{

    const [info, setInfo] = useState();
    const [expanded, setExpanded] = useState(false);

    const handleExpand = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const classAction = (class_id, for_future, action) =>{
        console.log(class_id)
        const reqUrl = 'http://localhost:8000/api/classes/'+class_id+'/'+action;
        const postBody = {
            'for_future':for_future
        };
        const requestMetadata = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postBody)
        };
    
        fetch(reqUrl, requestMetadata)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setInfo(data.detail)
            });
    }

    return (
        <>
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
                Available Slot: {course.available_slot}&nbsp;&nbsp;&nbsp;&nbsp;
            
                </Typography>
    
            </AccordionSummary>
            <AccordionDetails>
            <Typography sx={{ color: 'text.secondary'}}>
                <b>Description: </b>{course.description}<br/>
                <b>Coach: </b> {course.coach}
            </Typography>
            
            <Box display="flex" 
            justifyContent="center">
            <DropdownButton as={ButtonGroup} variant='info'
            title='Enroll' className='m-1 text-center' id={`dropdown-enroll-${course.id}`}>
                <Dropdown.Item onClick={() => classAction(course.id,"0","enroll")}>Single Class Instance</Dropdown.Item>
                <Dropdown.Item onClick={() => classAction(course.id,"1","enroll")}>All Future Instances</Dropdown.Item>
            </DropdownButton>
            <DropdownButton as={ButtonGroup} variant='warning'
            title='Drop' className='m-1 text-center' id={`dropdown-drop-${course.id}`}>
                <Dropdown.Item onClick={() => classAction(course.id,"0","drop")}>Single Class Instance</Dropdown.Item>
                <Dropdown.Item onClick={() => classAction(course.id,"1","drop")}>All Future Instances</Dropdown.Item>
            </DropdownButton>
            </Box>
            </AccordionDetails>
          </Accordion>
        ))}
        </>
      );
};

export default ClassAccordion;