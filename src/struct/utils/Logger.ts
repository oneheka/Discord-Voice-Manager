import colors from "colors";

export class Logger {
    private static getTimestamp(): string {
        const now = new Date()
        return now.toTimeString().split(' ')[0]
    }

    public static info(message: string): void {
        console.log(`${colors.gray(`[${this.getTimestamp()}]`)} ${colors.cyan('[INFO]')} ${message}`)
    }

    public static success(message: string): void {
        console.log(`${colors.gray(`[${this.getTimestamp()}]`)} ${colors.green('[SUCCESS]')} ${message}`)
    }

    public static warn(message: string): void {
        console.log(`${colors.gray(`[${this.getTimestamp()}]`)} ${colors.yellow('[WARN]')} ${message}`)
    }

    public static error(message: string, error?: unknown): void {
        console.log(`${colors.gray(`[${this.getTimestamp()}]`)} ${colors.red('[ERROR]')} ${message}`)
        if (error) {
            console.error(error)
        }
    }

    public static event(eventName: string): void {
        console.log(`${colors.gray(`[${this.getTimestamp()}]`)} ${colors.magenta('[EVENT]')} Loaded event: ${colors.bold(eventName)}`)
    }
}