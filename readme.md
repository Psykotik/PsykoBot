# PsykoBot
PsykoBot is a very simple Discord bot, with few features that you can run on your own ! The only needed thing is a computer !

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Configuration](#configuration)
- [Basic Use](#basic-use)
- [Resources](#resources)

## Features
- Play the _**Russian Roulette**_ with yours friends.. But take care, that's hurt !
- Tables are flipped ? Don't worry, PsykoBot will put them down ┬─┬﻿ ノ( ゜-゜ノ) !
- Fire on someone
## Installation

You can run the bot on your own desktop, raspberry pi, or whatever running an unix like OS (windows 10 can with Ubuntu on Windows bash !)

**_IMPORTANT :_** You need [node.js](https://nodejs.org/en/) _v6.0 or newer_ installed on your computer to run the bot.

```bash
# First, install git if you haven't installed it yet
$ sudo apt-get update && sudo apt-get install git

# Install discord.js, a nodejs module
$ npm install --save discord.js

# Clone the repository
$ git clone https://github.com/Psykotik/PsykoBot && cd ./PsykoBot
```

## Configuration

The bot is very easy to configure. The only thing you need is a Discord Application Token. This token can be found on [this page](https://discordapp.com/developers/applications/me).

Help : If you don't really know how to get this token, you can check [this](https://github.com/reactiflux/discord-irc/wiki/Creating-a-discord-bot-&-getting-a-token).

Once you get the token, please fill the configExample.json with it and then, rename it to config.json.

```json
{
  "token": "This-is.my.Discord-token",
  "prefix": ",",
  "language": "english"
}
```
Note : Language can be set to _english_ or _french_ at the moment. Feel free to translate it and pull request your work !

## Basic-use

Nothing hard here, just write ```,help``` to get help. The prefix can be changed on config.json before startup.

## Resources
- [Discord application page](https://discordapp.com/developers/applications/me)
- [Discord Developers](https://discordapp.com/developers/docs/intro)
- [Discord.js](https://discord.js.org/#/)
- [Node.js](https://nodejs.org/en/)
- [PsykoBot Github](https://github.com/Psykotik/PsykoBot)
