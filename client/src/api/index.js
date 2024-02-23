import axios from 'axios';
import api from '../utils/api';
import { setRenderType } from '../store/reducers/checker';

export const usersStatus = async (data) => {
  const url = 'https://www.dev.creditapps.com/api/intent/';
  console.log('this is intent information==>', data);
  try {
    const response = await axios.post(url, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response;
  } catch (e) {
    return { status: 400 };
  }
};

export const deviceInfo = async (ip) =>
  new Promise((resolve, reject) => {
    const data = {
      ip: ip,
    };
    api
      .post('/deviceInfo', data)
      .then((res) => {
        console.log('this is geo resoponse====>', res.data.geo);
        resolve(res.data.geo);
      })
      .catch((e) => {
        reject('error:');
        console.log(e);
      });
  });
export const detectAgent = () => async (dispatch) => {
  console.log('Call Detect Agent');
  await api
    .get('/detect-agent')
    .then((res) => {
      console.log(res.data);
      dispatch(setRenderType(res.data));
    })
    .catch((err) => console.log('Detect Agent Error => ', err));
};

export const checkPhoneNumber = async (phone_number, dealer_id) => {
  const url = 'https://www.dev.creditapps.com/api/applicant_two_factor_code/';

  const data = {
    mobile: phone_number,
    dealer_id: dealer_id,
  };

  try {
    const response = await axios.post(url, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response;
  } catch (error) {
    console.log(error);
  }
};

export const checkVerification = async (
  phone_number,
  dealer_id,
  verify_code
) => {
  const url =
    'https://www.dev.creditapps.com/api/applicant_valida_two_factor_code/';

  const data = {
    mobile: phone_number,
    dealer_id: dealer_id,
    code: verify_code,
  };

  try {
    const response = await axios.post(url, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response;
  } catch (e) {
    if (e.response.data.errors === " Code doesn't match") {
      return { status: 400 };
    }
  }
};

export const signatureImg = async (data) => {
  const url = 'https://www.dev.creditapps.com/api/prequal/';
  try {
    const response = await axios.post(url, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response;
  } catch (e) {
    return { status: 400 };
  }
};

export const SubmitQuote = async (data) => {
  console.log('quote data is =>', data);
  const url = 'https://www.dev.creditapps.com/api/leads/';
  try {
    const response = await axios.post(url, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response;
  } catch (e) {
    return { status: 400 };
  }
};

export const instantInfo = async (data) => {
  console.log(data);
  const url = 'https://www.dev.creditapps.com/api/vehicle_decode/';
  try {
    const response = await axios.post(url, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response;
  } catch (e) {
    return { status: 400 };
  }
};

export const SubmitTrade = async (data) => {
  console.log('quote data is =>', data);
  const url = 'https://www.dev.creditapps.com/api/trade_in/';
  try {
    const response = await axios.post(url, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response;
  } catch (e) {
    console.log(e);
    return { status: 400 };
  }
};
