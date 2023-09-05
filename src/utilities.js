export function cleanDateTime(dateTime) {
    return dateTime.replace("T", " ").slice(0, dateTime.lastIndexOf(":"))
}