const SKILL_NAME = "Next Prayer Time";
const PREFIX_MESSAGE = "Next prayer is ";
const HELP_MESSAGE =
  "You can say tell me what is next prayer time, or, you can say exit... What can I help you with?";
const HELP_REPROMPT = "What can I help you with?";
const FALLBACK_MESSAGE = `${SKILL_NAME} Next Prayer Time skill can't help you with that. What can I help you with?`;
const FALLBACK_REPROMPT = "What can I help you with?";
const STOP_MESSAGE = "May Allah accept your prayers!";

const prayers = [
  {
    name: "Fajr",
    time: "02:37:00"
  },
  {
    name: "Zuhr",
    time: "11:44:00"
  },
  {
    name: "Asr",
    time: "15:33:00"
  },
  {
    name: "Maghrib",
    time: "19:01:00"
  },
  {
    name: "Isha",
    time: "20:34:00"
  }
];
