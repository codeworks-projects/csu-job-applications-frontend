import { readBody } from "h3";

import sendContactEmail from "~/server/utilities/sendgrid.js";

export default defineEventHandler(async (event) => {
  //   console.log(req, res);
  const body = await readBody(event);
  const emailSent = await sendContactEmail(body);

  return { ...emailSent };
});
