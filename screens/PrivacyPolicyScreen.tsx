import { SafeAreaView, StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { scale, verticalScale, moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/FontAwesome';


export default function PrivacyPolicyScreen() {


    return (
        <ScrollView style={styles.container}>
            <StatusBar style={'light'} translucent={true} hidden={false} />

            <Text style={[styles.heading]}>1. Introduction</Text>
            <Text style={styles.text}>
                At Dinero-BillPay, your privacy is important to us. This privacy policy outlines how we collect, use, and protect your data when you use our app or website. By using Dinero-BillPay, you agree to the collection and use of information in accordance with this policy.
            </Text>

            <Text style={[styles.heading]}>2. Data Collection and Usage</Text>
            <Text style={styles.text}>
                We collect various types of information to provide and improve our service. The types of data we collect include:
            </Text>
            <View style={styles.listItem}>
                <Icon name="circle" size={8} color="#000" style={{ marginTop: moderateVerticalScale(4) }} />
                <View style={{ flexDirection: "row", gap: scale(8) }}>
                    <Text style={styles.text}>
                        <Text style={styles.subHeading}>Personal Information:{` `}</Text>
                        When you register for Dinero-BillPay, we may collect personally identifiable information such as your name, email address, phone number, and payment details
                    </Text>
                </View>
            </View>
            <View style={styles.listItem}>
                <Icon name="circle" size={8} color="#000" style={{ marginTop: moderateVerticalScale(4) }} />
                <View style={{ flexDirection: "row", gap: scale(8) }}>
                    <Text style={styles.text}>
                        <Text style={styles.subHeading}>Usage Data:{` `}</Text>
                        We collect data on how you access and use our app or website, including IP addresses, browser types, and activity logs.
                    </Text>
                </View>
            </View>
            <View style={styles.listItem}>
                <Icon name="circle" size={8} color="#000" style={{ marginTop: moderateVerticalScale(4) }} />
                <View style={{ flexDirection: "row", gap: scale(8) }}>
                    <Text style={styles.text}>
                        <Text style={styles.subHeading}>Transaction Data:{` `}</Text>
                        Information about your bill payments, scheduled payments, and transaction history will be collected to process your payments and provide you with transaction receipts.
                    </Text>
                </View>
            </View>
            <View style={[styles.listItem]}>
                <Icon name="circle" size={8} color="#000" style={{ marginTop: moderateVerticalScale(4) }} />
                <View style={{ flexDirection: "row", gap: scale(8) }}>
                    <Text style={styles.text}>
                        <Text style={styles.subHeading}>Device Information:{` `}</Text>
                        We may collect data about your device, including device model, operating system, and unique device identifiers
                    </Text>
                </View>
            </View>
            <Text style={styles.text}>
                This data helps us:
            </Text>
            <View style={styles.listItem}>
                <Icon name="circle" size={8} color="#000" style={{ marginTop: moderateVerticalScale(4) }} />
                <Text style={styles.text}>
                    Facilitate transactions through the app.
                </Text>
            </View>
            <View style={styles.listItem}>
                <Icon name="circle" size={8} color="#000" style={{ marginTop: moderateVerticalScale(4) }} />
                <Text style={styles.text}>
                    Provide customer support.
                </Text>
            </View>
            <View style={styles.listItem}>
                <Icon name="circle" size={8} color="#000" style={{ marginTop: moderateVerticalScale(4) }} />
                <Text style={styles.text}>
                    Improve app functionality and user experience.
                </Text>
            </View>

            <Text style={[styles.heading]}>3. Third-Party Services</Text>
            <Text style={styles.text}>
                Dinero-BillPay uses third-party service providers to process transactions and provide various app functionalities. These third-party services may have access to some of your personal data to perform their tasks, but they are obligated to use it only to provide the service.
            </Text>
            <Text style={[styles.text, { marginTop: verticalScale(8) }]}>
                We partner with:
            </Text>
            <View style={styles.listItem}>
                <Icon name="circle" size={8} color="#000" style={{ marginTop: moderateVerticalScale(4) }} />
                <Text style={styles.text}>
                    Payment gateways (to facilitate payments securely).
                </Text>
            </View>
            <View style={styles.listItem}>
                <Icon name="circle" size={8} color="#000" style={{ marginTop: moderateVerticalScale(4) }} />
                <Text style={styles.text}>
                    Analytics services (to improve app performance).
                </Text>
            </View>
            <Text style={styles.text}>
                We do not sell your personal information to any third parties
            </Text>

            <Text style={[styles.heading]}>4. Data Security</Text>
            <Text style={styles.text}>
                We take data security seriously and implement appropriate technical measures to protect your data from unauthorised access, alteration, or disclosure. All sensitive information such as payment data is encrypted and securely stored.
            </Text>

            <Text style={[styles.heading]}>5. Data Retention</Text>
            <Text style={styles.text}>
                Your data will be retained as long as your account is active or as necessary to comply with our legal obligations. Once your account is closed, your data will be securely deleted, unless required by law.
            </Text>

            <Text style={[styles.heading]}>6. User Control Over Data</Text>
            <View style={[styles.listItem]}>
                <Icon name="circle" size={8} color="#000" style={{ marginTop: moderateVerticalScale(4) }} />
                <View style={{ flexDirection: "row", gap: scale(8) }}>
                    <Text style={styles.text}>
                        <Text style={styles.subHeading}>Access & Update:{` `}</Text>
                        You can view and update your personal information directly from your profile section in the app.
                    </Text>
                </View>
            </View>
            <View style={[styles.listItem]}>
                <Icon name="circle" size={8} color="#000" style={{ marginTop: moderateVerticalScale(4) }} />
                <View style={{ flexDirection: "row", gap: scale(8) }}>
                    <Text style={styles.text}>
                        <Text style={styles.subHeading}>Data Deletion:{` `}</Text>
                        If you wish to delete your account and personal data, please contact us at [Insert Support Contact], and we will process your request in accordance with applicable laws.
                    </Text>
                </View>
            </View>
            <View style={[styles.listItem]}>
                <Icon name="circle" size={8} color="#000" style={{ marginTop: moderateVerticalScale(4) }} />
                <View style={{ flexDirection: "row", gap: scale(8) }}>
                    <Text style={styles.text}>
                        <Text style={styles.subHeading}>Opt-out of Marketing:{` `}</Text>
                        You can opt out of receiving promotional communications from us at any time by adjusting your preferences in the app settings.
                    </Text>
                </View>
            </View>

            <Text style={[styles.heading]}>7. Compliance with Legal Regulations</Text>
            <Text style={styles.text}>
                Dinero-BillPay complies with global data privacy regulations such as:
            </Text>
            <View style={styles.listItem}>
                <Icon name="circle" size={8} color="#000" style={{ marginTop: moderateVerticalScale(4) }} />
                <Text style={styles.subHeading}>
                    General Data Protection Regulation (GDPR)
                </Text>
            </View>
            <View style={styles.listItem}>
                <Icon name="circle" size={8} color="#000" style={{ marginTop: moderateVerticalScale(4) }} />
                <Text style={styles.subHeading}>
                    California Consumer Privacy Act (CCPA)
                </Text>
            </View>
            <Text style={styles.text}>
                If you are located in the European Union, you have the right to request access to your data, correct any inaccuracies, and request the deletion of your data under GDPR.
            </Text>

            <Text style={[styles.heading]}>8. USSD and Data Collection</Text>
            <Text style={styles.text}>
                For users accessing Dinero-BillPay via USSD, we only collect the essential data required to complete the transaction, including your phone number and payment details. No additional information is collected beyond what is necessary for providing the service.
            </Text>

            <Text style={[styles.heading]}>9. Changes to This Policy</Text>
            <Text style={styles.text}>
                We may update our Privacy Policy from time to time. Changes will be posted on this page, and users will be notified through the app or email.
            </Text>

            <Text style={[styles.heading]}>10. Contact Us</Text>
            <Text style={styles.text}>
                If you have any questions or concerns about this Privacy Policy, please contact us
            </Text>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    heading: {
        fontSize: scale(16),
        marginVertical: verticalScale(16),
        fontFamily: "DMSansBold",
        marginLeft: scale(18)
    },
    subHeading: {
        fontSize: scale(14),
        fontFamily: "DMSansBold"
    },
    text: {
        fontFamily: "DMSans",
        fontSize: scale(12),
        color: "#6A6666",
        width: scale(320),
        marginHorizontal: "auto",
    },
    listItem: {
        flexDirection: "row",
        gap: scale(8),
        marginLeft: scale(18),
        marginVertical: verticalScale(8)
    }
})