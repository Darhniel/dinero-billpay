import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { WebView } from 'react-native-webview';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

type WebScreenProps = NativeStackScreenProps<RootStackParamList, 'WebView'>;

const Web: React.FC<WebScreenProps> = ({ navigation, route }) => {
    const { url } = route.params;

    const handleWebViewMessage = (event: any) => {
        // Parse the message received from the WebView
        const message = event.nativeEvent.data;
        console.log(message)
        // Navigate back to the CardScreen and pass the message as a parameter
        navigation.navigate('Login', { responseMessage: message });
    };

    return (
        <SafeAreaView style={{ flex: 1, paddingTop: 20 }}>
            <WebView source={{ uri: url }} style={{ flex: 1 }} onMessage={handleWebViewMessage} javaScriptEnabled />
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({})

export default Web;