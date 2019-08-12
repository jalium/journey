//1. Import createStore from redux to create the store
//2. Set the reducer --> takes a state and action. To activate, it will take this.props.dispatch 
//3. Set the if statements (using  type) so that when an action is called, the state changes
//3. The first action type is "login-success" and the second action type is "set-messages". What do you think is happening?
//3. There are two properties of action (type and messages)
//4. Set the initial state with createStore() (msg and loggedIn, which is a boolean)
//4. createStore() takes three arguments (reducer, "the initial state", window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
//5. remember to export default store

import { createStore } from 'redux'
let reducer = (state, action) => {
    if(action.type === "login-success"){
        return {...state, loggedIn:true}
    }
    return state
}

const store = createStore(
    reducer, 
    {loggedIn: false},
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store