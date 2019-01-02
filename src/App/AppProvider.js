import React from 'react';
import _ from 'lodash'; 

const cc = require('cryptocompare');

export const AppContext = React.createContext();

const MAX_FAVORITES = 10;
export class AppProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 'dashboard',
            favorites: ['BTC', 'ETC', 'XMR', 'DOGE'],
            ...this.savedSettings(),
            setPage: this.setPage,
            addCoin: this.addCoin,
            isInFavorites: this.isInFavorites,
            removeCoin: this.removeCoin,
            confirmFavorites: this.confirmFavorites
        }
    }

    addCoin = key => {
        let favorites = [...this.state.favorites];
        if(favorites.length < MAX_FAVORITES) {
            favorites.push(key);
            this.setState({favorites});
        }
    }

    removeCoin = key => {
        let favorites = [...this.state.favorites];
        this.setState({favorites: _.pull(favorites, key)})
    }

    isInFavorites = key => _.includes(this.state.favorites, key)

    componentDidMount = () => {
        this.fetchCoins();
    }

    fetchCoins = async () => {
        let coinList = (await cc.coinList()).Data;
        this.setState({coinList});
        
    }
    confirmFavorites = () => {
        this.setState({
            firstVisit: false,
            page: 'dashboard'
        });
        console.log("confirmFavorites");
        console.log(this.favorites);
        localStorage.setItem('cryptoMonitor', JSON.stringify({
            favorites: this.state.favorites
        }));
    }
    setPage = page => this.setState({page})

    savedSettings(){
        console.log("savedSettings 1");
        let cryptoMonitorData = JSON.parse(localStorage.getItem('cryptoMonitor'));
        if(!cryptoMonitorData) {
            return {page: 'settings', firstVisit: true}
        }
        console.log("savedSettings 2");
        console.log(favorites);
        let {favorites} = cryptoMonitorData;
        return {favorites};
    }

    render() {
        return (
            <AppContext.Provider value={this.state}>
                {this.props.children}
            </AppContext.Provider>
        )
    }
}