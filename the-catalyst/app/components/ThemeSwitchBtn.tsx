'use client'
import React, { use } from 'react'
import { useTheme } from 'next-themes'
import { Switch } from '@headlessui/react'
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid'
import { useEffect, useState } from 'react'
import { useLocalStorage } from 'usehooks-ts'

const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(' ')
}


const ThemeSwitchBtn = () => {
  const [ mounted, setMounted ] = useState(false)
  const { theme, setTheme, resolvedTheme } = useTheme()

  useEffect(() => setMounted(true), [])

  
  const [enabled, setEnabled] = useLocalStorage('theme', false)

  const handleThemeChange = () => {
    setEnabled(!enabled)
    setTheme(enabled ? 'dark' : 'light')
  }

    if (!mounted) return null

  return (
    <Switch
      checked={enabled}
      onChange={handleThemeChange}
      className={classNames(
        enabled ? 'bg-gray-400' : 'bg-gray-600',
        'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out'
      )}
    >
      <span className='sr-only'>Use setting</span>
      <span
        className={classNames(
          enabled ? 'translate-x-5' : 'translate-x-0',
          'pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
        )}
      >
        <span
          className={classNames(
            enabled
              ? 'opacity-0 duration-100 ease-out'
              : 'opacity-100 duration-200 ease-in',
            'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity'
          )}
          aria-hidden='true'
        >
          <MoonIcon className='h-3 w-3 text-gray-400' />
        </span>
        <span
          className={classNames(
            enabled
              ? 'opacity-100 duration-200 ease-in'
              : 'opacity-0 duration-100 ease-out',
            'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity'
          )}
          aria-hidden='true'
        >
          <SunIcon className='h-3 w-3 text-yellow-600' />
        </span>
      </span>
    </Switch>


  )



  // return (
  //    <button
  //     onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
  //     aria-label="Toggle Dark Mode"
  //   >
  //     {resolvedTheme === 'dark' ? (
  //       <SunIcon className="h-6 w-6 text-yellow-500" />
  //     ) : (
  //       <MoonIcon className="h-6 w-6 text-gray-900" />
  //     )}
  //   </button>
  // )
  
}

export default ThemeSwitchBtn