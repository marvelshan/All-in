import axios from 'axios';
import topUpPoint from '../model/charge.js';

export const sendTappay = async (req, res) => {
  try {
    const { id, prime, name, email, point } = req.body;

    const partnerKey = process.env.TAPPAY_PARTNER_KEY;
    const merchantId = process.env.TAPPAY_MERCHANT_ID;
    const details = 'TapPay Test';
    const amount = point;
    const cardholder = {
      phone_number: '0912345678',
      name,
      email,
      zip_code: '12345',
      national_id: 'A123456789',
    };
    const paymentChecking = {
      prime,
      partnerKey,
      merchantId,
      details,
      amount,
      cardholder,
      remember: true,
    };
    const TapPayurl = 'https://sandbox.tappaysdk.com/tpc/payment/pay-by-prime';
    const TapPayInformation = await axios.post(TapPayurl, paymentChecking, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key':
          'partner_PHgswvYEk4QY6oy3n8X3CwiQCVQmv91ZcFoD5VrkGFXo8N7BFiLUxzeG',
      },
    });
    console.log(TapPayInformation.data.status);
    if (TapPayInformation.data.status === 0) {
      await topUpPoint(point, id);
      res.status(200).send('success top up');
    } else {
      res.status(404).send('Your payment is error');
    }
  } catch (error) {
    console.log(`controller sendTappay:${error}`);
    res.status(500);
  }
};

export default sendTappay;
