import React from 'react';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import { Link } from 'react-router-dom';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import fire from "../App";
import { connect } from 'react-redux'
import { signIn } from "../actions/actions"
import { Redirect } from "react-router"


let sign = fire.auth().currentUser;
class SignInPage extends React.Component {
    signIn = (tag) => {
        let that=this.props
        let val = this.refs.email.input.value
        {
            val = val.replace("@", "-")
            val = val.replace(".", "-")
        }
        fire.auth().signInWithEmailAndPassword(this.refs.email.input.value, this.refs.pass.input.value)
        .then(
            (signedinUser) => {
                let user = {
                    signin: true,
                }
                let userdNose={
                    uid:signedinUser.uid,
                    displayName:signedinUser.displayName,
                    email:signedinUser.email
                }
                localStorage.setItem("signUser",JSON.stringify(userdNose))
                that.funcSignIn(user)
                that.history.push("/home")
            })
            .catch(function (err) { alert(err.message, err) })
        }
        render() {
            const style = {
                margin: 12,
            }
            sign = JSON.parse(localStorage.getItem("signUser"));
            return (
            (sign) ? (<Redirect to="/home" />) : (
                <span>
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
                            <CardTitle title="Sign In" subtitle="Please Signin to continue" />
                            <CardText>
                                <TextField
                                    hintText="abc@xyz.com"
                                    floatingLabelText="Email"
                                    type="Email"
                                    style={{ margin: "3%"}}
                                    ref="email"
                                    
                                    onKeyPress={(e) => {
                                        (e.key === "Enter") ? this.signIn() : (null)
                                    }}
                                />
                                <br />
                                <TextField
                                    hintText="Password"
                                    floatingLabelText="Password"
                                    type="password"
                                    autoComplete="new-password"
                                    style={{ margin: "3%" }}
                                    ref="pass"
                                    onKeyPress={(e) => {
                                        (e.key === "Enter") ? this.signIn() : (null)
                                    }}
                                />
                                <br />
                                <RaisedButton label="Sign In" primary={true} style={style} onClick={this.signIn.bind(this)} />
                                <br />
                                <br />
                                <Link to='/signup' style={{ margin: "10%" }}>
                                    Create An Account
                </Link>
                            </CardText>
                        </Card>
                    </div>
                </span>
            )
        )
    }
};

const mapStateToProps = (state) => {
    return {
        authreducer: state.SignInReducer
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        funcSignIn: (tag) => {
            dispatch(signIn(tag))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SignInPage);