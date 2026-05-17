import { NextResponse } from "next/server"

interface ContributionDay {
  date: string
  count: number
  level: number
  weekday: number
  weekIndex: number
  title: string
}

function parseAttributes(rect: string) {
  const attrs: Record<string, string> = {}
  const regex = /([a-zA-Z_:][-a-zA-Z0-9_:.]*)=(?:"([^"]*)"|'([^']*)')/g
  let match

  while ((match = regex.exec(rect))) {
    attrs[match[1]] = match[2] ?? match[3] ?? ""
  }

  return attrs
}

export async function GET() {
  try {
    const username = "krishivkatariya"
    const response = await fetch(`https://github.com/users/${username}/contributions`, {
      headers: {
        "User-Agent": "Next.js"
      }
    })

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch GitHub contributions" },
        { status: 502 }
      )
    }

    const body = await response.text()
    let rectMatches = Array.from(body.matchAll(/<rect\b[^>]*\bdata-date=(?:"[^"]*"|'[^']*')[^>]*>/g))

    if (rectMatches.length === 0) {
      rectMatches = Array.from(body.matchAll(/<rect[^>]*class="ContributionCalendar-day"[^>]*>/g))
    }

    if (rectMatches.length === 0) {
      return NextResponse.json(
        { error: "GitHub contributions data not found" },
        { status: 502 }
      )
    }

    const rawDays = rectMatches.map((match) => {
      const attrs = parseAttributes(match[0])
      const date = attrs["data-date"] || ""
      const count = parseInt(attrs["data-count"] || "0", 10)
      const rawLevel = attrs["data-level"]
      const level = rawLevel
        ? Math.min(Math.max(parseInt(rawLevel, 10), 0), 4)
        : count === 0
          ? 0
          : count < 3
            ? 1
            : count < 5
              ? 2
              : count < 8
                ? 3
                : 4
      const x = parseInt(attrs["x"] || "0", 10)
      const dateObject = new Date(date)
      const weekday = Number.isNaN(dateObject.getTime()) ? 0 : dateObject.getUTCDay()
      const title = attrs["aria-label"] || `${count} contributions on ${date}`

      return {
        date,
        count,
        level,
        weekday,
        x,
        title,
      }
    }).filter((day) => day.date)

    const xValues = Array.from(new Set(rawDays.map((day) => day.x))).sort((a, b) => a - b)
    const days: ContributionDay[] = rawDays.map((day) => ({
      date: day.date,
      count: day.count,
      level: day.level,
      weekday: day.weekday,
      weekIndex: xValues.indexOf(day.x),
      title: day.title,
    }))

    return NextResponse.json({ days })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch GitHub contributions" },
      { status: 500 }
    )
  }
}
