import { httpGet } from './mock-http-interface';

type TResult = {
  'Arnie Quote'?: String,
  'FAILURE'?: String,
};

export const getArnieQuotes = async (urls : string[]) : Promise<TResult[]> => {
  const requests = await urls.map(async (url) => {
    var results : TResult

    // Response Check
    const {status,body} = await httpGet(url);
    
    switch (status) {
      // Success
      case 200:
        results = { 'Arnie Quote': JSON.parse(body).message }
        break;
    
      // Failure/Other
      default:
        results = { 'FAILURE': JSON.parse(body).message };
        break;
    }

    return results;
  })

  return Promise.all(requests)
}