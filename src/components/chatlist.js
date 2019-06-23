import React from "react";
import { List, ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import fire from "../App"
import { connect } from 'react-redux'
import { GridList, GridTile } from 'material-ui/GridList';
import { fired } from "../actions/actions"
import store from "../store/store"
import { Redirect } from "react-router"
import { Link } from 'react-router-dom';



let maxHeight = window.screen.height
maxHeight = maxHeight - 250
class ChatList extends React.Component {
    constructor(props) {
        super(props)
        this.styles = {
            gridList: {
                width: "100%",
                height: maxHeight,
                overflowY: 'auto',
            },
            root: {
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-around',
            }
        }
        this.arr = []
        this.newArr = []
        this.senderKey;
        this.receiverKey;
        this.InboxRecipient
        this.signed = JSON.parse(localStorage.getItem("signUser"))
    }
    fired = (chatState) => {
        chatState = {
            fire: true,
            chat: false
        }
        this.props.funcFire(chatState)
    }
    addInChat = (senter) => {
        localStorage.removeItem("currentUser")
        let chatState = {
            fire: true,
            chat: true
        }
        let sender = {
            name: senter.name,
            id: senter.id,
            email: senter.email,
            on: "on"
        }

        localStorage.setItem("currentUser", JSON.stringify(sender))
        this.props.funcFire(chatState)
    }
    componentWillMount() {
        fire.database().ref("/message/").on("value", (snaps) => {
            let bj = snaps.val();
            this.arr = []
            for (let prop in bj) {
                let name = prop;
                let value = bj[prop]
                this.arr.push({ name: name, value: value });
                this.fired()
            }
        }
        )
    }
    render() {
        let state = store.getState().FireReducer.fire.chat
        return (
            <div style={this.styles.root}>
                <GridList cellHeight={maxHeight} style={this.styles.gridList}>
                    <GridTile cols={2}>
                        <List>
                            {
                                (this.arr.length > 0) ? (
                                    this.arr.map((val, i) => {
                                        this.senderKey = val["name"].slice(0, 28)
                                        this.receiverKey = val["name"].slice(35, )
                                        let inboxRecipient;
                                        if (this.senderKey === this.signed.uid) {
                                            this.InboxRecipient = this.receiverKey
                                        }
                                        else if (this.receiverKey === this.signed.uid) {
                                            this.InboxRecipient = this.senderKey
                                        }
                                        else {
                                            this.InboxRecipient = undefined
                                        }
                                        fire.database().ref("/users/" + this.InboxRecipient + "/").on("value", (snaps) => {
                                            inboxRecipient = snaps.val();
                                        }
                                        )
                                        return (
                                            (this.InboxRecipient === undefined) ? (null) : (
                                                <Link to="/chat" key={i + "l"} style={{ textDecoration: "none" }}>
                                                    <ListItem primaryText={inboxRecipient.name} key={i} onClick={this.addInChat.bind(this, inboxRecipient)} insetChildren={true} leftAvatar={<Avatar style={{ backgroundColor: "#6a1b9a" }}>{inboxRecipient.name[0] + inboxRecipient.name[1]}</Avatar>} />
                                                </Link>
                                            )
                                        )
                                    })
                                ) : (
                                        <h1>Nothing to show</h1>
                                    )
                            }
                        </List>
                    </GridTile>
                </GridList>
            </div>
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
        funcFire: (tag) => {
            dispatch(fired(tag))
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ChatList);