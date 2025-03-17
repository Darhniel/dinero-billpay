import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons'
import { StatusBar } from 'expo-status-bar';
import { scale, verticalScale, moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from 'react-native-modal';


export default function UpdateIdScreen({ navigation }: any) {
  const [disabled, setDisabled] = useState(true);
  const [idDetails, setIdDetails] = useState<{ bvn: string | null, nin: string | null }>({ bvn: null, nin: null });
  const [isVisible, setIsVisible] = useState({ isError: false, loading: true, responseMessage: "" });

  const { isError, loading, responseMessage } = isVisible;

  async function fetchUserDetails() {
    try {
      const response = await fetch('https://dinero-backend-production.up.railway.app/api/v1/auth', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${await AsyncStorage.getItem('accessToken')}`
        },
        redirect: 'follow'
      });

      const data = await response.json();
      if (response.ok) {
        const { bvn, nin } = data.responseBody;
        setIdDetails({ bvn, nin });
        setIsVisible(prevState => ({ ...prevState, loading: false }))
      } else {
        setIsVisible({ isError: true, responseMessage: data.responseMessage, loading: false })
      }
    } catch (error) {
      console.error("Error", error)
      if (error == "TypeError: Network request failed") {
        setIsVisible({ isError: true, responseMessage: "There is something wrong with your internet connection. Please check and try again!", loading: false });
      }
    }
  }

  useEffect(() => {
    fetchUserDetails()
  }, []);


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style={'light'} translucent={true} hidden={false} />

      <View style={styles.IDcontainer}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: scale(8) }}>
          <View style={{ width: scale(28), height: verticalScale(32), backgroundColor: "#F6F5F6", paddingHorizontal: moderateScale(4), paddingVertical: moderateVerticalScale(4), borderRadius: scale(50) }}>
            <MaterialCommunityIcons name='line-scan' color={"#2D264B"} size={18} />
          </View>
          <Text style={{
            fontFamily: "DMSansBold",
            fontSize: scale(16),
            color: "#333",
          }}>ID Verification</Text>
        </View>

        {
          idDetails.bvn !== null || idDetails.nin !== null ?
            <>
              <View style={styles.IdStatus}>
                <Text style={{ fontFamily: "DMSansBold", color: "#067512" }}>Verified</Text>
              </View>
            </> :
            <>
              <View style={[styles.IdStatus, { backgroundColor: "#F7B7B7" }]}>
                <Text style={{ fontFamily: "DMSansBold", color: "#8B0404" }}>
                  Not Verified
                </Text>
              </View>
            </>
        }
      </View>

      {
        idDetails.bvn !== null || idDetails.nin !== null ?
          <></> :
          <TouchableOpacity style={[styles.submit]} onPress={() => { navigation.navigate('UpdateIdDetails', {}) }} >
            <Text style={[styles.submitText, { fontWeight: 500 }]}>Verify ID</Text>
            <Feather name='arrow-right' size={24} color={"#fff"} />
          </TouchableOpacity>
      }

      <Modal isVisible={loading} animationIn={'bounceInUp'} animationInTiming={1000}>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size={48} color={"#1734B9"} />
        </View>
      </Modal>

      <Modal isVisible={isError} animationIn={'bounceInUp'} animationInTiming={1000}>
        <View style={[styles.modal, { alignItems: "center", flex: 2 / 5 }]}>
          <Image source={require('../../assets/images/error-icon.png')} style={{ width: moderateScale(95), height: moderateVerticalScale(95) }} />
          <Text style={[styles.modalHeading, { fontWeight: 500 }]}>
            Error!
          </Text>
          <Text style={styles.modalText}>
            {responseMessage}
          </Text>
          <TouchableOpacity
            style={styles.modalButton}
            onPress={() => { setIsVisible({ isError: false, loading: false, responseMessage: "" }); fetchUserDetails() }}
          >
            <Text style={[styles.submitText, { fontWeight: 500 }]}>
              Try Again
            </Text>
            <Feather name='arrow-right' size={24} color={"#fff"} />
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F5F5F5",
    gap: verticalScale(240),
    flex: 1
  },
  IDcontainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: scale(320),
    marginHorizontal: "auto",
    marginTop: verticalScale(32),
    paddingHorizontal: moderateScale(8),
    borderWidth: scale(0.5),
    borderColor: "#B2AEB0",
    borderRadius: scale(8),
    paddingVertical: moderateVerticalScale(10),
    backgroundColor: "#fff"
  },
  IdStatus: {
    paddingVertical: moderateVerticalScale(10),
    paddingHorizontal: moderateScale(10),
    backgroundColor: "#D6FFDA",
    borderRadius: scale(100)
  },
  submit: {
    flexDirection: "row",
    width: scale(320),
    marginHorizontal: "auto",
    height: verticalScale(45),
    borderRadius: scale(8),
    backgroundColor: "#0C6599",
    justifyContent: "center",
    alignItems: "center",
    gap: scale(12),
    paddingVertical: moderateVerticalScale(4),
    paddingHorizontal: moderateScale(24),
    marginTop: verticalScale(24)
  },
  submitText: {
    fontFamily: "DMSans",
    fontSize: scale(16),
    color: "#fff"
  },
  modal: {
    flex: 1 / 4,
    backgroundColor: "#fff",
    paddingVertical: moderateVerticalScale(16),
    paddingHorizontal: moderateScale(16),
    justifyContent: "center",
    borderRadius: scale(12),
  },
  modalHeading: {
    fontFamily: "DMSansBold",
    textAlign: "center",
    fontSize: scale(32),
    color: "#333333"
  },
  modalText: {
    fontSize: scale(14),
    fontFamily: "DMSans",
    color: "#333",
    textAlign: "center"
  },
  modalButton: {
    flexDirection: "row",
    width: "auto",
    marginHorizontal: "auto",
    height: verticalScale(45),
    borderRadius: scale(8),
    backgroundColor: "#0C6599",
    justifyContent: "center",
    alignItems: "center",
    gap: scale(8),
    paddingVertical: moderateVerticalScale(4),
    paddingHorizontal: moderateScale(24),
    marginTop: verticalScale(16)
  },
})