import {
  Application,
  Chart,
  Components,
  DashBoard,
  Stacks2,
  Map,
  Grid,
  Files,
  Graph,
  ClipBoard,
  Cart,
  Envelope,
  Messages,
  Monitor,
  ListFill,
  Calendar,
  Flag,
  Book,
  Note,
  ClipBoard2,
  Note2,
  Note3,
  BarLeft,
  BarTop,
  ChartBar,
  PretentionChartLine,
  PretentionChartLine2,
  Google,
  Pointer,
  Map2,
  MenuBar,
  Icons,
  ChartArea,
  Building,
  Building2,
  Sheild,
  Error,
  Diamond,
  Heroicon,
  LucideIcon,
  CustomIcon,
  Mail,
  Device,
  User,
  UserPlus,
  UserSign,
  Authentication,
  List,
  Web,
  Bell,
} from '@/components/svg';

export const menusConfig = {
  mainNav: [
    {
      title: 'Dashboard',
      icon: DashBoard,
      href: '/',
    },
  ],
  sidebarNav: {
    modern: [
      {
        title: 'AccountsManagment',
        icon: User,
        child: [
          {
            title: 'Roles',
            href: '/roles',
            permissions: [
              {
                id: 5,
                name: 'role',
                display_name_ar: 'القواعد',
                display_name_en: 'Role',
              },
            ],
            icon: UserSign,
            nested: [
              {
                title: 'ShowRoles',
                href: '/show-roles',
              },
              {
                title: 'CreateRole',
                href: '/store-role',
              },
            ],
          },
          {
            title: 'Admins',
            href: '/admins',
            permissions: [
              {
                id: 2,
                name: 'admin',
                display_name_ar: 'الإدارة',
                display_name_en: 'Admin',
              },
            ],
            icon: UserPlus,
            nested: [
              {
                title: 'ShowAdmins',
                href: '/show-admins',
              },
              {
                title: 'AddAdmin',
                href: '/store-admin',
              },
            ],
          },
        ],
      },
      {
        title: 'Sections',
        icon: Grid,
        child: [
          {
            title: 'HomeSections',
            icon: BarTop,
            permissions: [
              {
                id: 10,
                name: 'home',
                display_name_ar: 'الرئيسية',
                display_name_en: 'Home',
              },
              {
                id: 7,
                name: 'home_banner',
                display_name_ar: 'البانر الرئيسي',
                display_name_en: 'Home banner',
              },
              {
                id: 12,
                name: 'statistics',
                display_name_ar: 'الإحصائيات',
                display_name_en: 'Statistics',
              },
            ],
            nested: [
              {
                title: 'HomeTitle',
                href: '/edit-home-title',

                permissions: [
                  {
                    id: 7,
                    name: 'home_banner',
                    display_name_ar: 'البانر الرئيسي',
                    display_name_en: 'Home banner',
                  },
                ],
              },

              {
                title: 'StatisticsSection',
                href: '/statistics',
                permissions: [
                  {
                    id: 12,
                    name: 'statistics',
                    display_name_ar: 'الإحصائيات',
                    display_name_en: 'Statistics',
                  },
                ],
              },

              {
                title: 'AboutUsSection',
                href: '/edit-about',
                permissions: [
                  {
                    id: 1,
                    name: 'about_us',
                    display_name_ar: 'من نحن',
                    display_name_en: 'About us',
                  },
                ],
              },
            ],
          },

          {
            title: 'ChooseUs',
            icon: BarTop,
            permissions: [
              {
                id: 13,
                name: 'choose-us',
                display_name_ar: 'إخترنا',
                display_name_en: 'Choose us',
              },
            ],
            nested: [{ title: 'ShowChooseUs', href: '/show-choose-us' }],
          },
          {
            title: 'Partners',
            icon: BarTop,
            permissions: [
              {
                id: 13,
                name: 'choose-us',
                display_name_ar: 'إخترنا',
                display_name_en: 'Choose us',
              },
            ],
            nested: [
              { title: 'StorePartners', href: '/store-partners' },
              { title: 'showPartners', href: '/show-partners' },
            ],
          },
          {
            title: 'MarketingSteps',
            icon: BarTop,
            permissions: [
              {
                id: 11,
                name: 'our-steps',
                display_name_ar: 'خطواتنا',
                display_name_en: 'Our steps',
              },
            ],
            nested: [
              { title: 'ShowMarketingSteps', href: '/show-marketing-steps' },
            ],
          },

          {
            title: 'About',
            href: '/about',
            icon: BarTop,
            permissions: [
              {
                id: 1,
                name: 'about_us',
                display_name_ar: 'من نحن',
                display_name_en: 'About us',
              },
            ],
          },
          {
            title: 'Banner',
            href: '/banner',
            icon: BarTop,
            permissions: [
              {
                id: 8,
                name: 'pages_banner',
                display_name_ar: 'بانر الصفحات',
                display_name_en: 'Pages banner',
              },
            ],
          },

          {
            title: 'Reviews',
            href: '/reviews',
            icon: BarTop,
            permissions: [
              {
                id: 14,
                name: 'review',
                display_name_ar: 'التقييمات',
                display_name_en: 'Review',
              },
            ],
            nested: [
              {
                title: 'ShowReviews',
                href: '/show-reviews',
              },
            ],
          },
        ],
      },
      {
        title: 'Contact',
        icon: Mail,
        permissions: [
          {
            id: 3,
            name: 'contact_us',
            display_name_ar: 'إتصل بنا',
            display_name_en: 'Contact us',
          },
        ],
        child: [
          {
            title: 'Contact',
            href: '/contact-us-msgs',
            icon: Pointer,
          },
        ],
      },
      {
        title: 'RealEstateManagement',
        permissions: [
          {
            id: 17,
            name: 'property',
            display_name_ar: 'العقارات',
            display_name_en: 'Property',
          },
          {
            id: 19,
            name: 'type',
            display_name_ar: 'الأنواع',
            display_name_en: 'Type',
          },
        ],
        icon: BarTop,
        child: [
          {
            title: 'RealEstate',
            icon: BarTop,
            nested: [
              {
                title: 'RealEstate',
                icon: BarTop,
                permissions: [
                  {
                    id: 17,
                    name: 'property',
                    display_name_ar: 'العقارات',
                    display_name_en: 'Property',
                  },
                ],
                child: [
                  {
                    title: 'ShowRealEstate',
                    href: '/show-realestate',
                  },
                  {
                    title: 'AddRealEstate',
                    href: '/store-realestate',
                  },
                ],
              },
              {
                title: 'RealEstateCategory',
                icon: BarTop,

                permissions: [
                  {
                    id: 19,
                    name: 'type',
                    display_name_ar: 'الأنواع',
                    display_name_en: 'Type',
                  },
                ],
                child: [
                  {
                    title: 'ShowRealEstateCategories',
                    href: '/show-realestate-categories',
                  },
                  {
                    title: 'AddRealEstateCategory',
                    href: '/store-realestate-category',
                  },
                ],
              },
            ],
          },

          {
            title: 'Inspections',
            icon: BarTop,
            permissions: [
              {
                id: 18,
                name: 'inspection-request',
                display_name_ar: 'طلبات الفحص',
                display_name_en: 'Inspection request',
              },
            ],
            nested: [
              {
                title: 'ShowInspection',
                href: '/show-inspection',
              },
              {
                title: 'ShowInspectionHistory',
                href: '/show-inspection-history',
              },
            ],
          },
          {
            title: 'Reservations',
            icon: BarTop,
            permissions: [
              {
                id: 15,
                name: 'reservation',
                display_name_ar: 'الحجوزات',
                display_name_en: 'Reservation',
              },
            ],
            nested: [
              {
                title: 'ShowReservation',
                href: '/show-reservation',
              },
              {
                title: 'ShowReservationHistory',
                href: '/show-reservation-history',
              },
            ],
          },
          {
            title: 'BlockedNumbers',
            icon: BarTop,
            permissions: [
              {
                id: 16,
                name: 'blocked-phones',
                display_name_ar: 'الهواتف المحظورة',
                display_name_en: 'Blocked phones',
              },
            ],
            nested: [
              {
                title: 'ShowBlockedNumbers',
                href: '/show-blocked-numbers',
              },
              {
                title: 'AddBlockedNumber',
                href: '/store-blocked-number',
              },
            ],
          },
        ],
      },
      {
        title: 'SEOManagement',
        icon: Flag,
        permissions: [
          {
            id: 6,
            name: 'seo',
            display_name_ar: 'البحث',
            display_name_en: 'SEO',
          },
        ],
        child: [
          {
            title: 'Home',
            href: '/seo-home',
            icon: Pointer,
          },
          {
            title: 'Rent',
            href: '/seo-rent',
            icon: Pointer,
          },
          {
            title: 'Sale',
            href: '/seo-sale',
            icon: Pointer,
          },
          {
            title: 'About',
            href: '/seo-about',
            icon: Pointer,
          },
          {
            title: 'Contact',
            href: '/seo-contact',
            icon: Pointer,
          },
        ],
      },
    ],
    classic: [
      {
        isHeader: true,
        title: 'menu',
      },
      {
        title: 'Dashboard',
        icon: DashBoard,
        href: '/',
      },
    ],
  },
};
