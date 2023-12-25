import axios from 'axios';
import topUpPoint from '../model/charge.js';

export const sendTappay = async (req, res) => {
  try {
    const { userId, prime, name, email, chargeMoney } = req.body;

    const partnerKey = process.env.TAPPAY_PARTNER_KEY;
    const merchantId = process.env.TAPPAY_MERCHANT_ID;
    const details = 'TapPay Test';
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
      amount: chargeMoney,
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
    // console.log(TapPayInformation.data.status);
    // if (TapPayInformation.data.status === 0) {
    if (TapPayInformation.data.status) {
      await topUpPoint(chargeMoney, userId);
      res.status(200).json({ success: true, message: 'Successfully top up' });
    } else {
      res.status(400).json({
        success: false,
        message: 'Your payment is error',
      });
    }
  } catch (error) {
    console.log(`controller sendTappay:${error}`);
    res.status(500);
  }
};

export default sendTappay;
