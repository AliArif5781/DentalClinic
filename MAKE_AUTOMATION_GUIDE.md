# Make.com Automation Setup Guide

This guide explains how to set up automated email campaigns for dental appointments using Make.com (formerly Integromat).

## Overview

The system provides two automation approaches:

1. **Real-time webhook** - Sends immediate confirmation emails when appointments are booked
2. **Daily scheduled scenario** - Sends educational emails for upcoming appointments

## Prerequisites

- Make.com account (free tier works)
- SendGrid account for sending emails (already configured in this app)
- Your Replit app URL

## System Architecture

```
┌─────────────────┐      Webhook      ┌──────────────┐
│  Replit App     │ ─────────────────→ │  Make.com    │
│  (Booking API)  │                    │  Scenario 1  │
└─────────────────┘                    └──────┬───────┘
                                              │
                                              ↓
        ┌──────────────────────────────────────────────┐
        │         SendGrid Email Service               │
        │  (Confirmation + Educational Emails)         │
        └──────────────────────────────────────────────┘
                                              
┌─────────────────┐   Scheduled Daily  ┌──────────────┐
│  Replit App     │ ←───────────────── │  Make.com    │
│  (/api/         │                    │  Scenario 2  │
│   appointments/ │                    │              │
│   upcoming)     │                    └──────────────┘
└─────────────────┘
```

## Setup Instructions

### Part 1: Real-time Booking Confirmation (Already Active)

This webhook is already configured in your application. When a patient books an appointment:

1. Appointment is saved to database
2. Data is sent to `WEBHOOK_URL` (Make.com webhook)
3. Make.com can trigger immediate confirmation emails

**Current webhook payload:**
```json
{
  "appointmentId": "uuid",
  "firstName": "John",
  "lastName": "Doe",
  "email": "[email protected]",
  "phone": "+1234567890",
  "preferredChannel": "email",
  "preferredContactTime": "morning",
  "appointmentDate": "2025-12-25",
  "appointmentTime": "10:00",
  "treatmentType": "cleaning",
  "bookingMethod": "website",
  "status": "pending",
  "createdAt": "2025-11-11T12:00:00.000Z"
}
```

### Part 2: Daily Educational Email Campaign

This requires setting up a new Make.com scenario.

#### Step 1: Create a New Scenario in Make.com

1. Log into [Make.com](https://www.make.com)
2. Click **"Create a new scenario"**
3. Give it a name: "Daily Dental Appointment Emails"

#### Step 2: Add Schedule Trigger

1. Click the **+** button
2. Search for **"Schedule"**
3. Select **"Schedule > Every day"**
4. Set the time you want emails to be sent (e.g., 9:00 AM)
5. Choose your timezone
6. Click **OK**

#### Step 3: Add HTTP Request to Fetch Appointments

1. Click **+** after the Schedule module
2. Search for **"HTTP"**
3. Select **"HTTP > Make a request"**
4. Configure:
   - **URL**: `https://your-replit-app.replit.dev/api/appointments/upcoming`
   - **Method**: GET
   - **Headers**: Leave default
5. Click **OK**

#### Step 4: Add Iterator to Loop Through Appointments

1. Click **+** after HTTP module
2. Search for **"Iterator"**
3. Select **"Flow Control > Iterator"**
4. Configure:
   - **Array**: Click on the HTTP module response, then select `appointments`
5. Click **OK**

#### Step 5: Add SendGrid Email Module

1. Click **+** after Iterator
2. Search for **"SendGrid"**
3. Select **"SendGrid > Send an Email"**
4. **Connect your SendGrid account** (if not already)
5. Configure email fields:
   - **From**: Your verified SendGrid email
   - **To**: `{{email}}` (from iterator)
   - **Subject**: Use dynamic subject based on treatment type
   - **Content**: Create HTML email template

**Example dynamic subject:**
```
{{if(treatmentType = "root_canal", "Your Root Canal Appointment - What to Expect", 
   if(treatmentType = "cleaning", "Your Dental Cleaning - Oral Hygiene Tips", 
   "Your Dental Appointment"))}}
```

#### Step 6: Create Email Templates Based on Treatment Type

You can use the **Router** module to send different emails based on treatment type:

1. After Iterator, add **Router** module
2. Create branches for each treatment type:
   - **Root Canal** → Custom email with root canal tips
   - **Cleaning** → Custom email with oral hygiene tips
   - **Cosmetic** → Custom email about cosmetic procedures
   - **Emergency** → Custom email with emergency care info
   - **Exam** → Custom email about what to expect
   - **Orthodontics** → Custom email about orthodontic care
   - **Extraction** → Custom email with extraction preparation

**For each branch:**
1. Set filter condition: `treatmentType = "cleaning"` (or other type)
2. Add SendGrid module
3. Customize email content

#### Step 7: Test the Scenario

1. Click **"Run once"** at the bottom
2. Check that it fetches appointments correctly
3. Verify emails are sent (check spam folder too)
4. Review execution history for errors

#### Step 8: Activate the Scenario

1. Toggle the **ON/OFF** switch in the bottom left
2. The scenario will now run automatically every day at your scheduled time

## API Endpoints

Your Replit app provides these endpoints for Make.com:

### GET /api/appointments/upcoming

Fetches all upcoming appointments (today and future dates).

**Optional query parameter:**
- `from` - Start date in YYYY-MM-DD format (default: today)

**Example:**
```
GET /api/appointments/upcoming
GET /api/appointments/upcoming?from=2025-12-01
```

**Response:**
```json
{
  "success": true,
  "count": 5,
  "appointments": [
    {
      "id": "123e4567-e89b-12d3-a456-426614174000",
      "firstName": "John",
      "lastName": "Doe",
      "email": "[email protected]",
      "phone": "+1234567890",
      "appointmentDate": "2025-12-25",
      "appointmentTime": "10:00",
      "treatmentType": "cleaning",
      "status": "pending",
      "preferredChannel": "email"
    }
  ]
}
```

## Treatment Types and Email Content

The system supports these treatment types, each with custom educational content:

| Treatment Type | Email Focus |
|---------------|-------------|
| `cleaning` | Oral hygiene tips, benefits of regular cleanings |
| `root_canal` | What to expect, preparation guide, after-care |
| `cosmetic` | Smile transformation, treatment options |
| `exam` | Comprehensive health check, what we'll examine |
| `emergency` | Immediate care instructions, what to bring |
| `orthodontics` | Alignment assessment, treatment timeline |
| `extraction` | Preparation, after-care, pain management |

## Email Personalization

Each email includes:
- Patient's first name
- Appointment date and time
- Treatment-specific information
- Preparation instructions
- After-care tips (when applicable)

## Advanced: Email Drip Campaigns

For more sophisticated campaigns, you can create multiple scenarios:

### Day -7: One Week Before Appointment
- **Trigger**: Scheduled daily
- **Filter**: `appointmentDate = today + 7 days`
- **Action**: Send preparation email

### Day -3: Three Days Before
- **Trigger**: Scheduled daily
- **Filter**: `appointmentDate = today + 3 days`
- **Action**: Send reminder with what to bring

### Day -1: One Day Before
- **Trigger**: Scheduled daily
- **Filter**: `appointmentDate = tomorrow`
- **Action**: Send final confirmation

### Day 0: Appointment Day
- **Trigger**: Scheduled for morning (8 AM)
- **Filter**: `appointmentDate = today`
- **Action**: Send "See you today!" message

### Day +1: Follow-up
- **Trigger**: Scheduled daily
- **Filter**: `appointmentDate = yesterday`
- **Action**: Request feedback, provide after-care

## Troubleshooting

### Emails Not Sending

1. Check SendGrid connection in Make.com
2. Verify "From" email is verified in SendGrid
3. Check SendGrid activity log for bounces/blocks
4. Ensure WEBHOOK_URL is set correctly in Replit Secrets

### No Appointments Returned

1. Test the endpoint directly: Visit `/api/appointments/upcoming` in browser
2. Check if appointments exist with dates in the future
3. Verify database connection (check Replit logs)

### Wrong Treatment Type Emails

1. Check Router filters in Make.com
2. Verify `treatmentType` field matches exactly (lowercase, underscores)
3. Add a default route for unmatched types

## Best Practices

1. **Test with yourself first** - Use your own email for testing
2. **Start with one scenario** - Get the daily email working before adding complexity
3. **Monitor execution history** - Check Make.com logs regularly
4. **Set up error notifications** - Make.com can alert you when scenarios fail
5. **Respect opt-outs** - Add unsubscribe handling (SendGrid manages this automatically)
6. **Don't spam** - One educational email per appointment is enough

## Cost Considerations

- **Make.com Free Tier**: 1,000 operations/month (sufficient for ~30 appointments/day)
- **SendGrid Free Tier**: 100 emails/day (upgrade if needed)
- **Replit**: API calls are unlimited

## Support

For issues with:
- **Make.com scenarios**: Check [Make.com Help Center](https://www.make.com/en/help)
- **SendGrid delivery**: Review [SendGrid Documentation](https://docs.sendgrid.com)
- **Replit API**: Check application logs in Replit console

## Next Steps

1. Set up your first daily email scenario
2. Test with a few sample appointments
3. Monitor results for 1 week
4. Expand to multi-day drip campaigns
5. Add SMS notifications (Twilio integration)
6. Track email open rates in SendGrid

---

**Happy Automating! 🚀**
