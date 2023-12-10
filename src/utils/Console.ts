export class Console {
  log(data: unknown) {
    console.log(JSON.stringify(data, null, 2))
  }
}
