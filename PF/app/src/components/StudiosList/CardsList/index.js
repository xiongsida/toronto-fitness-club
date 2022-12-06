import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/esm/Row';

const CardsList = ({studios, selectedStudio, setSelectedStudio, directionAppend}) => {

    return (
        <Container fluid>
            {studios.map(studio =>(
                <Row key={studio.id}>
                    <Card onClick={
                        () => {
                                setSelectedStudio(studio);
                        }}
                        style={{
                            backgroundColor: selectedStudio && selectedStudio.id===studio.id ? "rgba(0, 0, 0, 0.15)": '',}}
                        >
                        <Card.Header>{studio.name}</Card.Header>
                        <Card.Body className="text-center">
                            <Card.Text>
                                {studio.address} <br/>
                                {studio.phone_number}
                            </Card.Text>
                            <Link to={'/studios/'+studio.id} state={{directionAppend:directionAppend}}>
                                <Button variant="success" className='m-3'> DETAILS </Button>
                            </Link>
                            
                            <Button href={studio.direction+directionAppend} target="_blank" variant="warning" className='m-3'> DERECTION </Button>
                            
                            <Link to={'/classes'} state={{studio_id:studio.id}}>
                                <Button variant="info"className='m-3'> CALSSES </Button>
                            </Link>
                        </Card.Body>
                    </Card>
                </Row>
            ))}
        </Container>
      );
}

export default CardsList;