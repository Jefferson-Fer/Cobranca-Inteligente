import * as Acc from '@/components/ui/accordion'
import { Headline } from '@/components/ui/headline'
import { Text } from '@/components/ui/text'

export default function FAQ() {
  return (
    <div className="flex px-8 md:px-12 lg:px-16 2xl:px-24">
      <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="flex flex-col gap-2">
          <Headline size="2xl" variant="black">
            FAQ
          </Headline>
          <Text scale="lg" variant="body">
            Perguntas frequentes
          </Text>
        </div>
        <Acc.Accordion
          type="single"
          collapsible
          className="w-full col-span-1 sm:col-span-2"
        >
          <Acc.AccordionItem value="item-1">
            <Acc.AccordionTrigger>
              <Text weight="semibold">Como pode ajudar o meu negócio?</Text>
            </Acc.AccordionTrigger>
            <Acc.AccordionContent>
              <Text>
                Otimizando processos e oferecendo insights valiosos. Com nossa
                plataforma, você pode: monitorar cada transação e identificar
                padrões de comportamento de seus clientes; analisar dados de
                vendas e clientes para tomar decisões estratégicas; liberar seu
                time para focar no crescimento do seu negócio; e muito mais!
              </Text>
            </Acc.AccordionContent>
          </Acc.AccordionItem>

          <Acc.AccordionItem value="item-2">
            <Acc.AccordionTrigger>
              <Text weight="semibold">
                Quais as principais funcionalidades?
              </Text>
            </Acc.AccordionTrigger>
            <Acc.AccordionContent>
              <Text>
                Gerenciamento de vendas, clientes e análise de dados de forma
                simples e eficiente.
              </Text>
            </Acc.AccordionContent>
          </Acc.AccordionItem>
          <Acc.AccordionItem value="item-3">
            <Acc.AccordionTrigger>
              <Text weight="semibold">
                O software é compatível com dispositivos móveis? Posso acessá-lo
                de meu celular?
              </Text>
            </Acc.AccordionTrigger>
            <Acc.AccordionContent>
              <Text>
                Sim, é totalmente compatível com dispositivos móveis! Você pode
                acessá-lo de seu celular, tablet ou computador, tanto em Android
                quanto iOS, através do navegador.
              </Text>
            </Acc.AccordionContent>
          </Acc.AccordionItem>
          <Acc.AccordionItem value="item-4">
            <Acc.AccordionTrigger>
              <Text weight="semibold">Oferece suporte 24/7?</Text>
            </Acc.AccordionTrigger>
            <Acc.AccordionContent>
              <Text>
                Sim, nossa equipe de atendimento está disponível a qualquer hora
                para ajudá-lo com dúvidas, problemas técnicos ou qualquer outra
                necessidade. Você pode entrar em contato conosco por e-mail ou
                telefone.
              </Text>
            </Acc.AccordionContent>
          </Acc.AccordionItem>
          <Acc.AccordionItem value="item-5">
            <Acc.AccordionTrigger>
              <Text weight="semibold">
                Existe alguma forma de pagar anualmente e obter descontos?
              </Text>
            </Acc.AccordionTrigger>
            <Acc.AccordionContent>
              <Text weight="semibold">
                Sim, ao optar por pagar o seu plano anualmente, você pode
                economizar até 10% em relação ao pagamento mensal. Isso permite
                que você aproveite todos os benefícios da plataforma com um
                custo mais vantajoso. Para aproveitar essa opção, basta entrar
                em contato com nossa equipe de suporte para mais informações.
              </Text>
            </Acc.AccordionContent>
          </Acc.AccordionItem>
        </Acc.Accordion>
      </div>
    </div>
  )
}
