// src/middleware/errorMiddleware.js
export const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;
  let errors = null;

  // 1. Handle Mongoose/MongoDB Duplicate Key Error (E11000)
  if (err.code === 11000) {
    statusCode = 400; // Bad Request

    // Extract the field name from the error object
    // err.keyValue looks like: { title: "DevOps" }
    const field = Object.keys(err.keyValue)[0];
    const value = Object.values(err.keyValue)[0];

    message = "Duplicate value found";
    errors = {
      [field]: `The ${field} "${value}" is already in use. Please use a unique ${field}.`
    };
  }

  // 2. Handle Zod Validation Errors
  else if (err.name === 'ZodError' || err.issues) {
    statusCode = 400;
    message = 'Validation Failed';
    errors = err.issues?.reduce((acc, issue) => {
      acc[issue.path.join(".")] = issue.message;
      return acc;
    }, {});
  }

  // 3. Handle Mongoose Cast Errors (Invalid IDs)
  else if (err.name === 'CastError') {
    statusCode = 400;
    message = `Invalid resource format for field: ${err.path}`;
  }

  res.status(statusCode).json({
    success: false,
    message,
    errors,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};
