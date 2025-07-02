import { apiResponse } from "~/utils/apiResponse"

export default defineEventHandler(async (event) => {

  const body = await readBody()

  if (!body.to || !body.subject || !body.mail){
    return apiResponse(200,[],'email data not found')
  }

  const {sendMail} = useNodeMailer()

  const emailBody = {
    to: body.to,
    subject: body.subject,
    html:body.mail
  };

  sendMail(emailBody)

  return apiResponse(200,[],'email send')
})
