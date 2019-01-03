import React from 'react';
import styled, {css} from 'styled-components';
import {AppContext} from '../App/AppProvider';
import PriceTile from './PriceTile';

export const PriceGridStyled = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 15px;
    margin-top: 40px;

`
export default function () {
    return <AppContext.Consumer>
        {({prices}) => 
        <PriceGridStyled>
            {prices.map((price, index) => <PriceTile key={'pt-${index}'} price={price} index={index} />)}
        </PriceGridStyled>
        }
    </AppContext.Consumer>
}