/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from initial-tweets.json
jQuery(document).ready(function ($) {

  function getDaysAgo(unixTimestamp) {
    return `${Math.round((Date.now() - new Date(unixTimestamp)) / (1000 * 60 * 60 * 24))} days ago`;
  };

  /** */
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  const renderTweets = function (tweets) {
    let allTweets = [];
    $('.tweets').empty();
    for (const tweet in tweets) {
      allTweets.push(createTweetElement(tweets[tweet]));
    }
    $('.tweets').append(allTweets);
    $('.tweet-text').val("");
  };


  const createTweetElement = function (tweet) {
    const $tweet = $(
      `<article class='tweet'>
        <header>
          <p class='nickname'>${tweet.user.handle}</p>
          <p><img src=${tweet.user.avatars} width='42' height='42'>${tweet.user.name}</p>
        </header>
        <p>${tweet.content.text}</p>
        <footer>
          <span>${getDaysAgo(tweet.created_at)}</span>
          <p class='icons'><i class='icon-flag'></i><i class='icon-retweet'></i><i class='icon-heart'></i></p>
        </footer>
    </article>`
    );
    return $tweet;
  }

  //new tweet submision
  const $form = $('.new-tweet-submission');
  $form.on('submit', function (event) {
    //prevents the normal post event
    event.preventDefault();
    if ($('.tweet-text').val().length > 140) {
      alert('content must be shorter than 140 characters');
    }
    if ($('.tweet-text').val().length === 0) {
      alert('you must fill these form');
    } else {
      $.ajax({ url: '/tweets', method: 'POST', data: $(this).serialize() })
        .then(
          loadTweets()
        )
        .fail(err => {
          alert('Failed to submit tweet', err);
        });
    }
  });

  const loadTweets = () => {
    $.ajax({ url: '/tweets', method: 'GET' })
      .then(renderTweets);
  }

  loadTweets();


});