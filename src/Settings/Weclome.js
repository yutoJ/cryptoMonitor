import React, { Component}  from 'react';
import{AppContext} from '../App/AppProvider';

export default function ({firstVisit}) {
    return (
        <AppContext.Consumer>
            {({firstVisit}) =>
                firstVisit ? <div>
                    Welcome to CryptoDash. {' '}
                </div> : null
            }
        </AppContext.Consumer>
    );
};