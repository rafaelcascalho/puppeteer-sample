const app = require('express')()
const { getPageImagesSrcs } = require('./puppeteer')
const classify = require('./classifier')
const { updateImgsLabels } = require('./vtex')

app.post('classify-imgs', async (req, res) => {
  try {
    const url = req.body.url
    const srcs = await getPageImagesSrcs(url)
    const classification = classify(srcs)
    await updateImgsLabels(srcs, classification)
    return res.json({ success: true })
  } catch (error) {
    console.log(error)
  }
})

app.listen(3000, () => console.log(`> server running at http://localhost:3000...`))
