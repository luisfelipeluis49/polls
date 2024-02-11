# Poll API HTTP/WebSocket

This API allows users to create and vote on polls using RESTful endpoints and WebSocket for real-time updates.

## Features
- Create Polls: Users can create new polls with customizable options.
- Vote on Polls: Users can vote on existing polls.
- Real-time Updates: WebSocket integration provides real-time updates on poll results.
- Fraud Prevent: API votes are secured with authentication using signature cookies.
- Simple and Intuitive: Easy-to-use endpoints for creating and managing polls.
  
## Technologies
- RESTful API: Built using Node.js and Fastify.js.
- WebSocket: Real-time updates powered by WebSocket protocol.
- Database: Utilizes PostgreSQL for storing poll data and Reddis for real-time updates.
- Typescript: Enable type safety on project

## System Design
![image](https://github.com/luisfelipeluis49/polls/assets/43786838/cc2fc374-2585-481c-a474-fc03b5ed3647)

## API Documentation

### GET Read Poll
```

  /polls/:pollId

```
#### Params
| name        | type       | Description                         |
| :---------- | :--------- | :---------------------------------- |
| `pollId` | `UUID` | Poll generated UUID |

#### Retrieve a specific poll and it's options

---------------------------------------------------------------------
### POST Create Poll
```

  /polls

```
#### Body
| name        | type       | Description                         |
| :---------- | :--------- | :---------------------------------- |
| `title` | `string` | Poll title |
| `options` | `string[]` | Poll options |
 
#### Create a new poll with the given options

---------------------------------------------------------------------
### POST Vote on Poll
```

  /polls/:pollId/votes

```
#### Params
| name        | type       | Description                         |
| :---------- | :--------- | :---------------------------------- |
| `pollId` | `UUID` | Poll generated UUID |
#### Body
| name        | type       | Description                         |
| :---------- | :--------- | :---------------------------------- |
| `pollOptionId` | `UUID` | Poll Option generated UUID |

#### Vote an option of the poll

---------------------------------------------------------------------
### WS Poll Results
```

  /polls/:pollId/results

```
#### Params
| name        | type       | Description                         |
| :---------- | :--------- | :---------------------------------- |
| `pollId` | `UUID` | Poll generated UUID |

#### Start a websocket connection to get live results from a poll 

---------------------------------------------------------------------
## Getting Started
```bash
# create db
docker compose up -d
# install packages
npm i
# run the server
npm run dev
```

## License
This project is licensed under the ISC License - see the LICENSE file for details.
