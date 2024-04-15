type CallbackFn = (data: any) => void;

export type Interceptor = {
  callback: CallbackFn;
};

declare global {
  interface Window {
    jsonParseInterceptor?: JSONParseInterceptor;
  }
}

const originalJSONParse = JSON.parse;

class JSONParseInterceptor {
  private interceptors: Interceptor[] = [];

  constructor() {
    JSON.parse = this.JSONParse.bind(this);
  }

  private JSONParse(rawData: string): Object | string {
    try {
      const json = originalJSONParse(rawData);

      for (const int of this.interceptors) {
        try {
          int.callback(json);
        }
        catch (e) {
          console.error('Error in interceptor callback', e);
        }
      }

      return json;
    }
    catch {
      return rawData;
    }
  };

  addInterceptor(callback: Interceptor['callback']) {
    // do not add the same callback twice
    if (this.interceptors.some(int => int.callback === callback)) {
      return () => this.removeInterceptor(callback);
    }

    this.interceptors.push({ callback });
    return () => this.removeInterceptor(callback);
  }

  removeInterceptor(callback: Interceptor['callback']) {
    this.interceptors = this.interceptors.filter(int => !(int.callback === callback));
  }
}

export const setup = () => {
  window.jsonParseInterceptor = new JSONParseInterceptor();
};
