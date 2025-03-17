import { Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { StatusBar } from 'expo-status-bar'
import { Feather } from '@expo/vector-icons'
import { Dropdown } from 'react-native-element-dropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { scale, verticalScale, moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import Modal from 'react-native-modal';

type bankInfo = {
    accountNumber: "",
    accountName: "",
    bankName: "",
    bankCode: "",
    bankLogo: ""
}

export default function UpdateWithdrawalAccountScreen({ navigation }: any) {
    const scrollRef = useRef<KeyboardAwareScrollView>(null);
    const scrollToInput = (reactNode: any) => {
        if (reactNode) {
            scrollRef.current?.scrollToFocusedInput(reactNode);
        }
    };

    const [disabled, setDisabled] = useState(true);
    const [isVisible, setIsVisible] = useState({ isError: false, isSuccess: false, loading: true, responseMessage: "" });
    const [bankDetails, setBankDetails] = useState({ name: "", accountNumber: "", logo: "", code: "" });
    const [data, setData] = useState<bankInfo | null>(null)
    const [bankData, setBankData] = useState([{ code: "", id: 0, logo: "", name: "" }]);

    const { isError, isSuccess, loading, responseMessage } = isVisible;

    useEffect(() => {
        getAccountDetails();
    }, [bankDetails.accountNumber, bankDetails.code])

    async function getAccountDetails() {
        const userBankDetails = { accountNumber: bankDetails.accountNumber, bankCode: bankDetails.code }
        try {
            const response = await fetch('https://dinero-backend-production.up.railway.app/api/v1/auth/accounts/confirm-bank-account', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${await AsyncStorage.getItem('accessToken')}`,
                },
                body: JSON.stringify(userBankDetails),
                redirect: 'follow'
            });
            // console.log(response.status)

            const data = await response.json();

            if (response.ok) {
                setData(data.responseBody)
            } else {
                // console.log('Registration failed:', response);
                console.log('Account failed:', data);
            }
        } catch (error) {
            // console.error('Error:', error);
            if (error == "TypeError: Network request failed") {
                setIsVisible(prevState => ({ ...prevState, responseMessage: "There is something wrong with your internet connection. Please check and try again!" }));
                setIsVisible(prevState => ({ ...prevState, isError: true }));
            }
        }
    }

    useEffect(() => {
        async function userDetails() {
            try {
                const response = await fetch('https://dinero-backend-production.up.railway.app/api/v1/auth/accounts/get-banks', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${await AsyncStorage.getItem('accessToken')}`,

                    },
                    redirect: 'follow'
                });

                const data = await response.json();

                if (response.ok) {
                    // console.log('Bank Details: ', data.responseBody);
                    setBankData(data.responseBody.sort((a: any, b: any) => a.name.localeCompare(b.name)))
                    // setVisible(true);
                    // router.navigate('/(tabs)/home')
                    // firstName.push(data.data.firstName)
                    // console.log(firstName)

                } else {
                    console.log('1. Registration failed:', data);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
        userDetails();
    }, [])

    async function saveAccountDetails() {
        const { accountNumber, code } = bankDetails
        try {
            const response = await fetch('https://dinero-backend-production.up.railway.app/api/v1/auth/accounts/save-bank-account', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${await AsyncStorage.getItem('accessToken')}`,
                },
                body: JSON.stringify({ accountNumber, code }),
                redirect: 'follow'
            });

            const data = await response.json();

            if (response.ok) {
                setIsVisible({ isSuccess: true, isError: false, loading: false, responseMessage: data.responseMessage })
            } else {
                setIsVisible({ isError: true, isSuccess: false, loading: false, responseMessage: data.responseMessage })
            }

        } catch (error) {
            console.error('Error:', error);
            if (error == "TypeError: Network request failed") {
                setIsVisible({ isError: true, isSuccess: false, loading: false, responseMessage: "There is something wrong with your internet connection. Please check and try again!" })
            }
        }
    }

    return (
        <KeyboardAwareScrollView style={styles.container} ref={scrollRef} keyboardShouldPersistTaps="handled">
            <StatusBar style={'light'} translucent={true} hidden={false} />

            <Text style={styles.heading}>Fund your wallet with transfer</Text>

            <View style={styles.verifyBox}>
                <Feather name='info' color={"#0C6599"} style={{ marginBottom: verticalScale(8) }} />
                <Text style={{ color: "#0C6599", fontFamily: "DMSans" }}>
                    1. To curb fraud, you can only withdraw from your wallet to your configured ‘withdrawal account’
                </Text>
                <Text style={{ color: "#0C6599", fontFamily: "DMSans" }}>
                    2. Enter the amount you want to fund your wallet and click the ‘Submit’ button
                </Text>
                <Text style={{ color: "#0C6599", fontFamily: "DMSans" }}>
                    3. We will move the exact amount to your configured ‘withdrawal account’.
                </Text>
            </View>

            <View style={{ marginTop: verticalScale(16) }}>
                <Text style={styles.label}>Bank Name</Text>
                <Dropdown
                    data={bankData}
                    maxHeight={300}
                    labelField={"name"}
                    valueField={"name"}
                    placeholder='Select bank name'
                    value={bankDetails.name}
                    onChange={item => setBankDetails(prevState => ({ ...prevState, name: item.name, logo: item.logo, code: item.code }))}
                    style={styles.input}
                    placeholderStyle={{ fontFamily: "DMSans" }}
                    itemTextStyle={{ fontFamily: "DMSans" }}
                    selectedTextStyle={{ fontFamily: "DMSans" }}
                    search
                    inputSearchStyle={{ fontFamily: "DMSans" }}
                />
            </View>
            <View style={{ marginTop: verticalScale(16) }}>
                <Text style={styles.label}>Account Number</Text>
                <TextInput
                    placeholder='Input your account number'
                    placeholderTextColor={"#6A6666"}
                    style={styles.input}
                    autoCorrect={false}
                    spellCheck={false}
                    value={bankDetails.accountNumber}
                    onChangeText={text => setBankDetails(prevState => ({ ...prevState, accountNumber: text }))}
                    keyboardType={'number-pad'}
                    maxLength={10}
                />
            </View>
            {
                data &&
                <View style={styles.accountDetails}>
                    <Image source={{ uri: data.bankLogo }} style={{ width: moderateScale(60), height: moderateVerticalScale(50) }} />
                    <View>
                        <Text style={{ color: "#272525", fontFamily: "DMSansBold" }}>{data.accountNumber}</Text>
                        <Text style={{ color: "#5F5B5D", fontFamily: "DMSans" }}>{data.accountName}</Text>
                    </View>
                </View>
            }

            <TouchableOpacity style={styles.submit} onPress={() => { saveAccountDetails() }}>
                <Text style={[styles.submitText, { fontWeight: 500 }]}>Add Account</Text>
                <Feather name='arrow-right' size={24} color={"#fff"} />
            </TouchableOpacity>

            <Modal isVisible={isSuccess} animationIn={'bounceInUp'} animationInTiming={1000}>
                <View style={[styles.modal, { alignItems: "center", flex: 2 / 5 }]}>
                    <Image source={require('../../assets/images/shield.png')} style={{ width: moderateScale(70), height: moderateVerticalScale(70) }} />
                    <Text style={[styles.modalHeading, { fontWeight: 500 }]}>
                        Successful
                    </Text>
                    <Text style={styles.modalText}>
                        {responseMessage}
                    </Text>
                    <TouchableOpacity
                        style={styles.modalButton}
                        onPress={() => {
                            setIsVisible({ isError: false, isSuccess: false, loading: false, responseMessage: "" });
                            navigation.reset({ index: 0, routes: [{ name: "Main", params: { screen: "Home" } }] })
                        }}
                    >
                        <Text style={[styles.submitText, { fontWeight: 500 }]}>
                            Go Home
                        </Text>
                        <Feather name='arrow-right' size={24} color={"#fff"} />
                    </TouchableOpacity>
                </View>
            </Modal>

            <Modal isVisible={isError} animationIn={'bounceInUp'} animationInTiming={1000}>
                <View style={[styles.modal, { alignItems: "center", flex: 2 / 5 }]}>
                    <Image source={require('../../assets/images/error-icon.png')} style={{ width: moderateScale(80), height: moderateVerticalScale(80) }} />
                    <Text style={[styles.modalHeading, { fontWeight: 500 }]}>
                        Error!
                    </Text>
                    <Text style={styles.modalText}>
                        {responseMessage}
                    </Text>
                    <TouchableOpacity
                        style={styles.modalButton}
                        onPress={() => { setIsVisible({ isError: false, isSuccess: false, loading: false, responseMessage: "" }); }}
                    >
                        <Text style={[styles.submitText, { fontWeight: 500 }]}>
                            Try Again
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
        flex: 1
    },
    heading: {
        fontFamily: "DMSansBold",
        fontSize: scale(16),
        color: "#333",
        marginTop: scale(8),
        marginLeft: scale(24)
    },
    verifyBox: {
        marginHorizontal: "auto",
        backgroundColor: "#B6DEF6",
        paddingVertical: moderateVerticalScale(8),
        paddingHorizontal: moderateScale(8),
        width: scale(320),
        marginTop: verticalScale(8)
    },
    label: {
        fontSize: scale(12),
        fontFamily: "DMSans",
        marginLeft: scale(24),
    },
    input: {
        borderStyle: "solid",
        borderWidth: scale(1),
        borderColor: "#D5D8DE",
        width: scale(320),
        marginHorizontal: "auto",
        height: verticalScale(44),
        borderRadius: scale(8),
        marginTop: verticalScale(4),
        padding: moderateScale(8),
        fontFamily: "DMSans"
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
        gap: scale(12),
        paddingVertical: moderateVerticalScale(4),
        paddingHorizontal: moderateScale(24),
        marginTop: verticalScale(24)
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