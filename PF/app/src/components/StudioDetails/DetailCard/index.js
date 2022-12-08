import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { PrimaryButton, SecodaryButton } from '../../misc/Buttons';
import { Box } from '@mui/material';

const DetailCard = ({details, directionAppend}) => {
    // console.log(details.amenities)
    // console.log(details.amenities.length)
    return (
        <Box
        display="flex" 
        justifyContent="center"
        >
        <Card style={{"height" : "40%", "width" : "60%" }} bg="dark" text="light" className="bg-opacity-75">
            <Card.Header><b>Studio #{details.id}</b></Card.Header>
            <Card.Body className="text-center">
                <Card.Title>{details.name}</Card.Title>
                <Card.Text>
                    {details.address}
                    <br/>
                    {details.postal_code}
                    <br/>
                    Contact us: {details.phone_number}
                    <br/>
                    {details.amenities.length>0 && 
                    <div>
                    Amenities: <br/>
                    {details.amenities.map(amenity => (
                        <span>{amenity.quantity} {amenity.amenity.type}, </span>
                    ))}
                    </div>}
                </Card.Text>
                <a href={details.direction+directionAppend} target="_blank">
                <PrimaryButton className='m-3'> DERECTION </PrimaryButton>
                </a>
                
                <Link to={'/classes'} state={{studio_id:details.id}}>
                    <PrimaryButton className='m-3'> CALSSES </PrimaryButton>
                </Link>
            </Card.Body>
        </Card>
        </Box>
      );
}

export default DetailCard;