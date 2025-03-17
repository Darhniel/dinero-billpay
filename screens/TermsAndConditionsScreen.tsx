import { SafeAreaView, StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { scale, verticalScale, moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function TermsAndConditionsScreen() {
    
    return (
        <ScrollView style={styles.container}>
            <StatusBar style={'light'} translucent={true} hidden={false} />

            <Text style={styles.text}>
                Welcome to Dinero-BillPay! These Terms and Conditions govern your use of our website and mobile application. By accessing or using our services, you agree to be bound by these Terms. Please read them carefully before using our services.
            </Text>

            <Text style={[styles.heading]}>1. Acceptance of Terms</Text>
            <View style={styles.listItem}>
                <Icon name="circle" size={8} color="#000" style={{ marginTop: moderateVerticalScale(4) }} />
                <Text style={styles.text}>
                    By accessing or using the Dinero-BillPay website and app, you agree to comply with these Terms and any applicable laws and regulations.
                </Text>
            </View>
            <View style={styles.listItem}>
                <Icon name="circle" size={8} color="#000" style={{ marginTop: moderateVerticalScale(4) }} />
                <Text style={styles.text}>
                    If you do not agree with these Terms, you must not use our services.
                </Text>
            </View>

            <Text style={[styles.heading]}>2. Use of Services</Text>
            <View style={styles.listItem}>
                <Icon name="circle" size={8} color="#000" style={{ marginTop: moderateVerticalScale(4) }} />
                <View style={{ flexDirection: "row", gap: scale(8) }}>
                    <Text style={styles.text}>
                        <Text style={styles.subHeading}>Eligibility:{` `}</Text>
                        You must be at least 18 years old to use our services. By using Dinero-BillPay, you represent that you meet this age requirement.
                    </Text>
                </View>
            </View>
            <View style={styles.listItem}>
                <Icon name="circle" size={8} color="#000" style={{ marginTop: moderateVerticalScale(4) }} />
                <View style={{ flexDirection: "row", gap: scale(8) }}>
                    <Text style={styles.text}>
                        <Text style={styles.subHeading}>Account Registration:{` `}</Text>
                        You must create an account to access certain features. You are responsible for maintaining the confidentiality of your account credentials and for any activities under your account.
                    </Text>
                </View>
            </View>
            <View style={styles.listItem}>
                <Icon name="circle" size={8} color="#000" style={{ marginTop: moderateVerticalScale(4) }} />
                <View style={{ flexDirection: "row", gap: scale(8) }}>
                    <Text style={styles.text}>
                        <Text style={styles.subHeading}>Prohibited Activities:{` `}</Text>
                        You agree not to use our services for any unlawful purposes, including but not limited to money laundering, fraud, or unauthorised access to other accounts.
                    </Text>
                </View>
            </View>

            <Text style={[styles.heading]}>3. Payments and Transactions</Text>
            <View style={[styles.listItem]}>
                <Icon name="circle" size={8} color="#000" style={{ marginTop: moderateVerticalScale(4) }} />
                <View style={{ flexDirection: "row", gap: scale(8) }}>
                    <Text style={styles.text}>
                        <Text style={styles.subHeading}>Service Fees:{` `}</Text>
                        Dinero-BillPay may charge fees for certain transactions. These fees will be clearly outlined before you complete any transaction.
                    </Text>
                </View>
            </View>
            <View style={[styles.listItem]}>
                <Icon name="circle" size={8} color="#000" style={{ marginTop: moderateVerticalScale(4) }} />
                <View style={{ flexDirection: "row", gap: scale(8) }}>
                    <Text style={styles.text}>
                        <Text style={styles.subHeading}>Payment Methods:{` `}</Text>
                        You are responsible for providing accurate payment information. We are not liable for any issues arising from incorrect payment details.
                    </Text>
                </View>
            </View>
            <View style={[styles.listItem]}>
                <Icon name="circle" size={8} color="#000" style={{ marginTop: moderateVerticalScale(4) }} />
                <View style={{ flexDirection: "row", gap: scale(8) }}>
                    <Text style={styles.text}>
                        <Text style={styles.subHeading}>Refunds:{` `}</Text>
                        Refunds for transactions made through Dinero-BillPay are subject to our <Text style={styles.subHeading}>Refund Policy</Text>, which is available on our website. Please review the policy before making a payment.
                    </Text>
                </View>
            </View>
            <View style={[styles.listItem]}>
                <Icon name="circle" size={8} color="#000" style={{ marginTop: moderateVerticalScale(4) }} />
                <View style={{ flexDirection: "row", gap: scale(8) }}>
                    <Text style={styles.text}>
                        <Text style={styles.subHeading}>Transaction Limits:{` `}</Text>
                        We may impose limits on the amount you can pay or transfer through our services based on regulatory requirements or at our discretion.
                    </Text>
                </View>
            </View>

            <Text style={[styles.heading]}>4. Scheduling Bill Payments</Text>
            <View style={[styles.listItem]}>
                <Icon name="circle" size={8} color="#000" style={{ marginTop: moderateVerticalScale(4) }} />
                <View style={{ flexDirection: "row", gap: scale(8) }}>
                    <Text style={styles.text}>
                        <Text style={styles.subHeading}>Automated Payments:{` `}</Text>
                        Dinero-BillPay offers a feature that allows users to schedule bill payments. You are responsible for ensuring sufficient funds are available in your account at the time of the scheduled payment.
                    </Text>
                </View>
            </View>
            <View style={[styles.listItem]}>
                <Icon name="circle" size={8} color="#000" style={{ marginTop: moderateVerticalScale(4) }} />
                <View style={{ flexDirection: "row", gap: scale(8) }}>
                    <Text style={styles.text}>
                        <Text style={styles.subHeading}>Failed Payments:{` `}</Text>
                        Dinero-BillPay is not liable for any consequences arising from failed scheduled payments due to insufficient funds or incorrect payment details.
                    </Text>
                </View>
            </View>

            <Text style={[styles.heading]}>5. Intellectual Property</Text>
            <View style={[styles.listItem]}>
                <Icon name="circle" size={8} color="#000" style={{ marginTop: moderateVerticalScale(4) }} />
                <View style={{ flexDirection: "row", gap: scale(8) }}>
                    <Text style={styles.text}>
                        <Text style={styles.subHeading}>Ownership:{` `}</Text>
                        All content, logos, and trademarks used on the Dinero-BillPay platform are owned by Dinero or licensed to us. You may not use, copy, or reproduce any part of our services without our permission.
                    </Text>
                </View>
            </View>
            <View style={[styles.listItem]}>
                <Icon name="circle" size={8} color="#000" style={{ marginTop: moderateVerticalScale(4) }} />
                <View style={{ flexDirection: "row", gap: scale(8) }}>
                    <Text style={styles.text}>
                        <Text style={styles.subHeading}>User Content:{` `}</Text>
                        By submitting any content through our services, you grant us a non-exclusive, royalty-free, worldwide license to use, modify, and display such content to provide our services.
                    </Text>
                </View>
            </View>

            <Text style={[styles.heading]}>6. Data Privacy</Text>
            <View style={[styles.listItem]}>
                <Icon name="circle" size={8} color="#000" style={{ marginTop: moderateVerticalScale(4) }} />
                <View style={{ flexDirection: "row", gap: scale(8) }}>
                    <Text style={styles.text}>
                        <Text style={styles.subHeading}>Data Collection:{` `}</Text>
                        Your use of Dinero-BillPay is subject to our Privacy Policy, which outlines how we collect, use, and protect your data.
                    </Text>
                </View>
            </View>
            <View style={[styles.listItem]}>
                <Icon name="circle" size={8} color="#000" style={{ marginTop: moderateVerticalScale(4) }} />
                <View style={{ flexDirection: "row", gap: scale(8) }}>
                    <Text style={styles.text}>
                        <Text style={styles.subHeading}>Third-Party Services:{` `}</Text>
                        We may use third-party service providers for payment processing or other services. We are not responsible for the privacy practices of these third parties.
                    </Text>
                </View>
            </View>

            <Text style={[styles.heading]}>7. Limitation of Liability</Text>
            <View style={styles.listItem}>
                <Icon name="circle" size={8} color="#000" style={{ marginTop: moderateVerticalScale(4) }} />
                <Text style={styles.text}>
                    Dinero-BillPay will not be liable for any direct, indirect, incidental, or consequential damages arising out of or related to the use or inability to use our services, even if we have been advised of the possibility of such damages.
                </Text>
            </View>
            <View style={styles.listItem}>
                <Icon name="circle" size={8} color="#000" style={{ marginTop: moderateVerticalScale(4) }} />
                <Text style={styles.text}>
                    We do not guarantee the continuous availability of our services, and we reserve the right to suspend or terminate the services at any time for maintenance or other reasons.
                </Text>
            </View>

            <Text style={[styles.heading]}>8. Indemnification</Text>
            <View style={styles.listItem}>
                <Icon name="circle" size={8} color="#000" style={{ marginTop: moderateVerticalScale(4) }} />
                <Text style={styles.text}>
                    You agree to indemnify, defend, and hold Dinero-BillPay and its affiliates harmless from any claims, damages, losses, or liabilities arising out of your use of our services, violation of these Terms, or infringement of any third-party rights.
                </Text>
            </View>

            <Text style={[styles.heading]}>9. Termination</Text>
            <View style={[styles.listItem]}>
                <Icon name="circle" size={8} color="#000" style={{ marginTop: moderateVerticalScale(4) }} />
                <View style={{ flexDirection: "row", gap: scale(8) }}>
                    <Text style={styles.text}>
                        <Text style={styles.subHeading}>Account Suspension:{` `}</Text>
                        We reserve the right to suspend or terminate your account if you violate these Terms or engage in fraudulent or illegal activities.
                    </Text>
                </View>
            </View>
            <View style={[styles.listItem]}>
                <Icon name="circle" size={8} color="#000" style={{ marginTop: moderateVerticalScale(4) }} />
                <View style={{ flexDirection: "row", gap: scale(8) }}>
                    <Text style={styles.text}>
                        <Text style={styles.subHeading}>Termination by User:{` `}</Text>
                        You may terminate your account at any time by contacting our support team. Upon termination, your right to use our services will cease immediately.
                    </Text>
                </View>
            </View>

            <Text style={[styles.heading]}>10. Changes to These Terms</Text>
            <View style={styles.listItem}>
                <Icon name="circle" size={8} color="#000" style={{ marginTop: moderateVerticalScale(4) }} />
                <Text style={styles.text}>
                    We may update these Terms from time to time. The updated version will be posted on our website, and the changes will become effective immediately upon posting.
                </Text>
            </View>
            <View style={styles.listItem}>
                <Icon name="circle" size={8} color="#000" style={{ marginTop: moderateVerticalScale(4) }} />
                <Text style={styles.text}>
                    Your continued use of our services after any changes constitute your acceptance of the new Terms.
                </Text>
            </View>

            <Text style={[styles.heading]}>11. Governing Law</Text>
            <View style={styles.listItem}>
                <Icon name="circle" size={8} color="#000" style={{ marginTop: moderateVerticalScale(4) }} />
                <Text style={styles.text}>
                    These Terms and any disputes arising from your use of the Dinero-BillPay services are governed by the laws of [Your Country/Nigeria], without regard to its conflict of laws principles
                </Text>
            </View>

            <Text style={[styles.heading, {marginBottom: 0}]}>12. Contact Us</Text>
            <View style={[styles.listItem, {marginBottom: verticalScale(32)}]}>
                <Icon name="circle" size={8} color="#000" style={{ marginTop: moderateVerticalScale(4) }} />
                <Text style={styles.text}>
                    If you have any questions or concerns about these Terms or our services, please contact us
                </Text>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        paddingVertical: verticalScale(16)
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
        marginHorizontal: "auto",
    },
    listItem: {
        flexDirection: "row",
        gap: scale(8),
        marginLeft: scale(18),
        marginBottom: verticalScale(8),
        marginRight: scale(18)
    }
})