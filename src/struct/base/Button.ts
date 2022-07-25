export default class Button {
    name: string
    run: Function

    constructor(name: string, run: Function) {
        this.name = name
        this.run = run
    }
}