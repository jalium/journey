import ReactDOM from 'react-dom' 
import { Provider } from 'react-redux'
import './main.css'
import App from './App.jsx'
import React from 'react'
import reloadMagic from './reload-magic-client.js' // automatic reload
import store from './store.jsx'
reloadMagic() // automatic reload
ReactDOM.render(<Provider store = {store}>
    <App />
    </Provider>, document.getElementById("root"))