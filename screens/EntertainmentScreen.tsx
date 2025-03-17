import { StyleSheet, Text, TouchableOpacity, View, Image, SafeAreaView, Modal } from 'react-native'
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Feather } from '@expo/vector-icons';
import BillsSkeleton from '../skeletons/billsSkeleton';
import { scale, verticalScale, moderateScale, moderateVerticalScale } from 'react-native-size-matters';

type responseBody = [
    {
        network: string,
        logo: string,
        labelName: string,
        plans: [
            {
                name: string,
                id: string,
                amount: string
            }
        ]
    }
]

export default function EntertainmentScreen({ navigation }: any) {
    const [isVisible, setIsVisible] = useState({ isError: false, isSuccess: false, loading: true, responseMessage: "" });
    const [data, setData] = useState<responseBody>([
        {
            network: "",
            logo: "",
            labelName: "",
            plans: [
                {
                    name: "",
                    id: "",
                    amount: ""
                }
            ]
        }
    ]);

    const { isError, responseMessage, loading } = isVisible;


    async function userDetails() {
        try {
            const response = await fetch('https://api.dinerobillpay.com/api/v1/auth/bills/entertainment', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${await AsyncStorage.getItem('accessToken')}`
                },
                redirect: 'follow'
            });

            const result = await response.json();

            if (response.ok) {
                setData(result.responseBody);
                setIsVisible(prevState => ({ ...prevState, loading: false }));
            } else {
                setIsVisible(prevState => ({ ...prevState, responseMessage: result.responseMessage }));
                setIsVisible(prevState => ({ ...prevState, isError: true, loading: false }));
            }
        } catch (error) {
            console.error('Error:', error);
            if (error == "TypeError: Network request failed") {
                setIsVisible(prevState => ({ ...prevState, responseMessage: "There is something wrong with your internet connection. Please check and try again!" }));
                setIsVisible(prevState => ({ ...prevState, isError: true }));
            }
        }
    }

    useEffect(() => {
        userDetails()
    }, []);

    function handleNetworkChange(network: string) {
        const filtered = data.filter((item) => item.network === network);

        navigation.navigate('EntertainmentDetails', { filtered });
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style={'light'} translucent={true} hidden={false} />

            <View style={{ backgroundColor: '#fff', borderRadius: scale(10), width: scale(310), marginHorizontal: "auto", marginTop: verticalScale(40) }}>
                {
                    data.length > 1 ?
                        data.map((item) => {
                            return (
                                <TouchableOpacity style={styles.item} onPress={() => { handleNetworkChange(item.network); }} key={item.network}>
                                    <Image source={{ uri: item.logo }} style={{ width: scale(60), height: scale(60) }} />
                                    <Text style={styles.itemText}>{item.network}</Text>
                                </TouchableOpacity>
                            )
                        }) :
                        <BillsSkeleton />
                }
            </View>

            <Modal visible={isError} animationType={'slide'} transparent>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#00000080" }}>
                    <View style={[styles.modal, { alignItems: "center", flex: 2 / 5, width: "95%" }]}>
                        <Image source={require('../assets/images/error-icon.png')} style={{ width: scale(95), height: verticalScale(98) }} />
                        <Text style={[styles.modalHeading, { fontWeight: 500 }]}>
                            Error!
                        </Text>
                        <Text style={styles.modalText}>
                            {responseMessage}
                        </Text>
                        <TouchableOpacity
                            style={styles.modalButton}
                            onPress={() => {
                                userDetails();
                                setIsVisible({ isError: false, isSuccess: false, loading: true, responseMessage: "" });
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
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5'
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: scale(1),
        borderColor: '#B2AEB0',
        paddingHorizontal: scale(10),
        gap: scale(12),
        paddingVertical: verticalScale(10)
    },
    itemText: {
        fontFamily: 'DMSansBold',
        fontSize: scale(14),
        color: '#272525',
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
        fontSize: scale(14),
        fontFamily: "DMSans",
        color: "#6A6666",
        textAlign: "center"
    },
    modalButton: {
        flexDirection: "row",
        width: 'auto',
        marginHorizontal: "auto",
        height: verticalScale(52),
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
})