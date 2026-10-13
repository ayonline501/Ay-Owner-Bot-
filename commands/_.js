/*CMD
  command: *
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

// 🔥 ১. সেটিংস (এডমিনদের টেলিগ্রাম আইডি ও টপিক গ্রুপ)
let ADMIN_1 = 8718182111;    // ১ম এডমিনের টেলিগ্রাম আইডি
let ADMIN_2 = 8825649789;    // ২য় এডমিনের টেলিগ্রাম আইডি
let GROUP_ID = "@wks9o3mzjdks"; // আপনার টপিক গ্রুপ ইউজারনেম
let TOPIC_ID = 14;           // আপনার টপিক আইডি

// ==========================================
// ২. গ্রুপ সার্ভিস মেসেজ মোছা (Join, Leave, Pin ইত্যাদি)
// ==========================================
if (chat.chat_type != "private") {
  let new_members = request.new_chat_members;
  if (new_members && new_members.length > 0) {
    Api.deleteMessage({ chat_id: chat.chatid, message_id: request.message_id });
  }
  if (request.pinned_message != null) {
    Api.deleteMessage({ chat_id: chat.chatid, message_id: request.message_id });
  }
  if (request.video_chat_started != null) {
    Api.deleteMessage({ chat_id: chat.chatid, message_id: request.message_id });
  }
  if (request.video_chat_ended != null) {
    Api.deleteMessage({ chat_id: chat.chatid, message_id: request.message_id });
  }
  if (request.left_chat_member != null) {
    Api.deleteMessage({ chat_id: chat.chatid, message_id: request.message_id });
  }
}

// ==========================================
// ৩. এডমিনের রিপ্লাই হ্যান্ডেলিং (টপিক গ্রুপ বা এডমিনদের ইনবক্স থেকে)
// ==========================================
if (request.reply_to_message) {
  let senderId = user.telegramid;
  let isGroupReply = (chat.chat_type != "private");
  let isAdminPrivateReply = (chat.chat_type == "private" && (senderId == ADMIN_1 || senderId == ADMIN_2));

  // টপিক গ্রুপ থেকে অথবা এডমিনের প্রাইভেট ইনবক্স থেকে রিপ্লাই আসলে
  if (isGroupReply || isAdminPrivateReply) {
    let repMsg = request.reply_to_message;
    let fullText = (repMsg.text || "") + " " + (repMsg.caption || "");

    // মেসেজ থেকে ইউজারের টেলিগ্রাম আইডি বের করা
    let match = fullText.match(/🆔 আইডি:\s*`?(\d+)`?/i) || fullText.match(/ID:\s*`?(\d+)`?/i);
    let targetUserId = match ? match[1] : null;

    if (targetUserId) {
      // ইউজারের কাছে এডমিনের রিপ্লাই কপি করে পাঠানো
      

      Api.copyMessage({
        chat_id: targetUserId,
        from_chat_id: chat.chatid,
        message_id: request.message_id
      });

      // এডমিনকে সফলতার মেসেজ দেওয়া
      Api.sendMessage({
        chat_id: chat.chatid,
        message_thread_id: request.message_thread_id,
        text: "✅ উত্তরটি সফলভাবে ইউজারের কাছে পৌঁছে গেছে! (User ID: `" + targetUserId + "`)",
        parse_mode: "Markdown",
        reply_to_message_id: request.message_id
      });

      return; // এখানেই কাজ শেষ
    }
  }
}

// ==========================================
// ৪. শুধুমাত্র ইউজারের সাধারণ ইনবক্স মেসেজের জন্য
// ==========================================
if (chat.chat_type != "private") {
  return; // গ্রুপে কেউ সাধারণ কথা বললে নিচে নামবে না
}

// ৫. ইউজারের মেসেজে র‍্যান্ডম ইমোজি রিঅ্যাকশন দেওয়া
var myEmoji = ["😐", "😑","🌚", "🥴","🤯", "🙏", "👌", "🥱", "🕊️", "🤡", "😂", "😊", "🐋", "🏆", "💔", "⚡", "👍", "😱", "👻", "😢", "👀", "🎃", "🍾", "🖌️", "❤️", "💻" , "🥰", "🔥", "🎉", "🤗", "😁", "👎", "👏", "💯", "🍓", "🌟", "🌭", "🤝", "🙉", "🦄", "⛄", "🎄", "🤔", "🤩", "🤮", "🤖" , "🍿"];
var doEmoji = myEmoji[Math.floor(Math.random() * myEmoji.length)];

HTTP.post({
  url: "https://api.telegram.org/bot" + bot.token + "/setMessageReaction",
  body: {
    chat_id: chat.chatid,
    message_id: request.message_id,
    reaction: JSON.stringify([
      {
        type: "emoji",
        emoji: doEmoji,
        is_big: true 
      }
    ])
  }
});

// ৬. ইউজারের তথ্য সংগ্রহ ও হেডার তৈরি
let senderName = user.first_name || "Unknown";
let senderUser = user.username ? "@" + user.username : "নেই";
let senderId = user.telegramid;

let infoHeader = "📩 *নতুন মেসেজ এসেছে!*\n" +
                 "👤 নাম: *" + senderName + "*\n" +
                 "🔗 ইউজারনেম: " + senderUser + "\n" +
                 "🆔 আইডি: `" + senderId + "`\n" +
                 "━━━━━━━━━━━━━━━━━━\n" +
                 "💬 *রিপ্লাই দিতে এই মেসেজটিতে Swipe/Reply করুন*\n" +
                 "👇 *ইউজারের মূল মেসেজ:*";

// ৭. টপিক গ্রুপে ইউজারের তথ্য ও মেসেজ কপি পাঠানো
Api.sendMessage({
  chat_id: GROUP_ID,
  message_thread_id: TOPIC_ID,
  text: infoHeader,
  parse_mode: "Markdown"
});
Api.copyMessage({
  chat_id: GROUP_ID,
  message_thread_id: TOPIC_ID,
  from_chat_id: chat.chatid,
  message_id: request.message_id
});

// ৮. ১ম এডমিনের ইনবক্সে পাঠানো (যদি মেসেজদাতা নিজেই ১ম এডমিন না হয়)
if (senderId != ADMIN_1) {
  Api.sendMessage({
    chat_id: ADMIN_1,
    text: infoHeader,
    parse_mode: "Markdown"
  });
  Api.copyMessage({
    chat_id: ADMIN_1,
    from_chat_id: chat.chatid,
    message_id: request.message_id
  });
}

// ৯. ২য় এডমিনের ইনবক্সে পাঠানো (যদি মেসেজদাতা নিজেই ২য় এডমিন না হয়)
if (senderId != ADMIN_2) {
  Api.sendMessage({
    chat_id: ADMIN_2,
    text: infoHeader,
    parse_mode: "Markdown"
  });
  Api.copyMessage({
    chat_id: ADMIN_2,
    from_chat_id: chat.chatid,
    message_id: request.message_id
  });
}




// ১. মেসেজ চেক করা
if (!message) {
    return;
}

// ২. লেখা ছোট হাতের (lowercase) করা
var text = message.toLowerCase();

// ৩. সালামের শব্দগুলোর তালিকা
var salamWords = [
    "assalamualaikum",
    "assalamu alaikum",
    "assalamu alaykum",
    "as-salamu alaykum",
    "আসসালামুয়ালাইকুম",
    "আসসালামু আলাইকুম",
    "সালাম",
    "salam",
    "slam"
];

// ৪. শব্দ মিলিয়ে দেখা
var matched = false;
for (var i = 0; i < salamWords.length; i++) {
    if (text.indexOf(salamWords[i]) !== -1) {
        matched = true;
        break;
    }
}

// ৫. সালাম পেলে টাইপিং অ্যানিমেশন দেখানো এবং উত্তর দেওয়া
if (matched) {
    // টেলিগ্রামে টাইপিং অ্যানিমেশন পাঠানো
    Api.sendChatAction({
        chat_id: chat.chatid,
        action: "typing"
    });

    // রিপ্লাই পাঠানো
    Bot.sendMessage("*ওয়ালাইকুম আসসালাম ওয়া রাহমাতুল্লাহি ওয়া বারাকাতুহু! 🌸*");
}
