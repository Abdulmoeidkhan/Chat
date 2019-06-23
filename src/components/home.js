import { Tabs, Tab } from 'material-ui/Tabs';
import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import { connect } from 'react-redux'
import fire from "../App";
import { logOff } from "../actions/actions"
import store from "../store/store"
import { Redirect } from "react-router"
import RaisedButton from 'material-ui/RaisedButton';
import CtcList from "./ctclist"
import ChatList from "./chatlist"
import {Link} from 'react-router-dom';
import DialogExampleSimple from "./dialog"

const style = {
    margin: 12,
};
let sign = fire.auth().currentUser;
class Home extends React.Component {
    constructor(props) {
        super(props)
    }
    logOff = (tag) => {
        let that = this.props;
        fire.auth().signOut().then(function () {
            let LoggOff = {
                signin: false,
            }
            localStorage.removeItem("currentUser")
            localStorage.removeItem("signUser")
            that.funcLogOff(LoggOff)
        }
    )
    }
    render() {      
        sign = JSON.parse(localStorage.getItem("signUser"))
        return (
            (!sign) ? (<Redirect to="/signin" />) : (
            <div>
                <AppBar
                    style={{ backgroundColor: "#42a5f5" }}
                    title="Let's Chat"
                    iconElementLeft={<IconButton></IconButton>}
                    iconElementRight={<DialogExampleSimple name={"Log Out"} func={this.logOff}/>}
                />
                <TabsExampleControlled />
            </div>
        )
        )
    }
}



class TabsExampleControlled extends React.Component {
    constructor(props) {
        super(props);
        this.styles = {
            headline: {
                fontSize: 24,
                paddingTop: 16,
                marginBottom: 12,
                fontWeight: 400,
            },
        };
        this.state = {
            value: 'a',
        };
    }

    handleChange = (value) => {
        this.setState({
            value: value,
        });
    };

    render() {
        return (
            <Tabs
                value={this.state.value}
                onChange={this.handleChange}
            >
                <Tab label="Contacts" value="b" style={{ backgroundColor: "#2196f3" }}>
                        <CtcList />        
                </Tab>
                <Tab label="Chats" value="a" style={{ backgroundColor: "#2196f3" }}>
                       <ChatList />
                </Tab>
            </Tabs>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        authreducer: state.SignInReducer
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        funcLogOff: (tag) => {
            dispatch(logOff(tag))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);