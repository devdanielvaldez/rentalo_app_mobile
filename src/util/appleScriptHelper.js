// Load scripts dynamically using url and callback as the props for hyperwaller transfer method + verification
import axios from 'axios';

export const loadAppleScript = (url, callback) => {
    var script = document.createElement('script');
    script.type = 'text/javascript';
  
    if (script.readyState) {
      //IE
      script.onreadystatechange = function() {
        if (script.readyState == 'loaded' || script.readyState == 'complete') {
          script.onreadystatechange = null;
          callback();
        }
      };
    } else {
      //Others
      script.onload = function() {
        callback();
      };
    }
  
    script.src = url;
    document.getElementsByTagName('head')[0].appendChild(script);
  };


  export async function sendRequest(urlPath, request) {
    try {
      const response = await axios.post(urlPath, request);
      
      return handleResponse(response);
    } catch (error) {
      throw error;
    }
  }
  
  // Returns response if the status code is 200, otherwise throw error.
  export async function handleResponse(response) {
    if (response.status === 200) {
      // Successful response, simply return
      return response;
    }
  
    // Unknown error occurred
    throw new Error(
      'Unknown API response error, response did not return with a status code of 200.'
    );
  }
  
  // Extracts and returns the page data to display for the given error.
  export function handleError(error) {
    const errorMessage = error.response.data;
    let errorPageText;
    if (errorMessage) {
      errorPageText = {
        title: errorMessage.title,
        description: errorMessage.description,
      };
    }
    return errorPageText;
  }