import api from '../utils/api';
import { setRenderType } from '../store/reducers/checker';
import apis from '../utils/apis'

export const identification = async (data, id) => {
  console.log('this is submit====>', data);
  const url = `verification/${id}/`;
  try {
    const response = await apis.put(url, data, {
      headers: {
        'content-type': 'application/json',
      },
    });
    return response;
  } catch (e) {
    return { status: 400 };
  }
};

export const checkVerify = async (data) => {
  console.log('this is submit====>', data);
  const url = 'verify_mobile/';
  try {
    const response = await apis.post(url, data, {
      headers: {
        'content-type': 'application/json',
      },
    });
    return response;
  } catch (e) {
    return { status: 400 };
  }
};

export const submitReference = async (data) => {
  console.log('this is submit====>', data);
  const url = 'add_documents/';
  try {
    const response = await apis.post(url, JSON.stringify(data), {
      headers: {
        'content-type': 'application/json',
      },
    });
    return response;
  } catch (e) {
    return { status: 400 };
  }
};

export const submitImages = async (data) => {
  console.log('this is submit====>', data);
  const url = 'add_trade_in_images/';
  try {
    const response = await apis.post(url, JSON.stringify(data));
    return response;
  } catch (e) {
    return { status: 400 };
  }
};

export const referenceInfo = async (data, customer_id) => {

  const url = `add_references/${customer_id}/`;
  try {
    const response = await apis.put(url, data, {
      headers: {
        'content-type': 'application/json',
      },
    });
    return response;
  } catch (e) {
    return { status: 400 };
  }
};

export const identifyInfo = async (id) =>
  new Promise((resolve, reject) => {
    const url = `verification/${id}/`;
    apis
      .get(url, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch(() => {
        reject({ status: 400 });
      });
  })


export const customerInfo = async (dealer_id, customer_id) =>
  new Promise((resolve, reject) => {
    const data = {
      slug: customer_id,
      dealer_id: dealer_id,
    };
    console.log("customer--------->", data)
    const url = 'decode_customer/';
    apis
      .post(url, data, {
        headers: {
          'content-type': 'application/json',
        },
      })
      .then((res) => {
        resolve(res);
      })
      .catch(() => {
        reject({ status: 400 });
      });
  });

export const checkapp = async (data) => {
  console.log('this is appointment items ===>', data);
  const url = 'app_status/';
  try {
    const response = await apis.post(url,data, {
      headers: {
        'content-type': 'application/json',
      },
    });
    return response;
  } catch (e) {
    return { status: 400 };
  }
};

export const appointment = async (data) => {
  console.log('this is appointment items ===>', data);
  const url = 'appointment/';
  try {
    const response = await apis.post(url,data, {
      headers: {
        'content-type': 'application/json',
      },
    });
    return response;
  } catch (e) {
    return { status: 400 };
  }
};

export const application = async (data) => {
  console.log('this is application items ===>', data);
  const url = 'application/';
  try {
    const response = await apis.post(url, data, {
      headers: {
        'content-type': 'application/json',
      },
    });
    return response;
  } catch (e) {
    return { status: 400 };
  }
};

export const fullcustomer = async (data) => {
  console.log('this is full app items ===>', data);
  const url = 'deals/';
  try {
    const response = await apis.post(url, data, {
      headers: {
        'content-type': 'application/json',
      },
    });
    return response;
  } catch (e) {
    return { status: 400 };
  }
};
export const vehicleList = async (id) => {
  const url = 'decode_dealer/';
  const data = {
    slug: id,
  };
  try {
    const response = await apis.post(url, data, {
      headers: {
        'content-type': 'application/json',
      },
    });
    return response;
  } catch (e) {
    return { status: 400 };
  }
};

export const usersUpdate = async (data, id) => {
  const url = `intent/${id}/`;
  console.log('this is intent information==>', data);
  try {
    const response = await apis.put(url, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response;
  } catch (e) {
    return { status: 400 };
  }
};
export const usersStatus = async (data) => {
  const url = 'intent/';
  console.log('this is intent information==>', data);
  try {
    const response = await apis.post(url, data, {
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
  await api
    .get('/detect-agent')
    .then((res) => {
      console.log("this is detect-agent====>",res.data);
      dispatch(setRenderType(res.data));
    })
    .catch((err) => console.log('Detect Agent Error => ', err));
};

export const checkPhoneNumber = async (phone_number, dealer_id) => {
  const url = 'applicant_two_factor_code/';

  const data = {
    dealer_id: dealer_id,
    mobile: phone_number,
  };
  try {
    const response = await apis.post(url, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response;
  } catch (error) {
    console.log(error);
  }
};

export const checkPhoneNumberCall = async (phone_number, dealer_id) => {
  const url =
    'applicant_call_two_factor_code/';

  const data = {
    mobile: phone_number,
    dealer_id: dealer_id,
  };

  try {
    const response = await apis.post(url, data, {
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
    'applicant_valida_two_factor_code/';

  const data = {
    mobile: phone_number,
    dealer_id: dealer_id,
    code: verify_code,
  };

  try {
    const response = await apis.post(url, data, {
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
  const url = 'opportunity/';
  try {
    const response = await apis.post(url, data, {
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
  const url = 'leads/';
  try {
    const response = await apis.post(url, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response;
  } catch (e) {
    return { status: 400 };
  }
};

export const MessageDealer = async (data) => {
  const url = 'message_dealer/';
  try {
    const response = await apis.post(url, data, {
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
  const url = 'vehicle_decode/';
  try {
    const response = await apis.post(url, data, {
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
  const url = 'trade_in/';
  try {
    const response = await apis.post(url, data, {
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
