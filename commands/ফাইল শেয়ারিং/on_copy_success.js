/*CMD
  command: on_copy_success
  help: 
  need_reply: false
  auto_retry_time: 
  folder: ফাইল শেয়ারিং

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

/* Command: /on_copy_success */

// গ্রুপ টপিকে যাওয়া মেসেজের আইডি নেওয়া
let topicMsgId = options.result.message_id;
let botUsername = bot.name;

// একই মেসেজ আইডির জন্য দুইবার চললে দ্বিতীয়বার কিছু পাঠাবে না
if (User.getProperty("last_copy_id") === String(topicMsgId)) { return; }
User.setProperty("last_copy_id", String(topicMsgId), "string");

// ইউনিক ডিপ লিংক
let shareLink = "https://t.me/" + botUsername + "?start=f_" + topicMsgId;

let msgText =
  "✅ <b>মেসেজ সফলভাবে পাওয়া গেছে!</b>\n\n" +
  "📌 <b>মেসেজ আইডি:</b> <code>" + topicMsgId + "</code>\n" +
  "🔗 <b>ফাইল শেয়ার লিংক:</b>\n<code>" + shareLink + "</code>\n\n" +
  "💡 <i>এই লিংকে ক্লিক করলে ইউজার হুবহু ফরম্যাটিং সহ ফাইলটি পাবে।</i>";

Api.sendMessage({
  chat_id: user.telegramid,
  text: msgText,
  parse_mode: "HTML",
  disable_web_page_preview: true,
  reply_markup: {
    inline_keyboard: [
      [{ text: " লিংক কপি করুন", copy_text: { text: shareLink } }]
    ]
  }
});
