import React from 'react';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import { Link } from 'react-router-dom';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import fire from "../App";
import { connect } from 'react-redux'
import { signUp } from "../actions/actions"
import { Redirect } from "react-router"



class SignUpPage extends React.Component {
    signUp = (tag) => {
        let val = this.refs.emailS.input.value
        let str = this.refs.user.input.value
        {
            val = val.replace("@", "-")
            val = val.replace(".", "-")
        }
        (this.refs.reconfirm.input.value === this.refs.passS.input.value) ? (
            fire.auth().createUserWithEmailAndPassword(this.refs.emailS.input.value, this.refs.passS.input.value)
                .then((createdUser) => {
                    this.refs.passS.input.value = ""
                    this.refs.reconfirm.input.value=""
                    createdUser.updateProfile({
                        displayName:str
                    }).then(()=>{
                    let auser = {
                        id: createdUser.uid,
                        email: this.refs.emailS.input.value,
                        name: str,
                    }
                    let buser = {
                        signin: true
                    }
                    fire.database().ref('users/' + createdUser.uid + '/').set(auser);
                    let userdNose={
                        uid:createdUser.uid,
                        displayName:createdUser.displayName,
                        email:createdUser.email
                    }
                    localStorage.setItem("signUser",JSON.stringify(userdNose))
                    this.props.funcSignUp(buser)
                })
                }).catch(function (error) {
                    alert(error.message)
                })
        ) : (this.refs.reconfirm.state.errorText = "Your Password does not match")
    }

    render() {
        const style = {
            margin: 12,
        }
        let sign = fire.auth().currentUser
        return (
            (sign) ? (<Redirect to="/home" />) : (
                <form>
                    <AppBar
                        iconElementLeft={<IconButton></IconButton>}
                        title={
                            <span style={{ marginLeft: "5%" }}>
                                Let's Chat
                </span>
                        }
                        style={{
                            backgroundColor: "#42A5F5",
                        }
                        }
                    />
                    <div>
                        <Card style={{ marginLeft:"10%",marginRight:"10%",marginTop:"5%",marginBottom:"5%" }}>
                            <CardTitle title="Sign Up" subtitle="Please Signup" />
                            <CardText>
                                <TextField
                                    hintText="Muhammad Ahmed"
                                    floatingLabelText="User Name"
                                    type="text"
                                    style={{ margin: "2%", textTransform:"capitalize" }}
                                    ref="user"
                                    onKeyPress={(e) => {
                                        (e.key === "Enter") ? this.signUp() : (null)
                                    }}
                                />
                                <br />
                                <TextField
                                    hintText="abc@xyz.com"
                                    floatingLabelText="Email"
                                    type="Email"
                                    style={{ margin: "2%" }}
                                    ref="emailS"
                                    onKeyPress={(e) => {
                                        (e.key === "Enter") ? this.signUp() : (null)
                                    }}
                                />
                                <br />
                                <TextField
                                    hintText="Password"
                                    floatingLabelText="Password"
                                    type="password"
                                    style={{ margin: "2%" }}
                                    ref="passS"
                                    onKeyPress={(e) => {
                                        (e.key === "Enter") ? this.signUp() : (null)
                                    }}
                                />
                                <br />
                                <TextField
                                    hintText="Re-Confirm Password"
                                    floatingLabelText="Re-Confirm Password"
                                    type="password"
                                    style={{ margin: "2%" }}
                                    ref="reconfirm"
                                    onKeyPress={(e) => {
                                        (e.key === "Enter") ? this.signUp() : (null)
                                    }}
                                />
                                <br />
                                <RaisedButton label="Sign Up" primary={true} style={style} onClick={this.signUp.bind(this)} />
                                <br />
                                <br />
                                <Link to='/signin' style={{ margin: "10%" }}>
                                    Already Have Account
                        </Link>
                            </CardText>
                        </Card>
                    </div>
                </form>
            )
        )
    }
}

const mapStateToProps = (state) => {
    return {
        authreducer: state.SignInReducer
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        funcSignUp: (tag) => {
            dispatch(signUp(tag))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpPage);
