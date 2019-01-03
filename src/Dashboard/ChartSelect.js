import React from 'react';
import styled, {css} from 'styled-components';
import {AppContext} from '../App/AppProvider';
import { backgroundColor2, fontSize2 } from '../Shared/Styles';

export default styled.select`
    ${backgroundColor2}
    ${fontSize2}
    color: #1163c9;
    border: 1px solid;
    margin: 5px;
    float: right;
`;
