import React from 'react';
import {AppContext} from '../App/AppProvider';

export default function(props) {
    return <AppContext.Consumer>
        {({coinList, prices, firstVisit}) => {
            if(!coinList){
                return <div> Loading Coins</div>
            }
            console.log('loading')
            if(!firstVisit && !prices){
                return <div> Loading Prices </div>
            }
            return <div> {props.children}</div>
        }}
    </AppContext.Consumer>
}