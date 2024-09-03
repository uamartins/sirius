import type { UseFetchOptions } from 'nuxt/app'
import { defu } from 'defu'
import errorTranslations from '#lang/errorsTranslation';

export function useCustomFetch<T>(
  url: string,
  options: UseFetchOptions<T> = {}
) {
  const token = useAuth().token
  const config = useRuntimeConfig()

  const defaults: UseFetchOptions<T> = {
    baseURL: config.public.apiUrl as string ?? 'https://api.minhafolha.online/api',
    key: url,
    headers: token ? 
      { 
        Authorization: `Bearer ${token}`, 
        'Content-Type': 'application/json'  
      } : 
      {
        'Content-Type': 'application/json'
      },

    onRequest({ request, options }) {
      // console.log('[fetch request]', request, options)
    },

    onRequestError({ request, options, error }) {
      if (error.code !== 20) {
        useNotifier().error('Não foi possível executar a requisição')  
      }

      // console.log('[fetch request error]', request, error)
    },

    onResponse({ request, response, options }) {
      // console.log('[fetch response]', request, response)
    },

    onResponseError({ request, response, options }) {
      if (response.status === 422) {
        let errorMessage = response._data.message;
    
        if (response._data.errors) {
          Object.keys(response._data.errors).forEach((key) => {
            const translatedKey = errorTranslations[key] || key;
            errorMessage += `\n${translatedKey}: ${response._data.errors[key].join(', ')}`;
          });
        }
    
        useNotifier().error(errorMessage);
      }

      // console.log('[fetch response error]', request, response)
    },
  }

  const params = defu(options, defaults)

  return useFetch(url, params)
}
