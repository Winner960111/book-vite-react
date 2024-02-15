import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
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
};

export const checkerSlice = createSlice({
  name: 'checker',
  initialState,
  reducers: {
    // set mileage hour
    setMileageHour: (state, action) => {
      state.mileageHour = action.payload;
    },

    // set original owner
    setOriginalOwner: (state, action) => {
      state.originalOwner = action.payload;
    },

    // set vehicle condition
    setVehicleCondition: (state, action) => {
      state.vehicleCondition = action.payload;
    },

    //set instant year, make and model
    setInstantYear: (state, action) => {
      state.instantYear = action.payload;
    },

    setInstantMake: (state, action) => {
      state.instantMake = action.payload;
    },

    setInstantModel: (state, action) => {
      state.instantModel = action.payload;
    },

    //set deal type
    setDealType: (state, action) => {
      state.dealType = action.payload;
    },

    //set quote status
    setQuoteStatus: (state, action) => {
      state.quoteStatus = action.payload;
    },

    //set quote source
    setquoteSource: (state, action) => {
      state.quoteSource = action.payload;
    },

    //set deal type
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
    },
  },
});

// Action creators are generated for each case reducer function
export const {
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
      dispatch(setDealerId(response.data.id));
    } catch (error) {
      console.log(error);
    }
  };
};

export default checkerSlice.reducer;
