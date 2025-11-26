#!/bin/bash

# Test script for reminder system
# Usage: ./scripts/test-reminder.sh

echo "Testing Reminder System..."
echo "=========================="
echo ""

# Check if server is running
echo "1. Checking if server is running..."
if curl -s http://localhost:3000 > /dev/null; then
    echo "   ✓ Server is running"
else
    echo "   ✗ Server is not running. Start it with: pnpm dev"
    exit 1
fi

echo ""
echo "2. Testing reminder submission..."
RESPONSE=$(curl -s -X POST http://localhost:3000/api/send-reminder \
  -H "Content-Type: application/json" \
  -d '{
    "phoneWithCountryCode": "2348012345678",
    "name": "Test User",
    "date": "2025-11-21",
    "time": "14:30"
  }')

echo "   Response: $RESPONSE"

if echo "$RESPONSE" | grep -q '"success":true'; then
    echo "   ✓ Reminder created successfully"
else
    echo "   ✗ Failed to create reminder"
fi

echo ""
echo "3. Testing cron job endpoint..."
CRON_RESPONSE=$(curl -s -X POST http://localhost:3000/api/cron/send-reminders)

echo "   Response: $CRON_RESPONSE"

if echo "$CRON_RESPONSE" | grep -q '"success":true'; then
    echo "   ✓ Cron job executed successfully"
else
    echo "   ✗ Cron job failed"
fi

echo ""
echo "=========================="
echo "Test completed!"
echo ""
echo "Next steps:"
echo "1. Check your database to verify reminder was saved"
echo "2. Check Termii dashboard to verify SMS was sent"
echo "3. Set up production cron job (see CRON_SETUP.md)"
