import React from 'react';
import _ from 'lodash'; 
import { async } from 'q';
import moment from 'moment';

const cc = require('cryptocompare');

export const AppContext = React.createContext();

const MAX_FAVORITES = 10;
const TIME_UNITS = 10;

export class AppProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 'dashboard',
            favorites: ['BTC', 'ETC', 'XMR', 'DOGE'],
            timeInterval: 'months',
            ...this.savedSettings(),
            setPage: this.setPage,
            addCoin: this.addCoin,
            isInFavorites: this.isInFavorites,
            removeCoin: this.removeCoin,
            setCurrentFavorite: this.setCurrentFavorite,
            confirmFavorites: this.confirmFavorites,
            changeChartSelect: this.changeChartSelect
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
        this.fetchHistorical();
    }

    fetchCoins = async () => {
        let coinList = (await cc.coinList()).Data;
        this.setState({coinList});
    }

    fetchPrices = async () => {
        if(this.state.firstVisit) return;
        let prices = (await this.prices());
        this.setState({prices});
    }

    fetchHistorical = async () => {
        if(this.state.firstVisit) return;
        let results = (await this.historical());
        console.log(results);
        let historical = [
            {
                name: this.state.currentFavorite,
                data: results.map((ticker, index) => [
                    moment().subtract({[this.state.timeInterval]: TIME_UNITS - index}).valueOf(),
                    ticker.USD
                ])
            }
        ]
        this.setState({historical});
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

    historical = async () => {
        let promises = [];
        for(let units = TIME_UNITS; units > 0; units--){
            try {
                promises.push(
                    cc.priceHistorical(
                        this.state.currentFavorite,
                        ['USD'],
                        moment().subtract({[this.state.timeInterval]: units}).toDate()
                    )
                )
            } catch(e) {
                console.warn('Fetch price error:', e);
            }
        }
        return Promise.all(promises);
    }

    confirmFavorites = () => {
        let currentFavorite = this.state.favorites[0];
        this.setState({
            firstVisit: false,
            page: 'dashboard',
            currentFavorite,
            prices: null,
            historical: null
        }, () => {
            this.fetchPrices();
            this.fetchHistorical();
        });
        localStorage.setItem('cryptoMonitor', JSON.stringify({
            favorites: this.state.favorites,
            currentFavorite
        }));
    }
    setPage = page => this.setState({page})

    setCurrentFavorite = (sym) => {
        this.setState({
            currentFavorite: sym,
            historical: null
        }, this.fetchHistorical);
        localStorage.setItem('cryptoMonitor',JSON.stringify({
            ...JSON.parse(localStorage.getItem('cryptoMonitor')),
            currentFavorite: sym
        }));
    }

    savedSettings(){
        let cryptoMonitorData = JSON.parse(localStorage.getItem('cryptoMonitor'));
        if(!cryptoMonitorData) {
            return {page: 'settings', firstVisit: true}
        }
        let {favorites, currentFavorite} = cryptoMonitorData;
        return {favorites, currentFavorite};
    }

    changeChartSelect = (value)  => {
        console.log(value);
        this.setState({timeInterval: value, historical: null}, this.fetchHistorical);
    }

    render() {
        return (
            <AppContext.Provider value={this.state}>
                {this.props.children}
            </AppContext.Provider>
        )
    }
}