import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, Modal } from 'react-native';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { Dropdown } from 'react-native-element-dropdown';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { scale, verticalScale, moderateScale, moderateVerticalScale } from 'react-native-size-matters';

type AirtimeScreenProps = NativeStackScreenProps<RootStackParamList, 'AirtimePayment'>;
type DataScreenProps = NativeStackScreenProps<RootStackParamList, 'DataPayment'>;


const AirtimeScreen: React.FC<AirtimeScreenProps> = ({ navigation }) => {
  const scrollRef = useRef<KeyboardAwareScrollView>(null);
  const scrollToInput = (reactNode: any) => {
    if (reactNode) {
      scrollRef.current?.scrollToFocusedInput(reactNode);
    }
  };

  const [info, setInfo] = useState({ phoneNumber: "", amount: "", name: "", transaction: "", id: "", decoderNo: "", meterNo: "", email: "" });
  const [disabled, setDisabled] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [airtime, setAirtime] = useState([]);

  useEffect(() => {
    function validForm() {
      const { phoneNumber, amount, id } = info;
      return (
        phoneNumber.length === 11 &&
        amount.length !== 0 &&
        id.length !== 0
      )
    };

    setDisabled(!validForm());
  });

  useEffect(() => {
    async function getAirtimeNetworks() {
      try {
        const response = await fetch('https://api.dinerobillpay.com/api/v1/auth/bills/networks/airtime', {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${await AsyncStorage.getItem('accessToken')}`
          },
          redirect: 'follow'
        });

        const data = await response.json();

        if (response.ok) {
          setAirtime(data.responseBody);
        } else {
          console.log("Something went wrong ", data)
        }

      } catch (error) {
        console.error('Error ', error)
      }
    }

    getAirtimeNetworks()
  }, []);


  return (
    <KeyboardAwareScrollView style={styles.container} ref={scrollRef} keyboardShouldPersistTaps="handled">

      <Text style={styles.heading}>Select Network Provider</Text>

      <View style={{ width: scale(320), marginHorizontal: "auto", marginTop: verticalScale(24), flexDirection: "row", gap: scale(10) }}>
        {
          airtime.length > 1 &&
          airtime.map(({ id, name, logo, category }) => {

            return (
              <TouchableOpacity key={name} style={styles.network} onPress={() => { setInfo(prevState => ({ ...prevState, id: id, name: name, transaction: category })); }} onFocus={() => { }}>
                <Image source={{ uri: logo }} style={{ width: scale(60), height: scale(60) }} />
              </TouchableOpacity>
            )
          })
        }
      </View>

      <View style={{ marginTop: verticalScale(20) }}>
        <Text style={styles.label}>Network</Text>
        <TextInput
          placeholder='Network name will appear here'
          placeholderTextColor={"#6A6666"}
          style={styles.input}
          value={info.name}
          readOnly
        />
      </View>

      <View style={{ marginTop: verticalScale(20) }}>
        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          placeholder='Enter phone number'
          placeholderTextColor={"#6A6666"}
          style={styles.input}
          keyboardType={'number-pad'}
          maxLength={11}
          value={info.phoneNumber}
          onChangeText={text => setInfo(prevState => ({ ...prevState, phoneNumber: text }))}
        />
      </View>

      <View style={{ marginTop: verticalScale(20) }}>
        <Text style={styles.label}>Amount</Text>
        <TextInput
          placeholder='NGN | Enter amount'
          placeholderTextColor={"#6A6666"}
          style={styles.input}
          keyboardType={'number-pad'}
          value={info.amount}
          onChangeText={text => setInfo(prevState => ({ ...prevState, amount: text }))}
          onSubmitEditing={() => { disabled ? {} : {} }}
        />
      </View>

      <TouchableOpacity
        style={[styles.submit, disabled ? { backgroundColor: "grey" } : {}]}
        onPress={() => { setIsVisible(true) }}
        disabled={disabled}
      >
        <Text style={[styles.submitText, { fontWeight: 500 }]}>Submit</Text>
        <Feather name='arrow-right' size={24} color={"#fff"} />
      </TouchableOpacity>

      <Modal visible={isVisible} animationType={'slide'} transparent>
        <View style={{ flex: 1, justifyContent: "flex-end", alignItems: "center", backgroundColor: "#00000080" }}>
          <View style={[styles.modal, { alignItems: "center", flex: 2 / 3, borderBottomRightRadius: 0, borderBottomLeftRadius: 0, width: "100%" }]}>
            <Image source={require('../assets/images/lock.png')} />
            <Text style={[styles.modalHeading, { fontWeight: 500 }]}>
              Summary
            </Text>
            <Text style={styles.modalText}>
              Here is a summary of your transaction
            </Text>
            <View style={styles.transactionDetails}>
              <View style={{ flexDirection: "row" }}>
                <Text style={[styles.text, { width: scale(150) }]}>Provider:</Text>
                <Text style={styles.text}>{info.name}</Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text style={[styles.text, { width: scale(150) }]}>Phone Number:</Text>
                <Text style={styles.text}>{info.phoneNumber}</Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text style={[styles.text, { width: scale(150) }]}>Amount:</Text>
                <Text style={styles.text}>{info.amount}</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.modalButton} onPress={() => { setIsVisible(false); navigation.navigate('EnterPin', { info: info }) }}>
              <Text style={[styles.submitText, { fontWeight: 500 }]}>Proceed</Text>
              <Feather name='arrow-right' size={24} color={"#fff"} />
            </TouchableOpacity>

            <TouchableOpacity style={[styles.modalButton, { backgroundColor: "none" }]} onPress={() => { setIsVisible(false); }}>
              <Text style={[styles.submitText, { fontWeight: 500, color: "#0C6599" }]}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </KeyboardAwareScrollView>
  );
}

const DataScreen: React.FC<DataScreenProps> = ({ navigation }) => {
  const scrollRef = useRef<KeyboardAwareScrollView>(null);
  const scrollToInput = (reactNode: any) => {
    if (reactNode) {
      scrollRef.current?.scrollToFocusedInput(reactNode);
    }
  };

  const [info, setInfo] = useState({ phoneNumber: "", amount: "", name: "", transaction: "", id: "", decoderNo: "", meterNo: "", email: "" });
  const [disabled, setDisabled] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [data, setData] = useState([{ id: "", logo: "", name: "", network: "" }]);
  const [dataPlans, setDataPlans] = useState([{ amount: "", category: "", id: "", name: "", validity: "" }])

  useEffect(() => {
    function validForm() {
      const { phoneNumber, amount, id } = info;
      return (
        phoneNumber.length === 11 &&
        amount.length !== 0 &&
        id.length !== 0
      )
    };

    setDisabled(!validForm());
  });

  useEffect(() => {
    async function getDataNetworks() {
      try {
        const response = await fetch('https://api.dinerobillpay.com/api/v1/auth/bills/networks/data', {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${await AsyncStorage.getItem('accessToken')}`
          },
          redirect: 'follow'
        });

        const data = await response.json();

        if (response.ok) {
          // console.log(data.responseBody)
          setData(data.responseBody)
        } else {
          console.log("Something went wrong ", data)
        }

      } catch (error) {
        console.error('Error ', error)
      }
    }

    getDataNetworks()
  }, []);

  async function fetchDataPlans(id: string) {
    try {
      const response = await fetch(`https://api.dinerobillpay.com/api/v1/auth/bills/data/plans?network_id=${id}`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${await AsyncStorage.getItem('accessToken')}`
        },
        redirect: 'follow'
      });

      const data = await response.json();

      if (response.ok) {
        setDataPlans(data.responseBody);
        // console.log(data.responseBody)
      } else {
        console.log("Something went wrong ", data)
      }

    } catch (error) {
      console.error('Error ', error)
    }
  }

  return (
    <KeyboardAwareScrollView style={styles.container} ref={scrollRef} keyboardShouldPersistTaps="handled">

      <Text style={styles.heading}>Select Network Provider</Text>

      <View style={{ width: scale(320), marginHorizontal: "auto", marginTop: verticalScale(24), flexDirection: "row", gap: scale(10) }}>
        {
          data.length > 1 &&
          data.map(({ id, name, logo }) => {

            return (
              <TouchableOpacity key={name} style={styles.network} onPress={() => { setInfo(prevState => ({ ...prevState, id: id, name: name, transaction: 'DATA' })); fetchDataPlans(id) }}>
                <Image source={{ uri: logo }} style={{ width: scale(60), height: scale(60) }} />
              </TouchableOpacity>
            )
          })
        }
      </View>

      <View style={{ marginTop: verticalScale(20) }}>
        <Text style={styles.label}>Network</Text>
        <TextInput
          placeholder='Network name will appear here'
          placeholderTextColor={"#6A6666"}
          style={styles.input}
          value={info.name}
          readOnly
        />
      </View>

      <View style={{ marginTop: verticalScale(20) }}>
        <Text style={styles.label}>Select Data Plan</Text>
        <Dropdown
          data={dataPlans}
          maxHeight={300}
          labelField={'name'}
          valueField={'id'}
          placeholder='Select Data Plan'
          value={info.id}
          onChange={item => setInfo(prevState => ({ ...prevState, amount: item.amount, id: item.id, }))}
          style={styles.input}
          placeholderStyle={{ fontFamily: "DMSans" }}
          itemTextStyle={{ fontFamily: "DMSans" }}
          selectedTextStyle={{ fontFamily: "DMSans" }}
        />
      </View>

      <View style={{ marginTop: verticalScale(20) }}>
        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          placeholder='Enter Phone Number'
          placeholderTextColor={"#6A6666"}
          style={styles.input}
          keyboardType={'number-pad'}
          value={info.phoneNumber}
          onChangeText={text => setInfo(prevState => ({ ...prevState, phoneNumber: text }))}
          maxLength={11}
        />
      </View>

      <TouchableOpacity
        style={[styles.submit, disabled ? { backgroundColor: "grey" } : {}]}
        onPress={() => { setIsVisible(true); }}
        disabled={disabled}
      >
        <Text style={[styles.submitText, { fontWeight: 500 }]}>Submit</Text>
        <Feather name='arrow-right' size={24} color={"#fff"} />
      </TouchableOpacity>

      <Modal visible={isVisible} animationType={'slide'} transparent>
        <View style={{ flex: 1, justifyContent: "flex-end", alignItems: "center", backgroundColor: "#00000080" }}>
          <View style={[styles.modal, { alignItems: "center", flex: 2 / 3, borderBottomRightRadius: 0, borderBottomLeftRadius: 0, width: "100%" }]}>
            <Image source={require('../assets/images/lock.png')} />
            <Text style={[styles.modalHeading, { fontWeight: 500 }]}>
              Summary
            </Text>
            <Text style={styles.modalText}>
              Here is a summary of your transaction
            </Text>
            <View style={styles.transactionDetails}>
              <View style={{ flexDirection: "row" }}>
                <Text style={[styles.text, { width: scale(150) }]}>Provider:</Text>
                <Text style={styles.text}>{info.name}</Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text style={[styles.text, { width: scale(150) }]}>Phone Number:</Text>
                <Text style={styles.text}>{info.phoneNumber}</Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text style={[styles.text, { width: scale(150) }]}>Amount:</Text>
                <Text style={styles.text}>{info.amount}</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.modalButton} onPress={() => { setIsVisible(false); navigation.navigate('EnterPin', { info: info }) }}>
              <Text style={[styles.submitText, { fontWeight: 500 }]}>Proceed</Text>
              <Feather name='arrow-right' size={24} color={"#fff"} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.modalButton, { backgroundColor: "none" }]} onPress={() => { setIsVisible(false); }}>
              <Text style={[styles.submitText, { fontWeight: 500, color: "#0C6599" }]}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontFamily: "DMSansBold",
    fontSize: scale(14),
    color: "#333",
    marginTop: scale(2),
    marginLeft: scale(4)
  },
  network: {
    width: scale(68),
    backgroundColor: "#fff",
    alignItems: "center",
    paddingVertical: scale(8),
    borderRadius: scale(6)
  },
  label: {
    fontSize: scale(12),
    fontFamily: "DMSansBold",
    marginLeft: scale(8),
  },
  input: {
    borderStyle: "solid",
    borderWidth: scale(1),
    borderColor: "#D5D8DE",
    width: scale(300),
    marginHorizontal: "auto",
    height: verticalScale(45),
    borderRadius: scale(8),
    marginTop: scale(4),
    padding: scale(8),
    fontFamily: "DMSans"
  },
  submit: {
    flexDirection: "row",
    width: scale(300),
    marginHorizontal: "auto",
    height: verticalScale(45),
    borderRadius: scale(8),
    backgroundColor: "#0C6599",
    justifyContent: "center",
    alignItems: "center",
    gap: scale(8),
    paddingVertical: scale(4),
    paddingHorizontal: scale(24),
    marginTop: scale(20)
  },
  submitText: {
    fontFamily: "DMSans",
    fontSize: scale(14),
    color: "#fff"
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
    fontSize: scale(14),
    fontFamily: "DMSans",
    color: "#6A6666",
    textAlign: "center"
  },
  modalButton: {
    flexDirection: "row",
    width: scale(280),
    marginHorizontal: "auto",
    height: verticalScale(52),
    borderRadius: scale(8),
    backgroundColor: "#0C6599",
    justifyContent: "center",
    alignItems: "center",
    gap: scale(8),
    paddingVertical: moderateVerticalScale(4),
    paddingHorizontal: moderateScale(24)
  },
  transactionDetails: {
    width: scale(280),
    borderRadius: scale(5),
    borderWidth: scale(1),
    backgroundColor: "#DBE8FE",
    borderColor: "#1D38B4",
    padding: moderateScale(10),
    gap: moderateScale(10),
    marginVertical: verticalScale(28)
  },
  text: {
    fontFamily: "DMSans"
  },
  modalButtons: {
    flexDirection: "row",
    height: verticalScale(48),
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    marginTop: verticalScale(0)
  },
  buttonText: {
    fontFamily: "DMSans",
    fontSize: scale(14),
    color: "#0C6599"
  },
});

export { AirtimeScreen, DataScreen };