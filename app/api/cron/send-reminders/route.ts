import {NextRequest, NextResponse} from 'next/server';
import prisma from '@/lib/prisma';
import {sendReminderSMS} from '@/lib/termii';

export async function GET() {
  try {
    // Get current date and time in Lagos timezone (WAT - UTC+1)
    const now = new Date();
    const lagosTime = new Date(now.toLocaleString('en-US', { timeZone: 'Africa/Lagos' }));
    
    const currentDate = lagosTime.toISOString().split('T')[0]; // YYYY-MM-DD format
    const currentTime = lagosTime.toTimeString().split(' ')[0].substring(0, 5); // HH:MM format

    console.log(`Cron job running at Lagos time: ${currentDate} ${currentTime}`);

    // Query reminders that:
    // 1. Match today's date
    // 2. Have a time that has passed or is current
    // 3. Haven't been sent yet (sentReminder = false)
    const remindersToSend = await prisma.reminders.findMany({
      where: {
        date: currentDate,
        sentReminder: false,
        time: {
          lte: currentTime, // Less than or equal to current time
        },
      },
    });

    console.log(`Found ${remindersToSend.length} reminders to send`);

    const results = [];

    // Send SMS for each reminder
    for (const reminder of remindersToSend) {
      const smsResult = await sendReminderSMS(reminder.phone, reminder.name);

      if (smsResult.success) {
        // Mark as sent
        await prisma.reminders.update({
          where: { id: reminder.id },
          data: { sentReminder: true },
        });

        results.push({
          id: reminder.id,
          phone: reminder.phone,
          status: 'sent',
        });
      } else {
        results.push({
          id: reminder.id,
          phone: reminder.phone,
          status: 'failed',
          error: smsResult.error,
        });
      }
    }

    return NextResponse.json({
      success: true,
      message: `Processed ${remindersToSend.length} reminders`,
      currentTime: `${currentDate} ${currentTime}`,
      results,
    });
  } catch (error) {
    console.error('Cron job error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Cron job failed',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// Optional: Add POST method if you want to manually trigger the cron job
export async function POST(request: NextRequest) {
  return GET();
}
