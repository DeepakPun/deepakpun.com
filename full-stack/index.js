import express from 'express'
import engine from 'ejs-mate'
import path from 'path'
const __dirname = import.meta.dirname
const app = express()
const port = 3001

app.engine('ejs', engine)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
  res.render('landing')
})

app.listen(port, () => console.log(`App is running on port ${port}`))