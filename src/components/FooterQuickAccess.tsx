import Link from 'next/link'

export default function FooterQuickAccess({
  linkUrl,
  label = 'Acessar página',
  className,
}: {
  linkUrl: string
  label?: string
  className?: string
}) {
  return (
    <div className={className ?? ''}>
      <Link
        href={linkUrl}
        className="inline-flex h-12 sm:h-10 w-full sm:w-auto min-w-[9rem] items-center justify-center rounded-md bg-emerald-600 px-4 text-sm font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
      >
        {label}
      </Link>
    </div>
  )
}