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
                            height:'17.5vh',
                            backgroundColor: selectedStudio && selectedStudio.id===studio.id ? "rgba(0, 0, 0, 0.15)": ''}}
                        >
                        <Card.Header style={{backgroundColor: selectedStudio && selectedStudio.id===studio.id ? "rgba(0, 0, 0, 0)": 'rgba(255,255,255,0)'}}
                        ><div style={{color: '#506582'}}><strong>{studio.name}</strong> &nbsp;&nbsp; Tel: {studio.phone_number}</div> </Card.Header>
                        <Card.Body className="text-center">
                            <Card.Text>
                                <span style={{color: '#506582'}}>
                                {studio.address}
                                </span>
                            </Card.Text>
                            <Link to={'/studios/'+studio.id} state={{directionAppend:directionAppend}}>
                                <SmallPrimaryButton variant="success" className='mx-3 my-2'> Details </SmallPrimaryButton>
                            </Link>
                            
                            <a href={studio.direction+directionAppend} target='_blank'>
                                <SmallPrimaryButton href={studio.direction+directionAppend} target="_blank" className='mx-3 my-2'> Direction </SmallPrimaryButton>
                            </a>
                            <Link to={'/classes'} state={{studio_id:studio.id}}>
                                <SmallPrimaryButton variant="info"className='mx-3 my-2'> Class </SmallPrimaryButton>
                            </Link>
                        </Card.Body>
                    </Card>
                </Row>
            ))}
        </Container>
      );
}

export default CardsList;