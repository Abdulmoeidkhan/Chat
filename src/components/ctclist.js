import React from "react";
import { List, ListItem } from 'material-ui/List';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import fire from "../App"
import { connect } from 'react-redux'
import { GridList, GridTile } from 'material-ui/GridList';
import { Redirect } from "react-router"
import { fired } from "../actions/actions"
import {Link} from 'react-router-dom';
import store from "../store/store"


let maxHeight = window.screen.height
maxHeight = maxHeight - 250
class CtcList extends React.Component {
    constructor(props) {
        super(props)
        this.styles = {
            root: {
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-around',
            },
            gridList: {
                width: "100%",
                height: maxHeight,
                overflowY: 'auto',
            },
        }
        this.arr = []
    }
    fired = (chatState) => {
        chatState = {
            fire: true,
        }
        this.props.funcFire(chatState)
    }
    addInChat = (newUser) => {
        localStorage.removeItem("currentUser")
        let senter = {
            name: newUser.value.name,
            id: newUser.name,
            email: newUser.value.email
        }
        localStorage.setItem("currentUser", JSON.stringify(senter))
    }
    componentWillMount() {
        fire.database().ref("/users").on("value", (snaps) => {
            let bj = snaps.val();
            this.arr = []
            for (let prop in bj) {
                let name = prop;
                let value = bj[prop]
                this.arr.push({ name: name, value: value });
            }
            this.fired()
        }
        )
    }
    render() {
        let sign = JSON.parse(localStorage.getItem("signUser"))

        return (
            <div style={this.styles.root}>
                <GridList cellHeight={maxHeight} style={this.styles.gridList}>
                    <GridTile cols={2}>
                        <List>
                            {
                                (this.arr.length) ? (this.arr.map((val, i) =>
                                    (val.value.id !== sign.uid) ?
                                        (
                                            <Link to="/chat" key={i+"l"} style={{textDecoration:"none"}}>
                                                <ListItem primaryText={val.value.name} key={i} onClick={this.addInChat.bind(this, val)} insetChildren={true} leftAvatar={<Avatar style={{ backgroundColor: "#6a1b9a" }}>{val.value.name[0] + val.value.name[1]}</Avatar>} />
                                            </Link>
                                        )
                                        : (null)
                                )) : (<h1>Nothing to show</h1>)
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


export default connect(mapStateToProps, mapDispatchToProps)(CtcList);