
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.css'
import './index.scss'
import App from './App'
import { Provider } from 'react-redux'
import store from './_store/store'

import { BrowserRouter, } from 'react-router-dom'
ReactDOM.render(
    <Provider store={store}>      
        <BrowserRouter>
          <App />
        </BrowserRouter>      
    </Provider>,
  document.getElementById('root')
)
