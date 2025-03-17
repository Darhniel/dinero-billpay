import { StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator, Image, Modal, Platform } from 'react-native'
import React, { useEffect, useRef, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Feather } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { scale, verticalScale, moderateScale, moderateVerticalScale } from 'react-native-size-matters';

type RegisterScreenProps = NativeStackScreenProps<RootStackParamList, 'Register'>;

const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {
    const scrollRef = useRef<KeyboardAwareScrollView>(null);
    const scrollToInput = (reactNode: any) => {
        if (reactNode) {
            scrollRef.current?.scrollToFocusedInput(reactNode);
        }
    };

    const [user, setUser] = useState({ email: "", firstName: "", lastName: "" });
    const [visible, setVisible] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [isVisible, setIsVisible] = useState(false);
    const [responseMessage, setResponseMessage] = useState('');
    const [loading, setLoading] = useState(false);


    function toggleModal() {
        setVisible(!visible)
    }

    useEffect(() => {
        function validForm() {
            const { email, firstName, lastName } = user;
            return (
                email.length !== 1 &&
                firstName.length !== 1 &&
                lastName.length !== 1 &&
                email.includes('@') &&
                email.includes('.') &&
                firstName.match(/^[A-Za-z]+$/) &&
                lastName.match(/^[A-Za-z]+$/)
            )
        };

        setDisabled(!validForm())
    });

    async function submit() {
        setLoading(true)
        try {
            const response = await fetch('https://api.dinerobillpay.com/api/v1/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });

            const data = await response.json();

            if (response.ok) {
                setVisible(true);
                setLoading(false);
            } else {
                setResponseMessage(data.responseMessage);
                setIsVisible(true);
                setLoading(false);
            }
        } catch (error) {
            // console.error('Error:', error);
            if (error == "TypeError: Network request failed") {
                setResponseMessage("There is something wrong with your internet connection. Please check and try again!");
                setIsVisible(true);
                setLoading(false);
            }

            setIsVisible(true);
            setLoading(false);
        }
    }

    return (
        <KeyboardAwareScrollView style={styles.container} ref={scrollRef} keyboardShouldPersistTaps="handled">
            <StatusBar style={'dark'} translucent={true} hidden={false} />

            <Text style={[styles.mainHeading, { fontWeight: 500 }]}>Sign Up</Text>
            <Text style={[styles.text, { fontWeight: 500 }]}>
                Sign up to join Dinero Pay
            </Text>

            <View style={{ marginVertical: verticalScale(16) }}>
                <View>
                    <Text style={styles.label}>Email Address</Text>
                    <TextInput
                        placeholder='Enter email address'
                        placeholderTextColor={"#6A6666"}
                        style={styles.input}
                        autoCapitalize='none'
                        autoCorrect={false}
                        spellCheck={false}
                        onFocus={(event) => {
                            scrollToInput(event.target);
                        }}
                        value={user.email}
                        onChangeText={text => setUser(prevState => ({ ...prevState, email: text.trim() }))}
                    />
                    <Text style={[{ fontWeight: 400 }, styles.info]}>A verification code will be sent to this email address</Text>
                </View>

                <View style={{ marginTop: verticalScale(24) }}>
                    <Text style={styles.label}>First Name</Text>
                    <TextInput
                        placeholder='Input your first name'
                        placeholderTextColor={"#6A6666"}
                        style={styles.input}
                        autoCorrect={false}
                        spellCheck={false}
                        onFocus={(event) => {
                            scrollToInput(event.target);
                        }}
                        value={user.firstName}
                        onChangeText={text => setUser(prevState => ({ ...prevState, firstName: text }))}
                    />
                </View>
                <View style={{ marginTop: verticalScale(24) }}>
                    <Text style={styles.label}>Last Name</Text>
                    <TextInput
                        placeholder='Input your last name'
                        placeholderTextColor={"#6A6666"}
                        style={styles.input}
                        autoCorrect={false}
                        spellCheck={false}
                        onFocus={(event) => {
                            scrollToInput(event.target);
                        }}
                        value={user.lastName}
                        onChangeText={text => setUser(prevState => ({ ...prevState, lastName: text }))}
                    />
                </View>
            </View>

            <TouchableOpacity style={[styles.submit, disabled ? { backgroundColor: "grey" } : {}]} onPress={() => { submit() }} disabled={disabled}>
                <Text style={[styles.submitText, { fontWeight: 500 }]}>Sign Up</Text>
                <Feather name='arrow-right' size={24} color={"#fff"} />
            </TouchableOpacity>

            <Text style={[styles.signUp, { fontWeight: 400 }]}>
                Already have an account with us? Sign in
            </Text>
            <Text onPress={() => navigation.goBack()} style={[styles.link, { fontWeight: 600 }]}>
                here
            </Text>

            <Modal visible={loading} animationType={'slide'} transparent>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#00000080" }}>
                    <ActivityIndicator size={48} color={"#1734B9"} />
                </View>
            </Modal>

            <Modal visible={visible} animationType={'slide'} transparent>
                <View style={{ flex: 1, justifyContent: "flex-end", alignItems: "center", backgroundColor: "#00000080" }}>
                    <View style={[styles.modal, {width: "100%"}]}>
                        <Text style={[styles.modalHeading, { fontWeight: 500 }]}>Email Verification</Text>
                        <Text style={styles.modalText}>
                            We have sent a verification code to your email address.
                        </Text>
                        <TouchableOpacity style={styles.modalButton} onPress={() => { toggleModal(); navigation.navigate('OTP', { email: user.email }) }}>
                            <Text style={[styles.submitText, { fontWeight: 500 }]}>Continue</Text>
                            <Feather name='arrow-right' size={24} color={"#fff"} />
                        </TouchableOpacity>
                    </View>
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
        marginTop: verticalScale(40)
    },
    text: {
        fontSize: scale(16),
        marginLeft: scale(24),
        fontFamily: "DMSans",
        marginTop: verticalScale(16),
        marginBottom: verticalScale(28)
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
        width: scale(320),
        marginHorizontal: "auto",
        height: verticalScale(45),
        borderRadius: scale(8),
        marginTop: verticalScale(4),
        padding: scale(8),
        fontFamily: "DMSans"
    },
    info: {
        fontFamily: "DMSans",
        fontSize: scale(12),
        color: "#6A6666",
        marginLeft: scale(24),
        marginTop: verticalScale(4)
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
        marginTop: verticalScale(16)
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
        marginTop: verticalScale(24),
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
        borderTopRightRadius: scale(20),
        borderTopLeftRadius: scale(20)
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

export default RegisterScreen;