import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { AllTabsScreen, ActiveTabsScreen, InactiveTabsScreen } from '../screens/HistoryScreen';

const Tab = createMaterialTopTabNavigator();

export default function ScheduleTabs() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarLabelStyle: {
                    fontFamily: "DMSansBold"
                },
                tabBarActiveTintColor: "#0C6599",
                tabBarInactiveTintColor: "#5F5B5D",
            }}
        >
            <Tab.Screen name="All" component={AllTabsScreen} />
            <Tab.Screen name="Active" component={ActiveTabsScreen} />
            <Tab.Screen name="Inactive" component={InactiveTabsScreen} />
        </Tab.Navigator>
    );
}