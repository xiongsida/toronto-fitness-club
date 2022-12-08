import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/esm/Row';
import { SmallPrimaryButton, SmallSecodaryButton} from '../../misc/Buttons';

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
                            height:'10rem',
                            backgroundColor: selectedStudio && selectedStudio.id===studio.id ? "rgba(0, 0, 0, 0.15)": '',}}
                        >
                        <Card.Header><strong>{studio.name}</strong></Card.Header>
                        <Card.Body className="text-center">
                            <Card.Text>
                                <b>{studio.address}</b>
                                <br/>
                                Tel: {studio.phone_number}
                            </Card.Text>
                            <Link to={'/studios/'+studio.id} state={{directionAppend:directionAppend}}>
                                <SmallPrimaryButton variant="success" className='m-3'> Details </SmallPrimaryButton>
                            </Link>
                            
                            <a href={studio.direction+directionAppend} target='_blank'>
                                <SmallSecodaryButton href={studio.direction+directionAppend} target="_blank" className='m-3'> Direction </SmallSecodaryButton>
                            </a>
                            <Link to={'/classes'} state={{studio_id:studio.id}}>
                                <SmallPrimaryButton variant="info"className='m-3'> Class </SmallPrimaryButton>
                            </Link>
                        </Card.Body>
                    </Card>
                </Row>
            ))}
        </Container>
      );
}

export default CardsList;