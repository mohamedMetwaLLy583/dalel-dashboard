'use client';
import React, { useEffect } from 'react';
import { useReservationsHook } from '../../hooks/useReservationsHook';

import { useTranslations } from 'next-intl';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CircularProgress } from '@/components/ui/progress';
import { useParams } from 'next/navigation';

const ShowReservationDetails = ({ locale }) => {
  const { id } = useParams();

  const t = useTranslations();
  const { getCurrentData, currentData, loading } = useReservationsHook();

  useEffect(() => {
    getCurrentData(id, locale);
  }, [id]);

  // Show a loading spinner while data is fetched
  if (loading) {
    return (
      <div className='flex items-center justify-center h-64'>
        <CircularProgress value={50} color='primary' loading size='xs' />
      </div>
    );
  }

  // Handle if no data is found or not yet loaded
  if (!currentData) {
    return <div className='mt-6'>{t('Reservations.noData')}</div>;
  }

  // Define your tabs: one for details, one for images
  const tabs = [{ value: 'details', label: t('Reservations.tabs.details') }];

  const linkRef = `${process.env.NEXT_PUBLIC_WEBSITE_BASE_URL}/${locale}/${
    currentData?.offer_type === 'rent' ? 'for-rent' : 'for-sale'
  }/${currentData?.property_id}`;

  return (
    <div className='mx-auto px-4 sm:px-6 lg:px-8 mt-6 max-w-screen-2xl'>
      <div className='grid grid-cols-12 gap-6'>
        {/* Make content bigger and centered on larger screens */}
        <div className='col-span-12 lg:col-span-10 lg:col-start-2'>
          {/* Title / Name */}
          <h1 className='text-2xl font-semibold mb-4'>{currentData.name}</h1>

          {/* Tabs */}
          <Tabs defaultValue='details' className='p-0 px-1'>
            {/* Tabs List */}
            <TabsList
              className='
                bg-card flex-1 overflow-x-auto md:overflow-hidden
                w-full px-5 pt-6 pb-2.5 h-fit border-b border-default-200
                rounded-none justify-start gap-12 rounded-t-md
              '
            >
              {tabs.map((tab, index) => (
                <TabsTrigger
                  key={`tab-${index}`}
                  value={tab.value}
                  className='
                    capitalize px-0
                    data-[state=active]:shadow-none
                    data-[state=active]:bg-transparent
                    data-[state=active]:text-primary
                    transition duration-150
                    before:transition-all before:duration-150
                    relative before:absolute before:left-1/2 before:-bottom-[11px]
                    before:h-[2px] before:-translate-x-1/2 before:w-0
                    data-[state=active]:before:bg-primary
                    data-[state=active]:before:w-full
                  '
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {/* =========== DETAILS TAB =========== */}
            <TabsContent value='details' className='mt-0'>
              <div className='p-4'>
                <div className='grid grid-cols-1 gap-2'>
                  <div>
                    <strong>{t('Reservations.phone')}:</strong>{' '}
                    {currentData?.phone}
                  </div>

                  <div>
                    <strong>{t('Reservations.date')}:</strong>{' '}
                    {currentData?.data}
                  </div>
                  {currentData?.partner?.name && (
                    <div>
                      <strong>{t('Reservations.partner')}:</strong>{' '}
                      {currentData?.partner?.name}
                    </div>
                  )}

                  <div>
                    <strong>{t('Reservations.time')}:</strong>{' '}
                    {currentData?.time}
                  </div>

                  <div>
                    <strong>{t('Reservations.property')}:</strong>{' '}
                    {currentData?.property}
                  </div>

                  {currentData?.owner_name && (
                    <div>
                      <strong>{t('Reservations.owner_name')}:</strong>{' '}
                      {currentData.owner_name}
                    </div>
                  )}

                  {currentData?.owner_phone && (
                    <div>
                      <strong>{t('Reservations.owner_phone')}:</strong>{' '}
                      {currentData.owner_phone}
                    </div>
                  )}

                  {currentData?.owner_description && (
                    <div>
                      <strong>{t('Reservations.owner_description')}:</strong>{' '}
                      {currentData.owner_description}
                    </div>
                  )}

                  {currentData?.owner_address && (
                    <div>
                      <strong>{t('Reservations.owner_address')}:</strong>{' '}
                      {currentData.owner_address}
                    </div>
                  )}

                  <div>
                    <strong>{t('Inspections.status')}:</strong>{' '}
                    {t(`Status.${currentData.status}`)}
                  </div>
                  {/* Clickable Property Image */}
                  <div className='mb-6'>
                    <a href={linkRef} target='_blank' rel='noopener noreferrer'>
                      <img
                        src={currentData?.property_image}
                        alt={currentData?.property}
                        className='w-[200px] rounded-md shadow-md hover:shadow-lg transition-shadow duration-200'
                      />
                    </a>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ShowReservationDetails;
