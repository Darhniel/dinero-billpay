import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import OTPScreen from "../screens/OTPScreen";
import HomeScreen from "../screens/HomeScreen";
import ServicesScreen from "../screens/ServicesScreen";
import SchedulesScreen from "../screens/SchedulesScreen";
import MenuScreen from "../screens/MenuScreen";
import SampleScreen from "../screens/SampleScreen";
import FundScreen from "../screens/FundScreen";
import UpdateProfileScreen from "../screens/UpdateProfileScreen";
import UploadIdScreen from "../screens/UploadIdScreen";
import PinScreen from "../screens/PinScreen";
import CardScreen from "../screens/CardScreen";
import UploadProfilePic from "../screens/UploadProfilePic";
import TransferScreen from "../screens/TransferScreen";
import WithdrawScreen from "../screens/WithdrawScreen";
import WithdrawalAccountScreen from "../screens/WithdrawalAccountScreen";
import PayBillsScreen from "../screens/PayBillsScreen";
import AirtimePaymentScreen from "../screens/AirtimePaymentScreen";
import DataPaymentScreen from "../screens/DataPaymentScreen";
import EnterPinScreen from "../screens/EnterPinScreen";
import HelpScreen from "../screens/HelpScreen";
import UpdatePersonalInfoScreen from "../screens/modScreens/UpdatePersonalInfoScreen";
import UpdateIdScreen from "../screens/modScreens/UpdateIdScreen";
import UpdateBankAndCardScreen from "../screens/modScreens/UpdateBankAndCardScreen";
import UpdateWithdrawalAccountScreen from "../screens/modScreens/UpdateWithdrawalAccountScreen";
import UpdateSecurityScreen from "../screens/modScreens/UpdateSecurityScreen";
import UpdateOTPScreen from "../screens/modScreens/UpdateOTPScreen";
import UpdatePinScreen from "../screens/modScreens/UpdatePinScreen";
import SuccessScreen from "../screens/modScreens/SuccessScreen";
import UpdatePasswordScreen from "../screens/modScreens/UpdatePasswordScreen";
import AboutUsScreen from "../screens/AboutUsScreen";
import PrivacyPolicyScreen from "../screens/PrivacyPolicyScreen";
import TermsAndConditionsScreen from "../screens/TermsAndConditionsScreen";
import ContactUsScreen from "../screens/ContactUsScreen";
import FAQScreen from "../screens/modScreens/FAQScreen";
import ScheduleScreen from "../screens/ScheduleScreen";
import Onboarding from "../screens/Onboarding";
import UtilityScreen from '../screens/UtilityScreen'
import UtilityDetailsScreen from "../screens/UtilityDetailsScreen";
import SummaryScreen from "../screens/SummaryScreen";
import { RootStackParamList } from "../types";
import EntertainmentScreen from "../screens/EntertainmentScreen";
import EntertainmentDetailsScreen from "../screens/EntertainmentDetailsScreen";
import InternetScreen from "../screens/InternetScreen";
import InternetDetailsScreen from "../screens/InternetDetailsScreen";
import SportsDetailsScreen from "../screens/SportsDetailsScreen";
import SportsScreen from "../screens/SportsScreen";
import createPasswordScreen from "../screens/CreatePasswordScreen";
import Web from "../components/WebView";
import GiftCardsScreen from "../screens/GiftCardsScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import UpdateIdDetailsScreen from "../screens/modScreens/UpdateIdDetailsScreen";


export default function StackNavigator() {
    const Stack = createNativeStackNavigator<RootStackParamList>();
    const Tab = createBottomTabNavigator<RootStackParamList>();
    const [token, setToken] = useState('');

    const [firstTime, setFirstTime] = useState<boolean | null>(null);

    useEffect(() => {
        async function setAccessToken() {
            try {
                // const remove = await AsyncStorage.removeItem("emailAddress");
                const access = await AsyncStorage.getItem("accessToken")

                if (access) {
                    setToken(access);
                }

                const hasLaunched = await AsyncStorage.getItem('hasLaunched');
                if (hasLaunched === null) {
                    // First time launching the app
                    await AsyncStorage.setItem('hasLaunched', 'true');
                    setFirstTime(true);
                } else {
                    setFirstTime(false);
                }
            } catch (error) {

            }
        }

        setAccessToken();

    }, []);

    if (firstTime === null) {
        // Return a loading screen or null while checking first launch status
        return null;
    }

    function BottomTab() {
        return (
            <Tab.Navigator
                screenOptions={{
                    tabBarLabelStyle: {
                        fontFamily: "DMSansBold"
                    },
                    tabBarActiveTintColor: "#0C6599",
                    tabBarInactiveTintColor: "#5F5B5D",
                }}
                backBehavior={"firstRoute"}
            >
                <Tab.Screen
                    name="Home"
                    component={HomeScreen}
                    initialParams={{ accessToken: token }}
                    options={{
                        headerShown: false,
                        tabBarLabel: "Home",
                        tabBarIcon: ({ color, focused }) => (
                            <Feather
                                name={"home"}
                                color={focused ? '#0C6599' : color}
                                size={24}
                            />
                        )
                    }}
                />

                <Tab.Screen
                    name="GiftCards"
                    component={GiftCardsScreen}
                    options={{
                        headerShown: true,
                        headerStyle: { backgroundColor: "#06334C" },
                        headerTitle: 'Gift Cards', headerTintColor: "#fff", headerTitleAlign: "center", headerTitleStyle: { fontFamily: "DMSansBold" },
                        tabBarLabel: 'Gift Card',
                        tabBarIcon: ({ color, focused }) => (
                            <Feather
                                name={"credit-card"}
                                color={focused ? "#0C6599" : color}
                                size={24}
                            />
                        ),
                    }}
                />

                <Tab.Screen
                    name="Payments"
                    component={PayBillsScreen}
                    options={{
                        headerShown: true,
                        headerStyle: { backgroundColor: "#06334C" },
                        headerTitle: 'Payments', headerTintColor: "#fff", headerTitleAlign: "center", headerTitleStyle: { fontFamily: "DMSansBold" },
                        tabBarLabel: 'Payments',
                        tabBarIcon: ({ color, focused }) => (
                            <MaterialIcons
                                name={"account-balance"}
                                color={focused ? "#0C6599" : color}
                                size={24}
                            />
                        ),
                    }}
                />

                <Tab.Screen
                    name="Schedules"
                    component={SchedulesScreen}
                    options={{
                        headerShown: true,
                        headerStyle: { backgroundColor: "#06334C" },
                        headerTitle: 'Schedules', headerTintColor: "#fff", headerTitleAlign: "center", headerTitleStyle: { fontFamily: "DMSansBold" },
                        tabBarLabel: 'Schedules',
                        tabBarIcon: ({ color, focused }) => (
                            <MaterialCommunityIcons
                                name={"clipboard-text-clock-outline"}
                                color={focused ? "#0C6599" : color}
                                size={24}
                            />
                        ),
                    }}
                />

                {/* <Tab.Screen
                    name="Help"
                    component={HelpScreen}
                    options={{
                        headerShown: true,
                        headerStyle: { backgroundColor: "#06334C" },
                        headerTitle: 'Help', headerTintColor: "#fff", headerTitleAlign: "center", headerTitleStyle: { fontFamily: "DMSansBold" },
                        tabBarLabel: 'Help',
                        tabBarIcon: ({ color, focused }) => (
                            <AntDesign
                                name={"customerservice"}
                                color={focused ? "#0C6599" : color}
                                size={24}
                            />
                        ),
                    }}
                /> */}

                <Tab.Screen
                    name="Menu"
                    component={MenuScreen}
                    options={{
                        headerShown: true,
                        headerStyle: { backgroundColor: "#06334C" },
                        headerTitle: 'Menu', headerTintColor: "#fff", headerTitleAlign: "center", headerTitleStyle: { fontFamily: "DMSansBold" },
                        tabBarLabel: 'Menu',
                        tabBarIcon: ({ color, focused }) => (
                            <MaterialCommunityIcons
                                name={"dots-horizontal"}
                                color={focused ? "#0C6599" : color}
                                size={24}
                            />
                        ),
                    }}
                />
            </Tab.Navigator>
        )
    }

    return (
        <NavigationContainer>

            <Stack.Navigator>
                {
                    firstTime ? (
                        <>
                            <Stack.Screen
                                name="Onboarding"
                                component={Onboarding}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="Login"
                                component={LoginScreen}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="Register"
                                component={RegisterScreen}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="OTP"
                                component={OTPScreen}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="CreatePassword"
                                component={createPasswordScreen}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="ForgotPassword"
                                component={ForgotPasswordScreen}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="Main"
                                component={BottomTab}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="UpdateProfile"
                                component={UpdateProfileScreen}
                                options={{
                                    headerShown: true,
                                    headerStyle: { backgroundColor: "#06334C" },
                                    headerTitle: 'Profile Set-Up', headerTintColor: "#fff", headerTitleAlign: "center", headerTitleStyle: { fontFamily: "DMSansBold" }
                                }}
                            />
                            <Stack.Screen
                                name="Id"
                                component={UploadIdScreen}
                                options={{
                                    headerShown: true,
                                    headerStyle: { backgroundColor: "#06334C" },
                                    headerTitle: 'ID Verification', headerTintColor: "#fff", headerTitleAlign: "center", headerTitleStyle: { fontFamily: "DMSansBold" }
                                }}
                            />
                            <Stack.Screen
                                name="Pin"
                                component={PinScreen}
                                options={{
                                    headerShown: true,
                                    headerStyle: { backgroundColor: "#06334C" },
                                    headerTitle: 'ID Verification', headerTintColor: "#fff", headerTitleAlign: "center", headerTitleStyle: { fontFamily: "DMSansBold" }
                                }}
                            />
                            <Stack.Screen
                                name="Card"
                                component={CardScreen}
                                options={{
                                    headerShown: true,
                                    headerStyle: { backgroundColor: "#06334C" },
                                    headerTitle: 'Add Card', headerTintColor: "#fff", headerTitleAlign: "center", headerTitleStyle: { fontFamily: "DMSansBold" }
                                }}
                            />
                            <Stack.Screen
                                name="ProfilePicture"
                                component={UploadProfilePic}
                                options={{
                                    headerShown: true,
                                    headerStyle: { backgroundColor: "#06334C" },
                                    headerTitle: 'Profile Picture', headerTintColor: "#fff", headerTitleAlign: "center", headerTitleStyle: { fontFamily: "DMSansBold" }
                                }}
                            />
                            <Stack.Screen
                                name="Fund"
                                component={FundScreen}
                                options={{
                                    headerShown: true,
                                    headerStyle: { backgroundColor: "#06334C" },
                                    headerTitle: 'Fund Wallet', headerTintColor: "#fff", headerTitleAlign: "center", headerTitleStyle: { fontFamily: "DMSansBold" }
                                }}
                            />
                            <Stack.Screen
                                name="Transfer"
                                component={TransferScreen}
                                options={{
                                    headerShown: true,
                                    headerStyle: { backgroundColor: "#06334C" },
                                    headerTitle: 'Fund Wallet', headerTintColor: "#fff", headerTitleAlign: "center", headerTitleStyle: { fontFamily: "DMSansBold" }
                                }}
                            />
                            <Stack.Screen
                                name="Withdraw"
                                component={WithdrawScreen}
                                options={{
                                    headerShown: true,
                                    headerStyle: { backgroundColor: "#06334C" },
                                    headerTitle: 'Withdraw From Wallet', headerTintColor: "#fff", headerTitleAlign: "center", headerTitleStyle: { fontFamily: "DMSansBold" }
                                }}
                            />
                            <Stack.Screen
                                name="WithdrawalAccount"
                                component={WithdrawalAccountScreen}
                                options={{
                                    headerShown: true,
                                    headerStyle: { backgroundColor: "#06334C" },
                                    headerTitle: 'Withdrawal Account', headerTintColor: "#fff", headerTitleAlign: "center", headerTitleStyle: { fontFamily: "DMSansBold" }
                                }}
                            />
                            <Stack.Screen
                                name="PayBills"
                                component={PayBillsScreen}
                                options={{
                                    headerShown: true,
                                    headerStyle: { backgroundColor: "#06334C" },
                                    headerTitle: 'Pay Bills', headerTintColor: "#fff", headerTitleAlign: "center", headerTitleStyle: { fontFamily: "DMSansBold" }
                                }}
                            />
                            <Stack.Screen
                                name="AirtimePayment"
                                component={AirtimePaymentScreen}
                                options={{
                                    headerShown: true,
                                    headerStyle: { backgroundColor: "#06334C" },
                                    headerTitle: 'Buy Airtime', headerTintColor: "#fff", headerTitleAlign: "center", headerTitleStyle: { fontFamily: "DMSansBold" }
                                }}
                            />
                            <Stack.Screen
                                name="DataPayment"
                                component={DataPaymentScreen}
                                options={{
                                    headerShown: true,
                                    headerStyle: { backgroundColor: "#06334C" },
                                    headerTitle: 'Data Bundles', headerTintColor: "#fff", headerTitleAlign: "center", headerTitleStyle: { fontFamily: "DMSansBold" }
                                }}
                            />
                            <Stack.Screen
                                name="EnterPin"
                                component={EnterPinScreen}
                                options={{
                                    headerShown: true,
                                    headerStyle: { backgroundColor: "#06334C" },
                                    headerTitle: 'Enter Pin', headerTintColor: "#fff", headerTitleAlign: "center", headerTitleStyle: { fontFamily: "DMSansBold" }
                                }}
                            />
                            <Stack.Screen
                                name="UpdatePersonalInfo"
                                component={UpdatePersonalInfoScreen}
                                options={{
                                    headerShown: true,
                                    headerStyle: { backgroundColor: "#06334C" },
                                    headerTitle: 'Enter Personal Infornation', headerTintColor: "#fff", headerTitleAlign: "center", headerTitleStyle: { fontFamily: "DMSansBold" }
                                }}
                            />
                            <Stack.Screen
                                name="UpdateId"
                                component={UpdateIdScreen}
                                options={{
                                    headerShown: true,
                                    headerStyle: { backgroundColor: "#06334C" },
                                    headerTitle: 'ID Verification', headerTintColor: "#fff", headerTitleAlign: "center", headerTitleStyle: { fontFamily: "DMSansBold" }
                                }}
                            />
                            <Stack.Screen
                                name="UpdateIdDetails"
                                component={UpdateIdDetailsScreen}
                                options={{
                                    headerShown: true,
                                    headerStyle: { backgroundColor: "#06334C" },
                                    headerTitle: 'ID Verification', headerTintColor: "#fff", headerTitleAlign: "center", headerTitleStyle: { fontFamily: "DMSansBold" }
                                }}
                            />
                            <Stack.Screen
                                name="UpdateBank"
                                component={UpdateBankAndCardScreen}
                                options={{
                                    headerShown: true,
                                    headerStyle: { backgroundColor: "#06334C" },
                                    headerTitle: 'Bank Account & Card', headerTintColor: "#fff", headerTitleAlign: "center", headerTitleStyle: { fontFamily: "DMSansBold" }
                                }}
                            />
                            <Stack.Screen
                                name="UpdateWithdrawalAccount"
                                component={UpdateWithdrawalAccountScreen}
                                options={{
                                    headerShown: true,
                                    headerStyle: { backgroundColor: "#06334C" },
                                    headerTitle: 'Withdrawal Account', headerTintColor: "#fff", headerTitleAlign: "center", headerTitleStyle: { fontFamily: "DMSansBold" }
                                }}
                            />
                            <Stack.Screen
                                name="UpdateSecurity"
                                component={UpdateSecurityScreen}
                                options={{
                                    headerShown: true,
                                    headerStyle: { backgroundColor: "#06334C" },
                                    headerTitle: 'Security', headerTintColor: "#fff", headerTitleAlign: "center", headerTitleStyle: { fontFamily: "DMSansBold" }
                                }}
                            />
                            <Stack.Screen
                                name="UpdateOTP"
                                component={UpdateOTPScreen}
                                options={{
                                    headerShown: true,
                                    headerStyle: { backgroundColor: "#06334C" },
                                    headerTitle: 'OTP Verification', headerTintColor: "#fff", headerTitleAlign: "center", headerTitleStyle: { fontFamily: "DMSansBold" }
                                }}
                            />
                            <Stack.Screen
                                name="UpdatePin"
                                component={UpdatePinScreen}
                                options={{
                                    headerShown: true,
                                    headerStyle: { backgroundColor: "#06334C" },
                                    headerTitle: 'Transaction PIN', headerTintColor: "#fff", headerTitleAlign: "center", headerTitleStyle: { fontFamily: "DMSansBold" }
                                }}
                            />
                            <Stack.Screen
                                name="UpdatePassword"
                                component={UpdatePasswordScreen}
                                options={{
                                    headerShown: true,
                                    headerStyle: { backgroundColor: "#06334C" },
                                    headerTitle: 'Password Reset', headerTintColor: "#fff", headerTitleAlign: "center", headerTitleStyle: { fontFamily: "DMSansBold" }
                                }}
                            />
                            <Stack.Screen
                                name="Success"
                                component={SuccessScreen}
                                options={{
                                    headerShown: false
                                }}
                            />
                            <Stack.Screen
                                name="AboutUs"
                                component={AboutUsScreen}
                                options={{
                                    headerShown: true,
                                    headerStyle: { backgroundColor: "#06334C" },
                                    headerTitle: 'About Us', headerTintColor: "#fff", headerTitleAlign: "center", headerTitleStyle: { fontFamily: "DMSansBold" }
                                }}
                            />
                            <Stack.Screen
                                name="PrivacyPolicy"
                                component={PrivacyPolicyScreen}
                                options={{
                                    headerShown: true,
                                    headerStyle: { backgroundColor: "#06334C" },
                                    headerTitle: 'Privacy Policy', headerTintColor: "#fff", headerTitleAlign: "center", headerTitleStyle: { fontFamily: "DMSansBold" }
                                }}
                            />
                            <Stack.Screen
                                name="Terms"
                                component={TermsAndConditionsScreen}
                                options={{
                                    headerShown: true,
                                    headerStyle: { backgroundColor: "#06334C" },
                                    headerTitle: 'Terms & Conditions', headerTintColor: "#fff", headerTitleAlign: "center", headerTitleStyle: { fontFamily: "DMSansBold" }
                                }}
                            />
                            <Stack.Screen
                                name="Contact"
                                component={ContactUsScreen}
                                options={{
                                    headerShown: true,
                                    headerStyle: { backgroundColor: "#06334C" },
                                    headerTitle: 'Contact Us', headerTintColor: "#fff", headerTitleAlign: "center", headerTitleStyle: { fontFamily: "DMSansBold" }
                                }}
                            />
                            <Stack.Screen
                                name="FAQ"
                                component={FAQScreen}
                                options={{
                                    headerShown: true,
                                    headerStyle: { backgroundColor: "#06334C" },
                                    headerTitle: 'Frequently Asked Questions', headerTintColor: "#fff", headerTitleAlign: "center", headerTitleStyle: { fontFamily: "DMSansBold" }
                                }}
                            />
                            <Stack.Screen
                                name="Schedule"
                                component={ScheduleScreen}
                                options={{
                                    headerShown: true,
                                    headerStyle: { backgroundColor: "#06334C" },
                                    headerTitle: 'Schedule', headerTintColor: "#fff", headerTitleAlign: "center", headerTitleStyle: { fontFamily: "DMSansBold" }
                                }}
                            />
                            <Stack.Screen
                                name="Utility"
                                component={UtilityScreen}
                                options={{
                                    headerShown: true,
                                    headerStyle: { backgroundColor: "#06334C" },
                                    headerTitle: 'Utility', headerTintColor: "#fff", headerTitleAlign: "center", headerTitleStyle: { fontFamily: "DMSansBold" }
                                }}
                            />
                            <Stack.Screen
                                name="UtilityDetails"
                                component={UtilityDetailsScreen}
                                options={{
                                    headerShown: true,
                                    headerStyle: { backgroundColor: "#06334C" },
                                    headerTitle: 'Utility', headerTintColor: "#fff", headerTitleAlign: "center", headerTitleStyle: { fontFamily: "DMSansBold" }
                                }}
                            />
                            <Stack.Screen
                                name="Summary"
                                component={SummaryScreen}
                                options={{
                                    headerShown: true,
                                    headerStyle: { backgroundColor: "#06334C" },
                                    headerTitle: 'Summary', headerTintColor: "#fff", headerTitleAlign: "center", headerTitleStyle: { fontFamily: "DMSansBold" }
                                }}
                            />
                            <Stack.Screen
                                name="Entertainment"
                                component={EntertainmentScreen}
                                options={{
                                    headerShown: true,
                                    headerStyle: { backgroundColor: "#06334C" },
                                    headerTitle: 'Entertainment', headerTintColor: "#fff", headerTitleAlign: "center", headerTitleStyle: { fontFamily: "DMSansBold" }
                                }}
                            />
                            <Stack.Screen
                                name="EntertainmentDetails"
                                component={EntertainmentDetailsScreen}
                                options={{
                                    headerShown: true,
                                    headerStyle: { backgroundColor: "#06334C" },
                                    headerTitle: 'Entertainment', headerTintColor: "#fff", headerTitleAlign: "center", headerTitleStyle: { fontFamily: "DMSansBold" }
                                }}
                            />
                            <Stack.Screen
                                name="Internet"
                                component={InternetScreen}
                                options={{
                                    headerShown: true,
                                    headerStyle: { backgroundColor: "#06334C" },
                                    headerTitle: 'Internet Subscription', headerTintColor: "#fff", headerTitleAlign: "center", headerTitleStyle: { fontFamily: "DMSansBold" }
                                }}
                            />
                            <Stack.Screen
                                name="InternetDetails"
                                component={InternetDetailsScreen}
                                options={{
                                    headerShown: true,
                                    headerStyle: { backgroundColor: "#06334C" },
                                    headerTitle: 'Internet Subscription', headerTintColor: "#fff", headerTitleAlign: "center", headerTitleStyle: { fontFamily: "DMSansBold" }
                                }}
                            />
                            <Stack.Screen
                                name="Sports"
                                component={SportsScreen}
                                options={{
                                    headerShown: true,
                                    headerStyle: { backgroundColor: "#06334C" },
                                    headerTitle: 'Sporting & Gaming',
                                    headerTintColor: "#fff", headerTitleAlign: "center", headerTitleStyle: { fontFamily: "DMSansBold" }
                                }}
                            />
                            <Stack.Screen
                                name="SportsDetails"
                                component={SportsDetailsScreen}
                                options={{
                                    headerShown: true,
                                    headerStyle: { backgroundColor: "#06334C" },
                                    headerTitle: 'Sporting & Gaming',
                                    headerTintColor: "#fff", headerTitleAlign: "center", headerTitleStyle: { fontFamily: "DMSansBold" }
                                }}
                            />
                        </>
                    ) : (
                        <>
                            <Stack.Screen
                                name="Login"
                                component={LoginScreen}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="Register"
                                component={RegisterScreen}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="OTP"
                                component={OTPScreen}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="CreatePassword"
                                component={createPasswordScreen}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="ForgotPassword"
                                component={ForgotPasswordScreen}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="Main"
                                component={BottomTab}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="UpdateProfile"
                                component={UpdateProfileScreen}
                                options={{
                                    headerShown: true,
                                    headerStyle: { backgroundColor: "#06334C" },
                                    headerTitle: 'Profile Set-Up', headerTintColor: "#fff", headerTitleAlign: "center", headerTitleStyle: { fontFamily: "DMSansBold" }
                                }}
                            />
                            <Stack.Screen
                                name="Id"
                                component={UploadIdScreen}
                                options={{
                                    headerShown: true,
                                    headerStyle: { backgroundColor: "#06334C" },
                                    headerTitle: 'ID Verification', headerTintColor: "#fff", headerTitleAlign: "center", headerTitleStyle: { fontFamily: "DMSansBold" }
                                }}
                            />
                            <Stack.Screen
                                name="Pin"
                                component={PinScreen}
                                options={{
                                    headerShown: true,
                                    headerStyle: { backgroundColor: "#06334C" },
                                    headerTitle: 'ID Verification', headerTintColor: "#fff", headerTitleAlign: "center", headerTitleStyle: { fontFamily: "DMSansBold" }
                                }}
                            />
                            <Stack.Screen
                                name="Card"
                                component={CardScreen}
                                options={{
                                    headerShown: true,
                                    headerStyle: { backgroundColor: "#06334C" },
                                    headerTitle: 'Add Card', headerTintColor: "#fff", headerTitleAlign: "center", headerTitleStyle: { fontFamily: "DMSansBold" }
                                }}
                            />
                            <Stack.Screen
                                name="ProfilePicture"
                                component={UploadProfilePic}
                                options={{
                                    headerShown: true,
                                    headerStyle: { backgroundColor: "#06334C" },
                                    headerTitle: 'Profile Picture', headerTintColor: "#fff", headerTitleAlign: "center", headerTitleStyle: { fontFamily: "DMSansBold" }
                                }}
                            />
                            <Stack.Screen
                                name="Fund"
                                component={FundScreen}
                                options={{
                                    headerShown: true,
                                    headerStyle: { backgroundColor: "#06334C" },
                                    headerTitle: 'Fund Wallet', headerTintColor: "#fff", headerTitleAlign: "center", headerTitleStyle: { fontFamily: "DMSansBold" }
                                }}
                            />
                            <Stack.Screen
                                name="Transfer"
                                component={TransferScreen}
                                options={{
                                    headerShown: true,
                                    headerStyle: { backgroundColor: "#06334C" },
                                    headerTitle: 'Fund Wallet', headerTintColor: "#fff", headerTitleAlign: "center", headerTitleStyle: { fontFamily: "DMSansBold" }
                                }}
                            />
                            <Stack.Screen
                                name="Withdraw"
                                component={WithdrawScreen}
                                options={{
                                    headerShown: true,
                                    headerStyle: { backgroundColor: "#06334C" },
                                    headerTitle: 'Withdraw From Wallet', headerTintColor: "#fff", headerTitleAlign: "center", headerTitleStyle: { fontFamily: "DMSansBold" }
                                }}
                            />
                            <Stack.Screen
                                name="WithdrawalAccount"
                                component={WithdrawalAccountScreen}
                                options={{
                                    headerShown: true,
                                    headerStyle: { backgroundColor: "#06334C" },
                                    headerTitle: 'Withdrawal Account', headerTintColor: "#fff", headerTitleAlign: "center", headerTitleStyle: { fontFamily: "DMSansBold" }
                                }}
                            />
                            <Stack.Screen
                                name="PayBills"
                                component={PayBillsScreen}
                                options={{
                                    headerShown: true,
                                    headerStyle: { backgroundColor: "#06334C" },
                                    headerTitle: 'Pay Bills', headerTintColor: "#fff", headerTitleAlign: "center", headerTitleStyle: { fontFamily: "DMSansBold" }
                                }}
                            />
                            <Stack.Screen
                                name="AirtimePayment"
                                component={AirtimePaymentScreen}
                                options={{
                                    headerShown: true,
                                    headerStyle: { backgroundColor: "#06334C" },
                                    headerTitle: 'Buy Airtime', headerTintColor: "#fff", headerTitleAlign: "center", headerTitleStyle: { fontFamily: "DMSansBold" }
                                }}
                            />
                            <Stack.Screen
                                name="DataPayment"
                                component={DataPaymentScreen}
                                options={{
                                    headerShown: true,
                                    headerStyle: { backgroundColor: "#06334C" },
                                    headerTitle: 'Data Bundles', headerTintColor: "#fff", headerTitleAlign: "center", headerTitleStyle: { fontFamily: "DMSansBold" }
                                }}
                            />
                            <Stack.Screen
                                name="EnterPin"
                                component={EnterPinScreen}
                                options={{
                                    headerShown: true,
                                    headerStyle: { backgroundColor: "#06334C" },
                                    headerTitle: 'Enter Pin', headerTintColor: "#fff", headerTitleAlign: "center", headerTitleStyle: { fontFamily: "DMSansBold" }
                                }}
                            />
                            <Stack.Screen
                                name="UpdatePersonalInfo"
                                component={UpdatePersonalInfoScreen}
                                options={{
                                    headerShown: true,
                                    headerStyle: { backgroundColor: "#06334C" },
                                    headerTitle: 'Enter Personal Infornation', headerTintColor: "#fff", headerTitleAlign: "center", headerTitleStyle: { fontFamily: "DMSansBold" }
                                }}
                            />
                            <Stack.Screen
                                name="UpdateId"
                                component={UpdateIdScreen}
                                options={{
                                    headerShown: true,
                                    headerStyle: { backgroundColor: "#06334C" },
                                    headerTitle: 'ID Verification', headerTintColor: "#fff", headerTitleAlign: "center", headerTitleStyle: { fontFamily: "DMSansBold" }
                                }}
                            />
                            <Stack.Screen
                                name="UpdateIdDetails"
                                component={UpdateIdDetailsScreen}
                                options={{
                                    headerShown: true,
                                    headerStyle: { backgroundColor: "#06334C" },
                                    headerTitle: 'ID Verification', headerTintColor: "#fff", headerTitleAlign: "center", headerTitleStyle: { fontFamily: "DMSansBold" }
                                }}
                            />
                            <Stack.Screen
                                name="UpdateBank"
                                component={UpdateBankAndCardScreen}
                                options={{
                                    headerShown: true,
                                    headerStyle: { backgroundColor: "#06334C" },
                                    headerTitle: 'Bank Account & Card', headerTintColor: "#fff", headerTitleAlign: "center", headerTitleStyle: { fontFamily: "DMSansBold" }
                                }}
                            />
                            <Stack.Screen
                                name="UpdateWithdrawalAccount"
                                component={UpdateWithdrawalAccountScreen}
                                options={{
                                    headerShown: true,
                                    headerStyle: { backgroundColor: "#06334C" },
                                    headerTitle: 'Withdrawal Account', headerTintColor: "#fff", headerTitleAlign: "center", headerTitleStyle: { fontFamily: "DMSansBold" }
                                }}
                            />
                            <Stack.Screen
                                name="UpdateSecurity"
                                component={UpdateSecurityScreen}
                                options={{
                                    headerShown: true,
                                    headerStyle: { backgroundColor: "#06334C" },
                                    headerTitle: 'Security', headerTintColor: "#fff", headerTitleAlign: "center", headerTitleStyle: { fontFamily: "DMSansBold" }
                                }}
                            />
                            <Stack.Screen
                                name="UpdateOTP"
                                component={UpdateOTPScreen}
                                options={{
                                    headerShown: true,
                                    headerStyle: { backgroundColor: "#06334C" },
                                    headerTitle: 'OTP Verification', headerTintColor: "#fff", headerTitleAlign: "center", headerTitleStyle: { fontFamily: "DMSansBold" }
                                }}
                            />
                            <Stack.Screen
                                name="UpdatePin"
                                component={UpdatePinScreen}
                                options={{
                                    headerShown: true,
                                    headerStyle: { backgroundColor: "#06334C" },
                                    headerTitle: 'Transaction PIN', headerTintColor: "#fff", headerTitleAlign: "center", headerTitleStyle: { fontFamily: "DMSansBold" }
                                }}
                            />
                            <Stack.Screen
                                name="UpdatePassword"
                                component={UpdatePasswordScreen}
                                options={{
                                    headerShown: true,
                                    headerStyle: { backgroundColor: "#06334C" },
                                    headerTitle: 'Password Reset', headerTintColor: "#fff", headerTitleAlign: "center", headerTitleStyle: { fontFamily: "DMSansBold" }
                                }}
                            />
                            <Stack.Screen
                                name="Success"
                                component={SuccessScreen}
                                options={{
                                    headerShown: false
                                }}
                            />
                            <Stack.Screen
                                name="AboutUs"
                                component={AboutUsScreen}
                                options={{
                                    headerShown: true,
                                    headerStyle: { backgroundColor: "#06334C" },
                                    headerTitle: 'About Us', headerTintColor: "#fff", headerTitleAlign: "center", headerTitleStyle: { fontFamily: "DMSansBold" }
                                }}
                            />
                            <Stack.Screen
                                name="PrivacyPolicy"
                                component={PrivacyPolicyScreen}
                                options={{
                                    headerShown: true,
                                    headerStyle: { backgroundColor: "#06334C" },
                                    headerTitle: 'Privacy Policy', headerTintColor: "#fff", headerTitleAlign: "center", headerTitleStyle: { fontFamily: "DMSansBold" }
                                }}
                            />
                            <Stack.Screen
                                name="Terms"
                                component={TermsAndConditionsScreen}
                                options={{
                                    headerShown: true,
                                    headerStyle: { backgroundColor: "#06334C" },
                                    headerTitle: 'Terms & Conditions', headerTintColor: "#fff", headerTitleAlign: "center", headerTitleStyle: { fontFamily: "DMSansBold" }
                                }}
                            />
                            <Stack.Screen
                                name="Contact"
                                component={ContactUsScreen}
                                options={{
                                    headerShown: true,
                                    headerStyle: { backgroundColor: "#06334C" },
                                    headerTitle: 'Contact Us', headerTintColor: "#fff", headerTitleAlign: "center", headerTitleStyle: { fontFamily: "DMSansBold" }
                                }}
                            />
                            <Stack.Screen
                                name="FAQ"
                                component={FAQScreen}
                                options={{
                                    headerShown: true,
                                    headerStyle: { backgroundColor: "#06334C" },
                                    headerTitle: 'Frequently Asked Questions', headerTintColor: "#fff", headerTitleAlign: "center", headerTitleStyle: { fontFamily: "DMSansBold" }
                                }}
                            />
                            <Stack.Screen
                                name="Schedule"
                                component={ScheduleScreen}
                                options={{
                                    headerShown: true,
                                    headerStyle: { backgroundColor: "#06334C" },
                                    headerTitle: 'Schedule', headerTintColor: "#fff", headerTitleAlign: "center", headerTitleStyle: { fontFamily: "DMSansBold" }
                                }}
                            />
                            <Stack.Screen
                                name="Utility"
                                component={UtilityScreen}
                                options={{
                                    headerShown: true,
                                    headerStyle: { backgroundColor: "#06334C" },
                                    headerTitle: 'Utility', headerTintColor: "#fff", headerTitleAlign: "center", headerTitleStyle: { fontFamily: "DMSansBold" }
                                }}
                            />
                            <Stack.Screen
                                name="UtilityDetails"
                                component={UtilityDetailsScreen}
                                options={{
                                    headerShown: true,
                                    headerStyle: { backgroundColor: "#06334C" },
                                    headerTitle: 'Utility', headerTintColor: "#fff", headerTitleAlign: "center", headerTitleStyle: { fontFamily: "DMSansBold" }
                                }}
                            />
                            <Stack.Screen
                                name="Summary"
                                component={SummaryScreen}
                                options={{
                                    headerShown: true,
                                    headerStyle: { backgroundColor: "#06334C" },
                                    headerTitle: 'Summary', headerTintColor: "#fff", headerTitleAlign: "center", headerTitleStyle: { fontFamily: "DMSansBold" }
                                }}
                            />
                            <Stack.Screen
                                name="Entertainment"
                                component={EntertainmentScreen}
                                options={{
                                    headerShown: true,
                                    headerStyle: { backgroundColor: "#06334C" },
                                    headerTitle: 'Entertainment', headerTintColor: "#fff", headerTitleAlign: "center", headerTitleStyle: { fontFamily: "DMSansBold" }
                                }}
                            />
                            <Stack.Screen
                                name="EntertainmentDetails"
                                component={EntertainmentDetailsScreen}
                                options={{
                                    headerShown: true,
                                    headerStyle: { backgroundColor: "#06334C" },
                                    headerTitle: 'Entertainment', headerTintColor: "#fff", headerTitleAlign: "center", headerTitleStyle: { fontFamily: "DMSansBold" }
                                }}
                            />
                            <Stack.Screen
                                name="Internet"
                                component={InternetScreen}
                                options={{
                                    headerShown: true,
                                    headerStyle: { backgroundColor: "#06334C" },
                                    headerTitle: 'Internet Subscription', headerTintColor: "#fff", headerTitleAlign: "center", headerTitleStyle: { fontFamily: "DMSansBold" }
                                }}
                            />
                            <Stack.Screen
                                name="InternetDetails"
                                component={InternetDetailsScreen}
                                options={{
                                    headerShown: true,
                                    headerStyle: { backgroundColor: "#06334C" },
                                    headerTitle: 'Internet Subscription', headerTintColor: "#fff", headerTitleAlign: "center", headerTitleStyle: { fontFamily: "DMSansBold" }
                                }}
                            />
                            <Stack.Screen
                                name="Sports"
                                component={SportsScreen}
                                options={{
                                    headerShown: true,
                                    headerStyle: { backgroundColor: "#06334C" },
                                    headerTitle: 'Sporting & Gaming',
                                    headerTintColor: "#fff", headerTitleAlign: "center", headerTitleStyle: { fontFamily: "DMSansBold" }
                                }}
                            />
                            <Stack.Screen
                                name="SportsDetails"
                                component={SportsDetailsScreen}
                                options={{
                                    headerShown: true,
                                    headerStyle: { backgroundColor: "#06334C" },
                                    headerTitle: 'Sporting & Gaming',
                                    headerTintColor: "#fff", headerTitleAlign: "center", headerTitleStyle: { fontFamily: "DMSansBold" }
                                }}
                            />
                            <Stack.Screen
                                name="WebView"
                                component={Web}
                                options={{
                                    headerShown: false,
                                    headerStyle: { backgroundColor: "#06334C" },
                                    headerTitle: 'Sporting & Gaming',
                                    headerTintColor: "#fff", headerTitleAlign: "center", headerTitleStyle: { fontFamily: "DMSansBold" }
                                }}
                            />
                        </>
                    )
                }
            </Stack.Navigator>
        </NavigationContainer>
    )
}