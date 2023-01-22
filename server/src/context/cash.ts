export type Cash = {
  addIP(ip: string): void
  hasIP(ip: string): boolean
}

class RamCash implements Cash {
  private _usedIPs = new Set<string>()

  constructor(usedIPs: string[]) {
    usedIPs.forEach(ip => this._usedIPs.add(ip))
  }

  addIP(ip: string): void {
    this._usedIPs.add(ip)
  }

  hasIP(ip: string): boolean {
    return this._usedIPs.has(ip)
  }
}

export const createRamCash = (usedIPs: string[]) => new RamCash(usedIPs)
