export default function clamp(number, minimum, maximum) {
    return Math.min(
    Math.max(number, minimum),
    maximum);
    //tpc: porque faz clamp, fazer melhorias no pong
}