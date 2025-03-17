import { ScrollView, StyleSheet, View, Text, TouchableOpacity, Image, Platform, Modal } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { scale, verticalScale, moderateScale, moderateVerticalScale } from 'react-native-size-matters';

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [eye, isEye] = useState(false);
  const [profileCompleted, setProfileCompleted] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [balance, setBalance] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');
  const [recentTransaction, setRecentTransacton] = useState([]);

  async function userDetails() {
    const view = await AsyncStorage.getItem('view')
    if (view === null) {
      await AsyncStorage.setItem('view', 'false')
      isEye(false)
    } else if (view === 'false') {
      await AsyncStorage.setItem('view', 'false')
      isEye(false)
    } else if (view === 'true') {
      await AsyncStorage.setItem('view', 'true')
      isEye(true)
    }

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
        setProfileCompleted(!data.responseBody.profileCompleted);

        setFirstName(data.responseBody.firstName);
      } else {
        setResponseMessage(data.responseMessage);
        setIsVisible(true);
      }

      const balanceResponse = await fetch('https://api.dinerobillpay.com/api/v1/auth/account-balance', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${await AsyncStorage.getItem('accessToken')}`
        },
        redirect: 'follow'
      });

      const balanceData = await balanceResponse.json()

      if (balanceResponse.ok) {
        setBalance(balanceData.responseBody.balanceNgn);
      } else {
        setResponseMessage(balanceData.responseMessage);
        setIsVisible(true);
      }

      const recentTransactions = await fetch('https://api.dinerobillpay.com/api/v1/auth/transactions/recent', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${await AsyncStorage.getItem('accessToken')}`
        },
        redirect: 'follow'
      });

      const recentTransactionsData = await recentTransactions.json();

      if (recentTransactions.ok) {
        setRecentTransacton(recentTransactionsData.responseBody)
        // console.log('Recent transactions fetched:', recentTransactionsData.responseBody.length);
      } else {
        setResponseMessage(recentTransactionsData.responseMessage);
        setIsVisible(true);
      }

    } catch (error) {
      console.error('Error:', error);
      if (error == "TypeError: Network request failed") {
        setResponseMessage("There is something wrong with your internet connection. Please check and try again!");

        setIsVisible(true);
      }

      setIsVisible(true);
    }
  }

  useEffect(() => {
    userDetails();
  }, []);


  return (
    <ScrollView style={styles.container}>
      <StatusBar style={'dark'} translucent={true} hidden={false} />

      <View style={styles.header}>
        <View style={styles.profile}>
          <View style={styles.profileImage}></View>
          <Text style={styles.profileText}>
            Welcome,
            <Text style={{ fontSize: scale(14), fontFamily: "DMSansBold" }}>
              {` ${firstName}`}
            </Text>
          </Text>
        </View>
        <View>
          <Feather name='bell' color={"black"} size={24} />
        </View>
      </View>

      <Text style={[styles.wallet, { fontWeight: 500 }]}>My Wallet</Text>

      <View style={styles.balances}>
        <View style={styles.balance}>
          <Text style={styles.currency}>ngn</Text>
          <Text style={styles.amount}>{eye ? "****" : balance || '0.00'}</Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Feather name={eye ? "eye" : "eye-off"} size={20} color="black" onPress={() => { isEye(!eye); AsyncStorage.setItem('view', `${!eye}`) }} />
        </View>
      </View>

      <View style={styles.buttons}>
        <TouchableOpacity
          style={{
            backgroundColor: "#0C6599", flexDirection: "row", alignItems: "center", width: scale(140), paddingHorizontal: moderateScale(16), paddingVertical: moderateVerticalScale(4), borderRadius: scale(8), justifyContent: "center", gap: scale(8)
          }}
          onPress={() => navigation.navigate('Fund')}
        >
          <Text style={{ color: "#fff", fontFamily: "DMSansBold" }}>Fund Wallet</Text>
          <Feather name='plus-circle' size={24} color='white' />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            borderWidth: scale(1), borderColor: "#0C6599", flexDirection: "row", alignItems: "center", width: scale(116), paddingHorizontal: moderateScale(16), paddingVertical: moderateVerticalScale(4), borderRadius: scale(8), justifyContent: "center", gap: scale(8)
          }}
          onPress={() => navigation.navigate("Withdraw")}
        >
          <Text style={{ color: "#0C6599", fontFamily: "DMSansBold" }}>Withdraw</Text>
          <Feather name='external-link' size={24} color='#0C6599' />
        </TouchableOpacity>
      </View>

      <View style={styles.main}>
        <View style={styles.access}>
          <Text style={styles.accessTitle}>Quick Access</Text>
          <View style={styles.accessServices}>
            <TouchableOpacity style={styles.service} onPress={() => { navigation.navigate('PayBills') }}>
              <Image source={require('../assets/images/bills.png')} />
              <Text style={styles.serviceText}>Pay Bills</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.service} onPress={() => { navigation.navigate('AirtimePayment') }}>
              <Image source={require('../assets/images/airtime.png')} />
              <Text style={styles.serviceText}>Buy Airtime</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.service} onPress={() => { navigation.navigate('DataPayment') }}>
              <Image source={require('../assets/images/data.png')} />
              <Text style={styles.serviceText}>Buy Data</Text>
            </TouchableOpacity>

          </View>
        </View>

        <View style={styles.access}>
          <Text style={[styles.accessTitle, { marginTop: verticalScale(24) }]}>
            Recent Transactions
          </Text>

          {
            recentTransaction.length > 0 ?
              <></> :
              <>
                <View style={{ flexDirection: "row", justifyContent: "center", marginTop: verticalScale(24) }}>
                  <Image source={require('../assets/images/no-transaction.png')} />
                </View>

                <Text style={{ textAlign: "center", fontFamily: "DMSans", marginTop: verticalScale(16) }}>You have no recent transaction</Text>
              </>
          }
        </View>

      </View>

      <Modal visible={profileCompleted} animationType='slide' transparent>
        <View style={{ flex: 1, justifyContent: "flex-end", alignItems: "center", backgroundColor: "#00000080"}}>
          <View style={[styles.modal, { alignItems: "center", flex: 1 / 2, width: "100%" }]}>
            <Image source={require('../assets/images/lock.png')} />
            <Text style={[styles.modalHeading, { fontWeight: 500 }]}>Welcome to Dinero Pay</Text>
            <Text style={styles.modalText}>
              You are in now. However there are some house keeping we need to do.
            </Text>
            <View style={[styles.info, { borderColor: "#1D38B4", backgroundColor: "#DBE8FE" }]}>
              <Image source={require('../assets/images/profile.png')} />
              <Text style={styles.infoText}>Complete your profile.</Text>
            </View>
            <View style={[styles.info, { borderColor: "#9C660C", backgroundColor: "#FCF9C5" }]}>
              <Image source={require('../assets/images/settings.png')} />
              <Text style={styles.infoText}>Configure your transaction settings.</Text>
            </View>

            <TouchableOpacity style={styles.modalButton} onPress={() => { setProfileCompleted(false); navigation.navigate("UpdateProfile", {}); }}>
              <Text style={[styles.submitText, { fontWeight: 500 }]}>Proceed</Text>
              <Feather name='arrow-right' size={24} color={"#fff"} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* <Modal isVisible={isVisible} animationIn={'bounceInUp'} animationInTiming={1000}>
        <View style={[styles.modal, { alignItems: "center", flex: 1 / 3 }]}>
          <Image source={require('../assets/images/error-icon.png')} style={{ width: moderateScale(95), height: moderateVerticalScale(95) }} />
          <Text style={[styles.modalHeading, { fontWeight: 500 }]}>
            Error!
          </Text>
          <Text style={styles.modalText}>
            {responseMessage}
          </Text>
          <TouchableOpacity
            style={styles.modalButton}
            onPress={() => { userDetails(); setIsVisible(false); }}
          >
            <Text style={[styles.submitText, { fontWeight: 500 }]}>
              Try Again
            </Text>
            <Feather name='arrow-right' size={24} color={"#fff"} />
          </TouchableOpacity>
        </View>
      </Modal> */}

      <Modal visible={isVisible} animationType='slide' transparent>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#00000080" }}>
          <View style={[styles.modal, { alignItems: "center", flex: 2 / 5, width: "95%", borderRadius: 8 }]}>
            <Image source={require('../assets/images/error-icon.png')} style={[{ width: moderateScale(82), height: verticalScale(76) }, Platform.OS === 'ios' ? { width: scale(84) } : {}]} />
            <Text style={[styles.modalHeading, { fontWeight: 500 }]}>
              Error!
            </Text>
            <Text style={styles.modalText}>
              {responseMessage}
            </Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => { setIsVisible(false) }}
            >
              <Text style={[styles.submitText, { fontWeight: 500 }]}>
                Try Again
              </Text>
              <Feather name='arrow-right' size={24} color={"#fff"} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: verticalScale(40),
    backgroundColor: "#fff"
  },
  header: {
    width: scale(320),
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: "auto",
    alignItems: "center"
  },
  profile: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(8)
  },
  profileImage: {
    width: moderateScale(54),
    height: moderateVerticalScale(54),
    backgroundColor: "#D9D9D9",
    borderRadius: scale(48)
  },
  profileText: {
    fontFamily: "DMSans"
  },
  wallet: {
    fontFamily: "DMSans",
    width: scale(320),
    marginHorizontal: "auto",
    color: "#3D3C3D",
    marginTop: verticalScale(16),
    fontSize: scale(14)
  },
  balances: {
    width: scale(320),
    marginHorizontal: "auto",
    backgroundColor: "#F6F5F6",
    height: verticalScale(60),
    marginTop: verticalScale(4),
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: verticalScale(20),
    paddingHorizontal: moderateScale(10),
    borderRadius: scale(8)
  },
  balance: {
    flexDirection: "row",
    gap: scale(10),
    alignItems: "center"
  },
  currency: {
    textTransform: "uppercase",
    color: "#B2AEB0",
    fontSize: scale(18),
    fontFamily: "DMSans"
  },
  amount: {
    fontFamily: "DMSansBold",
    fontSize: scale(18),
    color: "#272525"
  },
  buttons: {
    width: scale(280),
    marginHorizontal: "auto",
    flexDirection: "row",
    gap: scale(20),
    justifyContent: "center",
    marginTop: verticalScale(20)
  },
  main: {
    backgroundColor: "#F6F5F6",
    marginTop: scale(20),
    paddingVertical: moderateVerticalScale(24),
    flex: 1,
    height: verticalScale(480)
  },
  access: {
    width: scale(320),
    marginHorizontal: "auto"
  },
  accessTitle: {
    fontFamily: "DMSansBold",
    fontSize: scale(15),
    color: "#3D3C3D"
  },
  accessServices: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: verticalScale(16),
  },
  service: {
    width: scale(96),
    backgroundColor: "#fff",
    alignItems: "center",
    gap: scale(10),
    paddingVertical: moderateVerticalScale(16),
    borderRadius: moderateScale(10)
  },
  serviceText: {
    color: "#5F5B5D",
    fontFamily: "DMSansBold"
  },
  modal: {
    flex: 1 / 4,
    backgroundColor: "#fff",
    paddingVertical: moderateVerticalScale(16),
    paddingHorizontal: moderateScale(16),
    justifyContent: "center",
  },
  modalHeading: {
    fontFamily: "DMSansBold",
    textAlign: "center",
    fontSize: scale(20),
    color: "#333333"
  },
  modalText: {
    fontSize: scale(12),
    fontFamily: "DMSans",
    color: "#6A6666",
    textAlign: "center"
  },
  info: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(8),
    borderWidth: scale(1),
    paddingHorizontal: moderateScale(12),
    paddingVertical: moderateVerticalScale(12),
    height: verticalScale(45),
    borderRadius: scale(8),
    marginTop: verticalScale(12),
    width: scale(280)
  },
  infoText: {
    fontFamily: "DMSans",
    color: "#504E4F",
    fontSize: scale(14),
  },
  modalButton: {
    width: "auto",
    flexDirection: "row",
    marginHorizontal: "auto",
    height: verticalScale(48),
    borderRadius: scale(8),
    backgroundColor: "#0C6599",
    justifyContent: "center",
    alignItems: "center",
    gap: scale(8),
    paddingVertical: moderateVerticalScale(4),
    paddingHorizontal: moderateScale(24),
    marginTop: verticalScale(24)
  },
  submitText: {
    fontFamily: "DMSans",
    fontSize: scale(16),
    color: "#fff"
  }
});

export default HomeScreen;