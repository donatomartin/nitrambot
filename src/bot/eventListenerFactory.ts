import { Service } from "../service";

type EventListenerCallback = (interaction: any) => Promise<void>;

export class EventListener {
  public name: string;
  public action: EventListenerCallback;

  constructor(name: string, action: any) {
    this.name = name;
    this.action = action;
  }
}

export class EventListenerFactory {
  public static createEventListeners(service: Service): EventListener[] {
    const eventListeners = [
      // Message Create
      new EventListener("messageCreate", (message: any) => {
        console.log("New Message:", {
          content: message.content,
          author: message.author.username,
          channel: message.channel.name,
          guild: message.guild?.name,
          id: message.id,
          createdAt: message.createdAt,
        });

        if (message.author.bot) return;

        service.findKeywords().then((keywords: any[]) => {
          for (const keyword of keywords.map((k) => k.keyword)) {
            if (
              message.content
                .toLowerCase()
                .replace(/ /g, "")
                .includes(keyword.toLowerCase().replace(/ /g, ""))
            ) {
              service.addKeywordUse({
                keyword,
                username: message.author.username,
              });
            }
          }
        });
      }),

      // Message Update
      new EventListener("messageUpdate", (oldMessage: any, newMessage: any) => {
        console.log("Message Updated:", {
          oldContent: oldMessage.content,
          newContent: newMessage.content,
          author: newMessage.author.username,
          channel: newMessage.channel.name,
          guild: newMessage.guild?.name,
          id: newMessage.id,
          editedAt: newMessage.editedAt,
        });
      }),

      // Message Delete
      new EventListener("messageDelete", (message: any) => {
        console.log("Message Deleted:", {
          content: message.content,
          author: message.author.username,
          channel: message.channel.name,
          guild: message.guild?.name,
          id: message.id,
          deletedAt: new Date(),
        });
      }),
    ];

    return eventListeners;
  }
}
