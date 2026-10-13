/*CMD
  command: /start
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

/* Command: /start */

// ১. ইউজারের তথ্য নিরাপদে সংরক্ষণ (নাল/আনডিফাইন্ড এরর এড়াতে)
var fName = user.first_name || "User";
var lName = user.last_name || "N/A";
var uName = user.username ? "@" + user.username : "নেই";
var uId = user.telegramid;
var userMsg = message || "/start";

var targetChatUsername = "@wks9o3mzjdks";
var topicId = 14; // টপিক আইডি

// ২. গ্রুপ টপিকে মেসেজ ফরোয়ার্ড এবং লাইভ স্ট্যাটিস্টিকস পাঠানো
try {
  // মেসেজ ফরোয়ার্ড
  if (request && request.message_id) {
    Api.forwardMessage({
      chat_id: targetChatUsername,
      from_chat_id: chat.chatid,
      message_id: request.message_id,
      message_thread_id: topicId
    });
  }

  // বটের লাইভ স্ট্যাটাস মেসেজ
  var statsText =
    "📈 <b>Bot Live Statistics</b>\n" +
    "═══════════════════════════\n" +
    "👤 <b>First Name:</b> " + fName + "\n\n" +
    "👥 <b>Last Name:</b> " + lName + "\n\n" +
    "🆔 <b>Username:</b> " + uName + "\n\n" +
    "🔗 <b>Profile Link:</b> <a href='tg://user?id=" + uId + "'>" + fName + "</a>\n\n" +
    "🆔 <b>User ID:</b> <code>" + uId + "</code>\n\n" +
    "রিপ্লাই দেওয়ার জন্য কপি করুন:\n" +
    "<code>/ripley " + uId + " </code>\n" +
    "═══════════════════════════\n" +
    "<b>মেসেজ:</b> " + userMsg;

  Api.sendMessage({
    chat_id: targetChatUsername,
    message_thread_id: topicId,
    text: statsText,
    parse_mode: "HTML",
    disable_web_page_preview: true
  });
} catch (e) {
  // কোনো কারণে ফরোয়ার্ড ফেইল হলেও যাতে নিচের কোড বন্ধ না হয়
}

// 🔥 ৩. যদি কোনো ডিপ লিংকে ক্লিক করে আসে (params থাকলে)
if (params) {

  // 👉 ৩.১ ফাইল শেয়ার লিংক চেক (f_ দিয়ে শুরু হলে)
  if (params.startsWith("f_")) {
    let msgId = parseInt(params.replace("f_", ""));

    // যদি f_ এর পরে সঠিক কোনো সংখ্যা না থাকে
    if (!msgId || isNaN(msgId) || msgId <= 0) {
      Bot.runCommand("on_file_error");
      return;
    }

    // গ্রুপ টপিক থেকে কপি করে পাঠানো
    Api.copyMessage({
      chat_id: chat.chatid,
      from_chat_id: targetChatUsername,
      message_id: msgId,
      on_error: "on_file_error"
    });
    return;
  }

  // 👉 ৩.২ admin লিংক হলে
  if (params === "admin") {
    Bot.runCommand("admin");
    return;
  }

  // 👉 ৩.৩ list লিংক হলে
  if (params === "list") {
    Bot.runCommand("list");
    return;
  }

  // ❌ ৩.৪ অন্য কোনো ভুল লিংক হলে
  Bot.runCommand("on_file_error");
  return;
}

// 🔥 ৪. সাধারণ ভাবে /start দিলে 'online' কমান্ড ওপেন হবে
Bot.runCommand("online");
