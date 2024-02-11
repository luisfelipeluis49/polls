import { z } from 'zod'
import { randomUUID } from 'node:crypto'; 
import { prisma } from '../../lib/prisma';
import { FastifyInstance } from 'fastify';

export async function voteOnPoll(app: FastifyInstance) {
    app.post('/polls/:pollId/votes', async (request, response) => {
        const voteOnPollBody = z.object({
            pollOptionId: z.string().uuid(),
        })

        const voteOnPollParams = z.object({
            pollId: z.string().uuid(),
        })
    
        const { pollId } = voteOnPollParams.parse(request.params)
        const { pollOptionId } = voteOnPollBody.parse(request.body)

        let { sessionId } = request.cookies

        if (sessionId) {
            const userPreviousVoteOnPoll = await prisma.vote.findUnique({
                where: {
                    sessionId_pollId: {
                        sessionId,
                        pollId
                    }
                }
            })

            if (userPreviousVoteOnPoll && userPreviousVoteOnPoll.pollOptionId !== pollOptionId) {
                await prisma.vote.delete({
                    where: {
                        id: userPreviousVoteOnPoll.id
                    }
                })
            } else if (userPreviousVoteOnPoll) {
                return response.status(400).send({message: "You alreadt votede on this poll."})
            }
        }

        if (!sessionId) {
            sessionId = randomUUID()

            response.setCookie('sessionId', sessionId, {
                path: '/',
                maxAge: 60 * 60 * 24 * 30,
                signed: true,
                httpOnly: true
            })
        }

        await prisma.vote.create({
            data: {
                sessionId,
                pollId,
                pollOptionId
            }
        })
    
        return response.status(201).send({sessionId})
    })
}