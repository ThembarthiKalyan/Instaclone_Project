import {Button} from 'react-bootstrap';
import "./index.css";
import { Link} from 'react-router-dom';
import { setToken } from '../utils/authOperations';
//import { useHistory } from 'react-router-dom';

function HomePage(){
    //const history =useHistory();

    const login = async (e) => {
        try {
            e.preventDefault();
            const response = await fetch("http://localhost:3070/login", {
                method: 'POST',
                mode: 'cors', 
                cache: 'no-cache', 
                credentials: 'same-origin',
                headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                redirect: 'follow',
                referrerPolicy: 'no-referrer', 
                body: JSON.stringify({
                    email: e.target.email.value,
                    password: e.target.password.value
                }) // body data type must match "Content-Type" header
            });

            const { data} = await response.json();
            //const id = await data.id;

            setToken(data.token);
            // window.location.href = "/posts";
        } catch(e) {
            console.log(e);
            alert("failed");
        }
        window.location.href = "/posts";
    }

    return(
        <div className="homepage">
            <div className="form-login">
                <form onSubmit={e => login(e)}>
                    <label htmlFor="email" className="label-font">Email</label>
                    <input name="email" type="email" /><br />
                    <label htmlFor="password" className="label-font">Password</label>
                    <input name="password" type="password" /><br />
                    <div className="login-button">
                    <Button type="submit" className="btn">Submit</Button>
                    </div>
                </form>
                <div>
                    <Link to='/register' className='register'>Not a user/Register</Link>
                </div>
            </div>
        </div>
    )
}
export default HomePage;