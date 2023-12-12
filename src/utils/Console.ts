export class Console {
  log(data: unknown) {
    console.log(JSON.stringify(data, null, 2))
  }

  error(data: unknown) {
    console.error(JSON.stringify(data, null, 2))
  }
}
