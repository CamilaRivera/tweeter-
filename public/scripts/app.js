/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from initial-tweets.json
jQuery(document).ready(function ($) {
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]



const renderTweets = function (tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  for (const tweet in tweets) {
    let createdTweet = createTweetElement(tweet);
   $('.tweets').append(createdTweet);


  }
}

const createTweetElement = function (tweet) {
  const $tweet = $(`<article class="tweet">
        <header>
          <p class="nickname">${data[tweet].user.handle}</p>
          <p><i class="icon-user icon-3x"></i>${data[tweet].user.name}</p>

        </header>
        <p>${data[tweet].content.text}</p>
        <footer>
          <span>${data[tweet].created_at}</span>
          <p class="icons"><i class="icon-flag"></i><i class="icon-retweet"></i><i class="icon-heart"></i></p>
        </footer>
      </article>`);
  return $tweet;
}

renderTweets(data);

});