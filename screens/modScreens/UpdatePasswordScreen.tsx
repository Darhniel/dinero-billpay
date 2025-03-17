import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import PasswordValidate from 'react-native-password-validate-checklist';
import { StatusBar } from 'expo-status-bar';
import { Feather } from '@expo/vector-icons';
import Modal from 'react-native-modal';
import { scale, verticalScale, moderateScale, moderateVerticalScale } from 'react-native-size-matters';


export default function UpdatePasswordScreen({ navigation, route }: any) {
    const [passwordOne, setPasswordOne] = useState('');
    const [passwordTwo, setPasswordTwo] = useState('');
    const [validated, setValidated] = useState(false);
    const [isVisible, setIsVisible] = useState({ isError: false, isSuccess: false, loading: false, responseMessage: "" });
    const { otp } = route.params;

    // console.log(otp)

    const { isError, isSuccess, loading, responseMessage } = isVisible;


    async function handlePress() {
        setIsVisible(prevState => ({ ...prevState, loading: true }));


        try {
            const confirmedUser = {
                otp: otp,
                password: passwordOne,
                password_confirm: passwordTwo
            };
            const response = await fetch('https://dinero-backend-production.up.railway.app/api/v1/auth/reset/password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(confirmedUser),
                redirect: "follow"
            });

            const data = await response.json();

            if (response.ok) {
                // console.log('Password Creation successful:', data);
                setIsVisible(prevState => ({ ...prevState, loading: false, isSuccess: true, responseMessage: data.responseMessage }));
            } else {
                // console.log('Password Creation failed:', data);
                setIsVisible(prevState => ({ ...prevState, isError: true, loading: false, responseMessage: data.responseMessage }));
            }
        } catch (error) {
            // console.error('Error:', error);
            if (error == "TypeError: Network request failed") {
                setIsVisible(prevState => ({ ...prevState, isError: true, loading: false, responseMessage: "There is something wrong with your internet connection. Please check and try again!" }));
            }
        }
    }

    return (
        <KeyboardAwareScrollView style={styles.container}>
            <StatusBar style={'light'} translucent={true} hidden={false} />

            <Text style={[styles.text, { fontWeight: 500 }]}>
                Create your secure password
            </Text>

            <View style={{ marginTop: verticalScale(16) }}>
                <Text style={styles.label}>Password</Text>
                <TextInput
                    value={passwordOne}
                    onChangeText={text => setPasswordOne(text)}
                    placeholder='Enter Password'
                    placeholderTextColor={"#6A6666"}
                    style={styles.input}
                    autoCapitalize='none'
                    autoCorrect={false}
                    spellCheck={false}
                    secureTextEntry={true}
                    maxLength={20}
                />
            </View>

            <Text style={styles.passwordHeader}>Your password must contain:</Text>
            <PasswordValidate
                newPassword={passwordOne}
                confirmPassword={passwordTwo}
                validationRules={[
                    {
                        key: 'MIN_LENGTH',
                        ruleValue: 8,
                        label: "at least 8 characters"
                    },
                    {
                        key: 'MAX_LENGTH',
                        ruleValue: 20,
                        label: 'a maximum of 20 characters'
                    },
                    {
                        key: "LOWERCASE_LETTER",
                        label: "1 or more lowercase letters",
                    },
                    {
                        key: "UPPERCASE_LETTER",
                        label: "1 or more uppercase letters",
                    },
                    {
                        key: "NUMERIC",
                        label: "1 or more numbers",
                    },
                    {
                        key: "SPECIAL_CHARS",
                        label: "1 or more special letters",
                    },
                    { key: 'PASSWORDS_MATCH' }
                ]}
                onPasswordValidateChange={validatedBoolean => { setValidated(validatedBoolean) }}
                iconSuccessSource={require('../../assets/images/checked.png')}
                iconErrorSource={require('../../assets/images/unchecked.png')}
                labelStyle={styles.labels}
                iconStyle={{ width: scale(12), height: verticalScale(12) }}
                containerStyle={{ marginLeft: scale(24) }}
            />

            <View style={{ marginTop: verticalScale(8) }}>
                <Text style={styles.label}>Confirm Password</Text>
                <TextInput
                    value={passwordTwo}
                    onChangeText={text => setPasswordTwo(text)}
                    placeholder='Enter Password'
                    placeholderTextColor={"#6A6666"}
                    style={styles.input}
                    autoCapitalize='none'
                    autoCorrect={false}
                    spellCheck={false}
                    secureTextEntry={true}
                    maxLength={20}
                    onSubmitEditing={() => { validated ? handlePress() : {} }}
                />
            </View>


            <TouchableOpacity style={[styles.submit, validated ? {} : { backgroundColor: "grey" }]} disabled={!validated} onPress={() => { handlePress() }}>
                <Text style={[styles.submitText, { fontWeight: 500 }]}>Submit</Text>
                <Feather name='arrow-right' size={24} color={"#fff"} />
            </TouchableOpacity>

            <Modal isVisible={loading} animationIn={'bounceInUp'} animationInTiming={1000}>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <ActivityIndicator size={48} color={'#1734B9'} />
                </View>
            </Modal>

            <Modal isVisible={isError} animationIn={'bounceInUp'} animationInTiming={1000}>
                <View style={[styles.modal, { alignItems: "center", flex: 2 / 5, borderRadius: scale(20) }]}>
                    <Image source={require('../../assets/images/error-icon.png')} style={{ width: moderateScale(80), height: moderateVerticalScale(80) }} />
                    <Text style={[styles.modalHeading, { fontWeight: 500 }]}>
                        Error!
                    </Text>
                    <Text style={styles.modalText}>
                        {responseMessage}
                    </Text>
                    <TouchableOpacity
                        style={styles.modalButton}
                        onPress={() => {
                            setIsVisible({ isError: false, isSuccess: false, loading: false, responseMessage: "" });
                        }}
                    >
                        <Text style={[styles.submitText, { fontWeight: 500 }]}>
                            Try Again
                        </Text>
                        <Feather name='arrow-right' size={24} color={"#fff"} />
                    </TouchableOpacity>
                </View>
            </Modal>

            <Modal isVisible={isSuccess} animationIn={'bounceInUp'} animationInTiming={1000}>
                <View style={[styles.modal, { alignItems: "center", flex: 2 / 5 }]}>
                    <Image source={require('../../assets/images/shield.png')} />
                    <Text style={[styles.modalHeading, { fontWeight: 500 }]}>
                        Error!
                    </Text>
                    <Text style={styles.modalText}>
                        {responseMessage}
                    </Text>
                    <TouchableOpacity
                        style={styles.modalButton}
                        onPress={() => {
                            setIsVisible({ isError: false, isSuccess: false, loading: false, responseMessage: "" });
                            navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
                        }}
                    >
                        <Text style={[styles.submitText, { fontWeight: 500 }]}>
                            Login
                        </Text>
                        <Feather name='arrow-right' size={24} color={"#fff"} />
                    </TouchableOpacity>
                </View>
            </Modal>

        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: verticalScale(16),
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
        marginTop: verticalScale(8),
        marginBottom: verticalScale(8)
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
    labels: {
        fontSize: scale(12),
        marginBottom: moderateVerticalScale(2),
        fontFamily: "DMSans",
    },
    passwordHeader: {
        textTransform: "uppercase",
        fontFamily: "DMSansBold",
        color: "#6A6666",
        marginLeft: scale(24),
        marginTop: verticalScale(16)
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
})