import { Link } from 'react-router-dom'
import { Container } from 'react-bootstrap'
const Error = () => {
    return (
        <Container>
            <div className='error d-flex flex-column align-items-center'>
                <h3>404 Error</h3>
                <p>Oops Look Like the Page you we Looking for is is missing</p>
                <p><Link to='/' className='btn btn-lg  text-uppercase '>Go To Home</Link></p>
            </div>
        </Container>);
}

export default Error;