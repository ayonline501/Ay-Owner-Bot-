/*CMD
  command: offline
  help: 
  need_reply: false
  auto_retry_time: 
  folder: সাধারণ কমান্ড

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

if (chat.chat_type != "private") { 
  return; 
}

var mention = "[" + user.first_name + "](tg://user?id=" + user.telegramid + ")";

var msg =
"🌹 *আসসালামু আলাইকুম!* 🌹\n\n" +

mention + " 👋\n\n" +

"🤖 *আমি বর্তমানে চিরতরে অফলাইন 📴*\n\n" +
"📩 *এখন আর কোনো রিপ্লাই দেওয়া সম্ভব নয়*\n\n" +
"🙏 *আমাদের সাথে থাকার জন্য ধন্যবাদ*\n\n" +
"━━━━━━━━━━━━━━━━━━━━\n" +
"💔 *বিদায়...*";

Api.sendMessage({
  text: msg,
  parse_mode: "Markdown",
  reply_markup: {
    inline_keyboard: [
      [
        {
          text: "বিস্তারিত 🧾",
          url: "https://ayallinone.netlify.app/offline"
        }
      ]
    ]
  }
});
