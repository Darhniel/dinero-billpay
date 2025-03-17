import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ActivityIndicator, Alert, Image, Modal, Platform } from 'react-native';
import { Feather, FontAwesome6 } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { scale, verticalScale, moderateScale, moderateVerticalScale } from 'react-native-size-matters';

type EnterPinScreenProps = NativeStackScreenProps<RootStackParamList, 'EnterPin'>;

const NumberPad: React.FC<EnterPinScreenProps> = ({ navigation, route }) => {
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ isError: false, isSuccess: false, responseMessage: "" });
  const { isError, isSuccess, responseMessage } = status;

  const { info } = route.params;
  // console.log(info)

  // Function to handle number press
  const handleNumberPress = (num: string) => {
    if (inputValue.length <= 3) {
      setInputValue((prev) => prev + num);  // Append the number to the input
    }
  };

  function handlePinSubmit() {
    if (inputValue.length === 4) {
      callTransactionAPI();
      setInputValue('');
    } else {
      Alert.alert('Invalid PIN', 'Please enter a 4-digit PIN');
    }
  };

  async function callTransactionAPI() {
    setLoading(true)
    let endPoint = '';
    let updatedInfo;
    const { transaction, id, amount, phoneNumber, decoderNo, meterNo, email } = info;
    const result = meterNo.replace(/\s+/g, '');

    switch (transaction) {
      case 'AIRTIME':
        endPoint = 'https://staging.dinerobillpay.com/api/v1/auth/bills/airtime/purchase';
        updatedInfo = { id, amount, phoneNumber, pin: inputValue }
        break;
      case 'DATA':
        endPoint = 'https://staging.dinerobillpay.com/api/v1/auth/bills/data/purchase';
        updatedInfo = { id, phoneNumber, pin: inputValue }
        break;
      case 'ENTERTAINMENT':
        endPoint = 'https://staging.dinerobillpay.com/api/v1/auth/bills/entertainment';
        updatedInfo = { amount, decoderNo, id, pin: inputValue }
        break;
      case 'UTILITY':
        endPoint = 'https://staging.dinerobillpay.com/api/v1/auth/bills/utility';
        updatedInfo = { amount, phoneNumber, email, result, id, pin: inputValue }
        break;
      case 'INTERNET':
        endPoint = 'https://staging.dinerobillpay.com/api/v1/auth/bills/internet';
        updatedInfo = { phoneNumber, id, pin: inputValue }
        break;
      default:
        endPoint = 'https://example.com/api/default';
        break;
    }

    try {
      const response = await fetch(endPoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${await AsyncStorage.getItem('accessToken')}`
        },
        body: JSON.stringify(updatedInfo),
        redirect: 'follow'
      });

      const data = await response.json();

      if (response.ok) {
        // console.log("Purchase Successful: ", data)
        setStatus(prevState => ({ ...prevState, isSuccess: true, responseMessage: data.responseMessage }))
        setLoading(false)

      } else {
        // console.log("Purchase Unsuccessful: ", data)
        setStatus(prevState => ({ ...prevState, isError: true, responseMessage: data.responseMessage }));
        setLoading(false)
      }
    } catch (error) {
      // console.error('Error:', error);
      if (error == "TypeError: Network request failed") {
        setStatus(prevState => ({ ...prevState, isError: true, responseMessage: "There is something wrong with your internet connection. Please check and try again!" }));
        setLoading(false);
      }
      setLoading(false);
    }

  }

  // Function to handle delete (optional)
  const handleDelete = () => {
    setInputValue((prev) => prev.slice(0, -1));  // Remove the last character
  };

  // Render the number buttons
  const renderButton = (num: string) => (
    <TouchableOpacity style={styles.button} onPress={() => handleNumberPress(num)}>
      <Text style={styles.buttonText}>{num}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>

      <Text style={styles.heading}>Kindly enter your 4-digit PIN to validate this transaction</Text>

      <View style={styles.container}>

        {/* TextInput to display the number */}
        <TextInput
          style={styles.input}
          value={inputValue}
          editable={false}  // Make the input read-only, controlled by the number pad
          placeholder="*  *  *   *"
          secureTextEntry
          maxLength={4}
          placeholderTextColor={"#D1D0D1"}
        />

        {/* Number pad layout */}
        <View style={styles.numberPad}>
          <View style={styles.row}>
            {renderButton('1')}
            {renderButton('2')}
            {renderButton('3')}
          </View>
          <View style={styles.row}>
            {renderButton('4')}
            {renderButton('5')}
            {renderButton('6')}
          </View>
          <View style={styles.row}>
            {renderButton('7')}
            {renderButton('8')}
            {renderButton('9')}
          </View>
          <View style={styles.row}>
            <TouchableOpacity style={[styles.button]} onPress={handlePinSubmit}>
              <Feather name={'check'} size={20} color={'#464445'} />
            </TouchableOpacity>
            {renderButton('0')}
            <TouchableOpacity style={styles.button} onPress={handleDelete}>
              <FontAwesome6 name={'delete-left'} size={18} color='#464445' />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity>
          <Text style={{ fontFamily: "DMSansBold", color: "#F40000" }}>Forgot PIN?</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={loading} animationType={'slide'} transparent>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#00000080" }}>
          <ActivityIndicator size={48} color={"#1734B9"} />
        </View>
      </Modal>

      <Modal visible={isSuccess} animationType={'slide'} transparent>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#00000080" }}>
          <View style={[styles.modal, { alignItems: "center", flex: 2 / 5, width: "95%" }]}>
            <Image source={require('../assets/images/shield.png')} style={{ width: moderateScale(70), height: moderateVerticalScale(70) }} />
            <Text style={[styles.modalHeading, { fontWeight: 500 }]}>
              Successful
            </Text>
            <Text style={styles.modalText}>
              {responseMessage}
            </Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                navigation.reset({
                  index: 0,
                  routes: [{ name: "Main", params: { screen: "Home" } }]
                });
              }}
            >
              <Text style={[styles.submitText, { fontWeight: 500 }]}>
                Go Home
              </Text>
              <Feather name='arrow-right' size={24} color={"#fff"} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal visible={isError} animationType='slide' transparent>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#00000080" }}>
          <View style={[styles.modal, { alignItems: "center", flex: 2 / 5 }]}>
            <Image source={require('../assets/images/error-icon.png')} style={[{ width: moderateScale(82), height: verticalScale(76) }, Platform.OS === 'ios' ? { width: scale(84) } : {}]} />
            <Text style={[styles.modalHeading, { fontWeight: 500 }]}>
              Error!
            </Text>
            <Text style={styles.modalText}>
              {responseMessage}
            </Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => { setStatus({ isError: false, isSuccess: false, responseMessage: "" }); }}
            >
              <Text style={[styles.submitText, { fontWeight: 500 }]}>
                Try Again
              </Text>
              <Feather name='arrow-right' size={24} color={"#fff"} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#ffffff",
    marginTop: verticalScale(16)
  },
  heading: {
    fontFamily: "DMSansBold",
    fontSize: scale(12),
    color: "#333",
    marginTop: verticalScale(24),
    marginLeft: scale(24),
    flexWrap: "wrap",
    width: scale(320)
  },
  input: {
    height: verticalScale(44),
    width: scale(200),
    backgroundColor: '#F6F5F6',
    borderWidth: 0,
    marginBottom: verticalScale(80),
    textAlign: 'center',
    fontSize: scale(16),
    borderRadius: scale(12)
  },
  numberPad: {
    width: scale(200),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: verticalScale(28),
  },
  button: {
    width: scale(40),
    height: scale(40),
    backgroundColor: '#F6F5F6',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(100),
  },
  buttonText: {
    fontSize: scale(20),
    fontFamily: "DMSansBold",
    color: "#464445"
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
});


export default NumberPad;