export const types = [
  'private',
  'dealer',
  'auction',
  'importer',
  'fleet',
] as const

export type Types = (typeof types)[number]
export const mappedTypes: { [key in Types]: string } = {
  auction: 'Subasta',
  dealer: 'Concesionario',
  fleet: 'Flota',
  importer: 'Importadora',
  private: 'Privado',
}
