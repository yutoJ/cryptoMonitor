import React from 'react';
import _ from 'lodash'; 
import { async } from 'q';

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
        this.fetchPrices();
    }

    fetchCoins = async () => {
        let coinList = (await cc.coinList()).Data;
        this.setState({coinList});
    }

    fetchPrices = async () => {
        if(this.state.firstVisit) return;
        let prices = (await this.prices());
        console.log(prices);
        this.setState({prices});
    }

    prices = async () => {
        let returnData = [];
        for(let i =0; i < this.state.favorites.length; i++){
            try {
                let priceData = await cc.priceFull(this.state.favorites[i], 'USD');
                returnData.push(priceData);
            } catch(e) {
                console.warn('Fetch price error:', e);
            }
        }
        return returnData;
    }

    confirmFavorites = () => {
        this.setState({
            firstVisit: false,
            page: 'dashboard'
        }, () => {
            this.fetchPrices();
        });
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