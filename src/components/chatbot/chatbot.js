// // Collapsible
// var coll = document.getElementsByClassName("collapsible");

// for (let i = 0; i < coll.length; i++) {
//     coll[i].addEventListener("click", function () {
//         this.classList.toggle("active");

//         var content = this.nextElementSibling;

//         if (content.style.maxHeight) {
//             content.style.maxHeight = null;
//         } else {
//             content.style.maxHeight = content.scrollHeight + "px";
//         }

//     });
// }
// function getBotestResponse(userText) {
//     // Convert user input to lowercase for case-insensitive matching
//     const lowerUserText = userText.toLowerCase();

//     // Define your custom questions and corresponding answers
//     const customResponses = {
//         "hello": "Hi there! How can I assist you?",
//         "your name": "I'm a chatbot. You can call me ChatBot!",
//         "explain array": "An array is a data structure that stores a collection of elements, each identified by an index or a key. It provides a contiguous memory location for efficient access and manipulation of ordered data in a linear fashion.",
//         "explain linkedlist":"A linked list is a linear data structure where elements, called nodes, are connected sequentially. Each node contains data and a reference or link to the next node in the sequence.",
//         "explain stack": "A stack is a linear data structure that follows the Last In, First Out (LIFO) principle, where elements are added and removed from the same end. It supports two main operations: pushing (adding) elements onto the top and popping (removing) elements from the top.",
//         "explain queue": "A queue is a linear data structure that follows the First In, First Out (FIFO) principle, where elements are added at the rear and removed from the front. It supports two main operations: enqueue (adding) elements to the rear and dequeue (removing) elements from the front."
//         // Add more custom questions and answers as needed
//     };

//     // Check if there's a custom response for the user's input
//     if (customResponses.hasOwnProperty(lowerUserText)) {
//         return customResponses[lowerUserText];
//     }

//     // If no custom response, provide a default response
//     return "I'm sorry, I didn't understand that. Can you please ask another question?";
// }
// function getTime() {
//     let today = new Date();
//     hours = today.getHours();
//     minutes = today.getMinutes();

//     if (hours < 10) {
//         hours = "0" + hours;
//     }

//     if (minutes < 10) {
//         minutes = "0" + minutes;
//     }

//     let time = hours + ":" + minutes;
//     return time;
// }

// // Gets the first message
// function firstBotMessage() {
//     let firstMessage = "Hi, How can I help you?"
//     document.getElementById("botStarterMessage").innerHTML = '<p class="botText"><span>' + firstMessage + '</span></p>';

//     let time = getTime();

//     $("#chat-timestamp").append(time);
//     document.getElementById("userInput").scrollIntoView(false);
// }

// firstBotMessage();

// // Retrieves the response
// function getHardResponse(userText) {
//     let botResponse = getBotestResponse(userText);
//     let botHtml = '<p class="botText"><span>' + botResponse + '</span></p>';
//     $("#chatbox").append(botHtml);

//     document.getElementById("chat-bar-bottom").scrollIntoView(true);
// }

// //Gets the text text from the input box and processes it
// function getResponse() {
//     let userText = $("#textInput").val();

//     if (userText == "") {
//         userText = "I love Code Palace!";
//     }

//     let userHtml = '<p class="userText"><span>' + userText + '</span></p>';

//     $("#textInput").val("");
//     $("#chatbox").append(userHtml);
//     document.getElementById("chat-bar-bottom").scrollIntoView(true);

//     setTimeout(() => {
//         getHardResponse(userText);
//     }, 1000)

// }

// // Handles sending text via button clicks
// function buttonSendText(sampleText) {
//     let userHtml = '<p class="userText"><span>' + sampleText + '</span></p>';

//     $("#textInput").val("");
//     $("#chatbox").append(userHtml);
//     document.getElementById("chat-bar-bottom").scrollIntoView(true);

//     //Uncomment this if you want the bot to respond to this buttonSendText event
//     // setTimeout(() => {
//     //     getHardResponse(sampleText);
//     // }, 1000)
// }

// function sendButton() {
//     getResponse();
// }

// function heartButton() {
//     buttonSendText("Heart clicked!")
// }

// // Press enter to send a message
// $("#textInput").keypress(function (e) {
//     if (e.which == 13) {
//         getResponse();
//     }
// });
// closeBtn.addEventListener("click", () => document.body.classList.remove("show-content"));
// chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-content"));

// Collapsible
var coll = document.querySelectorAll(".collapsible");

coll.forEach(function (item) {
  item.addEventListener("click", function () {
    this.classList.toggle("active");

    var content = this.nextElementSibling;

    if (content.style.maxHeight) {
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });
});

function getBotestResponse(userText) {
  // Convert user input to lowercase for case-insensitive matching
  const lowerUserText = userText.toLowerCase();

  // Define your custom questions and corresponding answers
  const customResponses = {
    "hello": "Hi there! How can I assist you?",
    "your name": "I'm a chatbot. You can call me ChatBot!",
    "explain array": "An array is a data structure that stores a collection of elements, each identified by an index or a key. It provides a contiguous memory location for efficient access and manipulation of ordered data in a linear fashion.",
    "explain linkedlist": "A linked list is a linear data structure where elements, called nodes, are connected sequentially. Each node contains data and a reference or link to the next node in the sequence.",
    "explain stack": "A stack is a linear data structure that follows the Last In, First Out (LIFO) principle, where elements are added and removed from the same end. It supports two main operations: pushing (adding) elements onto the top and popping (removing) elements from the top.",
    "explain queue": "A queue is a linear data structure that follows the First In, First Out (FIFO) principle, where elements are added at the rear and removed from the front. It supports two main operations: enqueue (adding) elements to the rear and dequeue (removing) elements from the front."
    // Add more custom questions and answers as needed
  };

  // Check if there's a custom response for the user's input
  if (customResponses.hasOwnProperty(lowerUserText)) {
    return customResponses[lowerUserText];
  }

  // If no custom response, provide a default response
  return "I'm sorry, I didn't understand that. Can you please ask another question?";
}

function getTime() {
  let today = new Date();
  let hours = today.getHours();
  let minutes = today.getMinutes();

  if (hours < 10) {
    hours = "0" + hours;
  }

  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  let time = hours + ":" + minutes;
  return time;
}

// Gets the first message
function firstBotMessage() {
  let firstMessage = "Hi, How can I help you?";
  document.getElementById("botStarterMessage").innerHTML = '<p class="botText"><span>' + firstMessage + '</span></p>';

  let time = getTime();
  document.getElementById("chat-timestamp").innerHTML = time;
  document.getElementById("userInput").scrollIntoView(false);
}

firstBotMessage();

// Retrieves the response
function getHardResponse(userText) {
  let botResponse = getBotestResponse(userText);
  let botHtml = '<p class="botText"><span>' + botResponse + '</span></p>';
  document.getElementById("chatbox").innerHTML += botHtml;

  document.getElementById("chat-bar-bottom").scrollIntoView(true);
}

// Gets the text text from the input box and processes it
function getResponse() {
  let userText = document.getElementById("textInput").value;

  if (userText == "") {
    userText = "I love Code Palace!";
  }

  let userHtml = '<p class="userText"><span>' + userText + '</span></p>';
  document.getElementById("textInput").value = "";

  document.getElementById("chatbox").innerHTML += userHtml;
  document.getElementById("chat-bar-bottom").scrollIntoView(true);

  setTimeout(function () {
    getHardResponse(userText);
  }, 1000);
}

// Handles sending text via button clicks
function buttonSendText(sampleText) {
  let userHtml = '<p class="userText"><span>' + sampleText + '</span></p>';
  document.getElementById("textInput").value = "";

  document.getElementById("chatbox").innerHTML += userHtml;
  document.getElementById("chat-bar-bottom").scrollIntoView(true);

  // Uncomment this if you want the bot to respond to this buttonSendText event
  // setTimeout(() => {
  //     getHardResponse(sampleText);
  // }, 1000)
}

function sendButton() {
  getResponse();
}

function heartButton() {
  buttonSendText("Heart clicked!");
}

// Press enter to send a message
document.getElementById("textInput").addEventListener("keypress", function (e) {
  if (e.which == 13) {
    getResponse();
  }
});

// Assuming closeBtn and chatbotToggler are defined somewhere in your code
closeBtn.addEventListener("click", function () {
  document.body.classList.remove("show-content");
});

chatbotToggler.addEventListener("click", function () {
  document.body.classList.toggle("show-content");
});
