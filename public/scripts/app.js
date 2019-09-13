/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 */

jQuery(document).ready(function ($) {

  // Get number of days passed since timestamp
  const getDaysAgo = function (unixTimestamp) {
    const days = Math.round((Date.now() - new Date(unixTimestamp)) / (1000 * 60 * 60 * 24));
    const daysNoun = days > 1 ? 'days' : 'day'; // Handle plural/singular
    return `${days} ${daysNoun} ago`;
  };

  //escape potential malicious tweets
  const escape = function (str) {
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  // hide and show the new tweet section
  $('.arrow ').click(function () {
    $('.new-tweet').slideToggle();
    $('.tweet-text').focus();
  });


  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  const renderTweets = function (tweets) {
    const allTweets = [];
    $('.tweets').empty();
    for (const tweet of tweets) {
      allTweets.push(createTweetElement(tweet));
    }
    allTweets.reverse();
    $('.tweets').append(allTweets);
    $('.tweet-text').val('');
    $('.tweet-text').trigger('input');
  };

  const createTweetElement = function (tweet) {
    const $tweet = $(
      `<article class='tweet'>
        <header>
          <p class='nickname'>${tweet.user.handle}</p>
          <p><img src=${escape(tweet.user.avatars)} width='42' height='42'>${escape(tweet.user.name)}</p>
        </header>
        <p class='text-content'>${escape(tweet.content.text)}</p>
        <footer>
          <span>${getDaysAgo(tweet.created_at)}</span>
          <p class='icons'><i class='icon-flag'></i><i class='icon-retweet'></i><i class='icon-heart'></i></p>
        </footer>
    </article>`
    );
    return $tweet;
  };

  // listener on tweet submit
  $('.new-tweet-submission').on('submit', function (event) {
    //prevents the normal post event
    $('.error').hide();
    event.preventDefault();
    if ($('.tweet-text').val().length > 140) {
      $('.error').text('❌  Tweet content must be shorter than 140 characters');
      $('.error').slideDown();
    }
    else if ($('.tweet-text').val().length === 0) {
      $('.error').text('❌  Your tweet cannot be empty');
      $('.error').slideDown();
    } else {
      $.ajax({ url: '/tweets', method: 'POST', data: $(this).serialize() })
        .then(loadTweets)
        .fail(err => {
          alert('Failed to submit tweet', err);
        });
    }
  });

  // load tweets and render them
  const loadTweets = () => {
    $.ajax({ url: '/tweets', method: 'GET' })
      .then(renderTweets);
  }


  //back to top toggle button function
  $('.back-to-top').click(function () {
    $("html").animate({ scrollTop: 0 }, "slow");
  });

  // check if the button is in the upper part of the page
  $(window).scroll(function () {
    if (window.scrollY < 400) {
      $(".back-to-top").fadeOut();
    } else {
      $(".back-to-top").fadeIn();
    }
  });

  loadTweets();

});