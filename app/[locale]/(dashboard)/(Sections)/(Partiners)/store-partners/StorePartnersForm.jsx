'use client';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { CircularProgress } from '@/components/ui/progress';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { usePartnersHook } from '../hooks/usePartnersHook';

export default function StorePartnersForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    watch,
  } = useForm();
  const t = useTranslations();
  const { id } = useParams();

  const { loading, storeData, getCurrentData } = usePartnersHook();

  const [imagePreview, setImagePreview] = useState(null);
  const [stickerPreview, setStickerPreview] = useState(null);

  const img = watch('image');

  // Handling Image Preview
  useEffect(() => {
    if (img && img.length > 0) {
      const file = img[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        setImagePreview(reader.result);
      };

      if (file) {
        reader.readAsDataURL(file);
      }
    }
  }, [img]);
  //////////////////////////////////////////
  //////////////////////////////////////////
  // sticker
  const sticker = watch('sticker');
  // Handling Image Preview
  useEffect(() => {
    if (sticker && sticker.length > 0) {
      const file = sticker[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        setStickerPreview(reader.result);
      };

      if (file) {
        reader.readAsDataURL(file);
      }
    }
  }, [sticker]);
  // Getting Current Choose Us Data
  useEffect(() => {
    getCurrentData(id);
  }, []);

  const onSubmit = (values) => {
    storeData(values);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='grid grid-cols- gap-6'>
        {/* Titles */}
        <div className='col-span-2  flex flex-col gap-2'>
          <Label
            htmlFor='name'
            className={`${
              errors['name']?.type === 'required' && 'text-red-600'
            }`}
          >
            {t('Partners.form.name')}{' '}
            {errors['name']?.type === 'required' && '*'}
          </Label>
          <Input
            type='text'
            placeholder={t('Partners.form.placeholders.name')}
            id='name'
            {...register('name', { required: true, minLength: 3 })}
          />
          {errors['name']?.type === 'minLength' && (
            <Label htmlFor='name' className='text-red-600 mt-2'>
              {t('Partners.form.formErrors.name')}
            </Label>
          )}
        </div>

        {/* offer */}
        <div className='col-span-2  flex flex-col gap-2'>
          <Label
            htmlFor='offer'
            className={`${
              errors['offer']?.type === 'required' && 'text-red-600'
            }`}
          >
            {t('Partners.form.offer')}{' '}
            {errors['offer']?.type === 'required' && '*'}
          </Label>
          <Textarea
            placeholder={t('Partners.form.placeholders.offer')}
            id='offer'
            rows='3'
            {...register('offer', { required: true, minLength: 3 })}
          />
          {errors['offer']?.type === 'minLength' && (
            <Label htmlFor='offer' className='text-red-600 mt-2'>
              {t('Partners.form.formErrors.offer')}
            </Label>
          )}
        </div>
        <div className='col-span-2  flex flex-col gap-2'>
          <Label
            htmlFor='link'
            className={`${
              errors['link']?.type === 'required' && 'text-red-600'
            }`}
          >
            {t('Partners.form.link')}{' '}
            {errors['link']?.type === 'required' && '*'}
          </Label>

          <Textarea
            placeholder={t('Partners.form.placeholders.link')}
            id='link'
            rows='3'
            {...register('link', { required: true, minLength: 3 })}
          />
          {errors['link']?.type === 'minLength' && (
            <Label htmlFor='link' className='text-red-600 mt-2'>
              {t('Partners.form.formErrors.link')}
            </Label>
          )}
        </div>

        {/* Main sticker */}
        <div className='col-span-2  flex flex-col gap-2'>
          <Label>{t('Partners.form.sticker')} </Label>
          <Input type='file' variant='flat' {...register('sticker')} />
        </div>
        {stickerPreview && (
          <div className='col-span-2  flex flex-col gap-2'>
            <img
              src={stickerPreview}
              width={100}
              height={100}
              className='rounded-md'
              alt='current_image'
            />
          </div>
        )}
        {/* Main Image */}
        <div className='col-span-2  flex flex-col gap-2'>
          <Label>{t('Partners.form.image')} </Label>
          <Input type='file' variant='flat' {...register('image')} />
        </div>
        {imagePreview && (
          <div className='col-span-2  flex flex-col gap-2'>
            <img
              src={imagePreview}
              width={100}
              height={100}
              className='rounded-md'
              alt='current_image'
            />
          </div>
        )}
        {/* Submit */}
        <div className='col-span-2'>
          <Button type='submit' className='min-w-[115px]'>
            {loading ? (
              <div>
                <CircularProgress
                  value='50'
                  color='dark'
                  loading
                  size='xs'
                  className='w-8 h-8'
                />
              </div>
            ) : (
              t('Partners.StorePartners')
            )}
          </Button>
        </div>
      </div>
      <ToastContainer />
    </form>
  );
}
