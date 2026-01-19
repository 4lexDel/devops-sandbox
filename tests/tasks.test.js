const request = require('supertest');
const app = require('../app');
const taskService = require('../services/taskService');

beforeEach(() => {
  taskService.reset();
});

describe('Task API', () => {

  test('GET /api/tasks returns empty array', async () => {
    const res = await request(app).get('/api/tasks');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([]);
  });

  test('POST /api/tasks creates a task', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .send({ title: 'My task' });

    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe('My task');
  });

  test('DELETE /api/tasks/:id deletes task', async () => {
    const task = taskService.create('To delete');

    const res = await request(app).delete(`/api/tasks/${task.id}`);
    expect(res.statusCode).toBe(204);
  });

});
