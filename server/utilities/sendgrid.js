import * as sendgridMail from "@sendgrid/mail";

const sgMail = sendgridMail.default;
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default function sendContactEmail(fields) {
  const check = checkRequiredFields(fields);
  if (!check) {
    return { error: "Required field(s) missing", success: false };
  }
  const attachment = fields.attachment;

  delete fields.attachment;

  const msg = {
    from: "no-reply@flashbeing.com", // Use the email address or domain you verified
    personalizations: [
      {
        to: [
          {
            email: "recruiting@csu-online.it",
          },
        ],
        // cc: [
        //   {
        //     email: "alessiocrea@flashbeing.com",
        //   },
        // ],
        dynamic_template_data: {
          name: fields.name,
          surname: fields.surname,
          birthday: fields.birthday,
          gender: fields.gender,
          phone: fields.phone,
          email: fields.email,
          studyTitle: fields.studyTitle,
          lastWorkingExperience: fields.lastWorkingExperience,
          languages: fields.languages,
          message: fields.message,
          jobOffer: fields.jobOffer,
        },
      },
    ],
    attachments: [
      {
        ...attachment,
        type: "application/pdf",
        disposition: "attachment",
      },
    ],
    template_id: "d-7ad65aa263de4744b2e96139364eae57",
  };
  return sendEmail(msg);
}

async function sendEmail(msg) {
  try {
    await sgMail.send(msg);
    return { success: true };
  } catch (error) {
    if (error.response) {
      return { error: error.response.body, success: false };
    }
    return { error: "", success: false };
  }
}

function checkRequiredFields({
  name,
  surname,
  birthday,
  gender,
  phone,
  email,
  studyTitle,
  lastWorkingExperience,
  languages,
}) {
  if (
    !name ||
    !surname ||
    !birthday ||
    !gender ||
    !phone ||
    !email ||
    !studyTitle ||
    !lastWorkingExperience ||
    !languages
  ) {
    return false;
  }
  return true;
}
