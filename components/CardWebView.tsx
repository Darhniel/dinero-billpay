import React from 'react';
import { WebView } from 'react-native-webview';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/core';
import { SafeAreaView } from 'react-native';


export type RootStackParamList = {
    Home: undefined;
};


export default function CardWebView({ url }: { url: string }) {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    const watchUrlPro = (webViewState: any) => {
        if (webViewState.url !== url) {
            navigation.navigate('Home')
        }
    }
    return (
        <SafeAreaView style={{ flex: 1, paddingTop: 20 }}>
            <WebView
                onNavigationStateChange={watchUrlPro}
                originWhitelist={['*']}
                source={{ uri: url }}
            />
        </SafeAreaView>
    );
}