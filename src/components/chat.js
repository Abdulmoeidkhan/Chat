import React from "react";
import fire from "../App"
import { connect } from 'react-redux'
import { Redirect } from "react-router"
import TextField from 'material-ui/TextField';
import { update } from "../actions/actions"
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import ContentSend from 'material-ui/svg-icons/content/send';
import RaisedButton from 'material-ui/RaisedButton';
import store from "../store/store"
import { GridList, GridTile } from 'material-ui/GridList';
import { List, ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import DialogExampleSimple from "./dialog"
import { Link } from 'react-router-dom';


const style = {
    margin: 10,
    minWidth: "25%"
};

let maxHeight = window.screen.height
class ChatInput extends React.Component {
    constructor(props) {
        super(props)
        this.styles = {
            root: {
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-around',
                paddingBottom: "100"
            },
            gridList: {
                width: "100%",
                height: maxHeight - 250,
                overflowY: 'auto',
            },
        }
        this.verifyArr = [];
        this.arr = []
        this.database = fire.database().ref("/")
        this.signed = JSON.parse(localStorage.getItem("signUser"))
        this.nodea = JSON.parse(localStorage.getItem("currentUser"))
        this.nodeName;
        this.date
        this.nodeS
    }
    componentWillMount() {
        fire.database().ref("/message/").on("value", (snaps) => {
            let bj = snaps.val();
            this.verifyArr = []
            for (let prop in bj) {
                let name = prop;
                let value = bj[prop]
                this.verifyArr.push({ name: name, value: value });
            }
            this.verifyArr.map((val, i) => {
                if (val.name === `${this.nodea.id}|chats|${this.signed.uid}`) {
                    fire.database().ref("/message/" + val.name + "/").on("value", (snaps) => {
                        let bj = snaps.val();
                        this.arr = []
                        for (let prop in bj) {
                            let name = prop;
                            let value = bj[prop]
                            this.arr.push({ name: name, value: value });
                        }
                    })
                    return this.nodeName = `${this.nodea.id}|chats|${this.signed.uid}`
                }
                else if (val.name === `${this.signed.uid}|chats|${this.nodea.id}`) {
                    fire.database().ref("/message/" + val.name + "/").on("value", (snaps) => {
                        let bj = snaps.val();
                        this.arr = []
                        for (let prop in bj) {
                            let name = prop;
                            let value = bj[prop]
                            this.arr.push({ name: name, value: value });
                        }
                    })
                    return this.nodeName = `${this.signed.uid}|chats|${this.nodea.id}`
                }
                else {
                    return this.nodeName = `${this.signed.uid}|chats|${this.nodea.id}`
                }
            })
            this.update();
        })
    }
    run() {
        setTimeout(() => {
            this.update();
        }, 2000)
    }
    update = () => {
        let chatState = {
            fire: true,
        }
        this.props.funcUpdate(chatState);
    }
    seen = (seenN) =>{
    (fire.database().ref("/message/" + this.nodeName + "/" + seenN.name +"/seen"))?(
            fire.database().ref("/message/" + this.nodeName + "/" + seenN.name +"/seen/").once("value").then(snap=>{
                (snap.val()===false)?(fire.database().ref("/message/" + this.nodeName + "/" + seenN.name + "/seen").set(true)):(null)
            })
        ):(null)}

    del = (delet,i) => {
        fire.database().ref("/message/" + this.nodeName + "/" + delet.name+"/msg").set("This message has been Deleted")
        this.update()
    }
    add = (nodeNamea) => {
        if (nodeNamea != undefined) {
            this.nodeName
        }
        else {
            this.nodeName = `${this.signed.uid}|chats|${this.nodea.id}`
        }
        let val = this.refs.input.input.value
        let currentdate = new Date();
        let time = currentdate.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
        let date = currentdate.getDate() + "/"
            + (currentdate.getMonth() + 1) + "/"
            + currentdate.getFullYear();
        let displayName = this.signed.displayName;
        let iD = this.signed.uid;
        let recipient = this.nodea;
        let seconds = currentdate.getTime()
        this.refs.input.input.value = "";
        this.nodeS = {
            msg: val,
            time,
            date,
            sender: displayName,
            senderId: iD,
            recipient: recipient.name,
            recipientId: recipient.id,
            seen: false,
            sec: seconds
        }
        this.database.child("/message/" + this.nodeName + "/").push(this.nodeS)
        this.update()
    }
    render() {
        let state = store.getState().FireReducer.fire.chat;
        this.date = new Date
        this.run()
        return (
            <span>
                <AppBar
                    style={{ backgroundColor: "#42a5f5" }}
                    title="Let's Chat"
                    iconElementRight={<IconButton></IconButton>}
                    iconElementLeft={<Link to="/home">
                        <RaisedButton label="Back" secondary={true} style={style} />
                    </Link>
                    }
                />
                <div style={this.styles.root}>
                    <GridList ref="list" cellHeight={((this.arr.length * 75) > maxHeight) ? (75 * this.arr.length) : (maxHeight)} style={this.styles.gridList}>
                        <GridTile cols={2}>
                            <List>
                                {
                                    (this.arr.length > 0) ? (this.arr.map((val, i) => (
                                        (val.value.sender === this.signed.displayName) ? ((val.value.seen) ? (
                                            (120000 >= this.date.getTime() - val.value.sec && val.value.msg!=="This message has been Deleted") ? (
                                                <ListItem style={{ textAlign: "right", marginRight: "3%" }} primaryText={val.value.msg + " "} key={i} secondaryText={"Seen : " + val.value.time} insetChildren={true} rightAvatar={<Avatar style={{ backgroundColor: "#6a1b9a", left: "16", right: "0" }}>{val.value.sender[0] + val.value.sender[1]}</Avatar>} leftAvatar={<Avatar style={{ backgroundColor: "none" }} ><DialogExampleSimple name={"Delete"} func={this.del.bind(this, val,i)} able={false} /></Avatar>} />
                                            ) : (
                                                <ListItem style={{ textAlign: "right", marginRight: "3%" }} primaryText={val.value.msg + " "} key={i} secondaryText={"Seen : " + val.value.time} insetChildren={true} rightAvatar={<Avatar style={{ backgroundColor: "#6a1b9a", left: "16", right: "0" }}>{val.value.sender[0] + val.value.sender[1]}</Avatar>} leftAvatar={<Avatar style={{ backgroundColor: "none" }}><DialogExampleSimple name={"Delete"} func={this.del.bind(this, val,i)} able={true} /></Avatar>} />
                                                )
                                        ) : (
                                                (this.date.getTime() - val.value.sec < 120000 && val.value.msg!=="This message has been Deleted") ? (
                                                    <ListItem style={{ textAlign: "right", marginRight: "3%" }} primaryText={val.value.msg} key={i} secondaryText={val.value.time} insetChildren={true} rightAvatar={<Avatar style={{ backgroundColor: "#6a1b9a", left: "16", right: "0" }} >{val.value.sender[0] + val.value.sender[1]}</Avatar>}  leftAvatar={<Avatar style={{ backgroundColor: "none" }} ><DialogExampleSimple name={"Delete"} func={this.del.bind(this, val,i)} able={false} /></Avatar>} />
                                                ) : (<ListItem style={{ textAlign: "right", marginRight: "3%" }} primaryText={val.value.msg} key={i} secondaryText={val.value.time} insetChildren={true} rightAvatar={<Avatar style={{ backgroundColor: "#6a1b9a", left: "16", right: "0" }} >{val.value.sender[0] + val.value.sender[1]}</Avatar>} leftAvatar={<Avatar style={{ backgroundColor: "none" }} ><DialogExampleSimple name={"Delete"} func={this.del.bind(this, val,i)} able={true} /></Avatar>} />)
                                            )
                                        ) : (
                                                <ListItem primaryText={val.value.msg} secondaryText={val.value.time} on={this.seen(val)} key={i} insetChildren={true} leftAvatar={<Avatar style={{ backgroundColor: "#42a5f5" }} >{val.value.sender[0] + val.value.sender[1]}</Avatar>} />
                                            )
                                    )
                                    )
                                    ) : (
                                            <h1> Nothing to show</h1>
                                        )
                                }
                            </List>
                        </GridTile>
                    </GridList>
                </div>
                <div style={{ position: "absolute", bottom: 0, top: "90%", width: "90%", height: "1%", marginBottom: "0", backgroundColor: "#ffffff" }}>
                    <TextField style={{ marginLeft: "5%", width: "90%", marginBottom: "0" }}
                        hintText="Write Your Message..." ref="input"
                        onKeyPress={(e) => {
                            (e.key === "Enter") ? this.add(this.nodeName) : (null)
                        }}
                    />
                    <ContentSend style={{ margin: "0", width: "5%" }} onClick={this.add.bind(this, this.nodeName)} />
                    <br />
                </div>
            </span>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        authreducer: state.FireReducer
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        funcUpdate: (tag) => {
            dispatch(update(tag))
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ChatInput);