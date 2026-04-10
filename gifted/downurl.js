import axios from 'axios'

let handler = async (m, { conn, text }) => {
  if (!text) return m.reply('Link do bhai')

  try {
    let response = await axios({
      method: "GET",
      url: text,
      responseType: "stream",
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Accept": "*/*"
      }
    })

    let filename = text.split('/').pop().split('?')[0]

    await conn.sendMessage(m.chat, {
      document: { url: text },
      fileName: filename || "file",
      mimetype: "application/octet-stream"
    }, { quoted: m })

  } catch (e) {
    console.log(e)
    m.reply('Download fail ❌\nLink direct nahi hai ya server block kar raha hai')
  }
}

handler.command = ['downurl']
export default handler
