
/**
 * @jest-environment node
 */

import '@testing-library/jest-dom';
import { GET, POST } from '../../src/app/api/superhero/route.js';
 
describe('Page', () => {
  it('tests that GET api/superhero is properly called', async () => {
    const response = await GET();
      const body = await response.json();
    
      expect(response.status).toBe(200);
      expect(body).toEqual({ data: []});
  })

  it('tests that multiple superheroes are properly sorted', async () => {

    sendDataToPost = async (data) => {
      const requestObj = {
        json: async () => (data),
      };
      const postResponse = await POST(requestObj);
  
      expect(postResponse.status).toBe(200);
    }
    await sendDataToPost({ name: 'test1', superpower: "test1", humility: 3 });
    await sendDataToPost({ name: 'test2', superpower: "test2", humility: 5 });
    await sendDataToPost({ name: 'test3', superpower: "test3", humility: 4 });

    const getResponse = await GET();
    const getBody = await getResponse.json();
  
    expect(getResponse.status).toBe(200);
    expect(getBody).toEqual({ data: [{ name: 'test1', superpower: "test1", humility: 3 }, { name: 'test3', superpower: "test3", humility: 4 }, { name: 'test2', superpower: "test2", humility: 5 }]});
  })
})