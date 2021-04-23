Chat Application published on netlify. Used ReactJS on the frontend and Cloud Firestore (NoSQL) on the backend. Ideally, chat applications should use sockets such as socket.io, but to simplify this project, I basically treat all messages as documents in a NoSQL dB with the text message and the data created and the chat application you see is basically a date-sorted table that is wrapped in a chat-message style.

ToDo: 
>create reset button that allows to delete all document entry in firestore. 
>add names
