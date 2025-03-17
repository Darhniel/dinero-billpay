import { Text, View, SafeAreaView, ScrollView, TouchableOpacity, StyleSheet, Switch, Alert } from "react-native";
import { Feather, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import * as Notifications from 'expo-notifications';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import { scale, verticalScale, moderateScale, moderateVerticalScale } from 'react-native-size-matters';

export default function MenuScreen({ navigation }: any) {
  const [accessToken, setAccessToken] = useState("")
  const [fullName, setFullName] = useState("")
  const [isEnabled, setIsEnabled] = useState(false);

  async function toggleSwitch() {
    setIsEnabled((previousState) => !previousState);

    if (!isEnabled) {
      // Notifications permission request or enabling logic here
      enableNotifications();
    } else {
      // Disable notifications logic here
      disableNotifications();
    }
  };

  const enableNotifications = async () => {
    // This is where you'd request permission and set up notifications
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission not granted for notifications');
      return;
    }
    Alert.alert('Notifications turned ON');
    // Handle notification enabling logic
  };

  const disableNotifications = () => {
    Alert.alert('Notifications turned OFF');
    // Handle disabling logic here (e.g., unsubscribe from notifications)
  };

  useEffect(() => {
    async function checkLoginStatus() {
      try {
        const token = await AsyncStorage.getItem("accessToken");
        // console.log(token)

        if (token) {
          setAccessToken(token)
        } else {
          console.log("No token found!")
          return false
          // navigation.replace("Login")
        }
      } catch (error) {

      }
    }

    checkLoginStatus();

  }, []);

  async function userDetails() {
    try {
      const response = await fetch('https://api.dinerobillpay.com/api/v1/auth', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${await AsyncStorage.getItem('accessToken')}`
        },
        redirect: 'follow'
      });

      const data = await response.json();

      if (response.ok) {
        setFullName(data.responseBody.fullName);
      } else {
      }

      
    } catch (error) {
      console.error('Error:', error);
      if (error == "TypeError: Network request failed") {
        // setResponseMessage("There is something wrong with your internet connection. Please check and try again!");

        // setIsVisible(true);
      }

      // setIsVisible(true);
    }
  }

  useEffect(() => {
    userDetails();
  }, [])


  return (
    <ScrollView style={{ backgroundColor: "#F5F5F5", flex: 1 }}>
      <StatusBar style={'light'} translucent={true} hidden={false} />


      <View style={styles.profileInfo}>
        <View style={styles.profileImage}></View>
        <View style={styles.profileText}>
          <Text style={{ fontFamily: "DMSans", fontSize: scale(20), color: "#666666" }}>{fullName}</Text>
          <TouchableOpacity style={{ backgroundColor: "#0C6599", paddingVertical: moderateVerticalScale(4), paddingHorizontal: moderateScale(12) }} onPress={() => { navigation.navigate('UpdatePersonalInfo') }}>
            <Text style={{ fontFamily: "DMSans", color: "#fff", fontSize: scale(10) }}>Edit Your Personal Information</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.heading}>Settings</Text>

      <View style={{ flexDirection: "row", width: scale(320), marginHorizontal: "auto", justifyContent: "space-between", borderBottomWidth: scale(1), borderColor: "#B2AEB0", alignItems: "center", height: verticalScale(48) }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: scale(8) }}>
          <View style={{ width: scale(28), height: verticalScale(32), backgroundColor: "#F6F5F6", paddingHorizontal: moderateScale(4), paddingVertical: moderateVerticalScale(4), borderRadius: scale(40) }}>
            <Feather name='bell' color={"#2D264B"} size={18} />
          </View>
          <Text style={{
            fontFamily: "DMSansBold",
            fontSize: scale(16),
            color: "#333",
          }}>Notifications</Text>
        </View>

        <Switch
          trackColor={{ false: '#ccc', true: '#1D38B4' }}
          thumbColor={isEnabled ? '#fff' : '#fff'}
          ios_backgroundColor="#ccc"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>

      <TouchableOpacity style={{ flexDirection: "row", width: scale(320), marginHorizontal: "auto", justifyContent: "space-between", borderBottomWidth: scale(1), borderColor: "#B2AEB0", alignItems: "center", height: verticalScale(48) }} onPress={() => { navigation.navigate('UpdateId') }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: scale(8) }}>
          <View style={{ width: scale(28), height: verticalScale(32), backgroundColor: "#F6F5F6", paddingHorizontal: moderateScale(4), paddingVertical: moderateVerticalScale(4), borderRadius: scale(40) }}>
            <MaterialCommunityIcons name='line-scan' color={"#2D264B"} size={18} />
          </View>
          <Text style={{
            fontFamily: "DMSansBold",
            fontSize: scale(16),
            color: "#333",
          }}>ID Verification</Text>
        </View>

        <Feather name={'chevron-right'} color={"black"} size={24} style={{ marginRight: scale(12) }} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => { navigation.navigate('UpdateSecurity', { accessToken: accessToken }) }} style={{ flexDirection: "row", width: scale(320), marginHorizontal: "auto", justifyContent: "space-between", borderBottomWidth: scale(1), borderColor: "#B2AEB0", alignItems: "center", height: verticalScale(48) }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: scale(8) }}>
          <View style={{ width: scale(28), height: verticalScale(32), backgroundColor: "#F6F5F6", paddingHorizontal: moderateScale(4), paddingVertical: moderateVerticalScale(4), borderRadius: scale(40) }}>
            <Feather name='lock' color={"#2D264B"} size={18} />
          </View>
          <Text style={{
            fontFamily: "DMSansBold",
            fontSize: scale(16),
            color: "#333",
          }}>Security</Text>
        </View>

        <Feather name={'chevron-right'} color={"black"} size={24} style={{ marginRight: scale(12) }} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => { navigation.navigate('UpdateBank', { accessToken: accessToken }) }} style={{ flexDirection: "row", width: scale(320), marginHorizontal: "auto", justifyContent: "space-between", borderBottomWidth: scale(1), borderColor: "#B2AEB0", alignItems: "center", height: verticalScale(48) }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: scale(8) }}>
          <View style={{ width: scale(28), height: verticalScale(32), backgroundColor: "#F6F5F6", paddingHorizontal: moderateScale(4), paddingVertical: moderateVerticalScale(4), borderRadius: scale(40) }}>
            <Feather name='credit-card' color={"#2D264B"} size={18} />
          </View>
          <Text style={{
            fontFamily: "DMSansBold",
            fontSize: scale(16),
            color: "#333",
          }}>Bank Accounts & Cards</Text>
        </View>

        <Feather name={'chevron-right'} color={"black"} size={24} style={{ marginRight: scale(12) }} />
      </TouchableOpacity>

      <Text style={styles.heading}>Dinero Pay</Text>

      <TouchableOpacity onPress={() => { navigation.navigate('AboutUs') }} style={{ flexDirection: "row", width: scale(320), marginHorizontal: "auto", justifyContent: "space-between", borderBottomWidth: scale(1), borderColor: "#B2AEB0", alignItems: "center", height: verticalScale(48) }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: scale(8) }}>
          <View style={{ width: scale(28), height: verticalScale(32), backgroundColor: "#F6F5F6", paddingHorizontal: moderateScale(4), paddingVertical: moderateVerticalScale(4), borderRadius: scale(40) }}>
            <Feather name='info' color={"#2D264B"} size={18} />
          </View>
          <Text style={{
            fontFamily: "DMSansBold",
            fontSize: scale(16),
            color: "#333",
          }}>About Us</Text>
        </View>

        <Feather name={'chevron-right'} color={"black"} size={24} style={{ marginRight: scale(12) }} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => { navigation.navigate('PrivacyPolicy') }} style={{ flexDirection: "row", width: scale(320), marginHorizontal: "auto", justifyContent: "space-between", borderBottomWidth: scale(1), borderColor: "#B2AEB0", alignItems: "center", height: verticalScale(48) }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: scale(8) }}>
          <View style={{ width: scale(28), height: verticalScale(32), backgroundColor: "#F6F5F6", paddingHorizontal: moderateScale(4), paddingVertical: moderateVerticalScale(4), borderRadius: scale(40) }}>
            <MaterialIcons name='privacy-tip' color={"#2D264B"} size={18} />
          </View>
          <Text style={{
            fontFamily: "DMSansBold",
            fontSize: scale(16),
            color: "#333",
          }}>Privacy Policy</Text>
        </View>

        <Feather name={'chevron-right'} color={"black"} size={24} style={{ marginRight: scale(12) }} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => { navigation.navigate('Terms') }} style={{ flexDirection: "row", width: scale(320), marginHorizontal: "auto", justifyContent: "space-between", borderBottomWidth: scale(1), borderColor: "#B2AEB0", alignItems: "center", height: verticalScale(48) }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: scale(8) }}>
          <View style={{ width: scale(28), height: verticalScale(32), backgroundColor: "#F6F5F6", paddingHorizontal: moderateScale(4), paddingVertical: moderateVerticalScale(4), borderRadius: scale(40) }}>
            <MaterialIcons name='privacy-tip' color={"#2D264B"} size={18} />
          </View>
          <Text style={{
            fontFamily: "DMSansBold",
            fontSize: scale(16),
            color: "#333",
          }}>Terms & Conditions</Text>
        </View>

        <Feather name={'chevron-right'} color={"black"} size={24} style={{ marginRight: scale(12) }} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => { navigation.navigate('Contact') }} style={{ flexDirection: "row", width: scale(320), marginHorizontal: "auto", justifyContent: "space-between", borderBottomWidth: scale(1), borderColor: "#B2AEB0", alignItems: "center", height: verticalScale(48) }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: scale(8) }}>
          <View style={{ width: scale(28), height: verticalScale(32), backgroundColor: "#F6F5F6", paddingHorizontal: moderateScale(4), paddingVertical: moderateVerticalScale(4), borderRadius: scale(40) }}>
            <MaterialIcons name='privacy-tip' color={"#2D264B"} size={18} />
          </View>
          <Text style={{
            fontFamily: "DMSansBold",
            fontSize: scale(16),
            color: "#333",
          }}>Contact Us</Text>
        </View>

        <Feather name={'chevron-right'} color={"black"} size={24} style={{ marginRight: scale(12) }} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => { navigation.navigate('FAQ') }} style={{ flexDirection: "row", width: scale(320), marginHorizontal: "auto", justifyContent: "space-between", borderBottomWidth: scale(1), borderColor: "#B2AEB0", alignItems: "center", height: verticalScale(48) }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: scale(8) }}>
          <View style={{ width: scale(28), height: verticalScale(32), backgroundColor: "#F6F5F6", paddingHorizontal: moderateScale(4), paddingVertical: moderateVerticalScale(4), borderRadius: scale(40) }}>
            <MaterialIcons name='privacy-tip' color={"#2D264B"} size={18} />
          </View>
          <Text style={{
            fontFamily: "DMSansBold",
            fontSize: scale(16),
            color: "#333",
          }}>FAQs</Text>
        </View>

        <Feather name={'chevron-right'} color={"black"} size={24} style={{ marginRight: scale(12) }} />
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  profileInfo: {
    flexDirection: "row", 
    alignItems: "center",
    gap: scale(8),
    width: scale(320),
    marginHorizontal: "auto",
    marginVertical: verticalScale(16)
  },
  profileImage: {
    width:scale(48),
    height: scale(48),
    backgroundColor: "#D9D9D9",
    borderRadius: scale(40)
  },
  profileText: {
    justifyContent: "center",
    alignItems: "flex-start",
    gap: scale(4),
  },
  heading: {
    fontFamily: "DMSansBold",
    fontSize: scale(16),
    color: "#333",
    marginTop: verticalScale(16),
    marginLeft: scale(24),
    marginBottom: verticalScale(12)
  },
})