import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import PagerView from 'react-native-pager-view';
import { StatusBar } from 'expo-status-bar';
import { Feather } from '@expo/vector-icons';
import React from 'react';
import { scale, verticalScale, moderateScale, moderateVerticalScale } from 'react-native-size-matters';

export default function Onboarding({ navigation }: any) {
  return (
    <View style={styles.container}>
      <PagerView style={styles.container} initialPage={0}>
        <View style={{ backgroundColor: "#1B356D", justifyContent: "center" }} key="1">
          <StatusBar style={'light'} translucent={true} hidden={false} />
          <View style={{ justifyContent: "center", alignItems: "center", gap: scale(28) }}>
            <View>
              <Image source={require('../assets/images/Image-One.png')} style={{ width: scale(350), height: scale(350) }} />
            </View>

            <View style={{ alignItems: "center", gap: scale(8), width: scale(250), marginHorizontal: "auto" }}>
              <Text style={{ fontFamily: "DMSansBold", fontSize: scale(22), color: "#fff" }}>
                Bill Payment with Ease
              </Text>
              <Text style={{ fontFamily: "DMSans", fontSize: scale(16), color: "#fff", textAlign: "center" }}>
                Welcome to Dinero Pay. Paying of bills the easy way.
              </Text>
            </View>
          </View>

          <View style={{ backgroundColor: "#fff", paddingVertical: moderateScale(8), paddingHorizontal: moderateScale(8), borderRadius: scale(100), position: "absolute", right: scale(30), bottom: verticalScale(36) }}>
            <Feather name='chevron-right' size={24} color={"#1D38B4"} />
          </View>

        </View>

        <View style={{ backgroundColor: "#176567", justifyContent: "center" }} key="2">
          <View style={{ justifyContent: "center", alignItems: "center", gap: scale(28) }}>
            <View>
              <Image source={require('../assets/images/Image-Two.png')} style={{ width: scale(350), height: scale(350) }} />
            </View>

            <View style={{ alignItems: "center", gap: scale(8), width: scale(250), marginHorizontal: "auto" }}>
              <Text style={{ fontFamily: "DMSansBold", fontSize: scale(22), color: "#fff" }}>
                Set Reminders
              </Text>
              <Text style={{ fontFamily: "DMSans", fontSize: scale(16), color: "#fff", textAlign: "center" }}>
                Don’t miss any bills payment by setting reminders for your bills on Dinero Pay.
              </Text>
            </View>
          </View>

          <View style={{ backgroundColor: "#fff", paddingVertical: moderateScale(8), paddingHorizontal: moderateScale(8), borderRadius: scale(100), position: "absolute", right: scale(30), bottom: verticalScale(36) }}>
            <Feather name='chevron-right' size={24} color={"#1D38B4"} />
          </View>

        </View>

        <View style={{ justifyContent: "center", alignItems: "center", backgroundColor: "#0D405E", gap: scale(28) }} key="3">
          <View>
            <Image source={require('../assets/images/Image-Three.png')} style={{
              width: scale(350), height: scale(350)
            }} />
          </View>

          <View style={{ alignItems: "center", gap: scale(8), width: scale(250), marginHorizontal: "auto" }}>
            <Text style={{ fontFamily: "DMSansBold", fontSize: scale(22), color: "#fff" }}>
              A World of Possibilities
            </Text>
            <Text style={{ fontFamily: "DMSans", fontSize: scale(16), color: "#fff", textAlign: "center" }}>
              Dinero Pay opens you to a world where payments are made easily.
            </Text>
          </View>
          <TouchableOpacity style={{ backgroundColor: "#0C6599", width: scale(304), borderRadius: scale(8), paddingVertical: moderateVerticalScale(16) }} onPress={() => { navigation.navigate("Register") }}>
            <Text style={{ fontFamily: "DMSans", fontSize: scale(14), color: "#fff", textAlign: "center" }}>Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { navigation.navigate('Login') }}>
            <Text style={{ fontFamily: "DMSans", fontSize: scale(14), color: "#fff", textAlign: "center" }}>Sign In</Text>
          </TouchableOpacity>
        </View>

      </PagerView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  page: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});