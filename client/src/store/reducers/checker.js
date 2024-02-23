import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  type: '',
  mobile: '',
  step: 0,
  history: [],
  dealerName: '',
  dealerLogo: '',
  dealerId: '',
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

    // Clear history
    clearHistory: (state) => {
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
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setRenderType,
  setDealerName,
  setDealerLogo,
  setDealerId,
  clearDealerName,
  clearDealerLogo,
  addHistory,
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
