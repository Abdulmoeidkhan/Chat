import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MyRoutes from "./components/routes";
import { Provider } from 'react-redux';
import store from "./store/store"
import registerServiceWorker from './registerServiceWorker';

const App = () => (
  <Provider store={store}>
    <MuiThemeProvider>
      <MyRoutes />
    </MuiThemeProvider>
  </Provider>
);

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
registerServiceWorker();    
