import React, {useEffect, useState} from "react";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import CardsList from "./CardsList";
import StudiosMap from "./StudiosMap";

const StudiosList = () => {

    const [studios, setStudios] = useState([]);

    const [userlocation, setUserLocation] = useState({lat:'',lng:''});

    const [selectedStudio, setSelectedStudio] = useState();

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/studios?user_lat=${userlocation.lat}&user_lng=${userlocation.lng}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setStudios(data.results);
            })
    }, [userlocation]);

    return(
        <>
        <Container fluid='true'>
            <Row fluid='true'>
                <Col fluid='true'>
                    <CardsList studios={studios} selectedStudio={selectedStudio} setSelectedStudio={setSelectedStudio}/>  
                </Col> 
                <Col fluid='true'>
                    <StudiosMap studios={studios} setUserLocation={setUserLocation} selectedStudio={selectedStudio} setSelectedStudio={setSelectedStudio}/>  
                </Col>
            </Row>
        </Container>
        </>
    )
}

export default StudiosList;