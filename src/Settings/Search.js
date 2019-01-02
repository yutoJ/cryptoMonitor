import React from 'react';
import styled from 'styled-components';
import {backgroundColor2, fontSize2} from "../Shared/Styles";


const SearchGrid = styled.div`
    display: grid;
    grid-auto-columns: 200px 1fr;
`
const SearchInput = styled.input`
    ${backgroundColor2}
    color: #1163c9;
    ${fontSize2}
    height: 25px;
    align-self: center left;
`

export default function(){
    return (
        <SearchGrid>
            <h2>Seach all coins</h2>
            <SearchInput/>
        </SearchGrid>
    );
}