import React from 'react';
import {Tile} from '../Shared/Tile'
import styled, {css} from 'styled-components';
import {AppContext} from '../App/AppProvider';
import CoinImage from '../Shared/CoinImage';

const ChartGrid = styled.div`
    display: grid;
    margin-top: 20px;
    grid-gap: 15px;
    grid-template-columns: 1fr 3fr;
`
const SpotlightName = styled.h2`
    text-align: center;
`

export default function () {
    return (
    <AppContext.Consumer>
        {({currentFavorite, coinList}) => 
            <Tile>
                <h2> {coinList[currentFavorite].CoinName} </h2>
                <CoinImage spotlight coin={coinList[currentFavorite]} />
            </Tile>
        }
    </AppContext.Consumer>    
    )
}