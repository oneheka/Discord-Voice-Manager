import colors from 'colors';

export default class Logger {
    log(text: any) {
        console.log(colors.yellow('[LOG]: ') + text)
    }

    login(text: string) {
        console.log(colors.green('[ПОДКЛЮЧЕНО]: ') + text)
    }

    error(text: string | Error) {
        if(text instanceof Error) {
            console.log(
                colors.red('[ERROR]: ') + text.name + text.message + '\n'
                + (
                    !text?.stack ? ''
                    : text.stack.split('\n').map(str => `> ${str}`).join('\n')
                )
            )
        } else {
            console.log(colors.red('[ERROR]: ') + text)
        }
    }
}