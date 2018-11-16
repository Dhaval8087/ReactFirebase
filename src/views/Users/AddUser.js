import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, FormGroup, Form, Input, FormText, Label, CardFooter, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addUser, editUser } from '../../actions/usersactions';
class AddUser extends Component {
    constructor(props) {
        super(props)
        this.state = this.setIntialData();
    }
    setIntialData = () => {
        return {
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            cpassword: '',
            phone: '',
            userrole: '',
            isedit: false,
            key: 0

        }
    }
    componentDidMount() {
        let users = this.props.users;
        let finduser = users.find(p => p.id == this.props.match.params.id);
        if(typeof finduser != 'undefined')
        {
            this.setState({
                firstname: finduser.firstname,
                lastname: finduser.lastname,
                phone: finduser.phone,
                userrole: finduser.userrole,
                key: finduser.key,
                isedit: true
            })
        }

    }
    handleChange = (e) => {
        const newState = this.state;
        newState[e.target.id] = e.target.value;
        this.setState(newState);
    }
    onSave = (e) => {
        let user = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            phone: this.state.phone,
            userrole: this.state.userrole,
        }
        if (this.state.isedit) {
            user.key = this.state.key;
            this.props.editUser(user);
            this.props.history.push('/users');
        }
        else {
            user.email = this.state.email;
            this.props.addUser(user,this.state.password);
            this.onCancel();
        }

    }
    onCancel = (e) => {
        this.setState(this.setIntialData())
    }
    render() {
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" md="6">
                        <Card>
                            <CardHeader>
                                <strong>Add User</strong>
                            </CardHeader>
                            <CardBody>
                                <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">

                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="name-input">Firstname</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="text" id="firstname" value={this.state.firstname} onChange={this.handleChange} placeholder="Enter Firstname" autoComplete="name" />
                                            <FormText className="help-block">Please enter your firstname</FormText>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="name-input">LastName</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="text" id="lastname" value={this.state.lastname} onChange={this.handleChange} placeholder="Enter Listname" autoComplete="name" />
                                            <FormText className="help-block">Please enter your lastname</FormText>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="email-input">Email</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            {this.state.isedit ? <Input type="email" id="email"
                                                value={this.state.email} disabled /> :
                                                <Input type="email" id="email"
                                                    value={this.state.email} onChange={this.handleChange}
                                                    placeholder="Enter Email" autoComplete="email" />}
                                            <FormText className="help-block">Please enter your email</FormText>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="password-input">Password</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            {this.state.isedit ? <Input type="password" id="password" disabled /> :
                                                <Input type="password" id="password"
                                                    value={this.state.password} onChange={this.handleChange}
                                                    placeholder="Password" autoComplete="new-password" />}
                                            <FormText className="help-block">Please enter a complex password</FormText>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="password-input">Re-Password</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            {this.state.isedit ? <Input type="password" id="cpassword" disabled /> :
                                                <Input type="password" id="cpassword"
                                                    value={this.state.cpassword} onChange={this.handleChange}
                                                    placeholder="Password" autoComplete="new-password" />}
                                            <FormText className="help-block">Please enter a complex password</FormText>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="password-input">Phone Number</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="email" placeholder="Enter Phone" id="phone" value={this.state.phone} onChange={this.handleChange} autoComplete="phone" />
                                            <FormText className="help-block">Please enter your phone</FormText>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="3">
                                            <Label htmlFor="password-input">User Role</Label>
                                        </Col>
                                        <Col xs="12" md="9">
                                            <Input type="select" name="select" id="userrole" value={this.state.userrole} onChange={this.handleChange}>
                                                <option value="0">Please select</option>
                                                <option value="super_admin">Super Admin</option>
                                                <option value="admin_support">Admin Support</option>
                                                <option value="restaurant_admin">Restaurant Admin</option>
                                                <option value="customer">Customer</option>
                                            </Input>
                                            <FormText className="help-block">Please enter your phone</FormText>
                                        </Col>
                                    </FormGroup>
                                </Form>
                            </CardBody>
                            <CardFooter>
                                <Button type="submit" size="sm" color="primary" onClick={this.onSave}><i className="fa fa-dot-circle-o"></i> Submit</Button>
                                &nbsp;
                                <Button type="reset" size="sm" color="danger" onClick={this.onCancel}><i className="fa fa-ban"></i> Reset</Button>
                            </CardFooter>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        isLoading: state.userReducer.isLoading,
        users: state.userReducer.users
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        addUser: bindActionCreators(addUser, dispatch),
        editUser: bindActionCreators(editUser, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddUser);
