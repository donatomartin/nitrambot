
type EventListenerCallback = (interaction: any) => Promise<void>;

export class EventListener {
    
    public name: string;
    public action: EventListenerCallback;
    
    constructor(name: string, action: any) {
        this.name = name;
        this.action = action;
    }

}