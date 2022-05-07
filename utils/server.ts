export const handleErrorInline = (
  truthy: boolean,
  ErrorClass: ErrorConstructor,
  errorMessage: string
) => {
  if (truthy) throw new ErrorClass(errorMessage);
};
