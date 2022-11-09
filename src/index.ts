import { 
    MatrixClient,
    SimpleFsStorageProvider,
    AutojoinRoomsMixin,
    RichReply
} from "matrix-bot-sdk";

const homeserverUrl = "https://matrix-client.matrix.org";
const accessToken = "syt_YWlsZW50ZXN0aW5n_LWkbxdepBHhYwUFkKpbK_4MjItq";

const storage = new SimpleFsStorageProvider("bot-storage.json");
const client = new MatrixClient(homeserverUrl, accessToken, storage);
AutojoinRoomsMixin.setupOnClient(client);

// Before we start the bot, register our command handler
client.on("room.message", handleCommand);

// Now that everything is set up, start the bot. This will start the sync loop and run until killed.
client.start().then(() => console.log("Bot started!"));

// This is the command handler we registered a few lines up
async function handleCommand(roomId: string, event: any) {
    // Don't handle unhelpful events (ones that aren't text messages, are redacted, or sent by us)
    if (event['content']?.['msgtype'] !== 'm.text') return;
    if (event['sender'] === await client.getUserId()) return;
    
    // Check to ensure that the `hi polky` command is being run
    // const body = event['content']['body'];
    // if (!body?.startsWith("Hola polky")) return;

//    const replyBody = "Hola, ¿sobre qué querés aprender hoy?";
//    const reply = RichReply.createFor(roomId, event, replyBody, replyBody);
//    reply["msgtype"] = "m.notice";
//    client.sendMessage(roomId, reply);

    await client.replyNotice(roomId, event, "¡Hola! Mi nombre es Polky y estoy para responder todas tus dudas ¿Cómo puedo ayudarte?");
}
