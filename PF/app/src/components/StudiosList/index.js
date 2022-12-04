import React, {useEffect, useState} from "react";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Modal from 'react-bootstrap/Modal';
import Row from "react-bootstrap/esm/Row";
import SearchBar from "../SearchBar";
import CardsList from "./CardsList";
import StudiosMap from "./StudiosMap";
import StudioFilterPanel from "../StudioFilterPanel";
import Button from "react-bootstrap/esm/Button";

import Geocode from "react-geocode";

Geocode.setApiKey("AIzaSyAB10OdZPwqcOR-htn_zgehKdYG9eCxyWE");

const StudiosList = () => {

    const [amenityOptions, setAmenityOptions] = useState([]);
    const [classOptions, setClassOptions] = useState([]);
    useEffect(() =>{
        fetch('http://127.0.0.1:8000/api/allamenities')
            .then(res => res.json())
            .then(data => {
                setAmenityOptions(data.map(amenity=>amenity.type));
            }) 
        fetch('http://127.0.0.1:8000/api/allclassparents')
        .then(res => res.json())
        .then(data => setClassOptions(Array.from(new Set(data.map(classparent=>classparent.name)))))
    },[])

    const [selectedAmenities, setSelectedAmenities] =useState([]);
    const [selectedClasses, setSelectedClasses] = useState([]);

    const [searchInput, setSearchInput] = useState('');

    const [studios, setStudios] = useState([]);

    const [userlocation, setUserLocation] = useState({lat:'',lng:''});

    const [directionAppend, setDirectionAppend] =useState('');

    const [selectedStudio, setSelectedStudio] = useState();

    const basicURL = `http://127.0.0.1:8000/api/studios?user_lat=${userlocation.lat}&user_lng=${userlocation.lng}&search=${searchInput}`;

    useEffect(() => {
        let newURL=basicURL;
        newURL+=('&amenities__type='+selectedAmenities.join(','))
        newURL+=('&classes__name='+selectedClasses.join(','))
        // console.log(newURL)

        fetch(newURL)
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                setStudios(data.results);
            })
    }, [userlocation,searchInput,selectedAmenities,selectedClasses]);

    useEffect(() =>{
        Geocode.fromLatLng(userlocation.lat, userlocation.lng).then(
            response => {
              setDirectionAppend("&origin="+response.results[0].formatted_address)
            },
            error => {
              console.error(error);
            }
          );
        
    },[userlocation])


    const [filterShow, setFilterShow] = useState(false);
    const handleClose = () => {
        setFilterShow(false);
        handleClear();
    };
    const handleClear=()=>{
        setSelectedAmenities([]);
        setSelectedClasses([]);
    }
    const handleShow = () => setFilterShow(true);

    console.log(directionAppend)

    return(
        <>
        <SearchBar 
        value={searchInput}
        changeInput={(e) => setSearchInput(e.target.value)}
        placeholdertext = 'Search by studio name, coach, class, amenity...'
        />

        {/* <Button variant="warning" onClick={handleShow}>
        Filters
        </Button> */}
            {/* <Modal show={filterShow} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Filters</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <StudioFilterPanel 
                amenityOptions={amenityOptions} 
                selectedAmenities={selectedAmenities} 
                setSelectedAmenities={setSelectedAmenities}

                classOptions={classOptions}
                selectedClasses={selectedClasses}
                setSelectedClasses={setSelectedClasses}
                />
            </Modal.Body>
            <Modal.Footer>

            <Button variant="danger" onClick={handleClear}>
                Clear Filter
            </Button>
            </Modal.Footer>
        </Modal> */}

        <Container fluid='true'>
            <Row fluid='true'>
                <Col fluid='true'>
                    <StudioFilterPanel
                    amenityOptions={amenityOptions} 
                    selectedAmenities={selectedAmenities} 
                    setSelectedAmenities={setSelectedAmenities}

                    classOptions={classOptions}
                    selectedClasses={selectedClasses}
                    setSelectedClasses={setSelectedClasses}
                    />
                    <Button className=" m-3"variant="danger" onClick={handleClear}>
                        Clear Filter
                    </Button>
                </Col>
                <Col fluid='true'>
                    <CardsList studios={studios} 
                    selectedStudio={selectedStudio} 
                    setSelectedStudio={setSelectedStudio}
                    directionAppend={directionAppend}/>  
                </Col> 
                <Col fluid='true'>
                    <StudiosMap studios={studios}
                    setUserLocation={setUserLocation} 
                    selectedStudio={selectedStudio} 
                    setSelectedStudio={setSelectedStudio}
                    />  
                </Col>
            </Row>
        </Container>
        </>
    )
}

export default StudiosList;