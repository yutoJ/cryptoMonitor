import React from 'react';
import Page from '../Shared/Page';
import PriceGrid from './PriceGrid';

export default function() {
    return <div> <Page name="dashboard">
                <PriceGrid />
            </Page>
        </div>
}