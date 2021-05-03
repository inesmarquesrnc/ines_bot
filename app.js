const tmi = require('tmi.js');

const opts = {
    options: {
        debug: true
    },
    identity:{
        username: 'ines_bot',
        password: 'oauth:wmoqjz00vezn0ejxegqzg2o5h8p9yr'
    },
    channels:[
        "wenoll"
    ]
};

const client = new tmi.client(opts);

//arrays
const blocked_words = ['followporfollow', 'followxfollow', 'follow por follow', 'follow x follow'];
const colors = ["SpringGreen", "Blue", "Chocolate", "Red", "Coral", "Firebrick", "OrangeRed", "SeaGreen", "Green", "HotPink"];
//colors.toString();

// Register our event handlers
client.on('chat', onChatHandler);
client.on('connected', onConnectedHandler);
client.on('message', (channel, userstate, message, self) => {
  if (self) return;
  //if (userstate.username === BOT_USERNAME) return;
  if (message.toLowerCase() === 'hola') {
    client.say(channel, `hola, @${userstate.username}!`);
  }
  if (message.toLowerCase() === 'cucaracha') {
    client.say(channel, 'A mí me gusta el flooow\n De la cucarachaa \nCuando le hecha flis\nHace así y se emborrachaa');
  }
  checkChat(channel, userstate, message);
});

// Connect to Twitch:
client.connect();

// Called every time a message comes in
function onChatHandler(target, context, msg, self) {
  if (self) { return; } // Ignore messages from the bot

  // Remove whitespace from chat message
  const commandName = msg.trim();

  // If the command is known, let's execute it
  if (commandName === 'redes') {
    client.say(target, `https://myurls.co/wenoll`);
  }

  if (msg.includes("hola") || msg.includes("HOLA")) {
    client.action('ines_bot', 'bienvenido al chat :)');
  }

  if (commandName === '!color') {
    //console.log(client.getChannels());
    client.color(colors[Math.floor(Math.random() * 10)]);
    //change color of bot
    client.color
    client.say("ines_bot", "Bot color changed");
  }

}

//check twitch chat, delete message which isnt suitable and respond to it
function checkChat(channel, username, message) {
  let shouldSendMessage = false;
  //check message
  message = message.toLowerCase();
  shouldSendMessage = blocked_words.some(blockedWord => message.includes(blockedWord.toLowerCase()));
  //tell user
 // client.say(channel, `@${username.username} oopsie message deleted`);
  //delete message
  if (shouldSendMessage) {
    client.deletemessage(channel, username.id)
     /* .then((data) => {
        //nothing
      }).catch((err) => {
        //nothing
      });*/
      client.say(channel, `@${username.username} oops ese mensaje no me gusta =(`);
  }
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler(addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
  //client.say('Lonermoan', `connected to ${addr} and ${port}`);
  client.action('ines_bot', 'Hello inesmarquesrnc, lame bot here');
}