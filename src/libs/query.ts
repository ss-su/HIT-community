import * as qs from 'qs'

export function parse (search: string) {
  search = search[0] === '?' ? search.slice(1) : search
  const query = qs.parse(search)

  Object.keys(query).forEach(key => {
    if (query[key] && /^\d+$/.test(query[key])) {
      query[key] = parseInt(query[key], 10)
    }
  })

  return query
}

export function stringify (query: any) {
  return '?' + qs.stringify({ ...query })
}
