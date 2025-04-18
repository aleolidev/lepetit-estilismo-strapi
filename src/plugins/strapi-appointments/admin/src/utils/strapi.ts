export function query(query: string) {
  return fetch(query).then((res) => res.json());
}
