# Mailing Schedule Application

A web application for scheduling and managing email campaigns. The app allows users to select a mailer, a list of recipients, set a date and time for sending emails, and edit or delete scheduled mailings.

## Features

- **Mailer Selection**: Choose a mailer from a list of available mailers.
- **List Selection**: Choose a list of recipients for the email campaign.
- **Date & Time Picker**: Set a specific date and time for the mailing to be sent.
- **Add/Edit Mailing**: Add a new mailing schedule or edit an existing one.
- **Delete Mailing**: Delete an existing mailing schedule.
- **Alerts**: Notifications to inform the user about the success or failure of scheduling operations.

## Technologies Used

- **React.js**: Frontend library for building the user interface.
- **Next.js**: React framework for server-side rendering.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Lucide React**: Icons used in the application.
- **Axios**: HTTP client for making requests to the server.
- **date-fns**: JavaScript library for date formatting.
- **Shadcn UI**: A set of custom UI components.

## Setup

1. Clone the repository:

   ```bash
   https://github.com/MustafaMulla29/mail_scheduling_nextjs.git
   ```

2. Navigate to the project directory:

   ```bash
   cd mailing_scheduling_nextjs
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Run the development server:

   ```bash
   npm run dev
   ```

5. Open the app in your browser at `http://localhost:3000`.

## File Structure

- `components/`: Contains React components such as `AddMailing`, `MailerSelector`, `ListSelector`, `DatePicker`, etc.
- `app/page.js`: Contains the Next.js page for the homepage.
- `app/api/`: Contains all the mocked api's.
- `tmp/`: Contains all the json data.

## Usage

- **Add a Mailing**: Click the "Create Mailing" button, select a mailer, a list, choose a date and time, and submit the form to schedule a mailing.
- **Edit a Mailing**: Select an existing mailing from the table and click "Edit" to update the schedule.
- **Delete a Mailing**: Select an existing mailing from the table and click "Delete" to remove it from the schedule.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.
