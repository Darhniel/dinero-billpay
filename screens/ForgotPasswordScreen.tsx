import { ActivityIndicator, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image, Modal, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { scale, verticalScale, moderateScale, moderateVerticalScale } from 'react-native-size-matters';

export default function ForgotPasswordScreen({ navigation }: any) {
    const [user, setUser] = useState({ email: "", otp: "" });
    const [isOTP, setIsOTP] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [responseMessage, setResponseMessage] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        function validForm() {
            const { email } = user;
            return (
                email.length !== 1 &&
                email.includes('@') &&
                email.includes('.')
            )
        };

        setDisabled(!validForm());
    });

    async function submit() {
        setLoading(true);
        try {
            const response = await fetch('https://api.dinerobillpay.com/api/v1/otp-resend', {
                method: "POST",
                body: JSON.stringify(user.email),
                redirect: "follow"
            });

            const data = await response.json();

            if (response.ok) {
                AsyncStorage.setItem("emailAddress", user.email)
                setIsOTP(true)
                setLoading(false)
            } else {
                setResponseMessage(data.responseMessage);
                setIsVisible(true)
                setLoading(false)
            }
        } catch (error) {
            if (error == "TypeError: Network request failed") {
                setResponseMessage("There is something wrong with your internet connection. Please check and try again!");
                setLoading(false);
                setIsVisible(true);
            }
            setLoading(false)
        }
    }



    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style={'dark'} translucent={true} hidden={false} />

            <Text style={[styles.mainHeading, { fontWeight: 500 }]}>Forgot Password</Text>
            <Text style={[styles.text, { fontWeight: 500 }]}>Input your email address</Text>
            <View style={{ marginVertical: verticalScale(48) }}>
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

                <TouchableOpacity
                    style={[styles.submit, disabled ? { backgroundColor: "grey" } : {}]}
                    onPress={() => { submit() }}
                    disabled={disabled}
                >
                    <Text style={[styles.submitText, { fontWeight: 500 }]}>Proceed</Text>
                    <Feather name='arrow-right' size={24} color={"#fff"} />
                </TouchableOpacity>
            </View>

            <Modal visible={loading} animationType={'slide'} transparent>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#00000080" }}>
                    <ActivityIndicator size={48} color={"#1734B9"} />
                </View>
            </Modal>

            <Modal visible={isVisible} animationType={'slide'} transparent>
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

            <Modal visible={isOTP} animationType={'slide'} transparent>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#00000080" }}>
                    <View style={[styles.modal, { alignItems: "center", flex: 1 / 3 }]}>
                        <Text style={[styles.modalHeading, { fontWeight: 500 }]}>
                            OTP Verification
                        </Text>
                        <Text style={styles.modalText}>
                            We have sent a verification code to your email
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
                </View>
            </Modal>
        </SafeAreaView>
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
        marginTop: verticalScale(48)
    },
    text: {
        fontSize: scale(16),
        marginLeft: scale(24),
        fontFamily: "DMSans",
        marginTop: verticalScale(12),
        marginBottom: verticalScale(24)
    },
    label: {
        fontSize: scale(14),
        marginBottom: verticalScale(2),
        fontFamily: "DMSans",
        marginLeft: scale(24),
    },
    input: {
        borderStyle: "solid",
        borderWidth: scale(1),
        borderColor: "#D5D8DE",
        width: scale(320),
        marginHorizontal: "auto",
        height: verticalScale(45),
        borderRadius: scale(8),
        marginTop: verticalScale(8),
        padding: moderateScale(8),
        fontFamily: "DMSans"
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
        paddingVertical: moderateScale(4),
        paddingHorizontal: moderateScale(24),
        marginTop: verticalScale(48)
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
})