/*CMD
  command: /del
  help: 
  need_reply: false
  auto_retry_time: 
  folder: ডিলিট সিস্টেম

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

// Command: /del

var replied = null;

// Reply করা মেসেজ খুঁজে বের করা
if (request.reply_to_message) {
    replied = request.reply_to_message;
}
else if (request.message && request.message.reply_to_message) {
    replied = request.message.reply_to_message;
}
else if (message && message.reply_to_message) {
    replied = message.reply_to_message;
}

// Reply না থাকলে
if (!replied || !replied.message_id) {
    Bot.sendMessage("⚠️ কোনো মেসেজে reply করে /del কমান্ড দিন।");
    return;
}

// Reply করা মেসেজ ডিলিট
Api.deleteMessage({
    chat_id: chat.chatid,
    message_id: replied.message_id
});

// /del কমান্ডটাও ডিলিট
Api.deleteMessage({
    chat_id: chat.chatid,
    message_id: request.message_id
});
