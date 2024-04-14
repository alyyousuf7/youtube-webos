import { BatchInterceptor, ExtractEventMapType } from '@mswjs/interceptors';
import { FetchInterceptor } from '@mswjs/interceptors/fetch';
import { XMLHttpRequestInterceptor } from '@mswjs/interceptors/XMLHttpRequest';
import { Listener } from 'strict-event-emitter';

export type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
export type URLPattern = RegExp | string;
type CallbackFn = (data: any) => void;

export type Interceptor = {
  method: HTTPMethod;
  urlPattern: URLPattern;
  callback: CallbackFn;
};

declare global {
  interface Window {
    httpInterceptor?: HTTPInterceptor;
  }
}

const matchURL = (url: string, pattern: URLPattern) => {
  const { pathname } = new URL(url);

  if (typeof pattern === 'string') {
    return pathname.includes(pattern);
  }
  else if (pattern instanceof RegExp) {
    return pattern.test(pathname);
  }
  return false;
};

type InterceptorList = FetchInterceptor | XMLHttpRequestInterceptor;

class HTTPInterceptor {
  private httpProxy: BatchInterceptor<InterceptorList[]> = new BatchInterceptor({
    name: 'the-interceptor',
    interceptors: [
      new FetchInterceptor(),
      new XMLHttpRequestInterceptor(),
    ],
  });

  private interceptors: Interceptor[] = [];

  constructor() {
    this.httpProxy.apply();
    this.httpProxy.on('request', this.requestListener.bind(this));
  }

  private async requestListener({ request }: Parameters<Listener<ExtractEventMapType<InterceptorList[]>['request']>>[0]) {
    if (request.headers.get('passthrough')) {
      return;
    }

    const targetInterceptors = this.interceptors.filter(({ method, urlPattern }) => {
      return request.method === method && matchURL(request.url, urlPattern);
    });

    if (targetInterceptors.length === 0) {
      return;
    }

    const req = request.clone();
    req.headers.set('passthrough', 'true');

    const res = await fetch(req);
    const json = await res.json();

    for (const int of targetInterceptors) {
      try {
        int.callback(json);
      }
      catch (e) {
        console.error('Error in interceptor callback', e);
      }
    }

    const response = new Response(JSON.stringify(json));
    request.respondWith(response);
  };

  addInterceptor(method: Interceptor['method'], urlPattern: Interceptor['urlPattern'], callback: Interceptor['callback']) {
    if (this.interceptors.some(int => int.method === method && int.urlPattern === urlPattern && int.callback === callback)) {
      return () => this.removeInterceptor(method, urlPattern, callback);
    }
    this.interceptors.push({ method, urlPattern, callback });

    return () => this.removeInterceptor(method, urlPattern, callback);
  }

  removeInterceptor(method: Interceptor['method'], urlPattern: Interceptor['urlPattern'], callback: Interceptor['callback']) {
    this.interceptors = this.interceptors
      .filter(int => !(int.method === method && int.urlPattern === urlPattern && int.callback === callback));
  }
}

export const setup = () => {
  window.httpInterceptor = new HTTPInterceptor();
};
