export function signUp(val) {
    return {
        type: "SignUp",
        value: val
    }
}
export function signIn(val) {
    return {
        type: "SignIn",
        value: val
    }
}
export function logOff(val) {
    return {
        type: "LogOff",
        value: val
    }
}
export function fired(val) {
    return {
        type: "Fire",
        value: val
    }
}

export function update(val) {
    return {
        type: "Add",
        value: val
    }
}
