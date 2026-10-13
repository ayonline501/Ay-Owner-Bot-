/*CMD
  command: 📂 File
  help: 
  need_reply: true
  auto_retry_time: 
  folder: ফাইল শেয়ারিং

  <<ANSWER
🔗 লিংক জেনারেটর ✨
━━━━━━━━━━━━━━━━━━

📩 আমাকে মেসেজ, ফটো, ভিডিও, ফাইল বা যেকোনো কিছু পাঠান 📦

⚡ আমি সাথে সাথে সেটার লিংক বের করে দেব!
  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

/* Command: <any> */

// ১. শুধুমাত্র বটের ইনবক্সে কেউ কিছু পাঠালে কাজ করবে (গ্রুপে কথা বললে লুপ হবে না)
if (chat.chat_type !== "private") {
    return;
}

// ২. কোনো আইডি চেক ছাড়া যে কেউ কিছু পাঠালেই সরাসরি গ্রুপ টপিকে কপি হবে
Api.copyMessage({
    chat_id: "@wks9o3mzjdks",      // আপনার টপিক গ্রুপ
    message_thread_id: 13,         // টপিক আইডি
    from_chat_id: chat.chatid,
    message_id: request.message_id,
    on_result: "on_copy_success"   // পাঠানো সফল হলে লিংক বানিয়ে দেবে
});
