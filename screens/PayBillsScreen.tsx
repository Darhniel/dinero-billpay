import { TouchableOpacity, StyleSheet, Text, View, Image, SafeAreaView } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { scale, verticalScale, moderateScale, moderateVerticalScale } from 'react-native-size-matters';

const PayBillsScreen = ({navigation, route} : any) => {
  return (
    <SafeAreaView style={{ backgroundColor: "#F6F5F6", flex: 1 }}>
      <StatusBar style={'light'} translucent={true} hidden={false} />

      <Text style={styles.heading}>Pay bills with ease</Text>

      <View>
        <Text style={styles.heading}>Select Bill Category</Text>

        <View
          style={{
            flexWrap: "wrap",
            flexDirection: "row",
            justifyContent: "space-around",
            width: scale(320),
            marginHorizontal: "auto",
            rowGap: verticalScale(20),
            columnGap: scale(20),
            marginTop: verticalScale(14)
          }}
        >
          <TouchableOpacity style={styles.bill} onPress={() => {navigation.navigate('Entertainment')}}>
            <Image source={require('../assets/images/entertainment.png')} />
            <Text style={{ fontFamily: "DMSansBold", fontSize: scale(12), textAlign: "center" }}>Enterainment</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.bill} onPress={() => {navigation.navigate('Utility')}}>
            <Image source={require('../assets/images/utility.png')} />
            <Text style={{ fontFamily: "DMSansBold", fontSize: scale(12), textAlign: "center" }}>Utility</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.bill} onPress={() => {navigation.navigate('Internet')}}>
            <Image source={require('../assets/images/internet.png')} />
            <Text style={{ fontFamily: "DMSansBold", fontSize: scale(12), textAlign: "center" }}>Internet Subscription</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.bill}>
            <Image source={require('../assets/images/taxes.png')} />
            <Text style={{ fontFamily: "DMSansBold", fontSize: scale(12), textAlign: "center" }}>Taxes & Levies</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.bill}>
            <Image source={require('../assets/images/insurance.png')} />
            <Text style={{ fontFamily: "DMSansBold", fontSize: scale(12), textAlign: "center" }}>Insurance & HMO</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.bill} >
            <Image source={require('../assets/images/sport.png')} />
            <Text style={{ fontFamily: "DMSansBold", fontSize: scale(12), textAlign: "center" }}>Sports & Gaming</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.bill}>
            <Image source={require('../assets/images/travels.png')} />
            <Text style={{ fontFamily: "DMSansBold", fontSize: scale(12), textAlign: "center" }}>Travels</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.bill}>
            <Image source={require('../assets/images/education.png')} />
            <Text style={{ fontFamily: "DMSansBold", fontSize: scale(12), textAlign: "center" }}>Education</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.bill}>
            <Image source={require('../assets/images/visa.png')} />
            <Text style={{ fontFamily: "DMSansBold", fontSize: scale(12), textAlign: "center" }}>Visa Fee</Text>
          </TouchableOpacity>
        </View>
      </View>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  heading: {
    fontFamily: "DMSansBold",
    fontSize: scale(14),
    color: "#333",
    marginTop: verticalScale(32),
    marginLeft: scale(24)
  },
  bill: {
    width: scale(93),
    height: verticalScale(97),
    borderRadius: scale(8),
    paddingVertical: verticalScale(4),
    gap: verticalScale(8),
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
})

export default PayBillsScreen;