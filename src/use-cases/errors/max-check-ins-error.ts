export class MaxCheckInsError extends Error {
  constructor() {
    super('Check-ins limit reached.')
  }
}
