
import { enableFetchMocks } from 'jest-fetch-mock';
enableFetchMocks();

import fwap from './index';

describe('fwap', () => {
  const mockResponse = { id: 12345 };
  const mockBodyData = { id: 12345, name: "denisos" };
  const mockUrl = 'http://www.test/com/kittens/1';

  beforeEach(() => {
    fetch.resetMocks();
  });

  it('should call http get and respond as expected using await', async () => {
    const init = { method: 'get' };
    fetch.mockResponseOnce(JSON.stringify(mockResponse));

    const data = await fwap.get(mockUrl);
    expect(data.id).toEqual(12345);

    expect(fetch.mock.calls.length).toEqual(1);
    expect(fetch).toHaveBeenCalledWith(mockUrl, init)
  })

  it('should call http get and respond as expected using promises', () => {
    const init = { method: 'get' };
    fetch.mockResponseOnce(JSON.stringify(mockResponse));

    return fwap.get(mockUrl)
      .then((data) => {
        expect(data.id).toEqual(mockResponse.id);

        expect(fetch.mock.calls.length).toEqual(1);
        expect(fetch).toHaveBeenCalledWith(mockUrl, init)
      });
  })

  it('should throw exception for failed call', async () => {
    const init = { method: 'get' };
    fetch.mockReject(new Error('403'));

    try {
      const res = await fwap.get(mockUrl);
      expect(false).toBe(true);
    } catch (err) {
      expect(err.message).toBe('403');
    }

    expect(fetch.mock.calls.length).toEqual(1);
    expect(fetch).toHaveBeenCalledWith(mockUrl, init)
  })

  it('should call http post and respond as expected', async () => {
    const body = { body: JSON.stringify(mockBodyData) };
    const postInit = {
      method: 'post',
      ...body,
    }
    fetch.mockResponseOnce(JSON.stringify(mockResponse));

    const data = await fwap.post(mockUrl, { ...body });
    expect(data.id).toEqual(12345);

    expect(fetch.mock.calls.length).toEqual(1);
    expect(fetch).toHaveBeenCalledWith(mockUrl, postInit)
  })

  it('should call http put and respond as expected', async () => {
    const body = { body: JSON.stringify(mockBodyData) };
    const expectedPostInit = {
      method: 'put',
      ...body,
    }
    fetch.mockResponseOnce(JSON.stringify(mockResponse));

    const data = await fwap.put(mockUrl, { ...body });
    expect(data.id).toEqual(12345);

    expect(fetch.mock.calls.length).toEqual(1);
    expect(fetch).toHaveBeenCalledWith(mockUrl, expectedPostInit)
  })

  it('should call http delete and respond as expected', async () => {
    const body = { body: JSON.stringify(mockBodyData) };  
    const expectedDelInit = {
      method: 'delete',
      ...body,              // http delete may have a body
    }
    fetch.mockResponseOnce(JSON.stringify(mockResponse));

    const data = await fwap.del(mockUrl, { ...body });
    expect(data.id).toEqual(12345);

    expect(fetch.mock.calls.length).toEqual(1);
    expect(fetch).toHaveBeenCalledWith(mockUrl, expectedDelInit)
  })

  it('should call http delete passing custom headers and respond as expected', async () => {
    const body = { body: JSON.stringify(mockBodyData) };  

    // test passing custom init params
    const expectedDelInit = {
      mode: 'cors',
      credentials: 'same-origin',   // only send credentials if called same origin
      headers: {
        'X-Custom-Header': 'for test'
      },
      method: 'delete',
      ...body,                      // http delete may have a body
    }
    fetch.mockResponseOnce(JSON.stringify(mockResponse));

    const data = await fwap.del(mockUrl, { 
      ...body,
      mode: 'cors',
      credentials: 'same-origin',
      headers: {
        'X-Custom-Header': 'for test'
      }
    });
    expect(data.id).toEqual(12345);

    expect(fetch.mock.calls.length).toEqual(1);
    expect(fetch).toHaveBeenCalledWith(mockUrl, expectedDelInit)
  })
})

