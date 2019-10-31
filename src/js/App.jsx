import React, {Component} from 'react';

import BoseLogo from '../resources/images/Bose_Logo.png';

import '../css/App.css';

class App extends Component {

    render () {

        return (
            <div className="container">
                <img src={BoseLogo}/>
                <p>Boilerplate Application</p>
            </div>
        );

    }

}

export default App;
