/*CMD
  command: 🌍 Storage
  help: 
  need_reply: false
  auto_retry_time: 
  folder: স্টোরেজ সিস্টেম

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

// ১. ইউজারের পাঠানো মেসেজটি সাথে সাথে ডিলিট করা
Api.deleteMessage({
  chat_id: chat.chatid,
  message_id: request.message_id
});

// ২. বটের পক্ষ থেকে একটি মেসেজ পাঠানো
var botMsg = "আপনার স্টোরেজ গ্রুপ এর লিংক 👇👇👇\n\n  https://t.me/oqbssm82 \n\n\nলিংক টা ১০  সেকেন্ড পর ডিলিট হয়ে যাবে।";

Api.sendMessage({
  text: botMsg,
  parse_mode: "Markdown",
  on_result: "on_sent_delete" // মেসেজ পাঠানোর পর এই কমান্ডটি রান হবে
});
