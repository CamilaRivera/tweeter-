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

  const escape = function (str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }


    const newTweetForm = $('.arrow ');
    newTweetForm.click(function() {
      $('.new-tweet').slideToggle();
      $('.tweet-text').focus();
    });
  
  /** */
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  const renderTweets = function (tweets) {
    console.log('inside render tweets');
    console.log(tweets)
    let allTweets = [];
    $('.tweets').empty();
    for (const tweet in tweets) {
      allTweets.push(createTweetElement(tweets[tweet]));
    }
    allTweets.reverse();
    $('.tweets').append(allTweets);
    $('.tweet-text').val("");
    $('.tweet-text').trigger("input");
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
  }

  //new tweet submision
  const $form = $('.new-tweet-submission');
  $form.on('submit', function (event) {
    //prevents the normal post event
    $('.error').hide()
    event.preventDefault();
    if ($('.tweet-text').val().length > 140) {
      $('.error').text('❌ content must be shorter than 140 characters');
      $('.error').slideDown(); 
    }
    else if ($('.tweet-text').val().length === 0) {
      $('.error').text('❌ you must fill this form');
      $('.error').slideDown(); 
    } else  {
      $.ajax({ url: '/tweets', method: 'POST', data: $(this).serialize() })
        .then(loadTweets)
        .fail(err => {
          alert('Failed to submit tweet', err);
        });
    }
  });

  const loadTweets = () => {
    console.log('loading');
    $.ajax({ url: '/tweets', method: 'GET' })
      .then(renderTweets);
  }

  loadTweets();


});