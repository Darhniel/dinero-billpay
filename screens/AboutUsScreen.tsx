import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { scale, verticalScale, moderateScale, moderateVerticalScale } from 'react-native-size-matters';

export default function AboutUsScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style={'light'} translucent={true} hidden={false} />

            <Text style={styles.heading}>Welcome to Dinero BillPay, your trusted partner for seamless and secure bill payments in Nigeria.</Text>

            <Text style={styles.text}>
                At Dinero-Bill Pay, we understand that managing your finances can be a challenge, especially when it comes to keeping track of multiple bills and payments. That’s why we’ve created a platform that simplifies the payment process, allowing you to pay bills with ease and schedule future payments so you can plan and stay on top of your budget.
            </Text>

            <Text style={styles.text}>
                Our platform is designed with your needs in mind, offering a user-friendly interface that ensures every transaction is quick, efficient, and secure. We are committed to providing a reliable service that you can trust, with a focus on helping you manage your money better and ensuring a smooth payment experience every time.
            </Text>

            <Text style={[styles.heading, { marginBottom: verticalScale(8) }]}>Our Mission</Text>

            <Text style={styles.text}>
                Our mission is to empower individuals and businesses in Nigeria with a convenient and secure solution for managing their bill payments. We aim to simplify the way you pay bills, giving you more time to focus on what truly matters.
            </Text>

            <Text style={[styles.heading, { marginBottom: verticalScale(8) }]}>Our Vision</Text>

            <Text style={styles.text}>
                To be the leading platform for bill payments in Nigeria, known for our commitment to customer satisfaction, innovation, and secure transactions.
            </Text>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    heading: {
        fontSize: scale(16),
        textAlign: "center",
        marginVertical: verticalScale(16),
        fontFamily: "DMSansBold"
    },
    text: {
        fontFamily: "DMSans",
        fontSize: scale(12),
        color: "#6A6666",
        width: scale(320),
        marginHorizontal: "auto",
        textAlign: "center",
    }
})