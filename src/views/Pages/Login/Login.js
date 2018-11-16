import React, { Component } from 'react';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row, Progress } from 'reactstrap';
import toastr from 'toastr';
import { authRef, userRef } from '../../../firebase/init';
class Login extends Component {
  constructor() {
    super()
    this.state = {
      username: '',
      password: '',
      error: ''
    }
  }
  componentDidMount() {

  }
  onLogin = () => {
    authRef
      .signInWithEmailAndPassword(this.state.username, this.state.password)
      .then((user) => {

        userRef.orderByChild('id').equalTo(user.user.uid).on("value", snapshot => {
          let key = Object.keys(snapshot.val());
          let finduser = snapshot.val()[key[0]];
          if (finduser.userrole == "super_admin" || finduser.userrole == "restaurant_admin") {
            this.props.history.push('/dashboard');
            userRef.orderByKey().off('child_added', null);
          }
          else {
            toastr.error('you are not authorized');
          }
          //console.log(snapshot.val());
        });


        //
      })
      .catch((error) => {
        toastr.error(error.message)
      });
  }
  handleChange = (e) => {
    const newState = this.state;
    newState[e.target.id] = e.target.value;
    this.setState(newState);
  }

  render() {

    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" placeholder="Username"
                          id='username'
                          value={this.state.username}
                          onChange={this.handleChange}
                        />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" placeholder="Password"
                          id='password'
                          value={this.state.password}
                          onChange={this.handleChange} />
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button color="primary" className="px-4" onClick={this.onLogin}>Login</Button>
                        </Col>
                        <Col xs="6" className="text-right">
                          <Button color="link" className="px-0">Forgot password?</Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: 44 + '%' }}>
                  <CardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.</p>
                      <Button color="primary" className="mt-3" active>Register Now!</Button>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;
