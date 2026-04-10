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

    let filename = text.split('/').pop().split('?')[0]

    await conn.sendMessage(m.chat, {
      document: res.data,
      fileName: filename || 'file',
      mimetype: 'application/octet-stream'
    }, { quoted: m })

  } catch (e) {
    console.log(e)
    m.reply('❌ Download fail\nYa to link direct nahi hai ya server block kar raha hai')
  }
}

handler.command = ['downurl']
export default handler
