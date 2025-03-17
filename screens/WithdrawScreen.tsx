import { TouchableOpacity, StyleSheet, Text, TextInput, View, Image, ActivityIndicator, Modal } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { scale, verticalScale, moderateScale, moderateVerticalScale } from 'react-native-size-matters';

type WithdrawScreenProps = NativeStackScreenProps<RootStackParamList, 'Withdraw'>;

const WithdrawScreen: React.FC<WithdrawScreenProps> = ({ navigation }) => {
    const scrollRef = useRef<KeyboardAwareScrollView>(null);
    const scrollToInput = (reactNode: any) => {
        if (reactNode) {
            scrollRef.current?.scrollToFocusedInput(reactNode);
        }
    };

    const [accountExist, setAccountExist] = useState(true);
    const [amount, setAmount] = useState('');
    const [isVisible, setIsVisible] = useState({ isError: false, isSuccess: false, loading: true, responseMessage: "" });
    const [disabled, setDisabled] = useState(true);
    const [accountDetails, setAccountDetails] = useState({ accountNumber: "", accountName: "", bankLogo: "", id: "" });

    const { accountName, accountNumber, bankLogo } = accountDetails;
    const { isError, isSuccess, loading, responseMessage } = isVisible;

    async function userDetails() {
        // console.log("user")
        try {
            const response = await fetch('  https://api.dinerobillpay.com/api/v1/auth/accounts/all', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${await AsyncStorage.getItem('accessToken')}`
                },
                redirect: 'follow'
            });

            const data = await response.json();

            if (response.ok) {
                console.log("data")
                if (data.responseBody.length > 0) {
                    setAccountDetails(data.responseBody[0])
                    setAccountExist(false);
                    setIsVisible(prevState => ({ ...prevState, loading: false }));
                }

                setIsVisible(prevState => ({ ...prevState, loading: false }));

            } else {
                // console.log(data)
                setIsVisible(prevState => ({ ...prevState, loading: false, responseMessage: data.responseMessage }));
                setIsVisible(prevState => ({ ...prevState, isError: true }));
            }
        } catch (error) {
            // console.error('Error:', error);
            if (error == "TypeError: Network request failed") {
                console.log("true")
                setIsVisible(prevState => ({ ...prevState, responseMessage: "There is something wrong with your internet connection. Please check and try again!" }));
                setIsVisible(prevState => ({ ...prevState, loading: false, isError: true }));
            }
        }
    }

    useEffect(() => {

        userDetails();

    }, [])

    useEffect(() => {
        function validForm() {
            return (
                amount !== ""
            )
        };

        setDisabled(!validForm());
    });

    async function submit() {
        setIsVisible(prevState => ({ ...prevState, loading: true }));

        try {
            const response = await fetch('https://api.dinerobillpay.com/api/v1/auth/wallet/withdraw', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${await AsyncStorage.getItem('accessToken')}`
                },
                body: JSON.stringify({
                    amount: amount,
                    withdrawalAccountId: accountDetails.id
                }),
                redirect: 'follow'
            });

            const data = await response.json();

            if (response.ok) {
                setIsVisible(prevState => ({ ...prevState, responseMessage: data.responseMessage }));
                setIsVisible(prevState => ({ ...prevState, loading: false }));
                setIsVisible(prevState => ({ ...prevState, isSuccess: true }));
            } else {
                setIsVisible(prevState => ({ ...prevState, responseMessage: data.responseMessage }));
                setIsVisible(prevState => ({ ...prevState, loading: false }));
                setIsVisible(prevState => ({ ...prevState, isError: true }));
            }
        } catch (error) {
            // console.error("Error: ", error)
            if (error == "TypeError: Network request failed") {
                setIsVisible(prevState => ({ ...prevState, responseMessage: "There is something wrong with your internet connection. Please check and try again!" }));
                setIsVisible(prevState => ({ ...prevState, loading: false }));
                setIsVisible(prevState => ({ ...prevState, isError: true }));
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

            {
                !accountExist &&
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
                        onChangeText={text => setAmount(text)}
                        keyboardType={'numeric'}
                    />

                    <View style={styles.cardDetails}>
                        <Image source={{ uri: bankLogo }} style={{ width: moderateScale(60), height: moderateVerticalScale(50) }} />
                        <View>
                            <Text style={{ fontFamily: "DMSansBold", fontWeight: 600 }}>
                                {accountNumber}
                            </Text>
                            <Text style={{ fontFamily: "DMSans" }}>
                                {accountName}
                            </Text>
                        </View>
                    </View>

                    <TouchableOpacity style={[styles.submit, disabled ? { backgroundColor: "grey" } : {}]} onPress={() => { submit(); }}>
                        <Text style={[styles.submitText, { fontWeight: 500 }]}>Submit</Text>
                        <Feather name='arrow-right' size={24} color={"#fff"} />
                    </TouchableOpacity>
                </View>
            }

            {
                accountExist &&
                <View style={{ marginTop: verticalScale(16) }}>
                    <TouchableOpacity style={styles.firstButton} onPress={() => navigation.navigate("WithdrawalAccount")}>
                        <Text style={styles.buttonText}>You have not set your ‘Withdrawal Account’</Text>
                        <Text style={styles.buttonText}>Click here to set withdrawal account</Text>
                    </TouchableOpacity>
                </View>
            }

            <Modal visible={isError} animationType={'slide'} transparent>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#00000080" }}>
                    <View style={[styles.modal, { alignItems: "center", flex: 2 / 5, width: "95%" }]}>
                        <Image source={require('../assets/images/error-icon.png')} style={{ width: moderateScale(95), height: moderateVerticalScale(95) }} />
                        <Text style={[styles.modalHeading, { fontWeight: 500 }]}>
                            Error!
                        </Text>
                        <Text style={styles.modalText}>
                            {responseMessage}
                        </Text>
                        <TouchableOpacity
                            style={styles.modalButton}
                            onPress={() => { setIsVisible({ isError: false, isSuccess: false, loading: false, responseMessage: "" }); userDetails() }}
                        >
                            <Text style={[styles.submitText, { fontWeight: 500 }]}>
                                Try Again
                            </Text>
                            <Feather name='arrow-right' size={24} color={"#fff"} />
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
                        <Image source={require('../assets/images/shield.png')} style={{ width: moderateScale(95), height: moderateVerticalScale(95) }} />
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
    firstButton: {
        width: scale(320),
        gap: verticalScale(4),
        paddingHorizontal: moderateScale(4),
        paddingVertical: moderateVerticalScale(4),
        backgroundColor: "#F8DCD3",
        marginHorizontal: "auto"
    },
    buttonText: {
        fontFamily: "DMSans",
        fontSize: scale(12),
        color: "#8B0404"
    },
    label: {
        fontSize: scale(14),
        marginBottom: verticalScale(2),
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
    cardDetails: {
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
        borderRadius: scale(12),
    },
    modalHeading: {
        fontFamily: "DMSansBold",
        textAlign: "center",
        fontSize: scale(32),
        color: "#333333"
    },
    modalText: {
        fontSize: scale(14),
        fontFamily: "DMSans",
        color: "#333",
        textAlign: "center"
    },
    modalButton: {
        flexDirection: "row",
        width: "auto",
        marginHorizontal: "auto",
        height: verticalScale(45),
        borderRadius: scale(8),
        backgroundColor: "#0C6599",
        justifyContent: "center",
        alignItems: "center",
        gap: scale(8),
        paddingVertical: moderateVerticalScale(4),
        paddingHorizontal: moderateScale(24),
        marginTop: verticalScale(16)
    },
});


export default WithdrawScreen;