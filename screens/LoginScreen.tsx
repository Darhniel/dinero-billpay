import { StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator, Image, Platform, Modal } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { scale, verticalScale, moderateScale, moderateVerticalScale } from 'react-native-size-matters';


type LoginScreenProps = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [user, setUser] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [isOTP, setIsOTP] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');

  useEffect(() => {
    function validForm() {
      const { email, password } = user;
      return (
        email.length !== 1 &&
        password.length >= 8 &&
        email.includes('@') &&
        email.includes('.')
      )
    };

    setDisabled(!validForm());
  });

  async function submit() {
    setLoading(true);
    try {
      const response = await fetch('https://api.dinerobillpay.com/api/v1/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
        redirect: 'follow'
      });

      const data = await response.json();

      if (response.ok) {
        // setIsVisible(false)
        setLoading(false)

        AsyncStorage.setItem("emailAddress", data.responseBody.user.email)
        AsyncStorage.setItem("accessToken", data.responseBody.accessToken)

        navigation.replace(
          "Main",
          {
            screen: "Home",
          }
        )

      } else {
        console.log(data)
        setResponseMessage(data.responseMessage);
        setLoading(false);
        setUser(prevState => ({ ...prevState, password: "" }))
        setIsVisible(true);
      }
    } catch (error) {
      if (error == "TypeError: Network request failed") {
        setResponseMessage("There is something wrong with your internet connection. Please check and try again!");
        setLoading(false);
        setIsVisible(true);
      }
      setLoading(false);
    }
  }

  async function forgotPassword() {
    setLoading(true);
    try {
      const response = await fetch('https://dinero-backend-production.up.railway.app/api/v1/auth/reset/password', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        redirect: 'follow'
      });

      const data = await response.json();

      if (response.ok) {
        setResponseMessage(data.responseMessage);
        setIsOTP(true)
      } else {
        setResponseMessage(data.responseMessage)
        setIsVisible(true);
      }
    } catch (error) {

    }
  }

  useEffect(() => {
    async function checkLoginStatus() {
      try {
        const emailAddress = await AsyncStorage.getItem("emailAddress");

        if (emailAddress) {
          setUser({ email: emailAddress, password: "" })
        } else {
          return false
        }
      } catch (error) {

      }
    }

    checkLoginStatus();

  }, [])

  return (
    <KeyboardAwareScrollView style={styles.container}>
      <StatusBar style={'dark'} translucent={true} hidden={false} />

      <Text style={[styles.mainHeading, { fontWeight: 500 }]}>Sign In</Text>
      <Text style={[styles.text, { fontWeight: 500 }]}>Sign In to join Dinero Pay</Text>
      <View style={{ marginVertical: verticalScale(32) }}>
        <View>
          <Text style={styles.label}>Email Address</Text>
          <TextInput
            placeholder='Enter email address'
            placeholderTextColor={"#6A6666"}
            style={styles.input}
            autoCapitalize='none'
            autoCorrect={false}
            spellCheck={false}
            value={user.email}
            onChangeText={text => setUser(prevState => ({ ...prevState, email: text }))}
          />
        </View>

        <View style={{ marginTop: verticalScale(32) }}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            placeholder='Enter Password'
            placeholderTextColor={"#6A6666"}
            style={styles.input}
            autoCapitalize='none'
            autoCorrect={false}
            spellCheck={false}
            secureTextEntry={true}
            value={user.password}
            onChangeText={text => setUser(prevState => ({ ...prevState, password: text }))}
            onSubmitEditing={() => { disabled ? {} : submit() }}
          />
        </View>
      </View>

      <TouchableOpacity onPress={() => { navigation.navigate('ForgotPassword') }}>
        <Text style={[styles.forgotPassword, { fontWeight: 400 }]}>Forgot Password</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.submit, disabled ? { backgroundColor: "grey" } : {}]}
        onPress={() => { submit() }}
        disabled={disabled}
      >
        <Text style={[styles.submitText, { fontWeight: 500 }]}>Sign In</Text>
        <Feather name='arrow-right' size={24} color={"#fff"} />
      </TouchableOpacity>


      <Text style={[styles.signUp, { fontWeight: 400 }]}>
        You don’t have an account with us. Sign up
      </Text>
      <Text onPress={() => navigation.navigate('Register')} style={[styles.link, { fontWeight: 600 }]}>
        here
      </Text>

      {/* <TouchableOpacity
        style={styles.submit}
        onPress={() => navigation.navigate('WebView', { url: 'https://checkout.paystack.com/lg8xmc05w9zth4h' })}
      >
        <Text>User Email</Text>
      </TouchableOpacity> */}

      <Modal visible={loading} animationType={'slide'} transparent>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#00000080" }}>
          <ActivityIndicator size={48} color={"#1734B9"} />
        </View>
      </Modal>


      <Modal visible={isVisible} animationType='slide' transparent>
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

      {/* <Modal isVisible={isOTP} animationIn={'bounceInUp'} animationInTiming={1000} style={{ justifyContent: "center" }}>
        <View style={[styles.modal, { alignItems: "center", flex: 1 / 3 }]}>
          <Text style={[styles.modalHeading, { fontWeight: 500 }]}>
            OTP Verification
          </Text>
          <Text style={styles.modalText}>
            {responseMessage}
          </Text>
          <TouchableOpacity
            style={styles.modalButton}
            onPress={() => {
              setIsOTP(false);
              navigation.navigate("UpdateOTP", { user: { pin: false, password: true } });
            }}
          >
            <Text style={[styles.submitText, { fontWeight: 500 }]}>
              Proceed
            </Text>
            <Feather name='arrow-right' size={24} color={"#fff"} />
          </TouchableOpacity>
        </View>
      </Modal> */}

      {/* <Modal
        animationType="slide"
        transparent={true}
        visible={isVisible}
      >
        <View style={{flex: 1, justifyContent: "center", backgroundColor: "#00000080"}}>
          {
            loading ?
              <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size={48} color={"#1734B9"} />
              </View>
              :
              <View style={[styles.modal, { alignItems: "center", flex: 2/5, backgroundColor: "#fff", marginHorizontal: scale(12) }]}>
                <Image source={require('../assets/images/error-icon.png')} style={[{ width: moderateScale(82), height: verticalScale(76) }, Platform.OS === 'ios' ? { width: scale(84) } : {}]} />
                <Text style={[styles.modalHeading, { fontWeight: 500 }]}>
                  Error!
                </Text>
                <Text style={styles.modalText}>
                  {responseMessage}
                </Text>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={() => { setTimeout(() => setIsVisible(false), 0) }}
                >
                  <Text style={[styles.submitText, { fontWeight: 500 }]}>
                    Try Again
                  </Text>
                  <Feather name='arrow-right' size={24} color={"#fff"} />
                </TouchableOpacity>
              </View>
          }
        </View>
      </Modal> */}

    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: verticalScale(48),
    backgroundColor: "#fff"
  },
  mainHeading: {
    fontFamily: "DMSansBold",
    fontSize: scale(32),
    marginLeft: scale(24),
    marginTop: verticalScale(44)
  },
  text: {
    fontSize: scale(16),
    marginLeft: scale(24),
    fontFamily: "DMSans",
    marginTop: verticalScale(16),
    marginBottom: verticalScale(30)
  },
  label: {
    fontSize: scale(14),
    fontFamily: "DMSans",
    marginLeft: scale(24),
  },
  input: {
    borderStyle: "solid",
    borderWidth: scale(1),
    borderColor: "#D5D8DE",
    marginHorizontal: "auto",
    borderRadius: scale(8),
    marginTop: verticalScale(8),
    padding: moderateScale(8),
    fontFamily: "DMSans",
    width: scale(320),
    height: verticalScale(45),
  },
  forgotPassword: {
    fontFamily: "DMSans",
    fontSize: scale(14),
    color: "#6A6666",
    textDecorationLine: "underline",
    marginLeft: scale(24),
    marginBottom: verticalScale(0),
  },
  submit: {
    flexDirection: "row",
    width: scale(320),
    marginHorizontal: "auto",
    height: verticalScale(44),
    borderRadius: scale(8),
    backgroundColor: "#0C6599",
    justifyContent: "center",
    alignItems: "center",
    gap: scale(12),
    paddingVertical: moderateScale(4),
    paddingHorizontal: moderateScale(24),
    marginTop: verticalScale(48)
  },
  submitText: {
    fontFamily: "DMSans",
    fontSize: scale(16),
    color: "#fff"
  },
  signUp: {
    fontFamily: "DMSans",
    fontSize: scale(14),
    textAlign: "center",
    marginTop: verticalScale(40),
    justifyContent: "center",
    color: "#6A6666"
  },
  link: {
    color: "#333",
    textDecorationLine: "underline",
    fontFamily: "DMSansBold",
    textAlign: "center",
    justifyContent: "center",
    fontSize: scale(14)
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
    height: verticalScale(44),
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

export default LoginScreen;