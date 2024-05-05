 // connected to the socket
 const socket = io("http://localhost:8080", { transports: ["websocket"] });

 socket.on("send", (msg) => {
    setTimeout(()=>{
        joinRoomAlert()

    },4000)
   jarvisAlert(msg);
   console.log(msg);
 });
 function sendMessage() {
   var messageInput = document.getElementById("message-input");
   var message = messageInput.value.trim();
   var room = document.getElementById("room-select").value;

   if (message !== "") {
     // Send the message to the server

     socket.emit("chatMessage", { message, room });
     console.log("Send Message: ", message);

     // Clear the message input
     messageInput.value = "";
     appendMessageToChat(`You : ${message}`);

     setTimeout(() => {
       showServerSentAlert();
     }, 1000);
     showMessageSentAlert();
   }
 }

 // Function to show alert when a message is sent
 function showMessageSentAlert() {
   var alertDiv = document.createElement("div");
   alertDiv.className = "alert";
   alertDiv.textContent = "Message sent to the Server!";
   document.body.appendChild(alertDiv);
   setTimeout(() => {
     document.body.removeChild(alertDiv);
   }, 4000);
 }

 function showServerSentAlert() {
   var alertDiv = document.createElement("div");
   alertDiv.className = "alert";
   alertDiv.style.background = "red";
   alertDiv.textContent =
     "Jarvis hope that...you have access to my local server to chat!";
   document.body.appendChild(alertDiv);

   setTimeout(() => {
     document.body.removeChild(alertDiv);
   }, 4000);
 }

 function jarvisAlert(msg) {
   var alertDiv = document.createElement("div");
   alertDiv.className = "alert";
   alertDiv.style.background = "green";
   alertDiv.textContent = msg;
   document.body.appendChild(alertDiv);

   setTimeout(() => {
     document.body.removeChild(alertDiv);
   }, 4000);
 }

 // Client-side code to join a room
 const roomName = "room1";
 socket.emit("joinRoom", roomName);

 // Function to join a room
 function joinRoom() {
   var room = document.getElementById("room-select").value;
   socket.emit("joinRoom", room);

   showRoomJoinedAlert(room);
 }

 // Function to leave a room
 function leaveRoom() {
   var room = document.getElementById("room-select").value;
   socket.emit("leaveRoom", room);
   showRoomLeftAlert(room);
 }

 // Function to show alert when a room is joined
 function showRoomJoinedAlert(room) {
   var alertDiv = document.createElement("div");
   alertDiv.className = "alert";
   alertDiv.textContent = "Joined room: " + room;
   document.body.appendChild(alertDiv);

   setTimeout(() => {
     document.body.removeChild(alertDiv);
   }, 3000);
 }

 // Function to show alert when a room is left
 function showRoomLeftAlert(room) {
   var alertDiv = document.createElement("div");
   alertDiv.className = "alert";
   alertDiv.textContent = "Left room: " + room;
   document.body.appendChild(alertDiv);

   setTimeout(() => {
     document.body.removeChild(alertDiv);
   }, 3000);
 }

 function appendMessageToChat(message) {
   var chatBox = document.getElementById("chat-box");
   var messageDiv = document.createElement("div");
   messageDiv.className = "message";

   messageDiv.textContent = message;
   chatBox.appendChild(messageDiv);
   chatBox.scrollTop = chatBox.scrollHeight;
 }


 function joinRoomAlert(room) {
    var alertDiv = document.createElement("div");
    alertDiv.className = "alert";
    alertDiv.style.background = "red";
    alertDiv.textContent = "First you have to select the room and click the join button";
    document.body.appendChild(alertDiv);
 
    setTimeout(() => {
      document.body.removeChild(alertDiv);
    }, 5000);
  }
 