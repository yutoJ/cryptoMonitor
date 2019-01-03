import highChartConfig from './HighChartConfig';
import React from 'react';
import {Tile} from '../Shared/Tile';
import {AppContext} from '../App/AppProvider';
import ReactHighcharts from 'react-highcharts';

export default function() {
    return (
        <AppContext.Consumer>
            {({ }) => 
                <Tile>
                    <ReactHighcharts config={highChartConfig()} />
                </Tile>
            }
        </AppContext.Consumer>
    )
}