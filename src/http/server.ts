import fastify from 'fastify';
import cookie from '@fastify/cookie';
import websocket from '@fastify/websocket';
import { createPoll } from './routes/createPoll';
import { getPoll } from './routes/getPoll';
import { voteOnPoll } from './routes/voteOnPoll';
import { pollResults } from './websocket/poll-results';

const app = fastify()

app.register(cookie, {
    secret: "secret-supeeeer",
    hook: 'onRequest'
})

app.register(websocket)

app.register(createPoll)
app.register(getPoll)
app.register(voteOnPoll)

app.register(pollResults)

app.listen({ port: 3333 }).then(() => {
    console.log('HTTP server running!');
})


