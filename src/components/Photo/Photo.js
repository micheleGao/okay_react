
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Container, Image } from 'react-bootstrap';


export default function Photo({ userInfo, loggedIn }) {
    const [photos, setPhotos] = useState(null);
    const { id } = useParams()
    const getArtistsPhoto = async () => {
        try {
            const response = await fetch(`https://hidden-reef-03391.herokuapp.com/photos/`);
            const data = await response.json();
            console.log(data);
            if (response.status === 200) {
                setPhotos(data);
            }
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getArtistsPhoto();

    }, []);

    if (!photos) {
        return null;
    }
    return (
        <div>
            <>
                <h2> Photos</h2>
                {!photos.length && <p></p>}
                {photos.length > 0 &&
                    photos.map((photo) => {
                        return (
                            <Container className="photo-content"
                                className='p-2 border rounded-2 bg-light'
                                key={photo.id}>
                                <h3>{photo.title}</h3>
                                <small>{photo.album}</small>
                            </Container>
                        );
                    })}
            </>
        </div>

    )
}

