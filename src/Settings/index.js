import React from 'react';
import Welcome from './Weclome';
import ConfirmButton from './ConfirmButton';
import Page from '../Shared/Page';
import CoinGrid from './CoinGrid';

export default function() {
    return <div> <Page name="settings">
                <Welcome />
                <ConfirmButton />
                <CoinGrid topSection />
                <CoinGrid />
            </Page>
        </div>
}