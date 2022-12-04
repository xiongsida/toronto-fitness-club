
import React, {useEffect, useState} from "react";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import Button from "react-bootstrap/esm/Button";
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Table from 'react-bootstrap/Table';
import Alert from 'react-bootstrap/Alert';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

function Classes() {
    const [info, setInfo] = useState();
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/classes`)
            .then(res => {
                if(res.status!==200)
                {
                    console.log(res.status);
                }
                return res.json();
                })
            .then(data => {
                console.log(data);
                data.results ? setClasses(data.results) : setClasses([]);
                setInfo(data.detail)
            })
    }, []);

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

    console.log(classes)

return (
<>
    {info && <ToastContainer className="p-3" position='top-center'>
        <Toast bg='info' delay={1000} autohide={true}>
        <Toast.Header closeButton={false}>
            <strong className="me-auto">Action Response</strong>
        </Toast.Header>
        <Toast.Body>{info}</Toast.Body>
        </Toast>
    </ToastContainer>}
    <Table>
    <thead>
        <tr>
        <th className="text-center">Class Name</th>
        <th className="text-center">Date</th>
        <th className="text-center">Start Time</th>
        <th className="text-center">End Time</th>
        <th className="text-center">Coach</th>
        <th className='text-center'>Actions</th>
        </tr>
    </thead>
    <tbody>
    {classes & classes.map( class_ => (
        <tr key={ class_.id}>
            <td className="text-center">{ class_.class_parent.name }</td>
            <td className="text-center">{ class_.date }</td>
            <td className="text-center">{ class_.start_time }</td>
            <td className="text-center">{ class_.end_time }</td>
            <td className="text-center">{ class_.coach }</td>
            <td>
            <div className="text-center">

            <DropdownButton as={ButtonGroup} variant='success'
            title='Enroll' className='m-1 text-center' id={`dropdown-enroll-${class_.id}`}>
                <Dropdown.Item onClick={() => classAction(class_.id,"0","enroll")}>Single Class Instance</Dropdown.Item>
                <Dropdown.Item onClick={() => classAction(class_.id,"1","enroll")}>All Future Instances</Dropdown.Item>
            </DropdownButton>

            <DropdownButton as={ButtonGroup} variant='danger'
            title='Drop' className='m-1 text-center' id={`dropdown-drop-${class_.id}`}>
                <Dropdown.Item onClick={() => classAction(class_.id,"0","drop")}>Single Class Instance</Dropdown.Item>
                <Dropdown.Item onClick={() => classAction(class_.id,"1","drop")}>All Future Instances</Dropdown.Item>
            </DropdownButton>
            </div>
            </td>
        </tr>
    ))}
    </tbody>
    </Table>
</>
);
}

export default Classes;