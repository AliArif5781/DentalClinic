import sgMail from '@sendgrid/mail';

let connectionSettings: any;

async function getCredentials() {
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
  const xReplitToken = process.env.REPL_IDENTITY 
    ? 'repl ' + process.env.REPL_IDENTITY 
    : process.env.WEB_REPL_RENEWAL 
    ? 'depl ' + process.env.WEB_REPL_RENEWAL 
    : null;

  if (!xReplitToken) {
    throw new Error('X_REPLIT_TOKEN not found for repl/depl');
  }

  connectionSettings = await fetch(
    'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=sendgrid',
    {
      headers: {
        'Accept': 'application/json',
        'X_REPLIT_TOKEN': xReplitToken
      }
    }
  ).then(res => res.json()).then(data => data.items?.[0]);

  if (!connectionSettings || (!connectionSettings.settings.api_key || !connectionSettings.settings.from_email)) {
    throw new Error('SendGrid not connected');
  }
  return {apiKey: connectionSettings.settings.api_key, email: connectionSettings.settings.from_email};
}

export async function getUncachableSendGridClient() {
  const {apiKey, email} = await getCredentials();
  sgMail.setApiKey(apiKey);
  return {
    client: sgMail,
    fromEmail: email
  };
}

export interface EducationalEmailData {
  recipientEmail: string;
  recipientName: string;
  treatmentType: string;
  appointmentDate: string;
  appointmentTime: string;
}

export async function sendEducationalEmail(data: EducationalEmailData) {
  try {
    const { client, fromEmail } = await getUncachableSendGridClient();
    
    const emailContent = getEmailContentByTreatment(data.treatmentType, data);
    
    const msg = {
      to: data.recipientEmail,
      from: fromEmail,
      subject: emailContent.subject,
      html: emailContent.html,
      text: emailContent.text,
    };

    await client.send(msg);
    console.log(`✅ Educational email sent to ${data.recipientEmail} for ${data.treatmentType}`);
    return { success: true };
  } catch (error: any) {
    console.error('❌ Failed to send educational email:', error);
    if (error.response) {
      console.error(error.response.body);
    }
    return { success: false, error: error.message };
  }
}

function getEmailContentByTreatment(treatmentType: string, data: EducationalEmailData) {
  const { recipientName, appointmentDate, appointmentTime } = data;
  
  const templates: Record<string, { subject: string; html: string; text: string }> = {
    root_canal: {
      subject: 'Your Root Canal Appointment - What to Expect',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">Root Canal Preparation Guide</h2>
          <p>Hi ${recipientName},</p>
          <p>Your root canal appointment is scheduled for <strong>${appointmentDate}</strong> at <strong>${appointmentTime}</strong>.</p>
          
          <h3 style="color: #1e40af;">What to Expect:</h3>
          <ul>
            <li>The procedure typically takes 60-90 minutes</li>
            <li>Local anesthesia will be used to ensure comfort</li>
            <li>You may experience mild discomfort for 24-48 hours after</li>
          </ul>
          
          <h3 style="color: #1e40af;">Before Your Appointment:</h3>
          <ul>
            <li>Take any prescribed medications as directed</li>
            <li>Eat a light meal before your appointment</li>
            <li>Avoid alcohol 24 hours before the procedure</li>
          </ul>
          
          <h3 style="color: #1e40af;">After Care Tips:</h3>
          <ul>
            <li>Avoid chewing on the treated side for 24 hours</li>
            <li>Take over-the-counter pain relievers as needed</li>
            <li>Contact us immediately if you experience severe pain or swelling</li>
          </ul>
          
          <p>If you have any questions, please don't hesitate to contact us.</p>
          <p>Best regards,<br>Lume Dental Team</p>
        </div>
      `,
      text: `Root Canal Preparation Guide\n\nHi ${recipientName},\n\nYour root canal appointment is scheduled for ${appointmentDate} at ${appointmentTime}.\n\nWhat to Expect:\n- The procedure typically takes 60-90 minutes\n- Local anesthesia will be used to ensure comfort\n- You may experience mild discomfort for 24-48 hours after\n\nBefore Your Appointment:\n- Take any prescribed medications as directed\n- Eat a light meal before your appointment\n- Avoid alcohol 24 hours before the procedure\n\nAfter Care Tips:\n- Avoid chewing on the treated side for 24 hours\n- Take over-the-counter pain relievers as needed\n- Contact us immediately if you experience severe pain or swelling\n\nBest regards,\nLume Dental Team`
    },
    cleaning: {
      subject: 'Your Dental Cleaning Appointment - Oral Hygiene Tips',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">Dental Cleaning - Preparation & Benefits</h2>
          <p>Hi ${recipientName},</p>
          <p>Your dental cleaning appointment is scheduled for <strong>${appointmentDate}</strong> at <strong>${appointmentTime}</strong>.</p>
          
          <h3 style="color: #1e40af;">Benefits of Regular Cleanings:</h3>
          <ul>
            <li>Prevents cavities and gum disease</li>
            <li>Removes plaque and tartar buildup</li>
            <li>Freshens breath and brightens smile</li>
            <li>Early detection of dental issues</li>
          </ul>
          
          <h3 style="color: #1e40af;">Oral Hygiene Tips:</h3>
          <ul>
            <li>Brush twice daily for 2 minutes</li>
            <li>Floss at least once a day</li>
            <li>Use fluoride toothpaste</li>
            <li>Replace your toothbrush every 3-4 months</li>
            <li>Limit sugary foods and drinks</li>
          </ul>
          
          <h3 style="color: #1e40af;">Before Your Appointment:</h3>
          <ul>
            <li>Brush and floss before coming in</li>
            <li>List any concerns or sensitive areas</li>
            <li>Bring your insurance information</li>
          </ul>
          
          <p>We look forward to seeing you!</p>
          <p>Best regards,<br>Lume Dental Team</p>
        </div>
      `,
      text: `Dental Cleaning - Preparation & Benefits\n\nHi ${recipientName},\n\nYour dental cleaning appointment is scheduled for ${appointmentDate} at ${appointmentTime}.\n\nBenefits of Regular Cleanings:\n- Prevents cavities and gum disease\n- Removes plaque and tartar buildup\n- Freshens breath and brightens smile\n- Early detection of dental issues\n\nOral Hygiene Tips:\n- Brush twice daily for 2 minutes\n- Floss at least once a day\n- Use fluoride toothpaste\n- Replace your toothbrush every 3-4 months\n- Limit sugary foods and drinks\n\nBest regards,\nLume Dental Team`
    },
    cosmetic: {
      subject: 'Your Cosmetic Dentistry Appointment',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">Cosmetic Dentistry - Your Journey to a Perfect Smile</h2>
          <p>Hi ${recipientName},</p>
          <p>Your cosmetic dentistry appointment is scheduled for <strong>${appointmentDate}</strong> at <strong>${appointmentTime}</strong>.</p>
          
          <h3 style="color: #1e40af;">What to Expect:</h3>
          <ul>
            <li>Comprehensive smile assessment</li>
            <li>Discussion of your aesthetic goals</li>
            <li>Treatment options tailored to you</li>
            <li>Digital smile preview (if applicable)</li>
          </ul>
          
          <p>We're excited to help you achieve the smile of your dreams!</p>
          <p>Best regards,<br>Lume Dental Team</p>
        </div>
      `,
      text: `Cosmetic Dentistry - Your Journey to a Perfect Smile\n\nHi ${recipientName},\n\nYour cosmetic dentistry appointment is scheduled for ${appointmentDate} at ${appointmentTime}.\n\nWhat to Expect:\n- Comprehensive smile assessment\n- Discussion of your aesthetic goals\n- Treatment options tailored to you\n- Digital smile preview (if applicable)\n\nBest regards,\nLume Dental Team`
    },
    exam: {
      subject: 'Your Dental Exam Appointment',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">Comprehensive Dental Exam</h2>
          <p>Hi ${recipientName},</p>
          <p>Your dental exam is scheduled for <strong>${appointmentDate}</strong> at <strong>${appointmentTime}</strong>.</p>
          
          <h3 style="color: #1e40af;">What We'll Check:</h3>
          <ul>
            <li>Overall oral health assessment</li>
            <li>Cavity detection</li>
            <li>Gum health evaluation</li>
            <li>Oral cancer screening</li>
            <li>X-rays (if needed)</li>
          </ul>
          
          <p>Regular exams help catch issues early!</p>
          <p>Best regards,<br>Lume Dental Team</p>
        </div>
      `,
      text: `Comprehensive Dental Exam\n\nHi ${recipientName},\n\nYour dental exam is scheduled for ${appointmentDate} at ${appointmentTime}.\n\nWhat We'll Check:\n- Overall oral health assessment\n- Cavity detection\n- Gum health evaluation\n- Oral cancer screening\n- X-rays (if needed)\n\nBest regards,\nLume Dental Team`
    },
    emergency: {
      subject: 'Your Emergency Dental Appointment',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #dc2626;">Emergency Dental Care</h2>
          <p>Hi ${recipientName},</p>
          <p>Your emergency appointment is scheduled for <strong>${appointmentDate}</strong> at <strong>${appointmentTime}</strong>.</p>
          
          <h3 style="color: #991b1b;">Before You Arrive:</h3>
          <ul>
            <li>Rinse with warm salt water if experiencing pain</li>
            <li>Apply cold compress to reduce swelling</li>
            <li>Take over-the-counter pain relief as directed</li>
            <li>Bring any broken tooth fragments if applicable</li>
          </ul>
          
          <p>We're here to help. See you soon!</p>
          <p>Best regards,<br>Lume Dental Team</p>
        </div>
      `,
      text: `Emergency Dental Care\n\nHi ${recipientName},\n\nYour emergency appointment is scheduled for ${appointmentDate} at ${appointmentTime}.\n\nBefore You Arrive:\n- Rinse with warm salt water if experiencing pain\n- Apply cold compress to reduce swelling\n- Take over-the-counter pain relief as directed\n- Bring any broken tooth fragments if applicable\n\nBest regards,\nLume Dental Team`
    },
    orthodontics: {
      subject: 'Your Orthodontic Consultation',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">Orthodontic Consultation</h2>
          <p>Hi ${recipientName},</p>
          <p>Your orthodontic consultation is scheduled for <strong>${appointmentDate}</strong> at <strong>${appointmentTime}</strong>.</p>
          
          <h3 style="color: #1e40af;">What to Expect:</h3>
          <ul>
            <li>Comprehensive bite and alignment assessment</li>
            <li>Discussion of treatment options (braces, aligners, etc.)</li>
            <li>Timeline and cost estimates</li>
            <li>Before and after examples</li>
          </ul>
          
          <p>Looking forward to helping you achieve a perfect smile!</p>
          <p>Best regards,<br>Lume Dental Team</p>
        </div>
      `,
      text: `Orthodontic Consultation\n\nHi ${recipientName},\n\nYour orthodontic consultation is scheduled for ${appointmentDate} at ${appointmentTime}.\n\nWhat to Expect:\n- Comprehensive bite and alignment assessment\n- Discussion of treatment options (braces, aligners, etc.)\n- Timeline and cost estimates\n- Before and after examples\n\nBest regards,\nLume Dental Team`
    },
    extraction: {
      subject: 'Your Tooth Extraction Appointment - Preparation Guide',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">Tooth Extraction - What to Expect</h2>
          <p>Hi ${recipientName},</p>
          <p>Your tooth extraction is scheduled for <strong>${appointmentDate}</strong> at <strong>${appointmentTime}</strong>.</p>
          
          <h3 style="color: #1e40af;">Before Your Appointment:</h3>
          <ul>
            <li>Eat a light meal beforehand</li>
            <li>Avoid smoking 12 hours before</li>
            <li>Arrange for someone to drive you home</li>
          </ul>
          
          <h3 style="color: #1e40af;">After Care:</h3>
          <ul>
            <li>Bite on gauze for 30-45 minutes</li>
            <li>Avoid rinsing or spitting for 24 hours</li>
            <li>Stick to soft foods for a few days</li>
            <li>No straws - they can dislodge the clot</li>
            <li>Apply ice packs to reduce swelling</li>
          </ul>
          
          <p>We'll make sure you're comfortable throughout the procedure.</p>
          <p>Best regards,<br>Lume Dental Team</p>
        </div>
      `,
      text: `Tooth Extraction - What to Expect\n\nHi ${recipientName},\n\nYour tooth extraction is scheduled for ${appointmentDate} at ${appointmentTime}.\n\nBefore Your Appointment:\n- Eat a light meal beforehand\n- Avoid smoking 12 hours before\n- Arrange for someone to drive you home\n\nAfter Care:\n- Bite on gauze for 30-45 minutes\n- Avoid rinsing or spitting for 24 hours\n- Stick to soft foods for a few days\n- No straws - they can dislodge the clot\n- Apply ice packs to reduce swelling\n\nBest regards,\nLume Dental Team`
    }
  };

  return templates[treatmentType] || templates.exam;
}
