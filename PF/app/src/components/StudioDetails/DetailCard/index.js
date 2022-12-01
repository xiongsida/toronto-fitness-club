import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

const DetailCard = ({details}) => {
    console.log(details)
    return (
        <Card style={{"height" : "30%", "width" : "50%" }} bg="dark" text="light">
            <Card.Header>Studio #{details.id}</Card.Header>
            <Card.Body className="text-center">
                <Card.Title>{details.name}</Card.Title>
                <Card.Text>
                    {details.address}
                    <br/>
                    {details.postal_code}
                    <br/>
                    Contact us {details.phone_number}
                    <br/>
                    Amenities: <br/>
                    {details.amenities.map(amenity => (
                        <span>{amenity.quantity} {amenity.amenity.type}, </span>
                    ))}
                </Card.Text>
                <Button href={details.direction} variant="warning" className='m-3'> DERECTION </Button>
                <Button component={Link} to={"/api/classes?studio_id="+details.id} variant="info"className='m-3'> VIEW OUR CALSS SCHEDULE </Button>
            </Card.Body>
        </Card>
      );
}

export default DetailCard;