'use client';
import React from 'react';
import { useTranslations } from 'next-intl';
import { CircularProgress } from '@/components/ui/progress';

import PartnersTable from './PartnersTable';
import { usePartnersHook } from '../hooks/usePartnersHook';

export default function ShowChooseUs() {
  const t = useTranslations();
  const { loading } = usePartnersHook();

  return (
    <section className='py-6'>
      <div className='text-2xl font-medium text-default-800 py-8'>
         {t('Partners.ShowPartners')}
      </div>
      <PartnersTable />
    </section>
  );
}
