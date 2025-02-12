'use client'

import * as React from 'react'

import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'

import { ScrollArea } from './scroll-area'
import { Icons } from '../icons'

interface SearchPopoverProps<T extends string> {
  items: { value: string; label: string }[]
  selectedValue: T
  onSelectedValueChange: (value: T) => void
  searchValue: string
  onSearchValueChange: (value: string) => void
  placeholder?: string
  emptyMessage?: string
}

export function SearchPopover<T extends string>({
  items,
  selectedValue,
  onSelectedValueChange,
  searchValue,
  onSearchValueChange,
  placeholder = 'Buscar item...',
  emptyMessage = 'Nenhum item encontrado.',
}: SearchPopoverProps<T>) {
  const [open, setOpen] = React.useState(false)

  const labels = React.useMemo(
    () =>
      items.reduce(
        (acc, item) => {
          acc[item.value] = item.label
          return acc
        },
        {} as Record<string, string>,
      ),

    [items],
  )

  const reset = () => {
    onSelectedValueChange('' as T)
    onSearchValueChange('')
  }

  const onSelectItem = (inputValue: string) => {
    if (inputValue === selectedValue) {
      reset()
    } else {
      onSelectedValueChange(inputValue as T)
      onSearchValueChange(labels[inputValue] ?? '')
    }

    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <Command shouldFilter={false}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-start shadow-none whitespace-nowrap truncate"
            value={searchValue}
          >
            {selectedValue
              ? items.find((item) => item.value === selectedValue)?.label
              : 'Selecione um item...'}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <CommandInput placeholder={placeholder} />
          <CommandList>
            {items.length > 0 ? (
              <CommandGroup>
                <ScrollArea className="h-[200px]">
                  {items.map((item) => (
                    <CommandItem
                      key={item.value}
                      value={item.value}
                      onSelect={() => onSelectItem(item.value)}
                    >
                      <Icons.check
                        className={cn(
                          'mr-2 size-4',
                          selectedValue === item.value
                            ? 'opacity-100'
                            : 'opacity-0',
                        )}
                      />
                      {item.label}
                    </CommandItem>
                  ))}
                </ScrollArea>
              </CommandGroup>
            ) : (
              <CommandEmpty>{emptyMessage}</CommandEmpty>
            )}
          </CommandList>
        </PopoverContent>
      </Command>
    </Popover>
  )
}
