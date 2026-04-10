import axios from 'axios'

let handler = async (m, { conn, text }) => {
  if (!text) return m.reply('Link do bhai')

  try {
    let res = await axios.get(text, {
      responseType: 'arraybuffer',
      headers: {
        'User-Agent': 'Mozilla/5.0'
      }
    })

    await conn.sendFile(
      m.chat,
      res.data,
      'file',
      'Download ho gaya ✅',
      m
    )

  } catch (e) {
    console.log(e)

    if (e.response) {
      m.reply(`Error ${e.response.status} aya 😢`)
    } else {
      m.reply('Download fail ho gaya 😢')
    }
  }
}

handler.command = ['downurl']
export default handler
