export interface ResponseErrorI {
  message: string;
}

export const getTypedError = (error: unknown) => {
  let errMessage;
  if (error instanceof Error) errMessage = error;
  else errMessage = Object(error);

  return errMessage;
};
