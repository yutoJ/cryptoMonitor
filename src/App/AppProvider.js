import React from 'react';

const cc = require('cryptocompare');

export const AppContext = React.createContext();

export class AppProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 'dashboard',
            ...this.savedSettings(),
            setPage: this.setPage,
            confirmFavorites: this.confirmFavorites
        }
    }

    componentDidMount = () => {
        this.fetchCoins();
    }

    fetchCoins = async () => {
        let coinList = (await cc.coinList()).Data;
        console.log(coinList);
        this.setState({coinList});
        
    }
    confirmFavorites = () => {
        this.setState({
            firstVisit: false,
            page: 'dashboard'
        });
        localStorage.setItem('cryptoMonitor', JSON.stringify({
            test: 'hello'
        }));
    }
    setPage = page => this.setState({page})

    savedSettings(){
        let cryptoMonitorData = JSON.parse(localStorage.getItem('cryptoMonitor'));
        if(!cryptoMonitorData) {
            return {page: 'settings', firstVisit: true}
        }
        return {};
    }

    render() {
        return (
            <AppContext.Provider value={this.state}>
                {this.props.children}
            </AppContext.Provider>
        )
    }
}