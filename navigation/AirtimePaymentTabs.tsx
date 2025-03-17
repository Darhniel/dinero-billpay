import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { AirtimeScreen, DataScreen } from '../screens/MobileScreen';

const Tab = createMaterialTopTabNavigator();

export default function AirtimePaymentTabs() {
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
      <Tab.Screen name="Airtime" component={AirtimeScreen}/>
      <Tab.Screen name="Data Bundles" component={DataScreen} />
    </Tab.Navigator>
  );
}