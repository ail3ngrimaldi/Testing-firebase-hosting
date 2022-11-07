//Importaciones e instanciaciones que vamos a utilizar:
import {
    MatrixClient,
    SimpleFsStorageProvider,
    AutojoinRoomsMixin
} from "matrix-bot-sdk";

//Variables con url de nuestro homeserver y el token de acceso para poder interactuar con el server:
const homeserverUrl = "https://app.element.io/?pk_vid=0aa93580682d0bdd1667756568696375#/room/#echo-bot-testing:matrix.org"; // make sure to update this with your url
const accessToken = "syt_YWlsZW50ZXN0aW5n_GXyRYngSlCFovkzVJLyc_29e2hM";

//Variable que configura el almacenamiento de datos que posteriormente pudieramos necesitar:
const storage = new SimpleFsStorageProvider("bot.json");

//Instanciación del client, en el caso de este ejemplo será Element:
const client = new MatrixClient(homeserverUrl, accessToken, storage);
//Indicación al bot para que auto acepte cualquier invitación a cualquier sala/servidor:
AutojoinRoomsMixin.setupOnClient(client);

//Iniciación al cliente:
client.start().then(() => console.log("Client started!"));

client.on("room.message", (roomId, event) => {
    if (! event["content"]) return;
    const sender = event["sender"];
    const body = event["content"]["body"];
    console.log(`${roomId}: ${sender} says '${body}`);

    if (body.startsWith("!echo")) {
        const replyText = body.substring("!echo".length).trim();
        client.sendMessage(roomId, {
            "msgtype": "m.notice",
            "body": replyText,
        }).then(console.log("it was your message", replyText))
    }
});