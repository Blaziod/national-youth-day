# Cron Job Setup for Reminder System

This document explains how to set up the cron job for sending scheduled reminders.

## Overview

The reminder system consists of:
1. **User Form**: Users fill out a reminder form with their name, phone, date, and time
2. **Database Storage**: Reminder is saved to PostgreSQL via Prisma
3. **Confirmation SMS**: Immediate SMS sent to user confirming reminder setup
4. **Scheduled Reminder SMS**: SMS sent at the scheduled time via cron job

## API Endpoints

### POST `/api/send-reminder`
Handles form submission, saves to database, and sends confirmation SMS.

**Request Body:**
```json
{
  "phoneWithCountryCode": "2348012345678",
  "name": "John Doe",
  "date": "2025-11-21",
  "time": "14:30"
}
```

### GET/POST `/api/cron/send-reminders`
Queries database for unsent reminders that are due and sends them via SMS.

**Response:**
```json
{
  "success": true,
  "message": "Processed 5 reminders",
  "currentTime": "2025-11-21 14:30",
  "results": []
}
```

## Cron Job Setup

You need to configure a cron service to call the `/api/cron/send-reminders` endpoint periodically.

### Option 1: External Cron Services (Recommended for Production)

Use a cron-as-a-service platform:

#### **Cron-job.org**
1. Go to https://cron-job.org
2. Create a free account
3. Create new cron job:
   - URL: `https://your-domain.com/api/cron/send-reminders`
   - Schedule: Every 5-15 minutes (e.g., `*/15 * * * *`)
   - Method: GET

#### **EasyCron**
1. Go to https://www.easycron.com
2. Create account and add cron job
3. Set URL and frequency

#### **GitHub Actions (Free)**
Create `.github/workflows/cron-reminders.yml`:

```yaml
name: Send Reminders Cron

on:
  schedule:
    # Run every 15 minutes
    - cron: '*/15 * * * *'
  workflow_dispatch: # Allows manual trigger

jobs:
  send-reminders:
    runs-on: ubuntu-latest
    steps:
      - name: Call reminder endpoint
        run: |
          curl -X POST https://your-domain.com/api/cron/send-reminders
```

### Option 2: Vercel Cron Jobs

If deployed on Vercel, add to `vercel.json`:

```json
{
  "crons": [
    {
      "path": "/api/cron/send-reminders",
      "schedule": "*/15 * * * *"
    }
  ]
}
```

**Note:** Vercel Cron requires Pro plan or Hobby plan with cron enabled.

### Option 3: Server-based Cron (VPS/Dedicated Server)

Add to crontab:
```bash
# Edit crontab
crontab -e

# Add line (runs every 15 minutes)
*/15 * * * * curl -X POST https://your-domain.com/api/cron/send-reminders
```

## Timezone Configuration

The system uses **Africa/Lagos** timezone (WAT - UTC+1) for all date/time operations. This is configured in the cron job API route:

```typescript
const lagosTime = new Date(now.toLocaleString('en-US', { timeZone: 'Africa/Lagos' }));
```

## Environment Variables

Ensure these are set in your `.env` file:

```env
DATABASE_URL="postgresql://..."
TERMII_API_KEY="your_api_key"
TERMII_SECRET_KEY="your_secret_key"
TERMII_SENDER_ID="IDCODE"
```

## Testing

### Manual Test
Call the cron endpoint directly:
```bash
curl -X POST http://localhost:3000/api/cron/send-reminders
```

### Test Flow
1. Fill out reminder form at `/reminder`
2. Check database for saved reminder
3. Manually trigger cron endpoint
4. Verify SMS was sent and `sentReminder` flag updated

## Database Schema

```prisma
model reminders {
  id               String   @id @default(uuid())
  name             String
  phone            String
  date             String
  time             String
  sentConfirmation Boolean
  sentReminder     Boolean
  createdAt        DateTime @default(now())
}
```

## Monitoring

- Check cron job logs in your chosen service
- Monitor Termii API usage in their dashboard
- Query database for reminders with `sentReminder = false` to see pending items

## Troubleshooting

**Reminders not sending:**
- Verify cron job is running (check service logs)
- Check Termii API credentials
- Verify timezone is correct for your target audience
- Check database connectivity

**SMS not delivered:**
- Verify phone numbers include country code
- Check Termii account balance
- Verify sender ID is approved by Termii
