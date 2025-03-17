import { SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity, Modal } from 'react-native'
import React, { useState } from 'react'
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons'
import { getNormalizedSizeWithPlatformOffset, getNormalizedVerticalSizeWithPlatformOffset } from '../utils'
import { StatusBar } from 'expo-status-bar';
// import { scale, verticalScale, moderateScale, moderateVerticalScale } from 'react-native-size-matters';

export default function ScheduleScreen({ route }: any) {
    const { scheduleDetails } = route.params;
    const [isVisible, setIsVisible] = useState(false);

    const { logo, name, amount, currency, nextPaymentReadable, status, customer } = scheduleDetails;

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style='light' translucent={true} hidden={false} />

            <View style={{ flexDirection: "row", alignItems: "center", width: getNormalizedSizeWithPlatformOffset(340), marginHorizontal: "auto", justifyContent: "space-between", marginTop: getNormalizedVerticalSizeWithPlatformOffset(45), marginBottom: getNormalizedVerticalSizeWithPlatformOffset(16) }}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: getNormalizedSizeWithPlatformOffset(10), flexWrap: "wrap" }}>
                    <Image source={{ uri: logo }} />
                    <Text style={{ width: getNormalizedSizeWithPlatformOffset(102), fontFamily: "DMSans", fontSize: getNormalizedSizeWithPlatformOffset(14) }}>{name}</Text>
                </View>

                {
                    status ?
                        <View style={{ width: getNormalizedSizeWithPlatformOffset(64), paddingVertical: getNormalizedVerticalSizeWithPlatformOffset(10), backgroundColor: "#CDF2D5", borderRadius: getNormalizedSizeWithPlatformOffset(100) }}>
                            <Text style={{ fontFamily: "DMSans", textAlign: "center", color: "#32623C" }}>Active</Text>
                        </View>
                        :
                        <View style={{ width: getNormalizedSizeWithPlatformOffset(64), paddingVertical: getNormalizedVerticalSizeWithPlatformOffset(10), backgroundColor: "#F7B7B7", borderRadius: getNormalizedSizeWithPlatformOffset(100) }}>
                            <Text style={{ fontFamily: "DMSans", textAlign: "center", color: "#8B0404" }}>Inactive</Text>
                        </View>
                }

            </View>

            <View style={{ width: getNormalizedSizeWithPlatformOffset(340), marginHorizontal: "auto", backgroundColor: "#E2FBE8", paddingVertical: getNormalizedVerticalSizeWithPlatformOffset(20), alignItems: "center", flexDirection: "row", justifyContent: "center", gap: getNormalizedSizeWithPlatformOffset(4), borderRadius: getNormalizedSizeWithPlatformOffset(8), marginBottom: getNormalizedVerticalSizeWithPlatformOffset(24) }}>
                <Text style={{ fontSize: getNormalizedSizeWithPlatformOffset(20), color: "#B2AEB0", fontFamily: "DMSans" }}>{currency}</Text>
                <Text style={{ fontSize: getNormalizedSizeWithPlatformOffset(20), color: "#32623C", fontFamily: "DMSansBold" }}>{amount}</Text>
            </View>

            <View style={{ width: getNormalizedSizeWithPlatformOffset(340), marginHorizontal: "auto", backgroundColor: "#fff", borderRadius: getNormalizedSizeWithPlatformOffset(10) }}>
                <View style={{ width: getNormalizedSizeWithPlatformOffset(300), marginHorizontal: "auto", flexDirection: "row", justifyContent: "space-between", borderBottomWidth: getNormalizedSizeWithPlatformOffset(1.5), borderColor: "#B2AEB0", height: getNormalizedVerticalSizeWithPlatformOffset(34), marginTop: getNormalizedVerticalSizeWithPlatformOffset(20) }}>
                    <Text style={{ fontFamily: "DMSans", fontSize: getNormalizedSizeWithPlatformOffset(14), color: "#929597" }}>Type</Text>
                    <Text style={{ fontFamily: "DMSans", fontSize: getNormalizedSizeWithPlatformOffset(16), color: "#5F5B5D" }}>Utility</Text>
                </View>
                <View style={{ width: getNormalizedSizeWithPlatformOffset(300), marginHorizontal: "auto", flexDirection: "row", justifyContent: "space-between", borderBottomWidth: getNormalizedSizeWithPlatformOffset(1.5), borderColor: "#B2AEB0", height: getNormalizedVerticalSizeWithPlatformOffset(34), marginTop: getNormalizedVerticalSizeWithPlatformOffset(20) }}>
                    <Text style={{ fontFamily: "DMSans", fontSize: getNormalizedSizeWithPlatformOffset(14), color: "#929597" }}>Meter No</Text>
                    <Text style={{ fontFamily: "DMSans", fontSize: getNormalizedSizeWithPlatformOffset(16), color: "#5F5B5D" }}>{customer}</Text>
                </View>
                <View style={{ width: getNormalizedSizeWithPlatformOffset(300), marginHorizontal: "auto", flexDirection: "row", justifyContent: "space-between", borderBottomWidth: getNormalizedSizeWithPlatformOffset(1.5), borderColor: "#B2AEB0", height: getNormalizedVerticalSizeWithPlatformOffset(34), marginTop: getNormalizedVerticalSizeWithPlatformOffset(20) }}>
                    <Text style={{ fontFamily: "DMSans", fontSize: getNormalizedSizeWithPlatformOffset(14), color: "#929597" }}>Schedule</Text>
                    <Text style={{ fontFamily: "DMSans", fontSize: getNormalizedSizeWithPlatformOffset(16), color: "#5F5B5D" }}>Monthly</Text>
                </View>
                <View style={{ width: getNormalizedSizeWithPlatformOffset(300), marginHorizontal: "auto", flexDirection: "row", justifyContent: "space-between", borderBottomWidth: getNormalizedSizeWithPlatformOffset(1.5), borderColor: "#B2AEB0", height: getNormalizedVerticalSizeWithPlatformOffset(34), marginTop: getNormalizedVerticalSizeWithPlatformOffset(20) }}>
                    <Text style={{ fontFamily: "DMSans", fontSize: getNormalizedSizeWithPlatformOffset(14), color: "#929597" }}>Next Payment</Text>
                    <Text style={{ fontFamily: "DMSans", fontSize: getNormalizedSizeWithPlatformOffset(16), color: "#5F5B5D" }}>{nextPaymentReadable}</Text>
                </View>
                <View style={{ width: getNormalizedSizeWithPlatformOffset(300), marginHorizontal: "auto", flexDirection: "row", justifyContent: "space-between", height: getNormalizedVerticalSizeWithPlatformOffset(34), marginTop: getNormalizedVerticalSizeWithPlatformOffset(20) }}>
                    <Text style={{ fontFamily: "DMSans", fontSize: getNormalizedSizeWithPlatformOffset(14), color: "#5F5B5D" }}>History</Text>
                    <Feather name='chevron-right' color={"#2D264B"} size={16} />
                </View>
            </View>

            <View style={styles.buttons}>
                <TouchableOpacity
                    style={{
                        backgroundColor: "#0C6599", flexDirection: "row", alignItems: "center", width: getNormalizedSizeWithPlatformOffset(132), paddingHorizontal: getNormalizedSizeWithPlatformOffset(13), paddingVertical: getNormalizedVerticalSizeWithPlatformOffset(8), borderRadius: getNormalizedVerticalSizeWithPlatformOffset(8), justifyContent: "center", gap: getNormalizedSizeWithPlatformOffset(8)
                    }}

                >
                    <Text style={{ color: "#fff", fontFamily: "DMSansBold" }}>Modify</Text>
                    <Feather name='edit-3' size={18} color='white' />
                </TouchableOpacity>

                <TouchableOpacity
                    style={{
                        borderWidth: 0.5, borderColor: "#0C6599", flexDirection: "row", alignItems: "center", width: getNormalizedSizeWithPlatformOffset(132), paddingHorizontal: getNormalizedSizeWithPlatformOffset(13), paddingVertical: getNormalizedVerticalSizeWithPlatformOffset(8), borderRadius: getNormalizedVerticalSizeWithPlatformOffset(8), justifyContent: "center", gap: getNormalizedSizeWithPlatformOffset(8)
                    }}
                    onPress={() => { setIsVisible(true) }}
                >
                    <Text style={{ color: "#0C6599", fontFamily: "DMSansBold" }}>Activate</Text>
                    <MaterialCommunityIcons name='check-decagram-outline' size={24} color='#0C6599' />
                </TouchableOpacity>
            </View>

            <Modal visible={isVisible} animationType={'slide'} transparent style={{ justifyContent: "flex-end", marginLeft: 0, marginRight: 0, marginBottom: 0 }}>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#00000080" }}>
                    <View style={[styles.modal, { alignItems: "center", flex: 2 / 3, width: "100%" }]}>
                        <Image source={require('../assets/images/lock.png')} />
                        <Text style={[styles.modalHeading, { fontWeight: 500 }]}>
                            Activate Scheduled Payment
                        </Text>
                        <Text style={styles.modalText}>
                            Here is a summary of your payment
                        </Text>
                        <View style={styles.paymentDetails}>
                            <View style={{ flexDirection: "row" }}>
                                <Text style={[styles.text, { width: getNormalizedSizeWithPlatformOffset(160), fontSize: getNormalizedSizeWithPlatformOffset(16), color: "rgba(51, 51, 51, 0.7)" }]}>Type:</Text>
                                <Text style={[styles.text, { fontSize: getNormalizedSizeWithPlatformOffset(16), color: "#333" }]}>Utility</Text>
                            </View>
                            <View style={{ flexDirection: "row" }}>
                                <Text style={[styles.text, { width: getNormalizedSizeWithPlatformOffset(160), fontSize: getNormalizedSizeWithPlatformOffset(16), color: "rgba(51, 51, 51, 0.7)" }]}>Meter No:</Text>
                                <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                                    <Text style={[styles.text, { fontSize: getNormalizedSizeWithPlatformOffset(16), color: "#333" }]}>2459 0923 9821 9847</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: "row" }}>
                                <Text style={[styles.text, { width: getNormalizedSizeWithPlatformOffset(160), fontSize: getNormalizedSizeWithPlatformOffset(16), color: "rgba(51, 51, 51, 0.7)" }]}>Amount:</Text>
                                <Text style={[styles.text, { fontSize: getNormalizedSizeWithPlatformOffset(16), color: "#333" }]}>50,000</Text>
                            </View>
                        </View>

                        <View style={[styles.paymentDetails, { flexDirection: "row", backgroundColor: "none", borderColor: "rgba(128, 128, 128, 0.55)", marginVertical: 0, height: getNormalizedVerticalSizeWithPlatformOffset(56), alignItems: "center", justifyContent: "space-between" }]}>
                            <Text style={[styles.text, { fontSize: getNormalizedSizeWithPlatformOffset(16), color: "rgba(80, 78, 79, 0.7)" }]}>Frequency:</Text>
                            <View style={{ flexDirection: "row", alignItems: "center", gap: getNormalizedSizeWithPlatformOffset(10) }}>
                                <Feather name='clock' size={18} color={"rgba(156, 102, 12, 1)"} />
                                <Text style={[styles.text, { fontSize: getNormalizedSizeWithPlatformOffset(16), color: "rgba(51, 51, 51, 0.7)" }]}>Monthly</Text>
                            </View>
                        </View>

                        <TouchableOpacity style={styles.modalButton} onPress={() => { setIsVisible(false) }}>
                            <Text style={[styles.submitText, { fontWeight: 500 }]}>Activate Scheduled Payment</Text>
                            <Feather name='arrow-right' size={24} color={"#fff"} />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.modalButtons} onPress={() => { setIsVisible(false) }}>
                            <Text style={[styles.buttonText, { fontWeight: 500 }]}>Cancel</Text>
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
        backgroundColor: "#F5F5F5"
    },
    buttons: {
        width: getNormalizedSizeWithPlatformOffset(285),
        marginHorizontal: "auto",
        flexDirection: "row",
        gap: getNormalizedSizeWithPlatformOffset(21),
        justifyContent: "center",
        marginTop: getNormalizedVerticalSizeWithPlatformOffset(24)
    },
    modal: {
        flex: 1 / 4,
        backgroundColor: "#fff",
        paddingVertical: getNormalizedVerticalSizeWithPlatformOffset(16),
        paddingHorizontal: getNormalizedSizeWithPlatformOffset(16),
        justifyContent: "center"
    },
    modalHeading: {
        fontFamily: "DMSansBold",
        textAlign: "center",
        fontSize: getNormalizedSizeWithPlatformOffset(20),
        color: "#333333"
    },
    modalText: {
        fontSize: getNormalizedSizeWithPlatformOffset(14),
        fontFamily: "DMSans",
        color: "#6A6666",
        textAlign: "center"
    },
    modalButton: {
        flexDirection: "row",
        width: getNormalizedSizeWithPlatformOffset(300),
        marginHorizontal: "auto",
        height: getNormalizedVerticalSizeWithPlatformOffset(56),
        borderRadius: getNormalizedSizeWithPlatformOffset(8),
        backgroundColor: "#0C6599",
        justifyContent: "center",
        alignItems: "center",
        gap: getNormalizedSizeWithPlatformOffset(12),
        paddingVertical: getNormalizedVerticalSizeWithPlatformOffset(4),
        paddingHorizontal: getNormalizedSizeWithPlatformOffset(24),
        marginTop: getNormalizedVerticalSizeWithPlatformOffset(24)
    },
    paymentDetails: {
        width: getNormalizedSizeWithPlatformOffset(300),
        borderRadius: getNormalizedSizeWithPlatformOffset(5),
        borderWidth: getNormalizedSizeWithPlatformOffset(2),
        backgroundColor: "#DBE8FE",
        borderColor: "#1D38B4",
        padding: getNormalizedSizeWithPlatformOffset(10),
        gap: getNormalizedVerticalSizeWithPlatformOffset(16),
        marginVertical: getNormalizedVerticalSizeWithPlatformOffset(20)
    },
    text: {
        fontFamily: "DMSans"
    },
    modalButtons: {
        flexDirection: "row",
        width: getNormalizedSizeWithPlatformOffset(300),
        marginHorizontal: "auto",
        height: getNormalizedVerticalSizeWithPlatformOffset(56),
        borderRadius: getNormalizedSizeWithPlatformOffset(8),
        backgroundColor: "transparent",
        justifyContent: "center",
        alignItems: "center",
        gap: getNormalizedSizeWithPlatformOffset(12),
        paddingVertical: getNormalizedVerticalSizeWithPlatformOffset(4),
        paddingHorizontal: getNormalizedSizeWithPlatformOffset(24),
        marginTop: getNormalizedVerticalSizeWithPlatformOffset(24)
    },
    buttonText: {
        fontFamily: "DMSans",
        fontSize: getNormalizedSizeWithPlatformOffset(16),
        color: "#0C6599"
    },
    submitText: {
        fontFamily: "DMSans",
        fontSize: getNormalizedSizeWithPlatformOffset(16),
        color: "#fff"
    },
})