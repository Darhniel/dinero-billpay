import React from 'react';
import { Text, StyleSheet, SafeAreaView } from 'react-native';
import AirtimePaymentTabs from '../navigation/AirtimePaymentTabs';
import { StatusBar } from 'expo-status-bar';
import { scale, verticalScale, moderateScale, moderateVerticalScale } from 'react-native-size-matters';

export default function AirtimePaymentScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F5F6F5" }}>
      <StatusBar style='light' translucent={true} hidden={false} />

      <Text style={styles.heading}>Buy airtime for yourself or others</Text>

      <AirtimePaymentTabs />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontFamily: "DMSansBold",
    fontSize: scale(14),
    color: "#333",
    marginTop: verticalScale(24),
    marginLeft: scale(24)
  },
});