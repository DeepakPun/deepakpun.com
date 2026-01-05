export const portfolioGuard = (req, res, next) => {
  if(req.method === 'GET') return next()

  const apiKey = req.headers['x-api-key']
  if(apiKey === 'deepak-pun-2026-demo') return next()

  res.status(401).json({
    message: 'Unauthorized. Check Swagger docs for the demo key.'
  })
}