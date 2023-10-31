const request = require('supertest')
const baseUrl = 'http://localhost:3000'
describe('Gomoku Routes', () => {
    test('GET /api/gomoku/create_game', async () => {
        const response = await request(baseUrl).get('/api/gomoku/create_game')
        expect(response.status).toBe(200)
        //expect(response.body).toEqual({status: "success"});
    })

    test('GET /api/gomoku/add_player', async () => {
        const response = await request(baseUrl).get('/api/gomoku/add_player')
        expect(response.status).toBe(200)
        //expect(response.body).toEqual({status: "success"});
    })

    test('GET /api/gomoku/play', async () => {
        const response = await request(baseUrl).get('/api/gomoku/play')
        expect(response.status).toBe(200)
        //expect(response.body).toEqual({status: "success"});
    })
})
