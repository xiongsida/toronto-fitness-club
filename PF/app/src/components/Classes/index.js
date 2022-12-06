import React, {useEffect, useState} from "react";
import { useLocation } from "react-router-dom";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Table from 'react-bootstrap/Table';

import SearchBar from "../SearchBar";
import ClassFilterPanel from "../ClassFilterPanel";

import Pagination from '@mui/material/Pagination';
import { Container, Footer } from "rsuite";

function Classes() {
    let init_studio_id=''
    if (useLocation().state){
        init_studio_id= useLocation().state.studio_id}

    const [totalPage, setTotalPage]=useState(1);
    const [studioOptions, setStudioOptions] = useState([]);
    const [classOptions, setClassOptions] = useState([]);

    const [info, setInfo] = useState();
    const [classes, setClasses] = useState([]);

    // const [searchInput, setSearchInput] = useState('');
    // const [selectedStudio, setSelectedStudio] =useState('');
    // const [selectedClass, setSelectedClass] = useState('');
    // const [scope, setScope] = useState('');
    // const [dateRange, setDateRange] =useState([]);
    // const [timeRange, setTimeRange] =useState(['00:00','23:59']);

    const [classMeta, setClassMeta] =useState({
        searchInput:'',
        selectedStudio:init_studio_id,
        selectedClass:'',
        scope:'',
        dataRange:[],
        timeRange:['00:00','23:59'],
        page:1,
    });
    const {searchInput, selectedStudio, selectedClass, scope, dateRange, timeRange, page} =classMeta;

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

    let url=`http://127.0.0.1:8000/api/classes?&studio_id=${selectedStudio?selectedStudio:''}`+
    `&scope=${scope?scope:''}&search=${searchInput}&class_parent__name=${selectedClass?selectedClass:''}`+
    `&date_range_start=${dateRange&&dateRange[0]?dateRange[0]:''}&date_range_end=${dateRange&&dateRange[1]?dateRange[1]:''}`+
    `&time_range_start=${timeRange&&timeRange[0]?timeRange[0]:''}&time_range_end=${timeRange&&timeRange[1]?timeRange[1]:''}`+
    `&page=${page}`

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
                setTotalPage(data.page.totalPages)
                setInfo(data.detail)
            })
    }, [classMeta]);

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
                // changeInput={(e) => setSearchInput(e.target.value)}
                changeInput={(e)=>setClassMeta({
                    ...classMeta,
                    searchInput:e.target.value,
                    page:1,
                })}
                placeholdertext = 'Search by class name, coach, date'
                />
        </Row>
        <Row>
            <Col className='m-0'>
            <ClassFilterPanel 
            studioOptions={studioOptions} selectedStudio={selectedStudio} 
            setSelectedStudio={(value)=>{
                setClassMeta({
                    ...classMeta,
                    selectedStudio:value,
                    page:1,
                })
            }}

            classOptions={classOptions} selectedClass={selectedClass} 
            setSelectedClass={(value)=>{
                setClassMeta({
                    ...classMeta,
                    selectedClass:value,
                    page:1
                })
            }}

            scope={scope} 
            setScope={(value)=>{
                setClassMeta({
                    ...classMeta,
                    scope:value,
                    page:1
                })
            }}

            dateRange={dateRange} 
            setDateRange={(value)=>{
                setClassMeta({
                    ...classMeta,
                    dateRange:value,
                    page:1
                })
            }}

            timeRange={timeRange} 
            setTimeRange={(value)=>{
                setClassMeta({
                    ...classMeta,
                    timeRange:value,
                    page:1
                })
            }}
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
        <Footer>
        <Pagination 
        page={page} 
        onChange={(event,value)=>{
            setClassMeta({
                ...classMeta,
                page:value,
            });
        }}
        count={totalPage} 
        color="secondary" />
    </Footer>
    </Container>
</>
);
}

export default Classes;