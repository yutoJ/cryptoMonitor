import React from 'react';
import styled, {css} from 'styled-components';
import { fontSize3 } from '../Shared/Styles';
import {SelectableTile, DeletableTile, DisabledTile} from "../Shared/Tile";
//import CoinHeaderGrid from "./CoinHeaderGrid";

const PriceTileStyled = styled(SelectableTile)`
    ${props => props.compact && css`
        ${fontSize3}
    `}
`
function numberFormat(number) {
    return (number + '').slice(0,7);
}

export default function ({price, index}) {

    let sym = Object.keys(price)[0];
    let data = price[sym]['USD'];

    return (
        <PriceTileStyled compact={index >= 5}>

            {sym} {numberFormat(data.CHANGEPCT24HOUR)} ${numberFormat(data.PRICE)}
        </PriceTileStyled>
    )
}