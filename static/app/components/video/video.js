angular.module('App')
.component('videoComp', {
  templateUrl: 'app/components/video/video.html',
  controller: VideoCompCtrl,
  controllerAs: 'videoComp'
});

function VideoCompCtrl($element, $interval){
  var videoComp = this;

  // GET THE SUBTITLES
  videoComp.script = [];
  // Service.getSubtitles().then()
  videoComp.script = [
    {
      duration: "00:00:00,380 --> 00:00:01,940",
      line1: "November 1942",
      line2: "Rastenburg East-Prussia",
    },
    {
      duration: "00:00:05,580 --> 00:00:07,670",
      line1: "",
      line2: "Hello, WDI",
    },
    {
      duration: "00:00:09,230 --> 00:00:14,440",
      line1: "Please wait. Class almost over.",
      line2: "We just have one more thing to show you.",
    },
    {
      duration: "00:00:16,520 --> 00:00:21,210",
      line1: "How are we supposed to start this assignment?",
      line2: "Can we work together?",
    },
    {
      duration: "00:00:22,250 --> 00:00:26,410",
      line1: "Yes. You can work together.",
      line2: "You can do whatever you want.",
    },
    {
      duration: "00:00:26,410 --> 00:00:28,500",
      line1: "",
      line2: "And the Nazi salute?",
    },
    {
      duration: "00:00:28,500 --> 00:00:31,100",
      line1: "",
      line2: "That won't be necessary...",
    },
    {
      duration: "00:00:31,100 --> 00:00:36,310",
      line1: "since the Führer isn't looking for",
      line2: "a soldier but for a secretary.",
    },
    {
      duration: "00:00:36,830 --> 00:00:39,430",
      line1: "Act as normal and calm",
      line2: "as you can.",
    },
    {
      duration: "00:00:40,470 --> 00:00:42,550",
      line1: "I'll see if",
      line2: "he has time for you.",
    },
    {
      duration: "00:00:46,720 --> 00:00:49,840",
      line1: "Mein Führer",
      line2: "the ladies from Berlin are here.",
    },
    {
      duration: "00:01:08,600 --> 00:01:14,320",
      line1: "Thank you for coming",
      line2: "in the middle of the night.",
    },
    {
      duration: "00:01:14,850 --> 00:01:19,530",
      line1: "Sometimes during a war",
      line2: "one is not in control of time.",
    },
    {
      duration: "00:01:21,540 --> 00:01:25,180",
      line1: "Can I ask your name?",
      line2: "-Margarethe Lorenz.",
    },
    {
      duration: "00:01:25,700 --> 00:01:28,300",
      line1: "Where are you from?",
      line2: "-From Fulda."
    }
  ];

  // GET THE MOVIE
  var video = $element.find('video')[0];

  // SET INTERVAL FOR TIME
  $interval(displaySubtitle, 100);

  videoComp.currentTime = 0;
  videoComp.subtitle = {};

  function displaySubtitle() {
    videoComp.currentTime = video.currentTime;
    videoComp.subtitle = findSubtitle(videoComp.currentTime);
  }

  function findSubtitle(time) {
    for (var i = 0; i < videoComp.script.length; i++) {
      var subtitle = videoComp.script[i];
      if (isTimeInDuration(time, subtitle)) {
        return subtitle;
      }
    }

    // If no subtitle is found then return a dummy
    // empty subtitle that won't break out app.
    return {
      line1: "",
      line2: "",
    };
  }

  function isTimeInDuration(time, subtitle) {
    var duration = subtitle.duration;
    var timestamps = duration.split(" --> ");
    // duration: "00:00:00,380 --> 00:00:01,940",
    var start = timestamps[0];
    var end = timestamps[1];

    start = timestampsToSeconds(start);
    end = timestampsToSeconds(end);

    return start < time && time < end;
  }

  function timestampsToSeconds(timestamp) {
    var mm = parseInt(timestamp.split(",")[1], 10);
    var units = timestamp.split(",")[0].split(":");

    var hours = parseInt(units[0], 10);
    var minutes = parseInt(units[1], 10);
    var seconds = parseInt(units[2], 10);

    return mm / 1000 + seconds + minutes * 60 + hours * 3600;
  }



}

VideoCompCtrl.$inject = ['$element', '$interval'];
