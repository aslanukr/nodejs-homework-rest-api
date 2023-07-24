export const handleSaveError = (error, data, next) => {
  error.status = 400;
  next();
};

export const handleUpdateValidation = function (next) {
  this.options.runValidators = true;
  next();
};
