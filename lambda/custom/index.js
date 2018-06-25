/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require("ask-sdk-core");
const cookbook = require("alexa-cookbook.js");

//=========================================================================================================================================
//TODO: The items below this comment need your attention.
//=========================================================================================================================================

const SKILL_NAME = "Next Prayer Time";
const PREFIX_MESSAGE = "Next prayer is ";
const HELP_MESSAGE =
  "You can say tell me what is next prayer time, or, you can say exit... What can I help you with?";
const HELP_REPROMPT = "What can I help you with?";
const FALLBACK_MESSAGE = `${SKILL_NAME} Next Prayer Time skill can't help you with that. What can I help you with?`;
const FALLBACK_REPROMPT = "What can I help you with?";
const STOP_MESSAGE = "May Allah accept your prayers!";

// A hack to retrieve current time in JST
Date.prototype.inJST = function() {
  this.setTime(this.getTime() + 9 * 60 * 60 * 1000);
  return this;
};

//=========================================================================================================================================
//TODO: Replace this data with your own.  You can find translations of this data at http://github.com/alexa/skill-sample-node-js-fact/lambda/data
//=========================================================================================================================================

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

//=========================================================================================================================================
//Editing anything below this line might break your skill.
//=========================================================================================================================================

const GetNextPrayerTimeHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return (
      request.type === "LaunchRequest" ||
      (request.type === "IntentRequest" &&
        request.intent.name === "GetNextPrayerTimeIntent")
    );
  },
  handle(handlerInput) {
    // const randomFact = cookbook.getRandomItem(data);
    const now = new Date().inJST();
    const nextPrayerTime = getNextPrayerResult(now);
    console.log;
    const speechOutput = `${PREFIX_MESSAGE} ${nextPrayerTime}`;

    return handlerInput.responseBuilder
      .speak(speechOutput)
      .withSimpleCard(SKILL_NAME, nextPrayerTime)
      .getResponse();
  }
};

function getNextPrayerResult(now) {
  let nextPrayer = null;

  for (let i = 0; i < prayers.length - 1; i++) {
    const firstPrayer = prayers[i];
    const secondPrayer = prayers[i + 1];

    const firstTime = firstPrayer.time.split(":");
    const firstPrayerDate = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      parseInt(firstTime[0]),
      parseInt(firstTime[1]),
      parseInt(firstTime[2])
    );

    const secondTime = secondPrayer.time.split(":");
    const secondPrayerDate = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      parseInt(secondTime[0]),
      parseInt(secondTime[1]),
      parseInt(secondTime[2])
    );

    if (now >= firstPrayerDate && now <= secondPrayerDate) {
      nextPrayer = secondPrayer;
      break;
    }
  }

  // If none found, set prayer to next day first prayer
  if (isUndefined(nextPrayer)) {
    nextPrayer = prayers[0];
  }

  return `${nextPrayer.name} prayer at ${
    nextPrayer.time
  }. The time now is ${now}.`;
}

/**
 * 変数が設定されているかどうかを確認
 *
 * @param {any} variable
 * @returns {boolean}
 */
function isUndefined(variable) {
  if (variable == null || variable === "null" || variable === "undefined") {
    return true;
  }
  return false;
}

const HelpHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return (
      request.type === "IntentRequest" &&
      request.intent.name === "AMAZON.HelpIntent"
    );
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(HELP_MESSAGE)
      .reprompt(HELP_REPROMPT)
      .getResponse();
  }
};

const FallbackHandler = {
  // 2018-May-01: AMAZON.FallackIntent is only currently available in en-US locale.
  //              This handler will not be triggered except in that locale, so it can be
  //              safely deployed for any locale.
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return (
      request.type === "IntentRequest" &&
      request.intent.name === "AMAZON.FallbackIntent"
    );
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(FALLBACK_MESSAGE)
      .reprompt(FALLBACK_REPROMPT)
      .getResponse();
  }
};

const ExitHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return (
      request.type === "IntentRequest" &&
      (request.intent.name === "AMAZON.CancelIntent" ||
        request.intent.name === "AMAZON.StopIntent")
    );
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder.speak(STOP_MESSAGE).getResponse();
  }
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === "SessionEndedRequest";
  },
  handle(handlerInput) {
    console.log(
      `Session ended with reason: ${
        handlerInput.requestEnvelope.request.reason
      }`
    );

    return handlerInput.responseBuilder.getResponse();
  }
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak("Sorry, an error occurred.")
      .reprompt("Sorry, an error occurred.")
      .getResponse();
  }
};

const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
  .addRequestHandlers(
    GetNextPrayerTimeHandler,
    HelpHandler,
    ExitHandler,
    FallbackHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
