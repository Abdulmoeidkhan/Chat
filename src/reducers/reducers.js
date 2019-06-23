let INITIAL_STATE_SIGNIN = {
    SignIn: {
        signin: false
    }
}

let INITIAL_STATE_FIRE = {
    fire:{
        fire:false,
        chat:false,
    }
}


export const SignInReducer = (state = INITIAL_STATE_SIGNIN, action) => {
    switch (action.type) {
        case"SignUp":
        return{SignIn:action.value}
        break;
        case "LogOff":
        return{SignIn:action.value}
        break;
        case "SignIn":
        return { SignIn: action.value }
        break;
        default:
        return state;
    }
}

export const FireReducer = (fire = INITIAL_STATE_FIRE, action) => {
    switch(action.type){
        case"Fire":
        return{fire:action.value}
        break;
        case"Add":
        return{fire:action.value}
        default:
        return fire;
    }
}

