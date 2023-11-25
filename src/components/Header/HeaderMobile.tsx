import * as Dialog from '@radix-ui/react-dialog';
import { ChartLineUp, TextAlignJustify, X } from 'phosphor-react';
import { HeaderLinkMobile } from './HeaderLinksMobile';

export function HeaderMobile(){
  return(
    <div className='flex lg:hidden'>
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <TextAlignJustify className='w-12 h-12' color='#ffff' />
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Content className="w-full h-full background-header top-0 fixed z-[100] focus-visible:outline-0 transition-all">
              <div className='w-full justify-between flex items-center gap-8 top-4 h-[150px] p-4 sm:p-8'>
                <div className="w-full flex items-center gap-2 lg:pb-8">
                  <ChartLineUp color="#8381D9" size={34} />
                  <strong className="text-center font-bold text-3xl custom-gradient-text">Finances</strong>
                </div>
                <Dialog.Close asChild>
                    <X className="w-12 h-12 right-4 cursor-pointer" color='#ffff' aria-label="Close"/>
                </Dialog.Close>
              </div>
            <HeaderLinkMobile />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  )
}