type Plan = {
  amount: string;
  id: string;
  name: string;
};

export type RootStackParamList = {
  Onboarding: undefined;  // No params for this screen
  Login: {};
  Register: undefined;
  OTP: { email: string };
  CreatePassword: { email: string };
  Main: { screen: string };
  Home: {};
  UpdateProfile: {};
  Id: {};
  Pin: {};
  Card: {};
  ProfilePicture: undefined;
  Fund: undefined;
  Transfer: undefined;
  Withdraw: undefined;
  WithdrawalAccount: undefined;
  PayBills: undefined;
  AirtimePayment: undefined;
  DataPayment: undefined;
  EnterPin: {
    info: {
      transaction: string,
      id: string,
      amount: string,
      phoneNumber: string,
      decoderNo: string,
      meterNo: string,
      email: string
    }
  };
  UpdatePersonalInfo: undefined;
  UpdateId: undefined;
  UpdateBank: undefined;
  UpdateWithdrawalAccount: undefined;
  UpdateSecurity: undefined;
  UpdateOTP: {
    user: {
      pin: boolean, 
      password: boolean
    }
  };
  UpdatePin: undefined;
  UpdatePassword: {
    user: {
      pin: boolean, 
      password: boolean
    }
  };
  Success: undefined;
  AboutUs: undefined;
  PrivacyPolicy: undefined;
  Terms: undefined;
  Contact: undefined;
  FAQ: undefined;
  Schedule: undefined;
  Utility: undefined;
  UtilityDetails: {
    filtered: [
      {
        labelName: string,
        logo: string,
        network: string,
        plans: Plan[]
      }
    ]
  };
  Summary: {
    user: {
      amount: string,
      dataPlan: string,
      decoderNo: string,
      decoderPackage: string,
      email: string,
      image: string,
      meterNo: string,
      meterType: string,
      name: string,
      phone: string,
      userId: string,
      transaction: string
    }
  };  // Example of a screen that takes a param
  Entertainment: undefined;
  EntertainmentDetails: {
    filtered: [
      {
        labelName: string,
        logo: string,
        network: string,
        plans: Plan[]
      }
    ]
  };
  Internet: undefined;
  InternetDetails: {
    filtered: [
      {
        labelName: string,
        logo: string,
        network: string,
        plans: Plan[]
      }
    ]
  };
  Sports: undefined;
  SportsDetails: { image: string, name: string };
  WebView: { url: string };
  GiftCards: undefined;
  Payments: undefined;
  Schedules: undefined;
  Menu: undefined;
  UpdateIdDetails: {};
  ForgotPassword: undefined;
};