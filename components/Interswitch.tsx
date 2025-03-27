import React from 'react';

import { WebView } from 'react-native-webview';

export default function Interswitch({ url }: { url: string }) {
    return (
        <>
        
            <WebView
                originWhitelist={['*']}
                source={{ uri: url }}
            />
        </>
    );
}