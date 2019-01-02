import React from 'react';
import styled, {css} from 'styled-components';
import {AppContext} from '../App/AppProvider';
import {Tile} from "../Shared/Tile";
import { greenBackgroundColor, greenBoxShadow } from '../Shared/Styles';

export const CoinGridStyled = styled.div`
display: grid;
grid-template-columns: repeat(5, 1fr);
grid-gap: 10px;
`

export const SelectableTile = styled(Tile)`
    &:hover {
        cursor: pointer;
        ${greenBoxShadow}
    }`

export default function () {
    return <AppContext.Consumer>
        {({coinList}) => 
        <CoinGridStyled>
            {Object.keys(coinList).map(coinKey =>
            <SelectableTile> {coinKey}</SelectableTile>)}
        </CoinGridStyled>
        }
    </AppContext.Consumer>
}