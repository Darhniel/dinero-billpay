import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, LayoutAnimation, Platform, UIManager, ScrollView } from 'react-native';
import { scale, verticalScale, moderateScale, moderateVerticalScale } from 'react-native-size-matters';


// Enable layout animation for Android
if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function FAQScreen() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  
  const faqData = [
    { 
      question: "What is Dinero-Bill Pay?", 
      answer: "Dinero-Bill Pay is a payment platform that allows users to easily pay their utility bills, schedule future payments, and manage their financial transactions from one place." 
    },
    { 
      question: "What types of bills can I pay using Dinero-Bill Pay?", 
      answer: "You can pay a variety of bills, including electricity, internet, water, and other utility services directly through the app." 
    },
    { 
      question: "How does the bill scheduling feature work?", 
      answer: "With the bill scheduling feature, you can set up automatic payments for a future date. Simply select the biller, enter the amount, choose the payment date, and Dinero-Bill Pay will handle the rest." 
    },
    { 
      question: "Is my data secure with Dinero-Bill Pay?", 
      answer: "Yes, your data is secure. We use industry-standard encryption to protect your personal information and ensure that all transactions are processed securely." 
    },
    { 
      question: "How do I create an account on Dinero-Bill Pay?", 
      answer: "Download the Dinero-Bill Pay app from the App Store or Google Play, follow the on-screen instructions to create an account, and start managing your payments." 
    },
    { 
      question: "Are there any fees for using Dinero-Bill Pay?", 
      answer: "Dinero-Bill Pay charges minimal transaction fees for certain payments. The exact fee will be displayed before you confirm each transaction." 
    },
    { 
      question: "Can I use Dinero-Bill Pay outside of Nigeria?", 
      answer: "Currently, Dinero-Bill Pay is designed for Nigerian users. However, you can still access the app and make payments if you have a Nigerian bank account and are making payments to Nigerian billers." 
    },
    { 
      question: "What should I do if my payment fails?", 
      answer: "If your payment fails, please check your internet connection or try again later. If the issue persists, contact our customer support team through the app for assistance." 
    },
    { 
      question: "Can I cancel a scheduled payment?", 
      answer: "Yes, you can cancel or modify a scheduled payment up to 24 hours before the set payment date. After that, the payment will be processed automatically." 
    },
    { 
      question: "How do I contact customer support?", 
      answer: "You can reach our customer support team directly through the app’s support section or by emailing us at support@dinero-billpay.com." 
    },
    { 
      question: "What payment methods are supported?", 
      answer: "Dinero-Bill Pay supports a variety of payment methods, including bank transfers and debit/credit cards." 
    },
    { 
      question: "How do I view my payment history?", 
      answer: "To view your payment history, log in to your account, go to the 'Transaction History' section, and see all your past payments and scheduled transactions." 
    },
    { 
      question: "Is there a minimum or maximum amount I can pay?", 
      answer: "The minimum and maximum payment amounts may vary depending on the biller or service provider. These limits will be displayed during the payment process." 
    },
    { 
      question: "Can I get a refund if I make a mistake with my payment?", 
      answer: "Refund policies depend on the service provider or biller. If you encounter an issue, please contact our support team, and we will assist you in resolving it with the relevant party." 
    },
    { 
      question: "How do I update my billing information or bank details?", 
      answer: "To update your billing information or bank details, log in to the app, go to the 'Account Settings' section, and make the necessary changes." 
    },
  ];

  const toggleExpand = (index: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <ScrollView style={styles.container}>
      {faqData.map((item, index) => (
        <View key={index}>
          <TouchableOpacity
            onPress={() => toggleExpand(index)}
            style={styles.questionContainer}
          >
            <Text style={styles.questionText}>{item.question}</Text>
          </TouchableOpacity>
          {expandedIndex === index && (
            <View style={styles.answerContainer}>
              <Text style={styles.answerText}>{item.answer}</Text>
            </View>
          )}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: scale(12),
    backgroundColor: '#f5f5f5',
  },
  questionContainer: {
    backgroundColor: '#ffffff',
    padding: scale(12),
    marginVertical: verticalScale(10),
    borderRadius: scale(5),
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 2,
  },
  questionText: {
    fontSize: scale(12),
    fontFamily: "DMSansBold"
  },
  answerContainer: {
    paddingHorizontal: scale(12),
    paddingBottom: verticalScale(10),
  },
  answerText: {
    fontSize: 14,
    color: '#333',
    fontFamily: "DMSans"
  },
});