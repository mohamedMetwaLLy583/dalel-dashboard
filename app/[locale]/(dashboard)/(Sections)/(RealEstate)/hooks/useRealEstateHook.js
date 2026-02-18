import { useTranslations } from 'next-intl';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useToken } from "@/provider/auth.provider";

export const useRealEstateHook = () => {
  const [data, setData] = useState(null);
  const [pagination, setPagintaion] = useState(null);
  const [currentData, setCurrentData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const token = useToken();
  const page = useSearchParams().get('page');
  const [selectedData, setSelectedData] = useState(null);

  const t = useTranslations();
  const locale = t('locale');
  const router = useRouter();

  //   Get Data
  async function getData(locale) {
    setLoading(true);
    try {
      const res = await fetch(
        `${(process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_BASE_URL)}/api/dashboard/property?page=${page}`,
        {
          next: { revalidate: 0 },
          headers: {
            'Accept-Language': locale,
            authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await res.json();

      setData(data.data);
      setPagintaion({
        last_page: data.meta.last_page,
      });
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }

  // Get select data
  async function getSelectedData(locale) {
    setLoading(true);
    try {
      const res = await fetch(
        `${(process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_BASE_URL)}/api/dashboard/type`,
        {
          next: { revalidate: 0 },
          headers: {
            Accept: 'application/json',
            authorization: `Bearer ${token}`,
            'Accept-Language': locale,
          },
        }
      );

      if (!res.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await res.json();
      const formatedData = data.data.map((item) => ({
        value: item.id,
        label: item.name,
      }));
      setSelectedData(formatedData);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }

  //   Get Current Data For Edit
  async function getCurrentData(id) {
    setLoading(true);
    try {
      const res = await fetch(
        `${(process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_BASE_URL)}/api/dashboard/property/${id}`,
        {
          next: { revalidate: 0 },
          headers: {
            authorization: `Bearer ${token}`,
            'Accept-Language': locale,
          },
        }
      );

      if (!res.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await res.json();

      setCurrentData(data.data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }

  //   Store Data
  const storeData = async (values) => {
    const formData = new FormData();
    formData.append('owner_name', values['owner_name'] ?? '');
    formData.append('owner_phone', values['owner_phone'] ?? '');
    formData.append('owner_description', values['owner_description'] ?? '');
    formData.append('owner_address', values['owner_address'] ?? '');
    formData.append('title_en', values['title_en'] ?? '');
    formData.append('title_ar', values['title_ar'] ?? '');
    formData.append('description_en', values['description_en'] ?? '');
    formData.append('description_ar', values['description_ar'] ?? '');
    formData.append(
      'detailed_description_en',
      values['detailed_description_en'] ?? ''
    );
    formData.append(
      'detailed_description_ar',
      values['detailed_description_ar'] ?? ''
    );
    formData.append('price', values['price'] ?? '');
    formData.append('area', values['area'] ?? '');
    formData.append('rooms', values['rooms'] ?? '');
    formData.append('bathrooms', values['bathrooms'] ?? '');

    formData.append('floor_en', values['floor_en'] ?? '');
    formData.append('floor_ar', values['floor_ar'] ?? '');

    formData.append('address_en', values['address_en'] ?? '');
    formData.append('address_ar', values['address_ar'] ?? '');

    formData.append('offer_type', values['offer_type'] ?? '');
    formData.append('type_id', values['type_id']?.value ?? '');

    formData.append('furnishing_en', values['furnishing_en'] ?? '');
    formData.append('furnishing_ar', values['furnishing_ar'] ?? '');

    formData.append('finishing_en', values['finishing_en'] ?? '');
    formData.append('finishing_ar', values['finishing_ar'] ?? '');

    formData.append('is_available', values['is_available'] ?? '');
    formData.append('in_home', values['in_home'] ?? '');

    formData.append('view_count', values['view_count'] ?? '');

    formData.append('link', values['link'] ?? '');

    if (values['latitude']) formData.append('latitude', values['latitude']);
    if (values['longitude']) formData.append('longitude', values['longitude']);

    formData.append('price', values['price'] ?? '');

    formData.append('main_image', values['main_image'][0] ?? '');

    values['gallery'].map((img) => {
      formData.append('gallery[]', img ?? '');
    });

    values['partners']?.forEach((partner, idx) => {
      formData.append(`partners[${idx}][id]`, partner?.value ?? '');
    });
    try {
      setLoading(true);
      const res = await fetch(
        `${(process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_BASE_URL)}/api/dashboard/property`,
        {
          body: formData,
          method: 'POST',
          headers: {
            Accept: 'application/json',
            authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();

      if (!res.ok) {
        // Show backend error message in toast
        toast.error(data.message || 'Error: Something went wrong!', {
          position: 'top-right',
          autoClose: 3000,
        });
        return;
      } else {
      }

      router.push(`show-realestate`);
      return data;
    } catch (error) {
      toast.error(error.message || t('Property.toast.error'), {
        position: 'top-right',
        autoClose: 3000,
      });
    } finally {
      getData(locale);
      setLoading(false);
    }
  };

  // Edit Data
  const EditData = async (id, values) => {
    const formData = new FormData();
    formData.append('owner_name', values['owner_name'] ?? '');
    formData.append('owner_phone', values['owner_phone'] ?? '');
    formData.append('owner_description', values['owner_description'] ?? '');
    formData.append('owner_address', values['owner_address'] ?? '');
    formData.append('link', values['link'] ?? '');
    formData.append('title_en', values['title_en'] ?? '');
    formData.append('title_ar', values['title_ar'] ?? '');
    formData.append('description_en', values['description_en'] ?? '');
    formData.append('description_ar', values['description_ar'] ?? '');
    formData.append(
      'detailed_description_en',
      values['detailed_description_en'] ?? ''
    );
    formData.append(
      'detailed_description_ar',
      values['detailed_description_ar'] ?? ''
    );
    formData.append('price', values['price'] ?? '');
    formData.append('area', values['area'] ?? '');
    formData.append('rooms', values['rooms'] ?? '');
    formData.append('bathrooms', values['bathrooms'] ?? '');

    formData.append('floor_en', values['floor_en'] ?? '');
    formData.append('floor_ar', values['floor_ar'] ?? '');

    formData.append('address_en', values['address_en'] ?? '');
    formData.append('address_ar', values['address_ar'] ?? '');

    formData.append('offer_type', values['offer_type'] ?? '');
    formData.append('type_id', values['type_id']?.value ?? '');

    formData.append('furnishing_en', values['furnishing_en'] ?? '');
    formData.append('furnishing_ar', values['furnishing_ar'] ?? '');

    formData.append('finishing_en', values['finishing_en'] ?? '');
    formData.append('finishing_ar', values['finishing_ar'] ?? '');

    formData.append('is_available', values['is_available'] ?? '');
    formData.append('in_home', values['in_home'] ?? '');

    formData.append('view_count', values['view_count'] ?? '');

    if (values['latitude']) formData.append('latitude', values['latitude']);
    if (values['longitude']) formData.append('longitude', values['longitude']);

    formData.append('price', values['price'] ?? '');

    formData.append('main_image', values['main_image'][0] ?? '');

    values['gallery'].map((img) => {
      formData.append('gallery[]', img ?? '');
    });
    values['partners']?.forEach((partner, idx) => {
      formData.append(`partners[${idx}][id]`, partner?.value ?? '');
    });
    try {
      setLoading(true);
      const res = await fetch(
        `${(process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_BASE_URL)}/api/dashboard/property/${id}`,
        {
          body: formData,
          method: 'POST',
          headers: {
            Accept: 'application/json',
            authorization: `Bearer ${token}`,
          },
          next: { revalidate: 0 },
        }
      );
      if (!res.ok) {
        throw new Error('Failed to fetch data');
      } else {
        toast.success(t('Property.toast.update'), {
          position: 'top-right',
          autoClose: 3000,
        });
      }
      const data = await res.json();
      return data;
    } catch (error) {
    } finally {
      getData(locale);
      setLoading(false);
    }
  };

  // Delete Data
  async function deleteData(id) {
    setDeletingId(id);
    try {
      const res = await fetch(
        `${(process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_BASE_URL)}/api/dashboard/property/${id}`,
        {
          method: 'DELETE',
          headers: { authorization: `Bearer ${token}` },
        }
      );

      if (res.ok) {
        setData((prev) => prev.filter((data) => data.id !== id));
        toast.success(t('Property.toast.delete'), {
          position: 'top-right',
          autoClose: 3000,
        });
      }
    } catch (error) {
    } finally {
      setDeletingId(null);
    }
  }

  // Pagination
  //   const getNextPage = async () => {
  //     setCurrentPage((prev) => prev + 1);
  //   };
  //   const getPrevPage = async () => {
  //     setCurrentPage((prev) => prev - 1);
  //   };

  //   const getPageByNumber = async (pageNumber) => {
  //     setCurrentPage(pageNumber);
  //   };

  useEffect(() => {
    getData(locale);
    getSelectedData(locale);
  }, [locale, page]);

  return {
    getSelectedData,
    selectedData,
    data,
    pagination,
    deletingId,
    loading,
    storeData,
    EditData,
    deleteData,
    currentData,
    getCurrentData,
  };
};
