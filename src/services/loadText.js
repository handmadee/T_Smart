
export default function loadText(title = '', length = 0) {
    return title.length > length ? title.slice(0, length) + '...' : title;
}