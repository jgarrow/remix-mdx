import { Link as RemixLink } from '@remix-run/react'
import type { LinkProps } from '@remix-run/react'
import { twMerge } from 'tailwind-merge'

export function Link({
  className,
  shouldAnimate = false,
  ...rest
}: LinkProps & { shouldAnimate?: boolean }) {
  const brushAnimation =
    'before:scale-x-0 hover:before:scale-x-100 before:origin-bottom-right before:transition before:ease-out before:duration-200 hover:before:origin-bottom-left'

  const brushStrokeClass =
    'w-fit relative px-8 pt-5 pb-3 clip-path-url-[#brush-stroke] before:h-full before:w-full before:content-[""] before:absolute before:top-0 before:left-0 before:z-[-1] before:dark:bg-sky-100 before:bg-slate-700'

  const colors = shouldAnimate
    ? 'text-gray-800 no-underline motion-safe:hover:text-gray-100 motion-reduce:underline dark:text-gray-100 motion-safe:hover:dark:text-gray-800'
    : 'hover:text-gray-100 dark:text-gray-800'

  return (
    <RemixLink
      className={twMerge(
        colors,
        brushStrokeClass,
        shouldAnimate ? brushAnimation : '',
        className,
      )}
      {...rest}
    />
  )
}
