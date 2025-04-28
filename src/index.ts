import expresss, { type Request, type Response } from 'express'

const app = expresss()
app.use(expresss.json())

app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'The API is working perfectly!✅' })
})

app.listen(4000, () => console.log('Application is starting on port: 4000 🚀'))
