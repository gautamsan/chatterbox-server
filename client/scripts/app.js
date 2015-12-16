// YOUR CODE HERE:
//Santosh's client
/*var app;
$(function() {
  app = {
//TODO: The current 'addFriend' function just adds the class 'friend'
//to all messages sent by the user
    // server: 'https://api.parse.com/1/classes/chatterbox/',
    server: 'http://127.0.0.1:3000',
    username: 'anonymous',
    roomname: 'room1',
    lastMessageId: 0,
    friends: {},

    init: function() {
      // Get username
      app.username = window.location.search.substr(10);

      // Cache jQuery selectors
      app.$main = $('#main');
      app.$message = $('#message');
      app.$chats = $('#chats');
      app.$roomSelect = $('#roomSelect');
      app.$send = $('#send');

      // Add listeners
      app.$main.on('click', '.username', app.addFriend);
      app.$send.on('submit', app.handleSubmit);
      app.$roomSelect.on('change', app.saveRoom);

      // Fetch previous messages
      app.startSpinner();
      app.fetch(false);

      // Poll for new messages
      //setInterval(app.fetch, 3000);
    },
    send: function(data) {
      app.startSpinner();
      // Clear messages input
      app.$message.val('');

      // POST the message to the server
      $.ajax({
        url: app.server,
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function (data) {
          console.log('chatterbox: Message sent');
          // Trigger a fetch to update the messages, pass true to animate
          app.fetch();
        },
        error: function (data) {
          console.error('chatterbox: Failed to send message');
        }
      });
    },
    fetch: function(animate) {
      $.ajax({
        url: app.server,
        type: 'GET',
        contentType: 'application/json',
        // data: { order: '-createdAt'},
        success: function(data) {
          console.log('chatterbox: Messages fetched');

          // Don't bother if we have nothing to work with
          if (!data.results || !data.results.length) { return; }

          // Get the last message
          var mostRecentMessage = data.results[data.results.length-1];
          var displayedRoom = $('.chat span').first().data('roomname');
          app.stopSpinner();
          // Only bother updating the DOM if we have a new message
          if (mostRecentMessage.objectId !== app.lastMessageId || app.roomname !== displayedRoom) {
            // Update the UI with the fetched rooms
            app.populateRooms(data.results);

            // Update the UI with the fetched messages
            app.populateMessages(data.results, animate);

            // Store the ID of the most recent message
            app.lastMessageId = mostRecentMessage.objectId;
          }
        },
        error: function(data) {
          console.error('chatterbox: Failed to fetch messages');
        }
      });
    },
    clearMessages: function() {
      app.$chats.html('');
    },
    populateMessages: function(results, animate) {
      // Clear existing messages

      app.clearMessages();
      app.stopSpinner();
      if (Array.isArray(results)) {
        // Add all fetched messages
        results.forEach(app.addMessage);
      }

      // Make it scroll to the bottom
      var scrollTop = app.$chats.prop('scrollHeight');
      if (animate) {
        app.$chats.animate({
          scrollTop: scrollTop
        });
      }
      else {
        app.$chats.scrollTop(scrollTop);
      }
    },
    populateRooms: function(results) {
      app.$roomSelect.html('<option value="__newRoom">New room...</option><option value="" selected>Lobby</option></select>');

      if (results) {
        var rooms = {};
        results.forEach(function(data) {
          var roomname = data.roomname;
          if (roomname && !rooms[roomname]) {
            // Add the room to the select menu
            app.addRoom(roomname);

            // Store that we've added this room already
            rooms[roomname] = true;
          }
        });
      }

      // Select the menu option
      app.$roomSelect.val(app.roomname);
    },
    addRoom: function(roomname) {
      // Prevent XSS by escaping with DOM methods
      var $option = $('<option/>').val(roomname).text(roomname);

      // Add to select
      app.$roomSelect.append($option);
    },
    addMessage: function(data) {
      if (!data.roomname)
        data.roomname = 'lobby';

      // Only add messages that are in our current room
      if (data.roomname === app.roomname) {
        // Create a div to hold the chats
        var $chat = $('<div class="chat"/>');

        // Add in the message data using DOM methods to avoid XSS
        // Store the username in the element's data
        var $username = $('<span class="username"/>');
        $username.text(data.username+': ').attr('data-username', data.username).attr('data-roomname',data.roomname).appendTo($chat);

        // Add the friend class
        if (app.friends[data.username] === true)
          $username.addClass('friend');

        var $message = $('<br><span/>');
        $message.text(data.text).appendTo($chat);

        // Add the message to the UI
        app.$chats.append($chat);
      }
    },
    addFriend: function(evt) {
      var username = $(evt.currentTarget).attr('data-username');

      if (username !== undefined) {
        console.log('chatterbox: Adding %s as a friend', username);

        // Store as a friend
        app.friends[username] = true;

        // Bold all previous messages
        // Escape the username in case it contains a quote
        var selector = '[data-username="'+username.replace(/"/g, '\\\"')+'"]';
        var $usernames = $(selector).addClass('friend');
      }
    },
    saveRoom: function(evt) {

      var selectIndex = app.$roomSelect.prop('selectedIndex');
      // New room is always the first option
      if (selectIndex === 0) {
        var roomname = prompt('Enter room name');
        if (roomname) {
          // Set as the current room
          app.roomname = roomname;

          // Add the room to the menu
          app.addRoom(roomname);

          // Select the menu option
          app.$roomSelect.val(roomname);

          // Fetch messages again
          app.fetch();
        }
      }
      else {
        app.startSpinner();
        // Store as undefined for empty names
        app.roomname = app.$roomSelect.val();

        // Fetch messages again
        app.fetch();
      }
    },
    handleSubmit: function(evt) {
      var message = {
        username: app.username,
        text: app.$message.val(),
        roomname: app.roomname || 'lobby'
      };

      app.send(message);

      // Stop the form from submitting
      evt.preventDefault();
    },
    startSpinner: function(){
      $('.spinner img').show();
      $('form input[type=submit]').attr('disabled', "true");
    },

    stopSpinner: function(){
      $('.spinner img').fadeOut('fast');
      $('form input[type=submit]').attr('disabled', null);
    }
  };
}());*/

//Song's client
var app = {
  // server: 'https://api.parse.com/1/classes/chatterbox',
  server: 'http://127.0.0.1:3000',
  invalid: ['script', 'img', 'body', 'iframe', 'input', 'link', 'table', 'div', 'object']
};

var client = {
  friends: [],
  currRoom: "room1",
  messages: []
};

app.init = function() {
  $('#chats').on('click', ".username", function() {
    //this === element that was clicked
    app.addFriend($(this).text());
  });

  $('#searchbutton').on('click', function() {
    client.currRoom = $('#searchBar').val();
    app.fetch();
  });

  client.username = prompt('Enter your name:');

  app.fetch();
  setInterval(app.updateMsg, 1000);
};

app.send = function(message) {
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: app.server,
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function(data) {
      console.log('chatterbox: Message sent. Data: ', data);
      app.fetch();
    },
    error: function(data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message. Error: ', data);
      app.fetch();
    }
  });
};

app.fetch = function() {
  //option 1: only add messages of client.currRoom
  //every time we change rooms
  //change currRooms, call fetch() again
  //option 2: load ALL messages
  //iterates through ALL messages, if room != currRoom, display='hidden'

  //option 1: fetch everything, iterate through everything, reload ALL HTML elements
  //option 2: somehow comparing our current elements with new ones, only appending new ones

  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: app.server,
    type: 'GET',
    contentType: 'application/json',
    data: 'where={"roomname":"' + client.currRoom + '"}',
    success: function(data) {
      console.log('Retrieved', data, 'for room:' , client.currRoom);
      client.messages = [];
      data.results.forEach(function(obj) {
        //obj.username = <script>alert(1)</script>
        // <> >
        // escape messages here
        //if(obj is valid)
        if (app.isValid(obj)) {
          client.messages.push(obj);
        }
      });

    },
    error: function(data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('Fetch failed', data);
    }
  });
};

app.clearMessages = function() {
  $('#chats').empty();
};

app.addMessage = function(message) {
  var element = "<div class='chat";
  if (client.friends.indexOf(message.username) !== -1) {
    element += ' friend';
  }
  $('#chats')
    .append(element + "'><span class='username'>" +
      message.username + "</span>: <span class='message'>" +
      message.text + "</span></div>");
};

app.addRoom = function(room) {
  $('#roomSelect').append('<div>' + room + '</div>');
};

app.addFriend = function(friend) {
  if (client.friends.indexOf(friend) === -1) {
    client.friends.push(friend);
    $('#friends').append('<p>' + friend + '</p>');
  }

};

app.handleSubmit = function() {
  var message = {
    username: client.username,
    text: $('#message').val(),
    roomname: client.currRoom
  };
  app.send(message);
};

app.updateMsg = function() {
  app.clearMessages();
  client.messages.forEach(function(msg) {
    app.addMessage(msg);
  });
};

app.isValid = function(obj) {
  if (obj.username === undefined || obj.text === undefined) {
    return false;
  }

  for (var i = 0; i < app.invalid.length; i++) {
    var regexp = new RegExp('<.*?'+app.invalid[i]+'.*?>'); //<script> //+ means 1 or more occurences, * means 0 or more
    if (regexp.test(obj.username) || regexp.test(obj.text)) {
      return false;
    }
  }
  return true;
};
