
export class State {

    private static instance: State;

    public static getInstance() : State {
        if (!this.instance) {
            this.instance = new State();
        }
        return this.instance;
    }

    private constructor() {
        // Private constructor to prevent instantiation
    }

    public timesSomeoneSaidIHateJavascript = 0;
        
}