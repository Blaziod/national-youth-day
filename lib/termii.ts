import axios from 'axios';

const TERMII_API_URL = 'https://v3.api.termii.com/api/sms/send';

interface SendSMSParams {
  to: string;
  message: string;
}

export async function sendSMS({ to, message }: SendSMSParams) {
  try {
    const response = await axios.post(TERMII_API_URL, {
      to,
      from: process.env.TERMII_SENDER_ID,
      sms: message,
      type: 'plain',
      channel: 'generic',
      api_key: process.env.TERMII_API_KEY,
    });

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error('Termii SMS Error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

export async function sendConfirmationSMS(phone: string, name: string, date: string, time: string) {
  const message = `Hello ${name}, your reminder has been set for ${date} at ${time}. You will receive a notification on the scheduled date. - Investonaire VIP`;
  
  return sendSMS({ to: phone, message });
}

export async function sendReminderSMS(phone: string, name: string) {
  const message = `Hello ${name}, this is your reminder for the Investonaire event on 25th November 2025! Don't miss out. See you there! - Investonaire VIP`;
  
  return sendSMS({ to: phone, message });
}
