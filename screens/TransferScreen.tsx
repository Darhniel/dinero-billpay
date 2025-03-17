import { TouchableOpacity, StyleSheet, Text, TextInput, View, Image, ActivityIndicator, Modal } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { scale, verticalScale, moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


export default function TransferScreen({ navigation }: any) {
    const scrollRef = useRef<KeyboardAwareScrollView>(null);
    const scrollToInput = (reactNode: any) => {
        if (reactNode) {
            scrollRef.current?.scrollToFocusedInput(reactNode);
        }
    };

    const [details, setDetails] = useState({ amount: "", transactionReference: "" });
    const [isVisible, setIsVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [status, setStatus] = useState({ isConfirmError: false, isFundError: false, isProcessing: false, isSuccess: false, responseMessage: "" });
    const { isConfirmError, isFundError, isProcessing, isSuccess, responseMessage } = status;
    const { amount } = details;

    useEffect(() => {
        function validForm() {
            return (
                amount.length > 0 &&
                amount.match(/^\d*$/)
            );
        };

        setDisabled(!validForm());
    })

    async function fundWalletWithTransfer() {
        setLoading(true);
        try {
            const response = await fetch('https://api.dinerobillpay.com/api/v1/auth/wallet/fund/transfer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${await AsyncStorage.getItem('accessToken')}`
                },
                body: JSON.stringify({ amount: amount }),
                redirect: "follow"
            });

            const data = await response.json();

            if (response.ok) {
                setDetails(prevState => ({ ...prevState, transactionReference: data.responseBody.transactionReference }))
                setLoading(false)
                setIsVisible(true);
            } else {
                setStatus(prevState => ({ ...prevState, isFundError: true, responseMessage: data.responseMessage }));
                setLoading(false)
            }
        } catch (error) {
            // console.error('Error: ', error)
            if (error == "TypeError: Network request failed") {
                setStatus(prevState => ({ ...prevState, isFundError: true, responseMessage: "There is something wrong with your internet connection. Please check and try again!" }));
                setLoading(false)
            }
        }
    }

    async function confirmWalletFundingWithTransfer() {
        setLoading(true);
        const { transactionReference } = details;

        try {
            const response = await fetch('https://api.dinerobillpay.com/api/v1/auth/wallet/fund/transfer/confirm', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${await AsyncStorage.getItem('accessToken')}`
                },
                body: JSON.stringify({ transactionReference: transactionReference }),
                redirect: "follow"
            });

            const data = await response.json();

            if (response.ok) {
                if (data.repsonseMessage == "We are yet to receive your transfer. Check back after a few seconds.") {
                    setStatus(prevState => ({ ...prevState, isProcessing: true, responseMessage: data.responseMessage }));
                    setLoading(false)
                }

                setStatus(prevState => ({ ...prevState, isProcessing: true, responseMessage: data.responseMessage }));
                setLoading(false)
            } else {
                console.log(data)
                setStatus(prevState => ({ ...prevState, isConfirmError: true, responseMessage: data.responseMessage }))
                setLoading(false)
            }
        } catch (error) {
            if (error == "TypeError: Network request failed") {
                setStatus(prevState => ({ ...prevState, isConfirmError: true, responseMessage: "There is something wrong with your internet connection. Please check and try again!" }));
                setLoading(false);
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
                    1. Enter the amount you want to fund your wallet and click the ‘Submit’ button
                </Text>
                <Text style={{ color: "#0C6599", fontFamily: "DMSans" }}>
                    2. We will give you a temporary account to transfer into. This account is only valid for a limited period of time.
                </Text>
                <Text style={{ color: "#0C6599", fontFamily: "DMSans" }}>
                    3. Transfer only the exact amount into the account.
                </Text>
                <Text style={{ color: "#0C6599", fontFamily: "DMSans" }}>
                    4. We will take it from there.
                </Text>
            </View>

            <View style={{ marginTop: verticalScale(32) }}>
                <Text style={styles.label}>Amount</Text>
                <TextInput
                    placeholder='NGN | Enter an amount'
                    placeholderTextColor={"#6A6666"}
                    style={styles.input}
                    autoCapitalize='none'
                    autoCorrect={false}
                    spellCheck={false}
                    value={amount}
                    onChangeText={text => setDetails(prevState => ({ ...prevState, amount: text }))}
                    keyboardType={'numeric'}
                />

                <TouchableOpacity
                    style={[styles.submit, disabled ? { backgroundColor: "grey" } : {}]}
                    disabled={disabled}
                    onPress={() => { fundWalletWithTransfer() }}
                >
                    <Text style={[styles.submitText, { fontWeight: 500 }]}>Submit</Text>
                    <Feather name='arrow-right' size={24} color={"#fff"} />
                </TouchableOpacity>
            </View>


            <Modal visible={isVisible} animationType={'slide'} transparent>
                <View style={{ flex: 1, justifyContent: "flex-end", alignItems: "center", backgroundColor: "#00000080" }}>
                    <View style={[styles.modal, { alignItems: "center", flex: 2 / 3, borderBottomRightRadius: 0, borderBottomLeftRadius: 0, width: "100%" }]}>
                        <Image source={require('../assets/images/lock.png')} />
                        <Text style={[styles.modalHeading, { fontWeight: 500 }]}>
                            Fund Wallet with transfer
                        </Text>
                        <Text style={styles.modalText}>
                            Here is a summary of your transaction
                        </Text>
                        <View style={styles.transactionDetails}>
                            <View style={{ flexDirection: "row" }}>
                                <Text style={[styles.text, { width: scale(160) }]}>Bank:</Text>
                                <Text style={styles.text}>Flutter</Text>
                            </View>
                            <View style={{ flexDirection: "row" }}>
                                <Text style={[styles.text, { width: scale(160) }]}>Account:</Text>
                                <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                                    <Text style={styles.text}>0987654321</Text>
                                    <Feather name={'copy'} color={'#1D38B4'} />
                                </View>
                            </View>
                            <View style={{ flexDirection: "row" }}>
                                <Text style={[styles.text, { width: scale(160) }]}>Amount:</Text>
                                <Text style={styles.text}>{amount}</Text>
                            </View>
                        </View>

                        <TouchableOpacity style={styles.modalButton} onPress={() => { confirmWalletFundingWithTransfer() }} >
                            <Text style={[styles.submitText, { fontWeight: 500 }]}>Confirm Transfer</Text>
                            <Feather name='arrow-right' size={24} color={"#fff"} />
                        </TouchableOpacity>


                        <TouchableOpacity style={styles.modalButtons} >
                            <Text style={[styles.buttonText, { fontWeight: 500 }]}>Fund Wallet With Card</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </Modal>

            <Modal visible={loading} animationType={'slide'} transparent>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#00000080" }}>
                    <ActivityIndicator size={48} color={"#1734B9"} />
                </View>
            </Modal>

            <Modal visible={isSuccess} animationType={'slide'} transparent>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#00000080" }}>
                    <View style={[styles.modal, { alignItems: "center", flex: 2 / 5, width: "95%" }]}>
                        <Image source={require('../assets/images/shield.png')} style={{ width: moderateScale(85), height: moderateVerticalScale(95) }} />
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

            <Modal visible={isFundError || isConfirmError} animationType={'slide'} transparent>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#00000080" }}>
                    <View style={[styles.modal, { alignItems: "center", flex: 2 / 5, width: "95%" }]}>
                        <Image source={require('../assets/images/error-icon.png')} style={{ width: moderateScale(70), height: moderateVerticalScale(70) }} />
                        <Text style={[styles.modalHeading, { fontWeight: 500 }]}>
                            Error!
                        </Text>
                        <Text style={styles.modalText}>
                            {responseMessage}
                        </Text>
                        <TouchableOpacity
                            style={styles.modalButton}
                            onPress={() => { setStatus({ isConfirmError: false, isFundError: false, isProcessing: false, isSuccess: false, responseMessage: "" }); setIsVisible(false); }}
                        >
                            <Text style={[styles.submitText, { fontWeight: 500 }]}>
                                Try Again
                            </Text>
                            <Feather name='arrow-right' size={24} color={"#fff"} />
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <Modal visible={isProcessing} animationType={'slide'} transparent>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#00000080" }}>
                    <View style={[styles.modal, { alignItems: "center", flex: 2 / 5 }]}>
                        <Image source={require('../assets/images/shield.png')} style={{ width: moderateScale(70), height: moderateVerticalScale(70) }} />
                        <Text style={[styles.modalHeading, { fontWeight: 500 }]}>
                            Processing!
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
    label: {
        fontSize: scale(14),
        fontFamily: "DMSansBold",
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
        height: verticalScale(56),
        borderRadius: scale(8),
        backgroundColor: "#0C6599",
        justifyContent: "center",
        alignItems: "center",
        gap: scale(12),
        paddingVertical: moderateVerticalScale(4),
        paddingHorizontal: moderateScale(24),
        marginTop: verticalScale(40)
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
})