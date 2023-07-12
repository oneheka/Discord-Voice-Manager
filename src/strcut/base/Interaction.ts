import { ButtonRun, ModalRun } from '../../types/base/Interaction';

export default class Interaction {
    constructor(
        public name: string,
        public run: (ButtonRun | ModalRun)
    ) {}
}