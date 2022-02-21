import { httpGet } from './mock-http-interface';

const MESSAGE_ERROR = 'Your request has been terminated';

type TResult = {
  'Arnie Quote'?: String,
  'FAILURE'?: typeof MESSAGE_ERROR,
};

export const getArnieQuotes = async (urls : string[]) : Promise<TResult[]> => {
  const requests = await urls.map(async (url) => {
    var results : TResult

    // Response Check
    try {
      const {status,body} = await httpGet(url);
      
      switch (status) {
        // Success
        case 200:
          results = { 'Arnie Quote': JSON.parse(body).message }
          break;
      
        // Failure/Other
        default:
          results = { 'FAILURE': MESSAGE_ERROR };
          break;
      }

    } catch (e) {
      // Catch Unexpected Responses
      results = { 'FAILURE': MESSAGE_ERROR };
    }

    return results;
  })

  return Promise.all(requests)
}