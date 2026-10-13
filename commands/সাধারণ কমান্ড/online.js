/*CMD
  command: online
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

// ১. চেক করা এটি পার্সোনাল চ্যাট কি না (গ্রুপে কাজ করবে না)
if (chat.chat_type != "private") { 
  return; 
}

// ২. ইউজার মেনশন তৈরি
var mention = "[" + user.first_name + "](tg://user?id=" + user.telegramid + ")";

// ৩. পূর্ণ সালাম, স্বাগতম এবং ধৈর্য ধরার মেসেজ পাঠানো
var salamMsg = "🌹 *আসসালামু আলাইকুম ওয়া রহমাতুল্লাহি ওয়া বারাকাতুহু!* 🌹\n\n" + 
               mention + " আমাদের **Ay Owner** 👑 বটে আপনাকে স্বাগতম। ✨\n\n" +
               "আমরা আপনাকে কিভাবে সাহায্য করতে পারি? 🤝 অথবা আপনার কিছু বলার থাকলে বলতে পারেন। 😊\n\n" +
               "━━━━━━━━━━━━━━━━━━━━\n" +
               "📢 *আপনার মেসেজ দেখার সাথে সাথে রিপ্লাই দিবো। তবে রিপ্লাই দিতে কিছুটা দেরি হলে দয়া করে ধৈর্য ধরে অপেক্ষা করুন।* ⏳🙏✨";

Api.sendMessage({
  text: salamMsg,
  parse_mode: "Markdown"
});
