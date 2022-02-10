TODO:
* Deploy to heroku DONE
* Fix bug where voice lines are reproduced in other servers.
* What's the easiest way to let people manage their sounds?
  * Add a database to the project.
  * Switch to hosting files in S3.
  * Build some UI to manage sound list.

Solutions:
1. Check whether the message was sent in the same channel as the one we'll be playing the sound in.
2. If they're the same, play the sound, otherwise return.

* Test Buildpack


Connection -> Connection between the Bot and the Discord channel
Player -> the thing that reproduces the sounds

We want only 1 player per connection and we want to only run 1 player each time a SFX is run

We subscribe the player to the connection
