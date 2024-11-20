// Load scripts dynamically using url and callback as the props for hyperwaller transfer method + verification

export const loadScript = (url = "https://embed.tawk.to/63c4fd8a47425128790dcbb4/1gmsnspup", callback) => {
    var script = document.createElement('script');
    script.type = 'text/javascript';
  
    if (script.readyState) {
      //IE
      script.onreadystatechange = function() {
        if (script.readyState == 'loaded' || script.readyState == 'complete') {
          script.onreadystatechange = null;
        //   callback();
        }
      };
    } else {
      //Others
      script.onload = function() {
        // callback();
      };
    }
  
    script.src = url;
    document.getElementsByTagName('head')[0].appendChild(script);
  };
