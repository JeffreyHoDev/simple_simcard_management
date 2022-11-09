import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import "./login.styles.css"

import { useState } from "react"
import { Redirect } from 'react-router-dom';

const LoginPage = ({ isLoggedIn, setIsLoggedIn }) => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")


    const loginHandler = (e) => {
        e.preventDefault()
        let login = async() => {
            let response = await fetch('http://localhost:9960/getLoginInfo', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username,
                    password
                })
            })
            let data = await response.json()
            if(data !== 0) {
                setIsLoggedIn(true)
            }else {
                alert("Invalid credentials")
            }
        }
        login()
    }

    return (
        <>
            {
                isLoggedIn ? <Redirect to={{pathname: "/entry"}}/> 
                : (
                    <div className="login-page-container">
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" placeholder="Enter username" onChange={(e) => setUsername(e.target.value)}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                            </Form.Group>
                            <Button variant="primary" type="submit" onClick={(e) => loginHandler(e)}>
                                Submit
                            </Button>
                        </Form>
                    </div>
                ) 
            }

        </>
    )
}

export default LoginPage;