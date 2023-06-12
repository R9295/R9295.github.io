// This variable will be overriden by the app when the script is inserted
// BEGIN DO NOT TOUCH
var mode = "{{mode}}";
// END DO NOT TOUCH

const BOTTOM_NAVBAR_CLASSNAME =
  "x1o5hw5a xaeubzz x1n2onr6 x9f619 xh8yej3 x78zum5 x1q0g3np xaw8158 xtuw4uo";
const STORIES_LIST_CLASSNAME = "_aac4";
const FEED_CLASSNAME =
  "x9f619 xjbqb8w x78zum5 x168nmei x13lgxp2 x5pf9jr xo71vjh x1uhb9sk x1plvlek xryxfnj x1c4vz4f x2lah0s xdt5ytf xqjyukv x6s0dn4 x1oa3qoh x1nhvcw1";
const LIKES_CLASSNAME = "_ae5m";
const ALL_CAUGHT_UP_CLASSNAME =
  "x9f619 xjbqb8w x78zum5 x168nmei x13lgxp2 x5pf9jr xo71vjh xod5an3 x1uhb9sk x1plvlek xryxfnj x1c4vz4f x2lah0s xdt5ytf xqjyukv x1qjc9v5 x1oa3qoh x1nhvcw1";
const getNavbarElements = () => {
  const navbarElements = {};
  const navBar = document.getElementsByClassName(BOTTOM_NAVBAR_CLASSNAME);
  if (navBar.length > 0) {
    navbar = navBar[0].childNodes;
    navbarElements["home"] = navbar[0];
    navbarElements["explore"] = navbar[1];
    navbarElements["reels"] = navbar[2];
    navbarElements["direct"] = navbar[3];
    navbarElements["profile"] = navbar[4];
  }
  return navbarElements;
};

const handleHomePage = (mode) => {
  const navbarElements = getNavbarElements();
  switch (mode) {
    case "messaging":
      window.location.assign("/direct/inbox/");
      break;
    case "feed":
      document.getElementsByTagName("nav")[0].remove();
      navbarElements["explore"].remove();
      navbarElements["reels"].remove();
      navbarElements["direct"].remove();
      navbarElements["profile"].remove();
      document.getElementsByClassName(STORIES_LIST_CLASSNAME)[0].remove();
      break;
    case "explore":
      window.location.assign("/explore/");
      break;
    case "social":
      document.getElementsByClassName(FEED_CLASSNAME)[0].remove();
      document.getElementsByTagName("nav")[0].remove();
      navbarElements["home"].remove();
      navbarElements["explore"].remove();
      navbarElements["reels"].remove();
      navbarElements["profile"].remove();
      break;
  }
};

const handleInbox = (mode) => {
  switch (mode) {
    case "messaging":
      document.querySelector('a[href="/"]').remove();
      break;
  }
};

const handleExplore = (mode) => {
  const navbarElements = getNavbarElements();
  switch (mode) {
    case "explore":
      navbarElements["home"].remove();
      navbarElements["reels"].remove();
      navbarElements["direct"].remove();
      navbarElements["profile"].remove();
      break;
  }
};
const handleProfile = (mode) => {
  const navbarElements = getNavbarElements();
  switch (mode) {
    case "explore":
      navbarElements["home"].remove();
      navbarElements["reels"].remove();
      navbarElements["direct"].remove();
      navbarElements["profile"].remove();
      break;
    case "feed":
      navbarElements["explore"].remove();
      navbarElements["reels"].remove();
      navbarElements["direct"].remove();
      navbarElements["profile"].remove();
      break;
  }
};

const pathHandlers = {
  "/": handleHomePage,
  "/explore/": handleExplore,
  "/direct/inbox/": handleInbox,
  "/?/": handleProfile,
};
function inViewport(element) {
  if (!element) return false;
  if (1 !== element.nodeType) return false;

  var html = document.documentElement;
  var rect = element.getBoundingClientRect();
  return (
    !!rect &&
    rect.bottom >= 0 &&
    rect.right >= 0 &&
    rect.left <= html.clientWidth &&
    rect.top <= html.clientHeight + 50
  );
}

let reachedEnd = false;
let endX = 0;
let endY = 0;

document.addEventListener("scroll", () => {
  const likes = document.getElementsByClassName(LIKES_CLASSNAME);
  Array.from(likes).forEach((item) => {
    item.remove();
  });
  if (mode == "feed") {
    const allCaughtUp = document.getElementsByClassName(
      ALL_CAUGHT_UP_CLASSNAME
    );
    if (allCaughtUp.length > 0) {
      if (inViewport(allCaughtUp[0])) {
        if (reachedEnd == false) {
          endX = window.scrollX;
          endY = window.scrollY;
          reachedEnd = true;
        }
        window.onscroll = function () {
          window.scrollTo(endX, endY);
        };
      }
    }
  }
});

const handlePath = () => {
  const handler = pathHandlers[window.location.pathname];
  if (handler == undefined) {
    const profileRegex = new RegExp("/.*/");
    if (profileRegex.test(window.location.href)) {
      handleProfile(mode);
    }
    console.log("No handler found for " + window.location.pathname);
  } else {
    handler(mode);
  }
};

const removeModal = () => {
  const modal = document.getElementsByClassName("_acc8 _abpk");
  if (modal.length > 0) {
    modal[0].remove();
  }
};

console.log("Autonomy booting with mode: " + mode);
handlePath();
removeModal();
