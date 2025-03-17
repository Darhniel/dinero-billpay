import { TouchableOpacity, SafeAreaView, StyleSheet, Text, View, Image, Alert, Modal, Platform } from 'react-native'
import React, { useState } from 'react'
import SegmentedInput from '../components/CodeInput';
import { Feather } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { scale, verticalScale, moderateScale, moderateVerticalScale } from 'react-native-size-matters';

type OTPScreenProps = NativeStackScreenProps<RootStackParamList, 'OTP'>;

const OTPScreen: React.FC<OTPScreenProps> = ({ navigation, route }) => {
    const { email } = route.params;
    const [isEmailVerified, setIsEmailVerified] = useState(false);
    const [responseMessage, setResponseMessage] = useState('');
    const [isErrorVisible, setIsErrorVisible] = useState(false);

    const [code, setCode] = useState('');

    async function handlePress() {
        try {
            const confirmedUser = { email: email, otp: code }

            const response = await fetch('https://api.dinerobillpay.com/api/v1/email-verify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(confirmedUser),
                redirect: "follow"
            });

            const data = await response.json();

            if (response.ok) {
                setIsEmailVerified(true);
            } else {
                setResponseMessage(data.responseMessage)
                setIsErrorVisible(true);
            }
        } catch (error) {
            // console.error('Error:', error);
            if (error == "TypeError: Network request failed") {
                setResponseMessage("There is something wrong with your internet connection. Please check and try again!");
                setIsErrorVisible(true);
            }

            setIsErrorVisible(true);
        }
    }

    async function resendOtp() {
        try {
            const confirmedUser = { email: email }
            const response = await fetch('https://api.dinerobillpay.com/api/v1/otp-resend', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(confirmedUser),
                redirect: "follow"
            });

            const data = await response.json();

            if (response.ok) {
                Alert.alert('OTP Resend', 'Check your mail for a new OTP code!');
            } else {
                Alert.alert('OTP Resend', 'Check your mail for a new OTP code!');
            }
        } catch (error) {
            // console.error('Error:', error);
            if (error == "TypeError: Network request failed") {
                setResponseMessage("There is something wrong with your internet connection. Please check and try again!");
                setIsErrorVisible(true);
            }
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style={'dark'} translucent={true} hidden={false} />

            <Text style={[styles.mainHeading, { fontWeight: 500 }]}>Sign Up</Text>
            <Text style={[styles.text, { fontWeight: 500 }]}>
                Verify your email address
            </Text>

            <View style={{ marginLeft: scale(24) }}>
                <View style={styles.verifyBox}>
                    <Feather name='clock' color={"#0C6599"} style={{ marginBottom: verticalScale(8) }} />
                    <Text style={{ color: "#0C6599", fontFamily: "DMSans" }}>A verification code has been sent to your email address - </Text>
                    <Text style={{ color: "#0C6599", fontFamily: "DMSans" }}>{email}</Text>
                </View>
                <View style={styles.codeBox}>
                    <Text style={[styles.codeHeading, { fontWeight: 500 }]}>Verification Code</Text>
                    <SegmentedInput length={6} onChange={setCode} />
                </View>
            </View>

            <Text style={[styles.signUp, { fontWeight: 400 }]}>
                Didn't receive any verification code? Resend
            </Text>
            <TouchableOpacity onPress={() => resendOtp()}>
                <Text style={[styles.link, { fontWeight: 600 }]}>here</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.submit, code.length < 6 ? { backgroundColor: "grey" } : {}]} onPress={() => { handlePress() }} disabled={code.length < 6}>
                <Text style={[styles.submitText, { fontWeight: 500 }]}>Submit</Text>
                <Feather name='arrow-right' size={24} color={"#fff"} />
            </TouchableOpacity>

            <Modal visible={isEmailVerified} animationType={'slide'} transparent>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#00000080" }}>
                    <View style={[styles.modal, { alignItems: "center", flex: 1 / 3, width: "95%" }]}>
                        <Image source={require('../assets/images/shield.png')} />
                        <Text style={[styles.modalHeading, { fontWeight: 500 }]}>Successful</Text>
                        <Text style={styles.modalText}>
                            You have successfully verified your email address. Please proceed to create your password.
                        </Text>
                        <TouchableOpacity
                            style={styles.modalButton}
                            onPress={() => {
                                navigation.navigate("CreatePassword", { email: email });
                                setIsEmailVerified(false);
                            }}
                        >
                            <Text style={[styles.submitText, { fontWeight: 500 }]}>
                                Proceed
                            </Text>
                            <Feather name='arrow-right' size={24} color={"#fff"} />
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <Modal visible={isErrorVisible} animationType={'slide'} transparent>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#00000080" }}>
                    <View style={[styles.modal, { alignItems: "center", flex: 1 / 3, width: "95%" }]}>
                        <Image source={require('../assets/images/error-icon.png')} style={[{ width: moderateScale(80), height: moderateVerticalScale(80)}, Platform.OS === 'ios' ? { width: scale(80) } : {}]} />
                        <Text style={[styles.modalHeading, { fontWeight: 500 }]}>
                            Error!
                        </Text>
                        <Text style={styles.modalText}>
                            {responseMessage}
                        </Text>
                        <TouchableOpacity
                            style={styles.modalButton}
                            onPress={() => { setIsErrorVisible(false); }}
                        >
                            <Text style={[styles.submitText, { fontWeight: 500 }]}>
                                Try Again
                            </Text>
                            <Feather name='arrow-right' size={24} color={"#fff"} />
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView >
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
        marginTop: verticalScale(40)
    },
    text: {
        fontSize: scale(16),
        marginLeft: scale(24),
        fontFamily: "DMSans",
        marginTop: verticalScale(16),
        marginBottom: verticalScale(16)
    },
    verifyBox: {
        backgroundColor: "#B6DEF6",
        paddingVertical: moderateVerticalScale(8),
        paddingHorizontal: moderateScale(8),
        width: scale(300),
        marginTop: verticalScale(8)
    },
    codeBox: {
        paddingVertical: moderateVerticalScale(8),
        paddingHorizontal: moderateScale(8),
        width: scale(300)
    },
    codeHeading: {
        fontSize: scale(14),
        fontFamily: "DMSans",
        color: "#333333",
        marginTop: verticalScale(24)
    },
    signUp: {
        fontFamily: "DMSans",
        fontSize: scale(14),
        textAlign: "center",
        marginTop: verticalScale(20),
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
        paddingVertical: moderateScale(4),
        paddingHorizontal: moderateScale(24),
        marginTop: verticalScale(32)
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
        fontSize: scale(12),
        fontFamily: "DMSans",
        color: "#6A6666",
        textAlign: "center"
    },
    modalButton: {
        flexDirection: "row",
        width: "auto",
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

export default OTPScreen;