const parseRxp = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/;

export function parseLyric(data) {
  const lyricLines = data.split('\n')

  const lyrics = []
  for (let lyric of lyricLines) {
    if (lyric) {
      const res = parseRxp.exec(lyric)
      if (!res) continue
      lyrics.push({
        time: Number(res[1]) * 60 * 1000 + Number(res[2]) * 1000 + (res[3].length > 2 ? Number(res[3]) : Number(res[3]) * 10),
        content: lyric.replace(parseRxp, '').trim()
      })
    }
  }
  return lyrics
}