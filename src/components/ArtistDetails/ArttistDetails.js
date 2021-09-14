import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Container, Image } from 'react-bootstrap';

export default function ArtistsDetails({ userInfo, loggedIn}) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [artists, setArtists] = useState(null);
    const { id } = useParams()

    const getArtistsDetail = async () => {
        try {
            const response = await fetch(`https://hidden-reef-03391.herokuapp.com/artists/${id}`);
            const data = await response.json();
            console.log(data);
            if (response.status === 200) {
                setArtists(data);
            }
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getArtistsDetail();

    }, []);

    if (!artists) {
        return null;
    }

    return (
        <Container className='p-5 border rounded-3 bg-light'>
            <div className='d-flex justify-content-between'>
                <h2>{artists.name}</h2>
                <small>{artists.nationality}</small>
            </div>
                <Image
                    src={artists.photo_url}
                    roundedCircle
                    width="250px"
                    height="286px"
                />
        </Container>
    )
}