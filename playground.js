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
const now = new Date("2018-06-25T12:24:00");
// const now = new Date();
let nextPrayer = null;

for (let i = 0; i < prayers.length - 1; i++) {
  const firstPrayer = prayers[i];
  const secondPrayer = prayers[i + 1];

  const firstTime = firstPrayer.time.split(":");
  const firstPrayerDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), parseInt(firstTime[0]), parseInt(firstTime[1]), parseInt(firstTime[2]));

  const secondTime = secondPrayer.time.split(":");
  const secondPrayerDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), parseInt(secondTime[0]), parseInt(secondTime[1]), parseInt(secondTime[2]));

  if (now >= firstPrayerDate && now <= secondPrayerDate) {
    nextPrayer = secondPrayer;
    break;
  }
}


if (nextPrayer == null) {
  nextPrayer = prayers[0];
}

console.log(
  `${nextPrayer.name} prayer at ${nextPrayer.time}. The time now is ${now}`
);
