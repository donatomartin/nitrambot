
type CommandCallback = (interaction: any) => Promise<void>;

export class Command {

    public name: string;
    public description: string;
    public action: CommandCallback;

    constructor(name: string, description: string, action: any) {
        this.name = name;
        this.description = description;
        this.action = action;
    }

    public getCommandData() {
        return {
            name: this.name,
            description: this.description,
        };
    }

}