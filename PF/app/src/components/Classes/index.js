
import React, {useEffect, useState} from "react";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import Button from "react-bootstrap/esm/Button";
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Table from 'react-bootstrap/Table';

import SearchBar from "../SearchBar";
import ClassFilterPanel from "../ClassFilterPanel";
import Container from "react-bootstrap/esm/Container";

function Classes() {

    const [studioOptions, setStudioOptions] = useState([]);
    const [classOptions, setClassOptions] = useState([]);
    useEffect(() =>{
        fetch('http://127.0.0.1:8000/api/allstudios')
            .then(res => res.json())
            .then(data => {
                setStudioOptions(data.map(studio=>
                    [studio.id, studio.name+', '+studio.address]
                ));
            }) 
        fetch('http://127.0.0.1:8000/api/allclassparents')
        .then(res => res.json())
        .then(data => setClassOptions(
            Array.from(new Set(data.map(classparent=>classparent.name))).map(c=>[c,c])
        ))
    },[])

    const [info, setInfo] = useState();
    const [classes, setClasses] = useState([]);

    const [searchInput, setSearchInput] = useState('');
    const [selectedStudio, setSelectedStudio] =useState('');
    const [selectedClass, setSelectedClass] = useState('');
    const [scope, setScope] = useState('');
    const [dateRange, setDateRange] =useState([]);
    const [timeRange, setTimeRange] =useState(['00:00','23:59']);

    console.log(dateRange)
    console.log(timeRange)

    let url=`http://127.0.0.1:8000/api/classes?&studio_id=${selectedStudio?selectedStudio:''}`+
    `&scope=${scope?scope:''}&search=${searchInput}&class_parent__name=${selectedClass?selectedClass:''}`+
    `&date_range_start=${dateRange&&dateRange[0]?dateRange[0]:''}&date_range_end=${dateRange&&dateRange[1]?dateRange[1]:''}`+
    `&time_range_start=${timeRange&&timeRange[0]?timeRange[0]:''}&time_range_end=${timeRange&&timeRange[1]?timeRange[1]:''}`

    useEffect(() => {
        console.log(url)
        fetch(url)
            .then(res => {
                if(res.status!==200)
                {
                    console.log(res.status);
                }
                return res.json();
                })
            .then(data => {
                // console.log(data);
                data.results ? setClasses(data.results) : setClasses([]);
                setInfo(data.detail)
            })
    }, [searchInput, selectedStudio, selectedClass, scope, dateRange, timeRange]);

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
    <Container fluid='true' className='m-0'>
        <Row className='m-2'>
            <SearchBar 
                value={searchInput}
                changeInput={(e) => setSearchInput(e.target.value)}
                placeholdertext = 'Search by class name, coach, date'
                />
        </Row>
        <Row>
            <Col className='m-0'>
            <ClassFilterPanel 
            studioOptions={studioOptions} selectedStudio={selectedStudio} setSelectedStudio={setSelectedStudio}
            classOptions={classOptions} selectedClass={selectedClass} setSelectedClass={setSelectedClass}
            scope={scope} setScope={setScope}
            dateRange={dateRange} setDateRange={setDateRange}
            timeRange={timeRange} setTimeRange={setTimeRange}
            />
            </Col>

            <Col className='m-0'>
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
            {classes && classes.map( class_ => (
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
            </Col>
        </Row>
    </Container>
</>
);
}

export default Classes;