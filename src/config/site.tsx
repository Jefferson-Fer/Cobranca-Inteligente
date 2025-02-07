import { FooterItem, MainNavItem } from '@/contracts/navigation'

const socialLinks = {
  instagram: 'https://www.instagram.com/cobrancainteligente/',
  facebook: 'https://www.facebook.com/cobrancainteligente/',
  whatsapp: 'https://wa.me/5511999999999',
}

const mainNav: MainNavItem[] = [
  {
    title: 'Ofertas',
    href: '/ofertas',
    //icon: 'offer',
  },
  {
    title: 'Destaques',
    href: '/destaques',
    //icon: 'highlight',
  },
  {
    title: 'Marcas',
    href: '/marcas',
    //icon: 'brands',
  },
  {
    title: 'Atendimento',
    href: '/atendimento',
    //icon: 'help',
  },
  {
    title: 'Formas de Pagamento',
    href: '/formas-de-pagamento',
  },
  {
    title: 'Política de Entrega',
    href: '/politica-de-entrega',
    //icon: 'help',
  },
  {
    title: 'Política de Devolução',
    href: '/politica-de-devolucao',
    //icon: 'help',
  },
]

export const siteConfig = {
  lang: 'pt-br',
  name: 'Cobrança Inteligente',
  shortDescription: 'Cobrança Inteligente',
  description: 'Cobrança Inteligente',

  url: 'https://cobrancainteligente.com.br',
  ogImage: 'https://cobrancainteligente.com.br/opengraph-image.png',
  socialLinks,
  keywords: ['Cobrança', 'Cobrança Inteligente', 'Cobrança Inteligente'],
  mainNav,

  footerNav: [
    {
      title: 'Atendimento',
      items: [
        {
          title: 'Como Comprar',
          href: '/como-comprar',
        },
        {
          title: 'Cadastre sua loja',
          href: '/cadastre-sua-loja',
        },
        {
          title: 'Sugestões de Lojas',
          href: '/sugestoes-de-lojas',
        },
        {
          title: 'Fale Conosco',
          href: '/fale-conosco',
        },
        {
          title: 'Política de Privacidade',
          href: '/privacidade',
        },
        {
          title: 'Termos de Uso',
          href: '/termos',
        },
      ],
    },
    {
      title: 'Nossas Redes',
      items: [
        {
          title: 'Instagram',
          href: socialLinks.instagram,
          external: true,
        },
        {
          title: 'Facebook',
          href: socialLinks.facebook,
          external: true,
        },
        {
          title: 'Whatsapp',
          href: socialLinks.whatsapp,
          external: true,
        },
      ],
    },
  ] satisfies FooterItem[],
}
