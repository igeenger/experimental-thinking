export class CyclicCounter {
  private _variant = 3

  constructor(
    private _maxCount: number
  ) {
    this._variant = this._maxCount
  }

  next() {
    this._variant++
    if (this._variant > this._maxCount) {
      this._variant = 1
    }
    return this._variant
  }
}
