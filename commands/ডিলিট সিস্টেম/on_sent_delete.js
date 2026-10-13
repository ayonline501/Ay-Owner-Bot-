/*CMD
  command: on_sent_delete
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

// পাঠানো মেসেজটির আইডি ধরা
var sentMsgId = options.result.message_id;

// ২৫ সেকেন্ড (২৫০০০ মিলিসেকেন্ড) পর ডিলিট করার জন্য শিডিউল করা
Bot.run({
  command: "delete_now",
  run_after: 10, // ২৫ সেকেন্ড
  options: { msg_id: sentMsgId }
});
