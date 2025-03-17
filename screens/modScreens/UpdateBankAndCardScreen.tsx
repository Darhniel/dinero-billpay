import { SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { Feather } from '@expo/vector-icons'
import { scale, verticalScale, moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from 'react-native-modal';

type bankInfo = [
  {
    id: "", 
    accountNumber: "", 
    accountName: "", 
    bankName: "", 
    bankCode: "",
    bankLogo: ""
  }
]

export default function UpdateBankAndCardScreen({ navigation, route }: any) {
  const { accessToken } = route.params;
  const [isVisible, setIsVisible] = useState({ isError: false, loading: true, responseMessage: "" });
  const [data, setData] = useState<bankInfo | []>([])

  const { isError, loading, responseMessage } = isVisible;


  // const data = [
  //   {
  //     "id": "be717a05-dda5-4335-9f72-0cc6d050daa7",
  //     "accountNumber": "0466990038",
  //     "accountName": "ILESANMI MICHAEL OLUWASEGUN",
  //     "bankName": "Guaranty Trust Bank",
  //     "bankCode": "058",
  //     "bankLogo": "https://nigerianbanks.xyz/logo/guaranty-trust-bank.png"
  //   },
  //   {
  //     "id": "5a5ba8f1-cf7f-4302-8fe2-a68ae2acba4b",
  //     "accountNumber": "0690000040",
  //     "accountName": "Alexis Sanchez",
  //     "bankName": "Access Bank",
  //     "bankCode": "044",
  //     "bankLogo": "https://nigerianbanks.xyz/logo/access-bank.png"
  //   }
  // ];

  async function getWithdrawalAccounts() {
    try {
      const response = await fetch('https://dinero-backend-production.up.railway.app/api/v1/auth/accounts/all', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${await AsyncStorage.getItem('accessToken')}`
        },
        redirect: 'follow'
      });

      const data = await response.json();

      if (response.ok) {
        setData(data.responseBody)
        setIsVisible(prevState => ({...prevState, loading: false }));
      } else {
        setIsVisible(prevState => ({...prevState, isError: true, responseMessage: data.responseMessage }));
      }
    } catch (error) {
      if (error == "TypeError: Network request failed") {
        setIsVisible(prevState => ({ ...prevState, responseMessage: "There is something wrong with your internet connection. Please check and try again!" }));
        setIsVisible(prevState => ({ ...prevState, isError: true }));
      }
    }
  }

  useEffect(() => {
    getWithdrawalAccounts()
  }, [])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar style={'light'} translucent={true} hidden={false} />

      <View style={styles.verifyBox}>
        <Feather name='info' color={"#0C6599"} style={{ marginBottom: scale(8) }} />
        <Text style={{ color: "#0C6599", fontFamily: "DMSans" }}>
          To curb fraud, you can only withdraw from your wallet to your configured ‘withdrawal account’
        </Text>
      </View>
      { data.length > 0 &&
        data.map(({ accountNumber, bankCode, accountName, bankLogo }) => (
          <View
            key={bankCode}
            style={styles.accountDetails}
          >
            <Image source={{ uri: bankLogo }} style={{ width: moderateScale(60), height: moderateVerticalScale(50) }} />
            <View>
              <Text style={{ color: "#272525", fontFamily: "DMSansBold" }}>{accountNumber}</Text>
              <Text style={{ color: "#5F5B5D", fontFamily: "DMSans" }}>{accountName}</Text>
            </View>
          </View>
        ))
      }

      <TouchableOpacity style={styles.submit} onPress={() => { navigation.navigate('UpdateWithdrawalAccount', { accessToken: accessToken }) }}>
        <Text style={styles.submitText}>Add Withdrawal Account</Text>
        <Feather name='arrow-right' color={"#fff"} size={24} />
      </TouchableOpacity>

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
            onPress={() => { setIsVisible({ isError: false, loading: false, responseMessage: "" }); getWithdrawalAccounts() }}
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
  verifyBox: {
    backgroundColor: "#B6DEF6",
    paddingVertical: moderateVerticalScale(8),
    paddingHorizontal: moderateScale(8),
    width: scale(320),
    marginHorizontal: "auto",
    marginTop: verticalScale(32)
  },
  accountDetails: {
    width: scale(320),
    marginHorizontal: "auto",
    borderRadius: scale(8),
    paddingHorizontal: moderateScale(8),
    paddingVertical: moderateVerticalScale(8),
    gap: scale(10),
    flexDirection: "row",
    borderWidth: scale(1),
    borderColor: "#1D38B4",
    backgroundColor: "#DBE8FE",
    marginTop: verticalScale(28),
    alignItems: "center"
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
    gap: scale(8),
    paddingVertical: verticalScale(4),
    paddingHorizontal: scale(24),
    marginTop: verticalScale(36)
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
    width: "95%",
    marginHorizontal: "auto"
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