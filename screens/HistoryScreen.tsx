import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View, Image, StyleSheet, ScrollView } from "react-native";
import { getNormalizedSizeWithPlatformOffset, getNormalizedVerticalSizeWithPlatformOffset } from "../utils";
import AsyncStorage from '@react-native-async-storage/async-storage';
import SkeletonElement from '../skeletons/skeletonElement';
import Modal from 'react-native-modal';
import { Feather } from '@expo/vector-icons';
import { scale, verticalScale, moderateScale, moderateVerticalScale } from 'react-native-size-matters';

type ScheduleType = [
  {
    id: string,
    frequency: string,
    customer: string,
    nextPayment: string,
    nextPaymentReadable: string,
    amount: string,
    currency: string,
    status: boolean,
    name: string,
    logo: string
  }
]


export function AllTabsScreen({ navigation }: any) {
  const [isVisible, setIsVisible] = useState({ isError: false, isSuccess: false, loading: true, responseMessage: "" });
  const [data, setData] = useState([{
    id: "",
    frequency: "",
    customer: "",
    nextPayment: "",
    nextPaymentReadable: "",
    amount: "",
    currency: "",
    status: false,
    name: "",
    logo: ""
  }]);

  const { isError, isSuccess, loading, responseMessage } = isVisible;

  async function userDetails() {
    try {
      const response = await fetch('https://api.dinerobillpay.com/api/v1/auth/schedule', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${await AsyncStorage.getItem('accessToken')}`
        },
        redirect: 'follow'
      });

      const result = await response.json();

      if (response.ok) {
        setData(result.responseBody);
        setIsVisible(prevState => ({ ...prevState, loading: false }));
      } else {
        setIsVisible(prevState => ({ ...prevState, responseMessage: result.responseMessage }));
        setIsVisible(prevState => ({ ...prevState, isError: true }));
      }
    } catch (error) {
      console.error('Error:', error);
      if (error == "TypeError: Network request failed") {
        setIsVisible(prevState => ({ ...prevState, responseMessage: "There is something wrong with your internet connection. Please check and try again!" }));
        setIsVisible(prevState => ({ ...prevState, isError: true }));
      }
    }
  }

  useEffect(() => {
    userDetails();
  }, [])

  if (loading) {
    return (
      <SkeletonElement />
    )
  }

  if (data.length > 1) {
    return (
      <ScrollView>
        <View
          style={{
            flex: 1,
            flexWrap: "wrap",
            flexDirection: "row",
            justifyContent: "space-around",
            width: getNormalizedSizeWithPlatformOffset(345),
            marginHorizontal: "auto",
            rowGap: getNormalizedSizeWithPlatformOffset(20),
            columnGap: getNormalizedSizeWithPlatformOffset(20),
            marginTop: getNormalizedVerticalSizeWithPlatformOffset(16)
          }}
        >
          {
            data.map((item) => (
              <TouchableOpacity style={styles.bill} onPress={() => { navigation.navigate('Schedule', { scheduleDetails: item }) }}>
                <Image source={item.status ? require('../assets/images/scheduled.png') : require('../assets/images/unscheduled.png')} style={{ position: "absolute", top: getNormalizedVerticalSizeWithPlatformOffset(8), right: getNormalizedSizeWithPlatformOffset(8) }} />

                <View style={{ alignItems: "center" }}>
                  <Image source={{ uri: item.logo }} />
                  <Text style={{ fontFamily: "DMSans", fontSize: getNormalizedSizeWithPlatformOffset(8), color: "#5F5B5D" }}>{item.name}</Text>
                </View>

                <View style={{ width: getNormalizedSizeWithPlatformOffset(147), borderWidth: getNormalizedSizeWithPlatformOffset(2), borderColor: "#D5D5D5" }}></View>

                <Text style={{ fontFamily: "DMSansBold", fontSize: getNormalizedSizeWithPlatformOffset(16), color: "#0C6599" }}>{`N ${item.amount}`}</Text>

                <View style={{ alignItems: "center" }}>
                  <View style={{ flexDirection: "row", gap: getNormalizedSizeWithPlatformOffset(5) }}>
                    <Text style={{ fontFamily: "DMSans", fontSize: getNormalizedSizeWithPlatformOffset(10), color: "#929597" }}>Schedule: </Text>
                    <Text style={{ fontFamily: "DMSansBold", color: "#5F5B5D", fontSize: getNormalizedSizeWithPlatformOffset(10) }}>Monthly</Text>
                  </View>
                  <View style={{ flexDirection: "row", gap: getNormalizedSizeWithPlatformOffset(5) }}>
                    <Text style={{ fontFamily: "DMSans", fontSize: getNormalizedSizeWithPlatformOffset(10), color: "#929597" }}>Next Payment: </Text>
                    <Text style={{ fontFamily: "DMSansBold", color: "#5F5B5D", fontSize: getNormalizedSizeWithPlatformOffset(10) }}>{item.nextPaymentReadable}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          }
        </View>
      </ScrollView>
    )
  }

  return (
    <>
      <View style={{ justifyContent: "center", flex: 1, alignItems: "center" }}>
        <Text style={{ fontFamily: "DMSansBold", fontSize: scale(16) }}>No  Scheduled Payment Available</Text>
      </View>

      <Modal isVisible={isError} animationIn={'bounceInUp'} animationInTiming={1000}>
        <View style={[styles.modal, { alignItems: "center", flex: 2 / 5 }]}>
          <Image source={require('../assets/images/error-icon.png')} style={{ width: getNormalizedSizeWithPlatformOffset(85), height: getNormalizedVerticalSizeWithPlatformOffset(95) }} />
          <Text style={[styles.modalHeading, { fontWeight: 500 }]}>
            Error!
          </Text>
          <Text style={styles.modalText}>
            {responseMessage}
          </Text>
          <TouchableOpacity
            style={styles.modalButton}
            onPress={() => {
              userDetails();
              setIsVisible({ isError: false, isSuccess: false, loading: true, responseMessage: "" });
            }}
          >
            <Text style={[styles.submitText, { fontWeight: 500 }]}>
              Try Again
            </Text>
            <Feather name='arrow-right' size={24} color={"#fff"} />
          </TouchableOpacity>
        </View>
      </Modal>
    </>
  )
}
export function ActiveTabsScreen({ navigation }: any) {
  const [isVisible, setIsVisible] = useState({ isError: false, isSuccess: false, loading: true, responseMessage: "" });
  const [data, setData] = useState([{
    id: "",
    frequency: "",
    customer: "",
    nextPayment: "",
    nextPaymentReadable: "",
    amount: "",
    currency: "",
    status: false,
    name: "",
    logo: ""
  }]);

  const { isError, isSuccess, loading, responseMessage } = isVisible;

  async function userDetails() {
    try {
      const response = await fetch('https://dinero-backend-production.up.railway.app/api/v1/auth/schedule', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${await AsyncStorage.getItem('accessToken')}`
        },
        redirect: 'follow'
      });

      const result = await response.json();

      if (response.ok) {
        const filtered = result.responseBody.filter((item: ScheduleType[0]) => item.status === false);
        setData(filtered);
        setIsVisible(prevState => ({ ...prevState, loading: false }));
      } else {
        setIsVisible(prevState => ({ ...prevState, responseMessage: result.responseMessage }));
        setIsVisible(prevState => ({ ...prevState, isError: true }));
      }
    } catch (error) {
      console.error('Error:', error);
      if (error == "TypeError: Network request failed") {
        setIsVisible(prevState => ({ ...prevState, responseMessage: "There is something wrong with your internet connection. Please check and try again!" }));
        setIsVisible(prevState => ({ ...prevState, isError: true }));
      }
    }
  }

  useEffect(() => {
    userDetails();
  }, [])

  if (loading) {
    return (
      <SkeletonElement />
    )
  }

  if (data.length > 1) {
    return (
      <ScrollView>
        <View
          style={{
            flex: 1,
            flexWrap: "wrap",
            flexDirection: "row",
            justifyContent: "space-around",
            width: getNormalizedSizeWithPlatformOffset(345),
            marginHorizontal: "auto",
            rowGap: getNormalizedSizeWithPlatformOffset(20),
            columnGap: getNormalizedSizeWithPlatformOffset(20),
            marginTop: getNormalizedVerticalSizeWithPlatformOffset(16)
          }}
        >
          {
            data.map((item) => (
              <TouchableOpacity style={styles.bill} onPress={() => { navigation.navigate('Schedule', { scheduleDetails: item }) }}>
                <Image source={item.status ? require('../assets/images/scheduled.png') : require('../assets/images/unscheduled.png')} style={{ position: "absolute", top: getNormalizedVerticalSizeWithPlatformOffset(8), right: getNormalizedSizeWithPlatformOffset(8) }} />

                <View style={{ alignItems: "center" }}>
                  <Image source={{ uri: item.logo }} />
                  <Text style={{ fontFamily: "DMSans", fontSize: getNormalizedSizeWithPlatformOffset(8), color: "#5F5B5D" }}>{item.name}</Text>
                </View>

                <View style={{ width: getNormalizedSizeWithPlatformOffset(147), borderWidth: getNormalizedSizeWithPlatformOffset(2), borderColor: "#D5D5D5" }}></View>

                <Text style={{ fontFamily: "DMSansBold", fontSize: getNormalizedSizeWithPlatformOffset(16), color: "#0C6599" }}>{`N ${item.amount}`}</Text>

                <View style={{ alignItems: "center" }}>
                  <View style={{ flexDirection: "row", gap: getNormalizedSizeWithPlatformOffset(5) }}>
                    <Text style={{ fontFamily: "DMSans", fontSize: getNormalizedSizeWithPlatformOffset(10), color: "#929597" }}>Schedule: </Text>
                    <Text style={{ fontFamily: "DMSansBold", color: "#5F5B5D", fontSize: getNormalizedSizeWithPlatformOffset(10) }}>Monthly</Text>
                  </View>
                  <View style={{ flexDirection: "row", gap: getNormalizedSizeWithPlatformOffset(5) }}>
                    <Text style={{ fontFamily: "DMSans", fontSize: getNormalizedSizeWithPlatformOffset(10), color: "#929597" }}>Next Payment: </Text>
                    <Text style={{ fontFamily: "DMSansBold", color: "#5F5B5D", fontSize: getNormalizedSizeWithPlatformOffset(10) }}>{item.nextPaymentReadable}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          }
        </View>
      </ScrollView>
    )
  }

  return (
    <>
      <View style={{ justifyContent: "center", flex: 1, alignItems: "center" }}>
        <Text style={{ fontFamily: "DMSansBold", fontSize: scale(14) }}>No Active Scheduled Payment Available</Text>
      </View>

      <Modal isVisible={isError} animationIn={'bounceInUp'} animationInTiming={1000}>
        <View style={[styles.modal, { alignItems: "center", flex: 2 / 5 }]}>
          <Image source={require('../assets/images/error-icon.png')} style={{ width: getNormalizedSizeWithPlatformOffset(85), height: getNormalizedVerticalSizeWithPlatformOffset(95) }} />
          <Text style={[styles.modalHeading, { fontWeight: 500 }]}>
            Error!
          </Text>
          <Text style={styles.modalText}>
            {responseMessage}
          </Text>
          <TouchableOpacity
            style={styles.modalButton}
            onPress={() => {
              userDetails();
              setIsVisible({ isError: false, isSuccess: false, loading: true, responseMessage: "" });
            }}
          >
            <Text style={[styles.submitText, { fontWeight: 500 }]}>
              Try Again
            </Text>
            <Feather name='arrow-right' size={24} color={"#fff"} />
          </TouchableOpacity>
        </View>
      </Modal>
    </>
  )
}
export function InactiveTabsScreen({ navigation }: any) {
  const [isVisible, setIsVisible] = useState({ isError: false, isSuccess: false, loading: true, responseMessage: "" });
  const [data, setData] = useState([{
    id: "",
    frequency: "",
    customer: "",
    nextPayment: "",
    nextPaymentReadable: "",
    amount: "",
    currency: "",
    status: false,
    name: "",
    logo: ""
  }]);

  const { isError, isSuccess, loading, responseMessage } = isVisible;

  async function userDetails() {
    try {
      const response = await fetch('https://dinero-backend-production.up.railway.app/api/v1/auth/schedule', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${await AsyncStorage.getItem('accessToken')}`
        },
        redirect: 'follow'
      });

      const result = await response.json();



      if (response.ok) {
        const filtered = result.responseBody.filter((item: ScheduleType[0]) => item.status === false);
        setData(filtered);
        setIsVisible(prevState => ({ ...prevState, loading: false }));
      } else {
        setIsVisible(prevState => ({ ...prevState, responseMessage: result.responseMessage }));
        setIsVisible(prevState => ({ ...prevState, isError: true }));
      }
    } catch (error) {
      console.error('Error:', error);
      if (error == "TypeError: Network request failed") {
        setIsVisible(prevState => ({ ...prevState, responseMessage: "There is something wrong with your internet connection. Please check and try again!" }));
        setIsVisible(prevState => ({ ...prevState, isError: true }));
      }
    }
  }

  useEffect(() => {
    userDetails();
  }, [])

  if (loading) {
    return (
      <SkeletonElement />
    )
  }

  if (data.length > 1) {
    return (
      <ScrollView>
        <View
          style={{
            flex: 1,
            flexWrap: "wrap",
            flexDirection: "row",
            justifyContent: "space-around",
            width: getNormalizedSizeWithPlatformOffset(345),
            marginHorizontal: "auto",
            rowGap: getNormalizedSizeWithPlatformOffset(20),
            columnGap: getNormalizedSizeWithPlatformOffset(20),
            marginTop: getNormalizedVerticalSizeWithPlatformOffset(16)
          }}
        >
          {
            data.map((item) => (
              <TouchableOpacity style={styles.bill} onPress={() => { navigation.navigate('Schedule', { scheduleDetails: item }) }}>
                <Image source={item.status ? require('../assets/images/scheduled.png') : require('../assets/images/unscheduled.png')} style={{ position: "absolute", top: getNormalizedVerticalSizeWithPlatformOffset(8), right: getNormalizedSizeWithPlatformOffset(8) }} />

                <View style={{ alignItems: "center" }}>
                  <Image source={{ uri: item.logo }} />
                  <Text style={{ fontFamily: "DMSans", fontSize: getNormalizedSizeWithPlatformOffset(8), color: "#5F5B5D" }}>{item.name}</Text>
                </View>

                <View style={{ width: getNormalizedSizeWithPlatformOffset(147), borderWidth: getNormalizedSizeWithPlatformOffset(2), borderColor: "#D5D5D5" }}></View>

                <Text style={{ fontFamily: "DMSansBold", fontSize: getNormalizedSizeWithPlatformOffset(16), color: "#0C6599" }}>{`N ${item.amount}`}</Text>

                <View style={{ alignItems: "center" }}>
                  <View style={{ flexDirection: "row", gap: getNormalizedSizeWithPlatformOffset(5) }}>
                    <Text style={{ fontFamily: "DMSans", fontSize: getNormalizedSizeWithPlatformOffset(10), color: "#929597" }}>Schedule: </Text>
                    <Text style={{ fontFamily: "DMSansBold", color: "#5F5B5D", fontSize: getNormalizedSizeWithPlatformOffset(10) }}>Monthly</Text>
                  </View>
                  <View style={{ flexDirection: "row", gap: getNormalizedSizeWithPlatformOffset(5) }}>
                    <Text style={{ fontFamily: "DMSans", fontSize: getNormalizedSizeWithPlatformOffset(10), color: "#929597" }}>Next Payment: </Text>
                    <Text style={{ fontFamily: "DMSansBold", color: "#5F5B5D", fontSize: getNormalizedSizeWithPlatformOffset(10) }}>{item.nextPaymentReadable}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          }
        </View>
      </ScrollView>
    )
  }

  return (
    <>
      <View style={{ justifyContent: "center", flex: 1, alignItems: "center" }}>
        <Text style={{ fontFamily: "DMSansBold", fontSize: scale(14) }}>No Inactive Scheduled Payment Available</Text>
      </View>

      <Modal isVisible={isError} animationIn={'bounceInUp'} animationInTiming={1000}>
        <View style={[styles.modal, { alignItems: "center", flex: 2 / 5 }]}>
          <Image source={require('../assets/images/error-icon.png')} style={{ width: moderateScale(70), height: moderateVerticalScale(70) }} />
          <Text style={[styles.modalHeading, { fontWeight: 500 }]}>
            Error!
          </Text>
          <Text style={styles.modalText}>
            {responseMessage}
          </Text>
          <TouchableOpacity
            style={styles.modalButton}
            onPress={() => {
              userDetails();
              setIsVisible({ isError: false, isSuccess: false, loading: true, responseMessage: "" });
            }}
          >
            <Text style={[styles.submitText, { fontWeight: 500 }]}>
              Try Again
            </Text>
            <Feather name='arrow-right' size={24} color={"#fff"} />
          </TouchableOpacity>
        </View>
      </Modal>
    </>
  )
}


const styles = StyleSheet.create({
  bill: {
    width: getNormalizedSizeWithPlatformOffset(162),
    height: getNormalizedVerticalSizeWithPlatformOffset(187),
    borderRadius: getNormalizedSizeWithPlatformOffset(10),
    paddingVertical: getNormalizedVerticalSizeWithPlatformOffset(10),
    gap: getNormalizedVerticalSizeWithPlatformOffset(12),
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  modal: {
    flex: 1 / 4,
    backgroundColor: "#fff",
    paddingVertical: moderateVerticalScale(16),
    paddingHorizontal: moderateScale(16),
    justifyContent: "center",
    borderRadius: scale(20)
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
  modalButton: {
    flexDirection: "row",
    width: scale(280),
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
  },
})