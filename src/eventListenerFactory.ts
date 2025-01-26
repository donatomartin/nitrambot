import { EventListener } from "./eventListener";
import { State } from "./state";

export class EventListenerFactory {
  public static createEventListeners(): EventListener[] {
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

        if (message.author.bot)
          return;

        if (message.content.toLowerCase().replace(/ /g, "").includes("ihatejavascript")) {
          State.getInstance().timesSomeoneSaidIHateJavascript++;
        }

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
