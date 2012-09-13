# SCRIPT


## Short introduction of the project

### Slide 1

* Small, realtime photosharing app
* Kinda like instagram ;)

### Slide 2
* Consists of mainly two things;
  * Backbone on the client
  * Node.js on the server

### Slide 3
* Backbone
  * A client-side MV* framework.
  * Has Models and Views, but also Collections - basically ordered sets of models, but has a lot more too!
  * Collections and models can tie up to RESTful apis for some nice async data fetching and updating
  * Data <> DOM separation => maintainable code that's not tied to DOM elements

### Slide 4
Example code, walk through

### Slide 5
* Node.js
  * Serverside JS is cool
  * Built on Google's V8 JS engine
  * Epic ecosystem with an awesome package manager (npm)
  * Single threaded process, non-blocking I/O
  * Easy to learn (harder if you're not familiar with JS, I guess)

### Slide 6
Example web server


### Slide 7
Short list of frameworks used in Node

### Slide 8
Express
* Small, but powerful web framework
* Has all the features you would expect a framework
  * HTTP Helper methods like redirection, caching, request and response handling etc
  * A robust routing engine
  * Content negotiation
  * Bundled with template/viewengine, support for over a dozen out of the box
* Its goal is to provide small, robust tooling for HTTP servers to use for virtually anything

### Slide 9
Example code

### Slide 10
Example code (node HTTP Server)

### Slide 11
Example code

### Slide 12
Seaport

### Slide 13
Socket.IO
* Abstraction layer on top of websockets and other transports
  * Makes making realtime web applications in JavaScript extremely easy
* Provider for both server and clientside
Support/transports:
* WebSocket
* Adobe® Flash® Socket
* AJAX long polling
* AJAX multipart streaming
* Forever Iframe
* JSONP Polling

### Slide 14
Socket example server side

### Slide 15
Socket example client side

### Slide 16
Piping
  * Everything in node is a stream, allowing for piping of a readable stream into a writable one
  * Example with a node module called filed
    * Usecase from the application;
    * Read a file from disk using filed
    * pipe the formData stream to the file as it is being sent and parsed

### Slide 17
DEMO

### Slide 18
DONE
