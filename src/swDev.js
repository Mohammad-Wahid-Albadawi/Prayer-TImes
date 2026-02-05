export default function swDev() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js')
    }
}