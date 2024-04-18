
export default function ColorPicker(): string {

    // Tailwind colors
    const colors = [
        "red",
        "orange",
        "amber",
        "yellow",
        "lime",
        "green",
        "emerald",
        "teal",
        "cyan",
        "sky",
        "blue",
        "indigo",
        "violet",
        "purple",
        "fuchsia",
        "pink",
        "rose"
    ]

    // Choose a random color
    const randomColor = colors[Math.floor(Math.random() * colors.length)]

    // Choose a random intensity between 300 and 900
    const randomIntensity = Math.floor(Math.random()) * 600 + 300

    return `${randomColor}-${randomIntensity}`
}