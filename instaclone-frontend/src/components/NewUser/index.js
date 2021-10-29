import {Button} from 'react-bootstrap';
import {useHistory} from 'react-router-dom';

function NewUser(){
    const history =useHistory();

    const register = async (e) => {
        try {
            e.preventDefault();
            
            const response = await fetch("http://localhost:3070/signup", {
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
                    name: e.target.name.value,
                    email: e.target.email.value,
                    password: e.target.password.value
                }) // body data type must match "Content-Type" header
            });
        }catch(e){
            console.log(e)
        }
        history.push('/');    
    }

    return(
        <div>
            <form className="form-register" onSubmit={e => register(e)}>
                <label htmlFor="name">Name</label>
                <input name="name" type="text" /><br />
                <label htmlFor="email">Email</label>
                <input name="email" type="email" /><br />
                <label htmlFor="password">Password</label>
                <input name="password" type="password" /><br />
                <div className="login-button">
                <Button type="submit" className="btn">Submit</Button>
                </div>
            </form>
        </div>
    )
}

export default NewUser;