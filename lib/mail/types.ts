export type MailDTO = {
  fullName: string;
  email: string;
  subject: string;
  message: string;
};

export type MailSuccessResult = {
  status: number;
};

export type MailjetErrorMessage = {
  Errors: Array<{
    ErrorIdentifier: string;
    ErrorCode: string;
    StatusCode: number;
    ErrorMessage: string;
    ErrorRelatedTo: string[];
  }>;
  Status: string;
};

export type SendEmailResult = MailSuccessResult | number;
