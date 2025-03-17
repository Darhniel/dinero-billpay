import { SafeAreaView } from 'react-native';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import ScheduleTabs from '../navigation/ScheduleTabs';

export default function SchedulesScreen() {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#F5F6F5" }}>
            <StatusBar style='light' translucent={true} hidden={false} />

            <ScheduleTabs />
        </SafeAreaView>
    )
}