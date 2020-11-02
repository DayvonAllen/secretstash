import React, {useState, useEffect} from 'react'
import {Container, Card, Button, Form, Divider, Input, Grid, Segment, Icon} from 'semantic-ui-react';
import Api from '../util/Api';
import axios from 'axios'

const Home = () => {
    const [userPassword, setUserPassword] = useState({
        password: ''
    })
    const [password, setPassword] = useState('')
    
    useEffect(() => {
    generatePW()
    }, []);

 const generatePW = async () => {
    try {
        const res = await Api.get('random')
        setPassword(res.data.password)
    } catch (err) {
        console.error(err)
    }
 }

 const hashPW = async (pw) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
     try {
         const res = await axios.post('http://localhost:8080/api/v1/password/create', pw, config)
         setUserPassword({
             password: res.data.password
            })
     } catch (err) {
         console.error(err)
     }
 }
 const onChange = (e) => {
        setUserPassword({ 
         [e.target.name] : e.target.value
        })
    }
 
 const onSubmit = (e) => {
    e.preventDefault();
    if(userPassword.password !== '') {
        hashPW(userPassword)
    }
 }
    return (
        <Container className='home'>
            <Card >
                <Card.Content style={{margin: '3rem 0'}}>
                    <Card.Header> 
                        <h1 style={{textAlign: 'center', color: '#163a62'}}>Generate a secure password</h1>
                    </Card.Header>
                    <Card.Description style={{color: '#163a62'}}>
                        <h3>
                        Use our tool to create the world's strongest password with just
                        a click
                        </h3>
                        <Segment raised padded className='seg'>
                                <h3 style={{marginBottom: '0', marginRight: '15px'}}>{password}</h3>
                            <span style={{position: 'relative', float:'right !important'}}>
                            <Icon size='big' link='/' name='copy outline' onClick={() =>  navigator.clipboard.writeText(password)}/>

                            </span>
                        </Segment>
                        <Button color='violet' onClick={() => generatePW()}>Generate Password</Button>  

                        <h2 style={{marginTop: '5rem'}}>Secure your existing password</h2>
                        <Divider />
                        <Form style={{marginTop: '2rem'}}  onSubmit={onSubmit}>
                            <Form.Field 
                            label='Password'
                            type='text'
                            placeholder='Enter Password'
                            value={userPassword.password}
                            onChange={onChange}
                            control={Input}
                            />
                          <Button color='violet' type='submit'>Secure password</Button>
                          <Button color='teal' type='button' onClick={() =>  navigator.clipboard.writeText(userPassword.password)}>Copy</Button>

                        </Form> 

                    </Card.Description>
                </Card.Content>
            </Card>
        </Container>
    )
}

export default Home
