import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput, Image, ActivityIndicator, Modal } from 'react-native';
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Feather } from '@expo/vector-icons';
import { Dropdown } from 'react-native-element-dropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { scale, verticalScale, moderateScale, moderateVerticalScale } from 'react-native-size-matters';

type UploadIdScreenProps = NativeStackScreenProps<RootStackParamList, 'Id'>;

const UploadIdScreen: React.FC<UploadIdScreenProps> = ({ navigation }) => {
    const [disabled, setDisabled] = useState(true);
    const [idDetails, setIdDetails] = useState({ nin: "", type: "", bvn: "" });
    const [isVisible, setIsVisible] = useState({ isSuccess: false, isError: false, loading: false, responseMessage: "" });
    const [inputValue, setInputValue] = useState('');
    const [selectedValue, setSelectedValue] = useState<string | null>(null);

    const { isSuccess, isError, loading, responseMessage } = isVisible;

    useEffect(() => {
        function validForm() {
            const { nin, type, bvn } = idDetails;
            return (
                (nin.length === 11 || bvn.length === 11) &&
                type.length !== 0
            );
        };

        setDisabled(!validForm())
    })

    const data = [
        { label: "NIN", value: "nin" },
        { label: "BVN", value: "bvn" }
    ];

    const handleDropdownChange = (itemValue: string) => {
        setSelectedValue(itemValue);
        setIdDetails(prevState => ({ ...prevState, type: itemValue }));
        setInputValue('');
    };

    const handleInputChange = (text: string) => {
        setInputValue(text);
        if (selectedValue === "nin") {
            setIdDetails(({ ...idDetails, bvn: "", nin: text }));
        } else if (selectedValue === "bvn") {
            setIdDetails({ ...idDetails, nin: "", bvn: text });
        }
    };

    async function updateKYC() {
        setIsVisible(prevState => ({ ...prevState, loading: true }));
        const updatedDetails = Object.fromEntries(
            Object.entries(idDetails).filter(([key, value]) => value !== "")
        );

        try {
            const response = await fetch('https://api.dinerobillpay.com/api/v1/auth/kyc/verify', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${await AsyncStorage.getItem('accessToken')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedDetails),
            });

            const data = await response.json();

            if (response.ok) {
                setIsVisible(prevState => ({ ...prevState, loaidng: false, isSuccess: true, responseMessage: data.responseMessage }));

            } else {
                setIsVisible(prevState => ({ ...prevState, loading: false, isError: true, responseMessage: data.responseMessage }));
            }
        } catch (error) {
            // console.error('Error:', error);
            if (error == "TypeError: Network request failed") {
                setIsVisible(prevState => ({ ...prevState, loading: false, isError: true, responseMessage: "There is something wrong with your internet connection. Please check and try again!" }));
            }
        }
    }


    return (
        <ScrollView style={styles.container}>
            <StatusBar style={'light'} translucent={true} hidden={false} />

            <Text style={styles.heading}>Verify Your Identity</Text>

            <View style={styles.verifyBox}>
                <Feather name='info' color={"#0C6599"} style={{ marginBottom: verticalScale(8) }} />
                <Text style={{ color: "#0C6599", fontFamily: "DMSans" }}>
                    We require you to upload a means of identity. We will verify and approve. This step can be skipped but you will be required to verify before withdrawing from your wallet.
                </Text>
            </View>

            <View style={{ marginTop: verticalScale(32) }}>
                <Text style={styles.label}>ID Type</Text>
                <Dropdown
                    data={data}
                    maxHeight={300}
                    labelField={'label'}
                    valueField={'value'}
                    placeholder='Select your preferred ID'
                    value={selectedValue}
                    onChange={item => handleDropdownChange(item.value)}
                    style={styles.input}
                    placeholderStyle={{ fontFamily: "DMSans" }}
                    itemTextStyle={{ fontFamily: "DMSans" }}
                    selectedTextStyle={{ fontFamily: "DMSans" }}
                />
            </View>

            <View style={{ marginTop: verticalScale(16) }}>
                <Text style={styles.label}>
                    {idDetails.type !== "" ? idDetails.type : "ID"} Number
                </Text>
                <TextInput
                    placeholder='Enter your Identification number'
                    placeholderTextColor={"#6A6666"}
                    style={styles.input}
                    keyboardType={'number-pad'}
                    value={inputValue}
                    onChangeText={number => handleInputChange(number)}
                    editable={selectedValue !== null}
                    maxLength={11}
                />
            </View>

            <TouchableOpacity style={[styles.submit, disabled ? { backgroundColor: "grey" } : {}]} onPress={() => { updateKYC() }} disabled={disabled} >
                <Text style={[styles.submitText, { fontWeight: 500 }]}>Next</Text>
                <Feather name='arrow-right' size={24} color={"#fff"} />
            </TouchableOpacity>

            <Modal visible={loading} animationType={'slide'} transparent>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#00000080" }}>
                    <ActivityIndicator size={48} color={"#1734B9"} />
                </View>
            </Modal>

            <Modal visible={isSuccess} animationType={'slide'} transparent>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#00000080" }}>
                    <View style={[styles.modal, { alignItems: "center", flex: 2 / 5, width: "95%" }]}>
                        <Image source={require('../assets/images/shield.png')} style={{ width: scale(80), height: verticalScale(80) }} />
                        <Text style={[styles.modalHeading, { fontWeight: 500 }]}>
                            Success
                        </Text>
                        <Text style={styles.modalText}>
                            {responseMessage}
                        </Text>
                        <TouchableOpacity
                            style={styles.modalButton}
                            onPress={() => { navigation.navigate('Pin', {}) }}
                        >
                            <Text style={[styles.submitText, { fontWeight: 500 }]}>
                                Proceed
                            </Text>
                            <Feather name='arrow-right' size={24} color={"#fff"} />
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <Modal visible={isError} animationType={'slide'} transparent>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#00000080" }}>
                    <View style={[styles.modal, { alignItems: "center", flex: 2 / 5, width: "95%" }]}>
                        <Image source={require('../assets/images/error-icon.png')} style={{ width: scale(80), height: verticalScale(80) }} />
                        <Text style={[styles.modalHeading, { fontWeight: 500 }]}>
                            Error!
                        </Text>
                        <Text style={styles.modalText}>
                            {responseMessage}
                        </Text>
                        <TouchableOpacity
                            style={styles.modalButton}
                            onPress={() => {
                                setIsVisible(prevState => ({ ...prevState, isError: false }));
                            }}
                        >
                            <Text style={[styles.submitText, { fontWeight: 500 }]}>
                                Try Again
                            </Text>
                            <Feather name='arrow-right' size={24} color={"#fff"} />
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    heading: {
        color: "#333",
        fontFamily: "DMSansBold",
        fontSize: scale(16),
        marginLeft: scale(24),
        marginTop: verticalScale(32)
    },
    verifyBox: {
        marginHorizontal: "auto",
        backgroundColor: "#B6DEF6",
        paddingVertical: moderateVerticalScale(8),
        paddingHorizontal: moderateScale(8),
        width: scale(320),
        marginTop: verticalScale(8)
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
    label: {
        fontSize: scale(14),
        fontFamily: "DMSans",
        marginLeft: scale(24),
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
        width: 'auto',
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

export default UploadIdScreen;