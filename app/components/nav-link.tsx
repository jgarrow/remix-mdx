import type { NavLinkProps } from '@remix-run/react'
import { NavLink as RemixNavLink } from '@remix-run/react'
import { twMerge } from 'tailwind-merge'

export default function NavLink({ className, ...rest }: NavLinkProps) {
  const brushAnimation =
    'before:scale-x-0 hover:before:scale-x-100 before:origin-bottom-right before:transition before:ease-out before:duration-200 hover:before:origin-bottom-left'

  const brushStrokeClass =
    'w-fit relative px-8 py-2 clip-path-url-[#brush-stroke] before:h-full before:w-full before:content-[""] before:absolute before:top-0 before:left-0 before:z-[-1] before:dark:bg-sky-100 before:bg-slate-700'

  const colors =
    'text-gray-800 no-underline motion-safe:hover:text-gray-100 motion-reduce:underline dark:text-gray-100 motion-safe:hover:dark:text-gray-800'

  return (
    <RemixNavLink
      className={({ isActive }) =>
        twMerge(
          'font-accent text-xl',
          isActive ? '' : colors, // this needs to be first
          brushStrokeClass,
          isActive
            ? 'hover:text-gray-100 dark:text-gray-800'
            : brushAnimation,
          className as string, // hacky hack
        )
      }
      {...rest}
    />
  )
}
