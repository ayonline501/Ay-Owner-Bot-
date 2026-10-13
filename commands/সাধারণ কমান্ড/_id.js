/*CMD
  command: /id
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

/* Command: /id
   Aliases: id, /myid, myid
*/

let resultText = "";

// 🔥 ১. যদি গ্রুপে কারো মেসেজে রিপ্লাই (Reply) দিয়ে /id লেখা হয়
if (request.reply_to_message) {
    let target = request.reply_to_message.from;
    resultText = "👤 *রিপ্লাই করা ইউজারের তথ্য:*\n" +
                 "━━━━━━━━━━━━━━━━━━\n" +
                 "🆔 *টেলিগ্রাম আইডি:* `" + target.id + "`\n" +
                 "📛 *নাম:* " + (target.first_name || "নেই") + "\n" +
                 "🔗 *ইউজারনেম:* " + (target.username ? "@" + target.username : "নেই") + "\n" +
                 "🤖 *অ্যাকাউন্ট ধরন:* " + (target.is_bot ? "বট" : "আসল ইউজার");
}

// 🔥 ২. যদি অন্য কারো মেসেজ বটে ফরোয়ার্ড (Forward) করা হয়
else if (request.forward_from) {
    let target = request.forward_from;
    resultText = "📩 *ফরোয়ার্ড করা ইউজারের তথ্য:*\n" +
                 "━━━━━━━━━━━━━━━━━━\n" +
                 "🆔 *টেলিগ্রাম আইডি:* `" + target.id + "`\n" +
                 "📛 *নাম:* " + (target.first_name || "নেই") + "\n" +
                 "🔗 *ইউজারনেম:* " + (target.username ? "@" + target.username : "নেই") + "\n" +
                 "🤖 *অ্যাকাউন্ট ধরন:* " + (target.is_bot ? "বট" : "আসল ইউজার");
}

// 🔥 ৩. যদি কোনো চ্যানেল থেকে পোস্ট ফরোয়ার্ড করা হয়
else if (request.forward_from_chat) {
    let targetChat = request.forward_from_chat;
    resultText = "📢 *ফরোয়ার্ড করা চ্যানেলের তথ্য:*\n" +
                 "━━━━━━━━━━━━━━━━━━\n" +
                 "🆔 *চ্যানেল আইডি:* `" + targetChat.id + "`\n" +
                 "📛 *চ্যানেল নাম:* " + (targetChat.title || "নেই") + "\n" +
                 "🔗 *ইউজারনেম:* " + (targetChat.username ? "@" + targetChat.username : "নেই");
}

// 🔥 ৪. সরাসরি /id দিলে নিজের তথ্য ও বর্তমান চ্যাট আইডি দেখাবে
else {
    let myUsername = user.username ? "@" + user.username : "নেই";
    resultText = "👤 *আপনার নিজের তথ্য:*\n" +
                 "━━━━━━━━━━━━━━━━━━\n" +
                 "🆔 *আপনার আইডি:* `" + user.telegramid + "`\n" +
                 "📛 *আপনার নাম:* " + user.first_name + "\n" +
                 "🔗 *ইউজারনেম:* " + myUsername + "\n\n" +
                 "💬 *চ্যাট তথ্য:*\n" +
                 "🆔 *বর্তমান চ্যাট আইডি:* `" + chat.chatid + "`\n" +
                 "📂 *চ্যাট ধরন:* " + chat.chat_type + "\n\n" +
                 "💡 _টিপস: অন্যের আইডি পেতে তার যেকোনো মেসেজ ফরোয়ার্ড করে এখানে দিন অথবা গ্রুপে তার মেসেজে রিপ্লাই দিয়ে /id লিখুন।_";
}

// রেজাল্ট মেসেজ পাঠানো
Api.sendMessage({
    chat_id: chat.chatid,
    text: resultText,
    parse_mode: "Markdown"
});
