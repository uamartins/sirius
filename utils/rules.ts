const UF: Array<string> = ['AC', 'AL', 'AP', 'AC', 'AL', 'AP', 'AM', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT',
  'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO',]

export const rules = { 
  required: (val: any) => !!val || 'Este campo é obrigatório',
  number: (val: any) => ((val || '') > 0 || !val) || 'Valor inválido',
  email: (val: string) => /.+@.+/.test(val) || 'E-mail inválido',
  uf: (val: string) => UF.includes(val) || 'UF inválida'
}
