export const timeDiff = (start: Date, end: Date) => {
    let diff = (start.getTime() - end.getTime()) / 1000;
    diff /= 60;
    return Math.abs(Math.round(diff));
}
