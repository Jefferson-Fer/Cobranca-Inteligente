import { Fragment } from 'react'

import Link from 'next/link'

import { BreadcrumbLink } from '@/contracts/commons'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '../ui/breadcrumb'

type BreadcrumbDashboardProps = {
  links: BreadcrumbLink[]
}

const BreadcrumbDashboard = ({ links }: BreadcrumbDashboardProps) => {
  return (
    <Breadcrumb>
      <BreadcrumbList className="mb-2">
        {links.map((link, index) => (
          <Fragment key={link.label}>
            {index !== links.length - 1 ? (
              <>
                {link.href ? (
                  <Link href={link.href} className="hover:text-primary">
                    <BreadcrumbItem>{link.label}</BreadcrumbItem>
                  </Link>
                ) : (
                  <BreadcrumbItem>{link.label}</BreadcrumbItem>
                )}
                <BreadcrumbSeparator />
              </>
            ) : (
              <BreadcrumbItem>{link.label}</BreadcrumbItem>
            )}
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export default BreadcrumbDashboard
