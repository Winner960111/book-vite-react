import axios from 'axios';

export const checkPhoneNumber = async (phone_number, dealer_id) => {
  const url =
    'http://ec2-52-91-0-180.compute-1.amazonaws.com/api/applicant_two_factor_code/';

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
    'http://ec2-52-91-0-180.compute-1.amazonaws.com/api/applicant_valida_two_factor_code/';

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
  const url = 'http://ec2-52-91-0-180.compute-1.amazonaws.com/api/prequal/';
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
  console.log("quote data is =>",data)
  const url = 'http://ec2-52-91-0-180.compute-1.amazonaws.com/api/leads/';
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

