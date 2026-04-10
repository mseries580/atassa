import fetch from 'node-fetch'

let handler = async (m, { conn, text }) => {
  if (!text) return m.reply('Link do bhai')

  try {
    let res = await fetch(text)
    let buffer = await res.buffer()

    await conn.sendFile(m.chat, buffer, 'file', 'Download ho gaya ✅', m)
  } catch (e) {
    m.reply('Error aya 😢\nLink check karo')
  }
}

handler.command = ['downurl']
export default handler
