export function scriptLoader(src: string): Promise<any> {
  const script: HTMLScriptElement = document.createElement('script');

  script.type = 'text/javascript';
  script.src = src;

  return new Promise((fulfill: Function, reject: Function): void => {
    script.onload = (): void => fulfill();
    script.onerror = (error: ErrorEvent): void => reject(error);

    document.querySelector('head').appendChild(script);
  });
}

export function loadGigyaSDK(apiKey: string): Promise<void> {
  return scriptLoader(`https://cdns.gigya.com/js/gigya.js?apikey=${apiKey}`);
}
