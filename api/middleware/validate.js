import { ZodError } from 'zod'

export const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body)
  if (!result.success) {
    console.log('Zod Error Detail:', result.error.format())
    return res.status(400).json({
      success: false,
      errors: result.error.flatten().fieldErrors
    })
  }
  next()
}

// export const validate = (schema) => (req, res, next) => {
//   try {
//     schema.parse(req.body)
//     next();
//   } catch (error) {
//     if (error instanceof ZodError) {
//       return res.status(400).json({
//         success: false,
//         message: "Validation Failed",
//         errors: error.errors?.map((err) => ({
//           path: err.path,
//           message: err.message,
//         })) || [],
//       });
//     }

//     next(error)
//   }
// }