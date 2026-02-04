'use client';
import React from 'react';
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
import { useReservationsHook } from '../hooks/useReservationsHook';
import { useParams } from 'next/navigation';

export default function ReservationsTable() {
  const t = useTranslations();
  const router = useRouter();

  // Use the hook here
  const {
    data,
    loading,
    deletingId,
    deleteData,
    markCompleted,
    cancelReservation,
  } = useReservationsHook();

  // Table columns
  const columns = [
    {
      key: 'Date',
      label: t('Reservations.table.Date'),
    },
    {
      key: 'Name',
      label: t('Reservations.table.name'),
    },

    {
      key: 'Phone',
      label: t('Reservations.table.phone'),
    },

    {
      key: 'Status',
      label: t('Reservations.table.status'),
    },
    {
      key: 'Time',
      label: t('Reservations.table.time'),
    },
    {
      key: 'action',
      label: t('Reservations.table.action'),
    },
  ];

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
                    value={50}
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
                {/* Date column (Name) */}
                <TableCell className='font-medium text-card-foreground/80'>
                  {item.data}
                </TableCell>

                {/* Title column (Name) */}
                <TableCell className='font-medium text-card-foreground/80'>
                  {item.name}
                </TableCell>

                {/* Phone column */}
                <TableCell className='font-medium text-card-foreground/80'>
                  {item.phone}
                </TableCell>

                {/* Status column */}
                <TableCell className='font-medium text-card-foreground/80'>
                  {t(`Status.${item.status}`)}
                </TableCell>

                <TableCell className='font-medium text-card-foreground/80'>
                  {item.time}
                </TableCell>

                {/* Action column */}
                <TableCell className='ltr:pr-5 rtl:pl-5'>
                  {deletingId === item.id ? (
                    <div>
                      <CircularProgress
                        value={50}
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
                          className='h-7 w-7 rounded-full bg-transparent data-[state=open]:bg-primary data-[state=open]:text-primary-foreground'
                        >
                          <Icon
                            icon='heroicons:ellipsis-horizontal'
                            className='h-6 w-6'
                          />
                        </Button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent align='end' avoidCollisions>
                        <DropdownMenuLabel>
                          {t('Reservations.table.ActionCenter.name')}
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />

                        {/* Show button */}
                        <DropdownMenuItem
                          onClick={() =>
                            router.push(`show-reservation-details/${item.id}`)
                          }
                        >
                          <Icon icon='heroicons:eye' className='h-4 w-4 mx-2' />
                          {t('Reservations.table.ActionCenter.show')}
                        </DropdownMenuItem>

                        {/* Mark as Completed button */}
                        <DropdownMenuItem
                          onClick={() => markCompleted(item.id)}
                        >
                          <Icon
                            icon='heroicons:check-circle'
                            className='h-4 w-4 mx-2'
                          />
                          {t('Reservations.table.ActionCenter.markascompleted')}
                        </DropdownMenuItem>

                        {/* Cancel button */}
                        <DropdownMenuItem
                          onClick={() => cancelReservation(item.id)}
                        >
                          <Icon
                            icon='heroicons:x-circle'
                            className='h-4 w-4 mx-2'
                          />
                          {t('Reservations.table.ActionCenter.cancel')}
                        </DropdownMenuItem>

                        {/* Delete button */}
                        <DropdownMenuItem onClick={() => deleteData(item.id)}>
                          <Icon
                            icon='heroicons:trash'
                            className='h-4 w-4 mx-2'
                          />
                          {t('Reservations.table.ActionCenter.delete')}
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
