import { Headline } from '@/components/ui/headline'
import { Text } from '@/components/ui/text'
import type { Functions } from '@/contracts/functions'

const functions: Functions[] = [
  {
    title: 'Gestão de clientes',

    description:
      'Permite a completa administração do relacionamento com os consumidores, facilitando o processo de cadastro, atualização de dados e análise do comportamento de compras.',
  },
  {
    title: 'Cobrancas automáticas',
    description:
      'Proporciona um processo eficiente e simplificado de envio de lembretes e notificações de pagamento aos clientes. Essa funcionalidade visa garantir que as cobranças sejam realizadas de forma pontual e sem esforço manual, melhorando a organização financeira e a experiência do cliente.',
  },
  {
    title: 'Gestão de finanças',
    description:
      'Oferece um controle completo e detalhado sobre as finanças da sua empresa, sem que você precise fazer cálculos manuais. Com essa ferramenta, você pode verificar de forma simples e rápida o quanto já ganhou, quanto lucrou e quanto ainda tem a receber, em tempo real, com atualizações automáticas',
  },
  {
    title: 'Análise de dados',
    description:
      'Garante uma visão detalhada e clara do desempenho financeiro da sua empresa, por meio de gráficos interativos e porcentagens comparativas. Com ela, você pode facilmente visualizar os ganhos obtidos em diferentes períodos e analisar como está o crescimento em relação a períodos anteriores. ',
  },
]

export default function Functions() {
  return (
    <div className="flex px-8 md:px-12 lg:px-16 2xl:px-24">
      <div className="w-full grid grid-cols-1 md:grid-cols-2 items-center justify-center min-h-[350px] md:min-h-[500px] gap-4">
        {functions.map(({ title, description }) => {
          return (
            <div key={title} className="h-auto md:min-h-[200px]">
              <Headline size="2xl" variant="black">
                {title}
              </Headline>
              <Text variant="body" className="mt-2 text-justify">
                {description}
              </Text>
            </div>
          )
        })}
      </div>
    </div>
  )
}
