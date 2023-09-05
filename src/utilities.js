export function cleanDateTime(dateTime) {
    return dateTime.replace("T", " ")
        .slice(0, dateTime.lastIndexOf(":"))
}

export function toTitle(string) {
    return string.split(" ")
        .map((word) => word[0].toUpperCase() + word.slice(1))
        .join(" ")
}