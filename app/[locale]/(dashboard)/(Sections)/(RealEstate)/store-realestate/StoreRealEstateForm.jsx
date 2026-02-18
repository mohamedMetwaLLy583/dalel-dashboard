'use client';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Controller, useForm } from 'react-hook-form';
import { CircularProgress } from '@/components/ui/progress';
import { useTranslations } from 'next-intl';
import { use, useEffect, useState } from 'react';
import { useRealEstateHook } from '../hooks/useRealEstateHook';
import { Checkbox } from '@/components/ui/checkbox';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Select from 'react-select';
import { usePartnersHook } from '../../(Partiners)/hooks/usePartnersHook';

export default function StoreRealEstateForm({ locale }) {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    control,
  } = useForm();
  const t = useTranslations();
  const { storeData, loading, selectedData } = useRealEstateHook();
  const { data, getData } = usePartnersHook();
  const partnersOptions = data?.map((partner) => ({
    value: partner.id,
    label: partner.name,
  }));
  useEffect(() => {
    getData(locale);
  }, [locale]);
  // State to store image preview
  const [imagePreview, setImagePreview] = useState(null);
  const [galleryPreview, setGalleryPreview] = useState([]);
  const [inHome, setInHome] = useState(0);
  const [isAvailable, setIsAvailable] = useState(0);
  const [type, setType] = useState();
  const img = watch('main_image');
  const gallery = watch('gallery');

  const options = [
    { value: 'sale', label: t('Property.options.sale') },
    { value: 'rent', label: t('Property.options.rent') },
  ];

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

  useEffect(() => {
    if (gallery && gallery.length > 0) {
      const galleryArray = Array.from(gallery);

      galleryArray.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setGalleryPreview((prev) => [...prev, reader.result]);
        };

        if (file) {
          reader.readAsDataURL(file);
        }
      });
    }
  }, [gallery]);

  const onSubmit = (values) => {
    storeData({
      ...values,
      in_home: inHome,
      is_available: isAvailable,
      gallery: [...values.gallery],
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='grid grid-cols- gap-6'>
        {/* Titles */}
        <div className='col-span-2 flex flex-col gap-2'>
          <Label
            htmlFor='title_en'
            className={`${
              errors['title_en']?.type === 'minLength' && 'text-red-600'
            }`}
          >
            {t('Property.StoreProperty.title_en')}
          </Label>
          <Input
            type='text'
            placeholder={t('Property.StoreProperty.placeholders.title_en')}
            id='title_en'
            {...register('title_en', { minLength: 3 })}
          />
          {errors['title_en']?.type === 'minLength' && (
            <Label htmlFor='title_en' className='text-red-600 mt-2'>
              {t('Property.StoreProperty.formErrors.titleMinL')}
            </Label>
          )}
        </div>
        <div className='col-span-2  flex flex-col gap-2'>
          <Label
            htmlFor='title_ar'
            className={`${
              errors['title_ar']?.type === 'required' && 'text-red-600'
            }`}
          >
            {t('Property.StoreProperty.title_ar')}{' '}
            {errors['title_ar']?.type === 'required' && '*'}
          </Label>
          <Input
            type='text'
            placeholder={t('Property.StoreProperty.placeholders.title_ar')}
            id='title_ar'
            {...register('title_ar', { required: true, minLength: 3 })}
          />
          {errors['title_ar']?.type === 'minLength' && (
            <Label htmlFor='title_ar' className='text-red-600 mt-2'>
              {t('Property.StoreProperty.formErrors.titleMinL')}
            </Label>
          )}
        </div>
        {/* Descriptions */}
        <div className='col-span-2 flex flex-col gap-2'>
          <Label
            htmlFor='description_en'
            className={`${
              errors['description_en']?.type === 'minLength' && 'text-red-600'
            }`}
          >
            {t('Property.StoreProperty.description_en')}
          </Label>
          <Textarea
            placeholder={t(
              'Property.StoreProperty.placeholders.description_en'
            )}
            id='description_en'
            rows='3'
            {...register('description_en', { minLength: 3 })}
          />
          {errors['description_en']?.type === 'minLength' && (
            <Label htmlFor='description_en' className='text-red-600 mt-2'>
              {t('Property.StoreProperty.formErrors.descMinL')}
            </Label>
          )}
        </div>
        <div className='col-span-2  flex flex-col gap-2'>
          <Label
            htmlFor='description_ar'
            className={`${
              errors['description_ar']?.type === 'required' && 'text-red-600'
            }`}
          >
            {t('Property.StoreProperty.description_ar')}{' '}
            {errors['description_ar']?.type === 'required' && '*'}
          </Label>

          <Textarea
            placeholder={t(
              'Property.StoreProperty.placeholders.description_ar'
            )}
            id='description_ar'
            rows='3'
            {...register('description_ar', { required: true, minLength: 3 })}
          />
          {errors['description_ar']?.type === 'minLength' && (
            <Label htmlFor='description_ar' className='text-red-600 mt-2'>
              {t('Property.StoreProperty.formErrors.descMinL')}
            </Label>
          )}
        </div>
        {/* Property price */}
        <div className='col-span-2  flex flex-col gap-2'>
          <Label
            htmlFor='price'
            className={`${
              errors['price']?.type === 'required' && 'text-red-600'
            }`}
          >
            {t('Property.StoreProperty.price')}
            {errors['price']?.type === 'required' && '*'}
          </Label>
          <Input
            type='text'
            placeholder={t('Property.StoreProperty.placeholders.price')}
            id='price'
            {...register('price', { required: true })}
          />
          {errors['price']?.type === 'required' && (
            <Label htmlFor='price' className='text-red-600 mt-2'>
              {t('Property.StoreProperty.formErrors.required')}
            </Label>
          )}

          <Label htmlFor='price'></Label>
        </div>
        {/* Property area */}
        <div className='col-span-2 flex flex-col gap-2'>
          <Label
            htmlFor='area'
            className={`${
              errors['area']?.type === 'required' && 'text-red-600'
            }`}
          >
            {t('Property.StoreProperty.area')}{' '}
            {errors['area']?.type === 'required' && '*'}
          </Label>
          <Input
            type='text'
            placeholder={t('Property.StoreProperty.placeholders.area')}
            id='area'
            {...register('area', { required: true })}
          />
          {errors['area']?.type === 'required' && (
            <Label htmlFor='area' className='text-red-600 mt-2'>
              {t('Property.StoreProperty.formErrors.required')}
            </Label>
          )}
        </div>

        {/* Property rooms */}
        <div className='col-span-2 flex flex-col gap-2'>
          <Label
            htmlFor='rooms'
            className={`${
              errors['rooms']?.type === 'required' && 'text-red-600'
            }`}
          >
            {t('Property.StoreProperty.rooms')}{' '}
            {errors['rooms']?.type === 'required' && '*'}
          </Label>
          <Input
            type='text'
            placeholder={t('Property.StoreProperty.placeholders.rooms')}
            id='rooms'
            {...register('rooms', { required: true })}
          />
          {errors['rooms']?.type === 'required' && (
            <Label htmlFor='rooms' className='text-red-600 mt-2'>
              {t('Property.StoreProperty.formErrors.required')}
            </Label>
          )}
        </div>

        {/* Property bathrooms */}
        <div className='col-span-2 flex flex-col gap-2'>
          <Label
            htmlFor='bathrooms'
            className={`${
              errors['bathrooms']?.type === 'required' && 'text-red-600'
            }`}
          >
            {t('Property.StoreProperty.bathrooms')}{' '}
            {errors['bathrooms']?.type === 'required' && '*'}
          </Label>
          <Input
            type='text'
            placeholder={t('Property.StoreProperty.placeholders.bathrooms')}
            id='bathrooms'
            {...register('bathrooms', { required: true })}
          />
          {errors['bathrooms']?.type === 'required' && (
            <Label htmlFor='bathrooms' className='text-red-600 mt-2'>
              {t('Property.StoreProperty.formErrors.required')}
            </Label>
          )}
        </div>

        {/* Property floor_en */}
        <div className='col-span-2 flex flex-col gap-2'>
          <Label htmlFor='floor_en'>
            {t('Property.StoreProperty.floor_en')}
          </Label>
          <Input
            type='text'
            placeholder={t('Property.StoreProperty.placeholders.floor_en')}
            id='floor_en'
            {...register('floor_en')}
          />
        </div>

        {/* Property floor_ar */}
        <div className='col-span-2 flex flex-col gap-2'>
          <Label
            htmlFor='floor_ar'
            className={`${
              errors['floor_ar']?.type === 'required' && 'text-red-600'
            }`}
          >
            {t('Property.StoreProperty.floor_ar')}{' '}
            {errors['floor_ar']?.type === 'required' && '*'}
          </Label>
          <Input
            type='text'
            placeholder={t('Property.StoreProperty.placeholders.floor_ar')}
            id='floor_ar'
            {...register('floor_ar', { required: true })}
          />
          {errors['floor_ar']?.type === 'required' && (
            <Label htmlFor='floor_ar' className='text-red-600 mt-2'>
              {t('Property.StoreProperty.formErrors.required')}
            </Label>
          )}
        </div>

        {/* Property address_ar */}
        <div className='col-span-2 flex flex-col gap-2'>
          <Label
            htmlFor='address_ar'
            className={`${
              errors['address_ar']?.type === 'required' && 'text-red-600'
            }`}
          >
            {t('Property.StoreProperty.address_ar')}{' '}
            {errors['address_ar']?.type === 'required' && '*'}
          </Label>
          <Input
            type='text'
            placeholder={t('Property.StoreProperty.placeholders.address_ar')}
            id='address_ar'
            {...register('address_ar', { required: true })}
          />
          {errors['address_ar']?.type === 'required' && (
            <Label htmlFor='address_ar' className='text-red-600 mt-2'>
              {t('Property.StoreProperty.formErrors.required')}
            </Label>
          )}
        </div>

        {/* Property address_en */}
        <div className='col-span-2 flex flex-col gap-2'>
          <Label htmlFor='address_en'>
            {t('Property.StoreProperty.address_en')}
          </Label>
          <Input
            type='text'
            placeholder={t('Property.StoreProperty.placeholders.address_en')}
            id='address_en'
            {...register('address_en')}
          />
        </div>

        {/* Property furnishing_en */}
        <div className='col-span-2 flex flex-col gap-2'>
          <Label htmlFor='furnishing_en'>
            {t('Property.StoreProperty.furnishing_en')}
          </Label>
          <Input
            type='text'
            placeholder={t('Property.StoreProperty.placeholders.furnishing_en')}
            id='furnishing_en'
            {...register('furnishing_en')}
          />
        </div>

        {/* Property furnishing_ar */}
        <div className='col-span-2 flex flex-col gap-2'>
          <Label
            htmlFor='furnishing_ar'
            className={`${
              errors['furnishing_ar']?.type === 'required' && 'text-red-600'
            }`}
          >
            {t('Property.StoreProperty.furnishing_ar')}{' '}
            {errors['furnishing_ar']?.type === 'required' && '*'}
          </Label>
          <Input
            type='text'
            placeholder={t('Property.StoreProperty.placeholders.furnishing_ar')}
            id='furnishing_ar'
            {...register('furnishing_ar', { required: true })}
          />
          {errors['furnishing_ar']?.type === 'required' && (
            <Label htmlFor='furnishing_ar' className='text-red-600 mt-2'>
              {t('Property.StoreProperty.formErrors.required')}
            </Label>
          )}
        </div>

        {/* Property finishing_en */}
        <div className='col-span-2 flex flex-col gap-2'>
          <Label htmlFor='finishing_en'>
            {t('Property.StoreProperty.finishing_en')}
          </Label>
          <Input
            type='text'
            placeholder={t('Property.StoreProperty.placeholders.finishing_en')}
            id='finishing_en'
            {...register('finishing_en')}
          />
        </div>

        {/* Property finishing_ar */}
        <div className='col-span-2 flex flex-col gap-2'>
          <Label
            htmlFor='finishing_ar'
            className={`${
              errors['finishing_ar']?.type === 'required' && 'text-red-600'
            }`}
          >
            {t('Property.StoreProperty.finishing_ar')}{' '}
            {errors['finishing_ar']?.type === 'required' && '*'}
          </Label>
          <Input
            type='text'
            placeholder={t('Property.StoreProperty.placeholders.finishing_ar')}
            id='finishing_ar'
            {...register('finishing_ar', { required: true })}
          />
          {errors['finishing_ar']?.type === 'required' && (
            <Label htmlFor='finishing_ar' className='text-red-600 mt-2'>
              {t('Property.StoreProperty.formErrors.required')}
            </Label>
          )}
        </div>

        {/* detailed description */}
        <div className='col-span-2 flex flex-col gap-2'>
          <Label htmlFor='detailed_description_en'>
            {t('Property.StoreProperty.detailed_description_en')}
          </Label>
          <Textarea
            placeholder={t(
              'Property.StoreProperty.placeholders.detailed_description_en'
            )}
            id='detailed_description_en'
            rows='3'
            {...register('detailed_description_en', { minLength: 3 })}
          />
          {errors['detailed_description_en']?.type === 'minLength' && (
            <Label
              htmlFor='detailed_description_en'
              className='text-red-600 mt-2'
            >
              {t('Property.StoreProperty.formErrors.descMinL')}
            </Label>
          )}
        </div>

        <div className='col-span-2 flex flex-col gap-2'>
          <Label
            htmlFor='detailed_description_ar'
            className={`${
              errors['detailed_description_ar']?.type === 'required' &&
              'text-red-600'
            }`}
          >
            {t('Property.StoreProperty.detailed_description_ar')}{' '}
            {errors['detailed_description_ar']?.type === 'required' && '*'}
          </Label>
          <Textarea
            placeholder={t(
              'Property.StoreProperty.placeholders.detailed_description_ar'
            )}
            id='detailed_description_ar'
            rows='3'
            {...register('detailed_description_ar', {
              required: true,
              minLength: 3,
            })}
          />
          {errors['detailed_description_ar']?.type === 'required' && (
            <Label
              htmlFor='detailed_description_ar'
              className='text-red-600 mt-2'
            >
              {t('Property.StoreProperty.formErrors.required')}
            </Label>
          )}
          {errors['detailed_description_ar']?.type === 'minLength' && (
            <Label
              htmlFor='detailed_description_ar'
              className='text-red-600 mt-2'
            >
              {t('Property.StoreProperty.formErrors.descMinL')}
            </Label>
          )}
        </div>

        {/* in home Status */}
        <div className='col-span-2 flex flex-col gap-2'>
          <Checkbox
            defaultChecked
            id='featured'
            className='mx-2'
            onCheckedChange={() => setInHome(inHome === 1 ? 0 : 1)}
            checked={inHome}
          >
            {t('Property.StoreProperty.isinhome')}{' '}
          </Checkbox>
        </div>
        {/* is available Status */}
        <div className='col-span-2 flex flex-col gap-2'>
          <Checkbox
            defaultChecked
            id='featured'
            className='mx-2'
            onCheckedChange={() => setIsAvailable(isAvailable === 1 ? 0 : 1)}
            checked={isAvailable}
          >
            {t('Property.StoreProperty.isavailable')}{' '}
          </Checkbox>
        </div>

        {/* Select Inputs */}
        <div className='col-span-2 flex flex-col gap-2'>
          <Label
            htmlFor='type_id'
            className={`${
              errors['type_id']?.type === 'required' && 'text-red-600'
            }`}
          >
            {t('Property.EditProperty.selectKey')}{' '}
            {errors['type_id']?.type === 'required' && '*'}
          </Label>
          <Controller
            rules={{ required: true }}
            control={control}
            name='type_id'
            render={({ field: { onChange, value, ref } }) => (
              <Select
                inputRef={ref}
                isClearable={false}
                isSearchable={false}
                name='type_id'
                options={selectedData}
                className='react-select'
                classNamePrefix='select'
                onChange={(val) => onChange(val)}
                value={value}
              />
            )}
          />
          {errors['type_id']?.type === 'required' && (
            <Label htmlFor='type_id' className='text-red-600 mt-2'>
              {t('Property.StoreProperty.formErrors.productIdRequired')}
            </Label>
          )}
        </div>
        {/* Select partners */}
        <div className='col-span-2 flex flex-col gap-2'>
          <Label
            htmlFor='partners'
            className={`${
              errors['partners']?.type === 'required' && 'text-red-600'
            }`}
          >
            {t('Property.StoreProperty.choose_partners')}{' '}
            {errors['partners']?.type === 'required' && '*'}
          </Label>
          <Controller
            rules={{ required: false }}
            control={control}
            name='partners'
            render={({ field: { onChange, value, ref } }) => (
              <Select
                inputRef={ref}
                isClearable={false}
                isSearchable={false}
                isMulti
                name='partners'
                options={partnersOptions}
                className='react-select'
                classNamePrefix='select'
                onChange={(val) => onChange(val)}
                value={value}
              />
            )}
          />
          {errors['partners']?.type === 'required' && (
            <Label htmlFor='partners' className='text-red-600 mt-2'>
              {t('Property.StoreProperty.formErrors.productIdRequired')}
            </Label>
          )}
        </div>

        {/* offer type */}
        <div className='col-span-2 flex flex-col gap-2'>
          <Label
            htmlFor='offer_type'
            className={`${
              errors['offer_type']?.type === 'required' && 'text-red-600'
            }`}
          >
            {t('Property.StoreProperty.selectKey')}{' '}
            {errors['offer_type']?.type === 'required' && '*'}
          </Label>
          <Controller
            rules={{ required: true }}
            control={control}
            name='offer_type'
            render={({ field: { onChange, value, ref } }) => (
              <Select
                inputRef={ref}
                isClearable={false}
                isSearchable={false}
                name='offer_type'
                options={options}
                className='react-select'
                classNamePrefix='select'
                onChange={(selectedOption) => {
                  onChange(selectedOption ? selectedOption.value : null);
                  setType(selectedOption ? selectedOption.value : null);
                }}
                value={options.find((option) => option.value === value) || null}
              />
            )}
          />
          {errors['offer_type']?.type === 'required' && (
            <Label htmlFor='offer_type' className='text-red-600 mt-2'>
              {t('Property.StoreProperty.formErrors.offerTypeRequired')}
            </Label>
          )}
        </div>

        {/* Property link */}
        <div className='col-span-2 flex flex-col gap-2'>
          <Label htmlFor='link'>{t('Property.StoreProperty.link')}</Label>
          <Input
            type='text'
            placeholder={t('Property.StoreProperty.placeholders.link')}
            id='link'
            {...register('link')}
          />
        </div>

        {/* Owner Name */}
        <div className='col-span-2 flex flex-col gap-2'>
          <Label htmlFor='owner_name'>
            {t('Property.StoreProperty.owner_name')}
          </Label>
          <Input
            type='text'
            placeholder={t('Property.StoreProperty.placeholders.owner_name')}
            id='owner_name'
            {...register('owner_name')}
          />
        </div>

        {/* Owner Phone */}
        <div className='col-span-2 flex flex-col gap-2'>
          <Label htmlFor='owner_phone'>
            {t('Property.StoreProperty.owner_phone')}
          </Label>
          <Input
            type='text'
            placeholder={t('Property.StoreProperty.placeholders.owner_phone')}
            id='owner_phone'
            {...register('owner_phone')}
          />
        </div>

        {/* Owner Description */}
        <div className='col-span-2 flex flex-col gap-2'>
          <Label htmlFor='owner_description'>
            {t('Property.StoreProperty.owner_description')}
          </Label>
          <Textarea
            placeholder={t(
              'Property.StoreProperty.placeholders.owner_description'
            )}
            id='owner_description'
            rows='3'
            {...register('owner_description')}
          />
        </div>

        {/* Owner Address */}
        <div className='col-span-2 flex flex-col gap-2'>
          <Label htmlFor='owner_address'>
            {t('Property.StoreProperty.owner_address')}
          </Label>
          <Input
            type='text'
            placeholder={t('Property.StoreProperty.placeholders.owner_address')}
            id='owner_address'
            {...register('owner_address')}
          />
        </div>

        {/* Main Image */}
        <div className='col-span-2 flex flex-col gap-2'>
          <Label
            htmlFor='main_image'
            className={`${
              errors['main_image']?.type === 'required' && 'text-red-600'
            }`}
          >
            {t('Property.StoreProperty.main_image')}{' '}
            {errors['main_image']?.type === 'required' && '*'}
          </Label>
          <Input
            type='file'
            variant='flat'
            id='main_image'
            {...register('main_image', { required: true })}
          />
          {errors['main_image']?.type === 'required' && (
            <Label htmlFor='main_image' className='text-red-600 mt-2'>
              {t('Property.StoreProperty.formErrors.required')}
            </Label>
          )}
        </div>
        {imagePreview && (
          <div className='col-span-2 flex flex-col gap-2'>
            <img
              src={imagePreview}
              width={100}
              height={100}
              className='rounded-md'
              alt='current_image'
            />
          </div>
        )}

        {/* Gallery */}
        <div className='col-span-2  flex flex-col gap-2'>
          <Label>{t('Property.StoreProperty.gallery')} </Label>
          <Input multiple type='file' variant='flat' {...register('gallery')} />
        </div>
        {galleryPreview &&
          galleryPreview.map((img, index) => {
            return (
              <div key={index} className='flex gap-2'>
                <img
                  src={img}
                  width={100}
                  height={100}
                  className='rounded-md'
                  alt='current_image'
                />
              </div>
            );
          })}
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
              t('Property.StoreProperty.title')
            )}
          </Button>
        </div>
      </div>
      <ToastContainer />
    </form>
  );
}
