'use client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Icon } from '@iconify/react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Card } from '@/components/ui/card';
import { CircularProgress } from '@/components/ui/progress';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-toastify/dist/ReactToastify.css';
import { usePartnersHook } from '../hooks/usePartnersHook';
import Link from 'next/link';

export default function ChooseUsTable() {
  const { data, deleteData, loading, deletingId } = usePartnersHook();
  const t = useTranslations();
  const columns = [
    {
      key: 'Image',
      label: t('Partners.table.image'),
    },
    {
      key: 'name',
      label: t('Partners.table.name'),
    },
    {
      key: 'offer',
      label: t('Partners.table.offer'),
    },
    {
      key: 'link',
      label: t('Partners.table.link'),
    },

    {
      key: 'action',
      label: t('Partners.table.action'),
    },
  ];

  const router = useRouter();
  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column.key}>{column.label}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={columns.length} className='text-center'>
                <div className='flex justify-center items-center h-[277px]'>
                  <CircularProgress
                    value='50'
                    color='primary'
                    loading
                    size='xs'
                    className='w-8 h-8'
                  />
                </div>
              </TableCell>
            </TableRow>
          ) : (
            data?.map((item) => (
              <TableRow key={item.id}>
                <TableCell className='font-medium  text-card-foreground/80'>
                  <Avatar>
                    <AvatarImage src={item.image} />
                    <AvatarFallback>
                      <img src='/images/placeholder.jpg' alt='' />
                    </AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell className='font-medium  text-card-foreground/80'>
                  {item.name}
                </TableCell>
                <TableCell className='font-medium  text-card-foreground/80'>
                  {item.offer}
                </TableCell>
                <TableCell className='font-medium  text-card-foreground/80'>
                  <Link
                    className='bg-[#18ad8f] text-white px-4 py-2 rounded-md hover:bg-[#18ad8f]/90 font-semibold'
                    href={item.link}
                    target='_blank'
                  >
                    {t('Partners.table.ActionCenter.showPartner')}
                  </Link>
                </TableCell>

                <TableCell className='ltr:pr-5 rtl:pl-5'>
                  {deletingId === item.id ? (
                    <div>
                      <CircularProgress
                        value='50'
                        color='primary'
                        loading
                        size='xs'
                        className='w-8 h-8'
                      />
                    </div>
                  ) : (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          size='icon'
                          color='secondary'
                          className=' h-7 rounded-full bg-transparent w-7 data-[state=open]:bg-primary data-[state=open]:text-primary-foreground  '
                        >
                          <Icon
                            icon='heroicons:ellipsis-horizontal'
                            className=' h-6 w-6 '
                          />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align='end' avoidCollisions>
                        <DropdownMenuLabel>
                          {t('Partners.table.ActionCenter.title')}
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() =>
                            router.push(`edit-partners/${item.id}`)
                          }
                        >
                          <Icon
                            icon='heroicons:pencil'
                            className=' h-4 w-4 mx-2 '
                          />
                          {t('Partners.table.ActionCenter.edit')}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => deleteData(item.id)}>
                          <Icon
                            icon='heroicons:trash'
                            className=' h-4 w-4 mx-2 '
                          />
                          {t('Partners.table.ActionCenter.delete')}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      <ToastContainer />
    </Card>
  );
}
