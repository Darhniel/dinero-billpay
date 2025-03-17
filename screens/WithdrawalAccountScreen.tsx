import { SafeAreaView, StyleSheet, Text, TextInput, View, TouchableOpacity, Image, Modal } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { StatusBar } from 'expo-status-bar';
import { Feather } from '@expo/vector-icons';
import { Dropdown } from 'react-native-element-dropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { scale, verticalScale, moderateScale, moderateVerticalScale } from 'react-native-size-matters';

export default function WithdrawalAccountScreen({ route }: any) {
    const scrollRef = useRef<KeyboardAwareScrollView>(null);
    const scrollToInput = (reactNode: any) => {
        if (reactNode) {
            scrollRef.current?.scrollToFocusedInput(reactNode);
        }
    };

    const [bankDetails, setBankDetails] = useState({ accountName: "", bankName: "", accountNumber: "", bankLogo: "", bankCode: "" });
    const [data, setData] = useState([{ code: "", id: 0, logo: "", name: "" }]);
    const [accountExist, setAccountExist] = useState(false);
    const [selectedValue, setSelectedValue] = useState<string | null>(null);
    const [isVisible, setIsVisible] = useState({ isError: false, isSuccess: false, loading: false, responseMessage: "" });

    const { isError, isSuccess, loading, responseMessage } = isVisible;

    useEffect(() => {
        async function userDetails() {
            try {
                const response = await fetch('https://api.dinerobillpay.com/api/v1/auth/accounts/get-banks', {
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
                    setData(data.responseBody.sort((a: any, b: any) => a.name.localeCompare(b.name)))
                } else {
                    console.log('Registration failed:', data);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
        userDetails();
    }, []);

    async function getAccountDetails() {
        const { accountNumber, bankCode } = bankDetails;

        try {
            const response = await fetch('https://api.dinerobillpay.com/api/v1/auth/accounts/confirm-bank-account', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${await AsyncStorage.getItem('accessToken')}`,

                },
                body: JSON.stringify({ accountNumber, bankCode }),
                redirect: 'follow'
            });

            const data = await response.json();
            // console.log(data)

            if (response.ok) {
                setBankDetails(data.responseBody);
                setAccountExist(true);
            } else {
                setIsVisible({ isError: true, isSuccess: false, loading: false, responseMessage: data.responseMessage })
            }
        } catch (error) {
            // console.error('Error:', error);
            if (error == "TypeError: Network request failed") {
                setIsVisible({ isError: true, isSuccess: false, loading: false, responseMessage: "There is something wrong with your internet connection. Please check and try again!" })
            }
        }
    }

    useEffect(() => {
        if (bankDetails.accountNumber.length === 10 && bankDetails.bankCode.length > 1) {
            getAccountDetails();
        };
    }, [bankDetails.accountNumber, bankDetails.bankCode])

    async function saveAccountDetails() {
        const { accountNumber, bankCode } = bankDetails
        try {
            const response = await fetch('https://api.dinerobillpay.com/api/v1/auth/accounts/save-bank-account', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${await AsyncStorage.getItem('accessToken')}`,
                },
                body: JSON.stringify({ accountNumber, bankCode }),
                redirect: 'follow'
            }
            );

            const data = await response.json();

            if (response.ok) {
                setIsVisible({ isSuccess: true, isError: false, loading: false, responseMessage: data.responseMessage })
            } else {
                setIsVisible({ isError: true, isSuccess: false, loading: false, responseMessage: data.responseMessage })
            }

        } catch (error) {
            if (error == "TypeError: Network request failed") {
                setIsVisible({ isError: true, isSuccess: false, loading: false, responseMessage: "There is something wrong with your internet connection. Please check and try again!" })
            }
        }
    }


    return (
        <KeyboardAwareScrollView style={{ flex: 1 }} ref={scrollRef} keyboardShouldPersistTaps="handled">
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
                    data={data}
                    maxHeight={300}
                    labelField={"name"}
                    valueField={"name"}
                    placeholder='Select bank name'
                    value={bankDetails.bankName}
                    onChange={item => { setBankDetails(prevState => ({ ...prevState, bankName: item.name, bankLogo: item.logo, bankCode: item.code })); }}
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
                    editable={selectedValue !== null}
                />
            </View>

            {
                accountExist &&
                <View style={styles.cardDetails}>
                    <Image source={{ uri: bankDetails.bankLogo }} style={{ width: moderateScale(60), height: moderateVerticalScale(50) }} />
                    <View>
                        <Text style={{ fontFamily: "DMSansBold", fontWeight: 600 }}>
                            {bankDetails.accountNumber}
                        </Text>
                        <Text style={{ fontFamily: "DMSans" }}>
                            {bankDetails.accountName}
                        </Text>
                    </View>
                </View>
            }

            <TouchableOpacity style={styles.submit} onPress={() => { saveAccountDetails() }}>
                <Text style={[styles.submitText, { fontWeight: 500 }]}>Add Account</Text>
                <Feather name='arrow-right' size={24} color={"#fff"} />
            </TouchableOpacity>

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
                            onPress={() => { setIsVisible({ isError: false, isSuccess: false, loading: false, responseMessage: "" }); }}
                        >
                            <Text style={[styles.submitText, { fontWeight: 500 }]}>
                                Go Home
                            </Text>
                            <Feather name='arrow-right' size={24} color={"#fff"} />
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <Modal visible={isError} animationType={'slide'} transparent>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#00000080" }}>
                    <View style={[styles.modal, { alignItems: "center", flex: 2 / 5, width: "95%" }]}>
                        <Image source={require('../assets/images/error-icon.png')} style={{ width: moderateScale(80), height: moderateVerticalScale(80) }} />
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
                </View>
            </Modal>
        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({
    heading: {
        fontFamily: "DMSansBold",
        fontSize: scale(16),
        color: "#333",
        marginTop: verticalScale(32),
        marginLeft: scale(24)
    },

    verifyBox: {
        backgroundColor: "#B6DEF6",
        paddingVertical: moderateVerticalScale(8),
        paddingHorizontal: moderateScale(8),
        width: scale(320),
        marginHorizontal: "auto",
        marginTop: verticalScale(32)
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

    label: {
        fontSize: scale(12),
        marginBottom: verticalScale(2),
        fontFamily: "DMSansBold",
        marginLeft: scale(24),
    },
    cardDetails: {
        width: scale(320),
        marginHorizontal: "auto",
        borderRadius: scale(8),
        paddingHorizontal: moderateScale(10),
        paddingVertical: moderateVerticalScale(10),
        gap: scale(10),
        flexDirection: "row",
        borderWidth: scale(1),
        borderColor: "#1D38B4",
        backgroundColor: "#DBE8FE",
        marginTop: verticalScale(20),
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
        gap: scale(8),
        paddingVertical: verticalScale(4),
        paddingHorizontal: scale(24),
        marginTop: verticalScale(36)
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