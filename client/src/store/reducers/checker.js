import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  jobEndDate:'',
  jobAddress: '',
  prevJobAddress:'',
  jobOccupation: '',
  employerName: '',
  employerPhoneNumber: '',
  jobApt: '',
  jobCity: '',
  jobState: '',
  jobZipcode: '',
  jobSalary: '',
  jobstatus: '',
  jobYear: '',
  prevjobOccupation: '',
  prevemployerName: '',
  prevemployerPhoneNumber: '',
  prevjobApt: '',
  prevjobCity: '',
  prevjobState: '',
  prevjobZipcode: '',
  prevjobSalary: '',
  prevjobstatus: '',
  prevjobYear: '',
  progress: 0,
  monthlyPay: '',
  residentalYears: '',
  residentalMonths: '',
  previousMonthlyPay: '',
  previousResidentalYears: '',
  previousResidentalMonths: '',
  payDwon: '',
  driverNumber: '',
  driverDate: '',
  driverState: '',
  iType: '',
  iIsuer: '',
  iDate: '',
  usCitizen: '',
  type: '',
  mobile: '',
  step: 0,
  history: [],
  dealerName: '',
  dealerLogo: '',
  dealerId: '',
  dealerConvertId: '',
  checkerMobileNumber: '',
  checkerFirstName: '',
  checkerMiddleName: '',
  checkerIsSkipMiddleName: false,
  checkerLastName: '',
  checkerEmail: '',
  checkerSocialNumber: '',
  checkerBirthday: '',
  checkerAddress: '',
  checkerApt: '',
  checkerLocality: '',
  checkerState: '',
  checkerZipcode: '',
  previousCheckerAddress: '',
  previousCheckerApt: '',
  previousCheckerLocality: '',
  previousCheckerState: '',
  previousCheckerZipcode: '',
  dealType: '',
  quoteStatus: 'New',
  quoteSource: 'ChatBot',
  quoteInterest: '',
  instantYear: '',
  instantMake: '',
  instantModel: '',
  vehicleCondition: '',
  mileageHour: '',
  originalOwner: '',
  vin: '',
  vehicleType: '',
  commentValue: '',
  deviceIP: '',
  deviceOS: '',
  deviceState: '',
  deviceCity: '',
  deviceCountry: '',
  deviceDate: '',
  deviceLat: '',
  deviceLon: '',
  deviceBrowser: '',
  intentID: '',
};

export const checkerSlice = createSlice({
  name: 'checker',
  initialState,
  reducers: {
    setJobEndDate: (state, action) => {
      state.jobEndDate = action.payload
    },
    setJobAddress: (state, action) => {
      state.jobAddress = action.payload
    },
    prevJobAddress: (state, action) => {
      state.prevJobAddress = action.prevJobAddress
    },
    setJobOccupation: (state, action) => {
      state.jobOccupation = action.payload
    },
    setEmployerName: (state, action) => {
      state.employerName = action.payload
    },
    setEmployerPhoneNumber: (state, action) => {
      state.employerPhoneNumber = action.payload
    },
    setJobApt: (state, action) => {
      state.jobApt = action.payload
    },
    setJobCity: (state, action) => {
      state.jobCity = action.payload
    },
    setJobState: (state, action) => {
      state.jobState = action.payload
    },
    setJobZipcode: (state, action) => {
      state.jobZipcode = action.payload
    },
    setJobSalary: (state, action) => {
      state.jobSalary = action.payload
    },
    setJobstatus: (state, action) => {
      state.jobstatus = action.payload
    },
    setJobYear: (state, action) => {
      state.jobYear = action.payload
    },
    setPrevjobOccupation: (state, action) => {
      state.prevjobOccupation = action.payload
    },
    setPrevEmployerName: (state, action) => {
      state.employerName = action.payload
    },
    setPrevEmployerPhoneNumber: (state, action) => {
      state.prevemployerPhoneNumber = action.payload
    },
    setPrevJobApt: (state, action) => {
      state.prevjobApt = action.payload
    },
    setPrevJobCity: (state, action) => {
      state.prevjobCity = action.payload
    },
    setPrevJobState: (state, action) => {
      state.prevjobState = action.payload
    },
    setPrevJobZipcode: (state, action) => {
      state.prevjobZipcode = action.payload
    },
    setPrevJobSalary: (state, action) => {
      state.prevjobSalary = action.payload
    },
    setPrevJobstatus: (state, action) => {
      state.prevjobstatus = action.payload
    },
    setPrevJobYear: (state, action) => {
      state.prevjobYear = action.payload
    },
    setProgress: (state) => {
      state.progress += 1
    },
    //set Residental information
    setMonthlyPay: (state, action) => {
      state.monthlyPay = action.payload
    },
    setResidentalYears: (state, action) => {
      state.residentalYears = action.payload
    },
    setResidentalMonths: (state, action) => {
      state.residentalMonths = action.payload
    },
    //set previous residental information
    setPreviousMonthlyPay: (state, action) => {
      state.previousMonthlyPay = action.payload
    },
    setPreviousResidentalYears: (state, action) => {
      state.previousResidentalYears = action.payload
    },
    setPreviousResidentalMonths: (state, action) => {
      state.previousResidentalMonths = action.payload
    },
    setPayDown: (state, action) => {
      state.payDwon = action.payload
    },
    //set dealer Converted ID
    setDealerConvertedID: (state, action) => {
      state.dealerConvertId = action.payload
    },
    //driver license information
    setDriverNumber: (state, action) => {
      state.driverNumber = action.payload;
    },
    setDriverDate: (state, action) => {
      state.driverDate = action.payload;
    },
    setDriverState: (state, action) => {
      state.driverState = action.payload;
    },
    setIType: (state, action) => {
      state.iType = action.payload;
    },
    setIIsuer: (state, action) => {
      state.iIsuer = action.payload
    },
    setIDate: (state, action) => {
      state.iDate = action.payload
    },
    // decision if us citizen
    setUSCitizen: (state, action) => {
      state.usCitizen = action.payload;
    },
    //set intent function ID
    setIntentID: (state, action) => {
      state.intentID = action.payload;
    },
    //set device information
    setDeviceIP: (state, action) => {
      state.deviceIP = action.payload;
    },
    setDeviceOS: (state, action) => {
      state.deviceOS = action.payload;
    },
    setDeviceType: (state, action) => {
      state.deviceType = action.payload;
    },
    setDeviceState: (state, action) => {
      state.deviceState = action.payload;
    },
    setDeviceCity: (state, action) => {
      state.deviceCity = action.payload;
    },
    setDeviceCountry: (state, action) => {
      state.deviceCountry = action.payload;
    },
    setDeviceDate: (state, action) => {
      state.deviceDate = action.payload;
    },
    setDeviceLat: (state, action) => {
      state.deviceLat = action.payload;
    },
    setDeviceLon: (state, action) => {
      state.deviceLon = action.payload;
    },
    setDeviceBrowser: (state, action) => {
      state.deviceBrowser = action.payload;
    },
    // Set rendering type
    setRenderType: (state, action) => {
      state.type = action.payload;
    },

    // Set comment value
    setCommentValue: (state, action) => {
      state.commentValue = action.payload;
    },

    // Set vin
    setVehicleType: (state, action) => {
      state.vehicleType = action.payload;
    },

    // Set vin
    setVin: (state, action) => {
      state.vin = action.payload;
    },
    // Set mileage hour
    setMileageHour: (state, action) => {
      state.mileageHour = action.payload;
    },

    // Set original owner
    setOriginalOwner: (state, action) => {
      state.originalOwner = action.payload;
    },

    // Set vehicle condition
    setVehicleCondition: (state, action) => {
      state.vehicleCondition = action.payload;
    },

    // Set instant year, make and model
    setInstantYear: (state, action) => {
      state.instantYear = action.payload;
    },

    setInstantMake: (state, action) => {
      state.instantMake = action.payload;
    },

    setInstantModel: (state, action) => {
      state.instantModel = action.payload;
    },

    // Set deal type
    setDealType: (state, action) => {
      state.dealType = action.payload;
    },

    // Set quote status
    setQuoteStatus: (state, action) => {
      state.quoteStatus = action.payload;
    },

    // Set quote source
    setquoteSource: (state, action) => {
      state.quoteSource = action.payload;
    },

    // Set deal type
    setQuoteInterest: (state, action) => {
      state.quoteInterest = action.payload;
    },

    // Set dealer name
    setDealerName: (state, action) => {
      state.dealerName = action.payload;
    },

    // Set dealer_id
    setDealerId: (state, action) => {
      state.dealerId = action.payload;
    },

    // Clear dealer name
    clearDealerName: (state) => {
      state.dealerName = '';
    },

    // Set dealer logo url
    setDealerLogo: (state, action) => {
      state.dealerLogo = action.payload;
    },

    // Clear dealer logo
    clearDealerLogo: (state) => {
      state.dealerLogo = '';
    },

    // Add history
    addHistory: (state, action) => {
      state.history.push(action.payload);
      state.step += 1;
    },

    // remove history
    removeHistory: (state, action) => {
      state.history = state.history.filter(item => item !== action.payload);
      state.step -= 1;
    },
    // Set phone number
    setCheckerMobileNumber(state, action) {
      state.checkerMobileNumber = action.payload;
    },

    // Set first name
    setCheckerFirstName(state, action) {
      state.checkerFirstName = action.payload;
    },

    // Set middle name
    setCheckerMiddleName(state, action) {
      state.checkerMiddleName = action.payload;
    },

    // Set middle name
    setCheckerIsSkipMiddleName(state, action) {
      state.checkerIsSkipMiddleName = action.payload;
    },

    // Set last name
    setCheckerLastName(state, action) {
      state.checkerLastName = action.payload;
    },

    // Set mail
    setCheckerEmail(state, action) {
      state.checkerEmail = action.payload;
    },

    // Set social number
    setCheckerSocialNumber(state, action) {
      state.checkerSocialNumber = action.payload;
    },

    // Set birthday
    setCheckerBirthday(state, action) {
      state.checkerBirthday = action.payload;
    },

    // Set address
    setCheckerAddress: (state, action) => {
      state.checkerAddress = action.payload;
    },

    // Set apt
    setCheckerApt: (state, action) => {
      state.checkerApt = action.payload;
    },

    // Set Locality
    setCheckerLocality: (state, action) => {
      state.checkerLocality = action.payload;
    },

    // Set states
    setCheckerState: (state, action) => {
      state.checkerState = action.payload;
    },

    // Set PostCode
    setCheckerZipcode: (state, action) => {
      state.checkerZipcode = action.payload;
    },

    // Set previous address
    setPreviousCheckerAddress: (state, action) => {
      state.previousCheckerAddress = action.payload;
    },

    setPreviousCheckerApt: (state, action) => {
      state.previousCheckerApt = action.payload;
    },

    setPreviousCheckerLocality: (state, action) => {
      state.previousCheckerLocality = action.payload;
    },

    setPreviousCheckerState: (state, action) => {
      state.previousCheckerState = action.payload;
    },

    setPreviousCheckerZipcode: (state, action) => {
      state.previousCheckerZipcode = action.payload;
    },

    // Clear history
    clearHistory: (state) => {
      state.jobEndDate = initialState.jobEndDate;
      state.jobAddress = initialState.jobAddress;
      state.prevJobAddress = initialState.prevJobAddress;
      state.jobOccupation = initialState.jobOccupation;
      state.employerName = initialState.employerName;
      state.employerPhoneNumber = initialState.employerPhoneNumber;
      state.jobApt = initialState.jobApt;
      state.jobCity = initialState.jobCity;
      state.jobState = initialState.jobState;
      state.jobZipcode = initialState.jobZipcode;
      state.jobSalary = initialState.jobSalary;
      state.jobstatus = initialState.jobstatus;
      state.jobYear = initialState.jobYear;
      state.prevjobOccupation = initialState.prevjobOccupation;
      state.prevemployerName = initialState.prevemployerName;
      state.prevemployerPhoneNumber = initialState.prevemployerPhoneNumber;
      state.prevjobApt = initialState.prevjobApt;
      state.prevjobCity = initialState.prevjobCity;
      state.prevjobState = initialState.prevjobState;
      state.prevjobZipcode = initialState.prevjobZipcode;
      state.prevjobSalary = initialState.prevjobSalary;
      state.prevjobstatus = initialState.prevjobState;
      state.prevjobYear = initialState.prevjobYear;
      state.progress = initialState.progress;
      state.previousCheckerAddress = initialState.previousCheckerAddress;
      state.previousCheckerApt = initialState.previousCheckerApt;
      state.previousCheckerLocality = initialState.previousCheckerLocality;
      state.previousCheckerState = initialState.previousCheckerState;
      state.previousCheckerZipcode = initialState.previousCheckerZipcode;
      state.previousMonthlyPay = initialState.previousMonthlyPay;
      state.previousResidentalMonths = initialState.previousResidentalMonths;
      state.previousResidentalYears = initialState.previousResidentalYears;
      state.monthlyPay = initialState.monthlyPay;
      state.residentalMonths = initialState.residentalMonths;
      state.residentalYears = initialState.residentalYears;
      state.payDwon = initialState.payDwon;
      state.dealerConvertId = initialState.dealerConvertId;
      state.step = initialState.step;
      state.history = initialState.history;
      state.checkerMobileNumber = initialState.checkerMobileNumber;
      state.checkerFirstName = initialState.checkerFirstName;
      state.checkerMiddleName = initialState.checkerMiddleName;
      state.checkerIsSkipMiddleName = initialState.checkerIsSkipMiddleName;
      state.checkerLastName = initialState.checkerLastName;
      state.checkerSocialNumber = initialState.checkerSocialNumber;
      state.checkerEmail = initialState.checkerEmail;
      state.checkerBirthday = initialState.checkerBirthday;
      state.checkerAddress = initialState.checkerAddress;
      state.checkerApt = initialState.checkerApt;
      state.checkerLocality = initialState.checkerLocality;
      state.checkerState = initialState.checkerState;
      state.checkerZipcode = initialState.checkerZipcode;
      state.quoteInterest = initialState.quoteInterest;
      state.quoteSource = initialState.quoteSource;
      state.quoteStatus = initialState.quoteStatus;
      state.dealType = initialState.dealType;
      state.instantMake = initialState.instantMake;
      state.instantYear = initialState.instantYear;
      state.instantModel = initialState.instantModel;
      state.vehicleCondition = initialState.vehicleCondition;
      state.originalOwner = initialState.originalOwner;
      state.mileageHour = initialState.mileageHour;
      state.vin = initialState.vin;
      state.vehicleType = initialState.vehicleType;
      state.commentValue = initialState.commentValue;
      state.deviceCity = initialState.deviceCity;
      state.deviceCountry = initialState.deviceCountry;
      state.deviceDate = initialState.deviceDate;
      state.deviceIP = initialState.deviceIP;
      state.deviceLat = initialState.deviceLat;
      state.deviceLon = initialState.deviceLon;
      state.deviceOS = initialState.deviceOS;
      state.deviceState = initialState.deviceState;
      state.deviceIP = initialState.deviceIP;
      state.deviceBrowser = initialState.deviceBrowser;
      state.intentID = initialState.intentID;
      state.usCitizen = initialState.usCitizen;
      state.driverDate = initialState.driverDate;
      state.driverNumber = initialState.driverNumber;
      state.driverState = initialState.driverState;
      state.iDate = initialState.iDate;
      state.iIsuer = initialState.iIsuer;
      state.iType = initialState.iType;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setJobEndDate,
  setJobAddress,
  setPrevJobAddress,
  setJobOccupation,
  setEmployerName,
  setEmployerPhoneNumber,
  setJobApt,
  setJobCity,
  setJobState,
  setJobZipcode,
  setJobSalary,
  setJobstatus,
  setJobYear,
  setPrevjobOccupation,
  setPrevEmployerName,
  setPrevEmployerPhoneNumber,
  setPrevJobApt,
  setPrevJobCity,
  setPrevJobState,
  setPrevJobZipcode,
  setPrevJobSalary,
  setPrevJobstatus,
  setPrevJobYear,
  setProgress,
  setPreviousCheckerAddress,
  setPreviousCheckerApt,
  setPreviousCheckerLocality,
  setPreviousCheckerState,
  setPreviousCheckerZipcode,
  setPreviousMonthlyPay,
  setPreviousResidentalYears,
  setPreviousResidentalMonths,
  setMonthlyPay,
  setResidentalYears,
  setResidentalMonths,
  setPayDown,
  setDealerConvertedID,
  setDriverDate,
  setDriverState,
  setDriverNumber,
  setIDate,
  setIIsuer,
  setIType,
  setUSCitizen,
  setRenderType,
  setDealerName,
  setDealerLogo,
  setDealerId,
  clearDealerName,
  clearDealerLogo,
  addHistory,
  removeHistory,
  clearHistory,
  setCheckerMobileNumber,
  setCheckerFirstName,
  setCheckerMiddleName,
  setCheckerIsSkipMiddleName,
  setCheckerLastName,
  setCheckerEmail,
  setCheckerSocialNumber,
  setCheckerBirthday,
  setCheckerAddress,
  setCheckerApt,
  setCheckerLocality,
  setCheckerState,
  setCheckerZipcode,
  setDealType,
  setQuoteInterest,
  setquoteSource,
  setQuoteStatus,
  setInstantYear,
  setInstantMake,
  setInstantModel,
  setVehicleCondition,
  setMileageHour,
  setOriginalOwner,
  setVin,
  setVehicleType,
  setCommentValue,
  setDeviceBrowser,
  setDeviceCity,
  setDeviceCountry,
  setDeviceDate,
  setDeviceIP,
  setDeviceLat,
  setDeviceLon,
  setDeviceOS,
  setDeviceState,
  setIntentID,

} = checkerSlice.actions;

// fetch dealer name and dealer logo
export const getDealerInfo = (dealer_id) => (dispatch) => {
  const data = {
    slug: dealer_id,
  };
  return async () => {
    try {
      const response = await axios.post(
        `https://www.dev.creditapps.com/api/decode_dealer/`,
        data
      );
      dispatch(setDealerName(response.data.name));
      dispatch(setDealerLogo(response.data.get_logo_url));
      dispatch(setDealerId(response.data.id.toString()));
    } catch (error) {
      console.log(error);
    }
  };
};

export default checkerSlice.reducer;
