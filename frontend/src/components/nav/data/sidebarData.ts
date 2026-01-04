import { IconAdjustments, IconChartHistogram } from '@tabler/icons-react'

export const data = {
  navMain: [
    {
      title: 'Panel de Control',
      url: '',
      icon: IconChartHistogram,
      subitems: [
        {
          title: 'Dashboard',
          url: '',
        },
        {
          title: 'Vehículos',
          url: '/vehicles',
        },
        {
          title: 'Proveedores',
          url: '/suppliers',
        },

        {
          title: 'Marcas',
          url: '/brands',
        },
      ],
    },
    {
      title: 'Administración',
      url: '/admin',
      icon: IconAdjustments,
      subitems: [
        {
          title: 'Agregar Vehículo',
          url: '/add-vehicle',
        },
        {
          title: 'Agregar Proveedor',
          url: '/add-supplier',
        },
      ],
    },
  ],
}
