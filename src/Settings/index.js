import React from 'react';
import Welcome from './Weclome';
import ConfirmButton from './ConfirmButton';
import Page from '../Shared/Page';

export default function() {
    return <div> <Page name="settings">
                <Welcome />
                <ConfirmButton />
            </Page>
        </div>
}