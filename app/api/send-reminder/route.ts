import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { sendConfirmationSMS } from '@/lib/termii';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { phoneWithCountryCode, name, date, time } = body;

    // Validate required fields
    if (!phoneWithCountryCode || !name || !date || !time) {
      return NextResponse.json(
        { success: false, message: 'All fields are required' },
        { status: 400 }
      );
    }

    // Save reminder to database
    const reminder = await prisma.reminders.create({
      data: {
        name,
        phone: phoneWithCountryCode,
        date,
        time,
        sentConfirmation: false,
        sentReminder: false,
      },
    });

    // Send confirmation SMS
    const smsResult = await sendConfirmationSMS(
      phoneWithCountryCode,
      name,
      date,
      time
    );

    // Update sentConfirmation status if SMS was sent successfully
    if (smsResult.success) {
      await prisma.reminders.update({
        where: { id: reminder.id },
        data: { sentConfirmation: true },
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Reminder set successfully',
      data: {
        id: reminder.id,
        smsSent: smsResult.success,
      },
    });
  } catch (error) {
    console.error('Error creating reminder:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to set reminder. Please try again.',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
