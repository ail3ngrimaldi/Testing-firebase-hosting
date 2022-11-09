"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const matrix_bot_sdk_1 = require("matrix-bot-sdk");
// This will be the URL where clients can reach your homeserver. Note that this might be different
// from where the web/chat interface is hosted. The server must support password registration without
// captcha or terms of service (public servers typically won't work).
const homeserverUrl = "https://matrix-client.matrix.org";
// Use the access token you got from login or registration above.
const accessToken = "syt_YWlsZW50ZXN0aW5n_LWkbxdepBHhYwUFkKpbK_4MjItq";
// In order to make sure the bot doesn't lose its state between restarts, we'll give it a place to cache
// any information it needs to. You can implement your own storage provider if you like, but a JSON file
// will work fine for this example.
const storage = new matrix_bot_sdk_1.SimpleFsStorageProvider("bot-storage.json");
// Finally, let's create the client and set it to autojoin rooms. Autojoining is typical of bots to ensure
// they can be easily added to any room.
const client = new matrix_bot_sdk_1.MatrixClient(homeserverUrl, accessToken, storage);
matrix_bot_sdk_1.AutojoinRoomsMixin.setupOnClient(client);
// Before we start the bot, register our command handler
client.on("room.message", handleCommand);
// Now that everything is set up, start the bot. This will start the sync loop and run until killed.
client.start().then(() => console.log("Bot started!"));
console.log(client);
// This is the command handler we registered a few lines up
function handleCommand(roomId, event) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        // Don't handle unhelpful events (ones that aren't text messages, are redacted, or sent by us)
        if (((_a = event['content']) === null || _a === void 0 ? void 0 : _a['msgtype']) !== 'm.text')
            return;
        if (event['sender'] === (yield client.getUserId()))
            return;
        // // Check to ensure that the `hi polky` command is being run
        // const body = event['content']['body'];
        // if (!body?.startsWith("Hola polky")) return;
        const replyBody = "Hola, ¿sobre qué querés aprender hoy?"; // we don't have any special styling to do.
        const reply = matrix_bot_sdk_1.RichReply.createFor(roomId, event, replyBody, replyBody);
        reply["msgtype"] = "m.notice";
        client.sendMessage(roomId, reply);
        // Now that we've passed all the checks, we can actually act upon the command
        yield client.replyNotice(roomId, event, "Hello world!");
    });
}
