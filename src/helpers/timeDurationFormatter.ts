export const formatDuration = (secs: number) => {
    const divisor_for_minutes = secs % (60 * 60);
    const minutes = Math.floor(divisor_for_minutes / 60);

    const divisor_for_seconds = divisor_for_minutes % 60;
    const seconds = Math.ceil(divisor_for_seconds);

    let secondsOutput: string = seconds.toString()
    if (seconds < 10) {
        secondsOutput = "0" + seconds
    }

    return `${minutes}:${secondsOutput}`
};
