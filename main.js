// ── Conversation Data (Activity 8-1: Siri Travel Planning) ──
const conversation = [
  { role: "user", text: "Hey Siri, I want to plan a trip to Japan.", annotation: "" },
  { role: "bot",  text: "Sounds like a great trip! When are you thinking of going?", annotation: "Conversational marker: Positive acknowledgment + open-ended follow-up" },
  { role: "user", text: "Sometime in early April, maybe for about a week.", annotation: "" },
  { role: "bot",  text: "A week in early April — that's perfect for cherry blossom season! Which cities would you like to visit?", annotation: "Grounding: Confirms details; adds contextual knowledge" },
  { role: "user", text: "I'd like to visit Tokyo and Kyoto.", annotation: "" },
  { role: "bot",  text: "Great choices! I'd suggest 4 days in Tokyo and 3 days in Kyoto. Would you like me to search for flights first?", annotation: "Heuristic: Match between system & real world — natural suggestions" },
  { role: "user", text: "Yes, please find flights from Hong Kong to Tokyo.", annotation: "" },
  { role: "bot",  text: "Searching for flights from Hong Kong to Tokyo, departing around April 1st, returning around April 8th... I found several options. The best deal is Cathay Pacific at HK$3,200 roundtrip. Shall I show more details?", annotation: "Visibility of system status: Narrates the search process" },
  { role: "user", text: "That sounds good. What about hotels in Shibuya?", annotation: "Topic shift within context" },
  { role: "bot",  text: "I'm sorry, I can't directly book hotels, but I can search the web for hotels in Shibuya, Tokyo. Would you like me to do that?", annotation: "Error handling: Transparent about limitations; offers alternative" },
  { role: "user", text: "Sure, search for budget-friendly hotels.", annotation: "" },
  { role: "bot",  text: "Here are some budget options in Shibuya:\n1. Shibuya Stream Hotel — ¥8,500/night\n2. Sequence Miyashita Park — ¥9,200/night\n3. Shibuya Granbell — ¥7,800/night\nWould you like me to open any of these in Safari?", annotation: "Recognition over recall: Presents options rather than requiring memory" },
  { role: "user", text: "Open the first one. Also, what's the weather like in Tokyo in April?", annotation: "Multi-intent utterance" },
  { role: "bot",  text: "Opening Shibuya Stream Hotel in Safari. As for Tokyo weather in April — expect highs around 18°C and lows around 10°C. Light layers and a rain jacket are recommended!", annotation: "Handles dual requests; provides actionable context" },
  { role: "user", text: "Can you add 'pack rain jacket' to my reminders?", annotation: "" },
  { role: "bot",  text: "Done! I've added 'pack rain jacket' to your Reminders. Anything else for the trip?", annotation: "Confirmation strategy: Explicit confirmation of completed action" },
  { role: "user", text: "What about getting from Tokyo to Kyoto?", annotation: "Context persistence — still within trip" },
  { role: "bot",  text: "The Shinkansen (bullet train) from Tokyo to Kyoto takes about 2 hours 15 minutes. A one-way ticket is around ¥13,320. You might want to consider a Japan Rail Pass if you're planning more train travel. Want me to look that up?", annotation: "Heuristic: Proactive suggestion (flexibility & efficiency)" },
  { role: "user", text: "How much is the rail pass?", annotation: "" },
  { role: "bot",  text: "A 7-day Japan Rail Pass is approximately ¥50,000 (about HK$2,700). It covers most JR trains including the Shinkansen. Given your Tokyo-Kyoto roundtrip alone would cost ¥26,640, the pass is definitely worth it!", annotation: "Contextual calculation — references earlier info" },
  { role: "user", text: "Add that to my notes for the trip.", annotation: "" },
  { role: "bot",  text: "I've created a note titled 'Japan Trip - April 2026' with the rail pass info. Would you like me to add your flight and hotel details to this note as well?", annotation: "User control: Offers extension without forcing" },
  { role: "user", text: "Yes, add everything we discussed.", annotation: "" },
  { role: "bot",  text: "Done! Your note 'Japan Trip - April 2026' now includes:\n• Flight: Cathay Pacific HKG→NRT, ~HK$3,200\n• Hotel: Shibuya Stream, ¥8,500/night\n• Transport: 7-day JR Pass, ~¥50,000\n• Weather: 10-18°C, bring layers\nAnything else I can help with?", annotation: "Summary confirmation: Recaps all key decisions; maintains context" },
  { role: "user", text: "What are some must-visit places in Kyoto?", annotation: "" },
  { role: "bot",  text: "Here are top spots in Kyoto:\n1. Fushimi Inari Shrine — iconic torii gates\n2. Kinkaku-ji (Golden Pavilion)\n3. Arashiyama Bamboo Grove\n4. Nishiki Market for street food\nWould you like me to create a day-by-day itinerary?", annotation: "Recognition over recall: Curated list with brief context" },
  { role: "user", text: "Maybe later. Can you set a reminder to buy the rail pass next week?", annotation: "" },
  { role: "bot",  text: "Sure! Reminder set: 'Buy Japan Rail Pass' for next Monday, March 30th. Is there a specific time you'd like to be reminded?", annotation: "Confirmation + follow-up for completeness" },
  { role: "user", text: "10 AM is fine. Thanks, Siri!", annotation: "" },
  { role: "bot",  text: "You're all set! Reminder updated to Monday at 10 AM. Have a wonderful time planning your Japan trip. Just ask if you need anything else!", annotation: "Conversational closing: Warm sign-off + open invitation" }
];

// ── Render Conversation ──
function renderConversation() {
  const chatBody = document.getElementById("chatBody");
  conversation.forEach((turn, i) => {
    const div = document.createElement("div");
    div.className = `turn ${turn.role === "user" ? "user" : "bot"}`;

    const label = document.createElement("div");
    label.className = "turn-label";
    label.textContent = turn.role === "user" ? `You (Turn ${i + 1})` : `Siri (Turn ${i + 1})`;

    const bubble = document.createElement("div");
    bubble.className = "bubble";
    bubble.innerHTML = turn.text.replace(/\n/g, "<br/>");

    div.appendChild(label);
    div.appendChild(bubble);

    if (turn.annotation) {
      const ann = document.createElement("div");
      ann.className = "annotation";
      ann.textContent = turn.annotation;
      div.appendChild(ann);
    }

    chatBody.appendChild(div);
  });
}

// ── Toast Notification ──
function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2500);
}

// ── Proto Chat Send ──
function sendProtoMsg() {
  const input = document.getElementById("protoInput");
  const val = input.value.trim();
  if (!val) return;

  const chat = document.getElementById("protoChat");

  // User message
  const userMsg = document.createElement("div");
  userMsg.className = "msg user";
  userMsg.innerHTML = `<div class="msg-bubble">${escapeHtml(val)}</div><div class="msg-time">Just now</div>`;
  chat.appendChild(userMsg);
  input.value = "";

  // Bot reply after delay
  setTimeout(() => {
    const botMsg = document.createElement("div");
    botMsg.className = "msg bot";
    const replies = [
      "Let me look that up for you! I found several options on campus.",
      "Great question! The nearest one is in Building W1, ground floor.",
      "I can help with that! Would you like me to show it on the map?",
      "Sure! I've added that to your schedule. Anything else?",
      "That building is currently open. It closes at 10 PM today."
    ];
    const reply = replies[Math.floor(Math.random() * replies.length)];
    botMsg.innerHTML = `<div class="msg-bubble">${reply}</div><div class="msg-time">Just now</div>`;
    chat.appendChild(botMsg);
    chat.scrollTop = chat.scrollHeight;
  }, 800);

  chat.scrollTop = chat.scrollHeight;
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

// ── Enter key for chat ──
document.addEventListener("DOMContentLoaded", () => {
  renderConversation();

  const input = document.getElementById("protoInput");
  if (input) {
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") sendProtoMsg();
    });
  }
});
