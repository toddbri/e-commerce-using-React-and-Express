import React from 'react';
import * as ReactRedux from 'react-redux';
import * as actions from '../App.action';

import { Link } from 'react-router';

class Thanks extends React.Component {

    render() {
        return (
            <div>
                <h2 className="thanks">Thank you for your purchase!</h2>
                <div className="center">
                  <Link to="/"><button className="homeButton">Home</button></Link>
                </div>
            </div>
        );
    }
}

const ThanksContainer = ReactRedux.connect(
    state => state,
    actions
)(Thanks);

export default ThanksContainer;
