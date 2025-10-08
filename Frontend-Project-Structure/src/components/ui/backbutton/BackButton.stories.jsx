import BackButton from './BackButton';

export default {
  title: 'UI/BackButton',
  component: BackButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

// Story por defecto
export const Default = {
  args: {
    onClick: () => console.log('Back button clicked'),
  },
};

// Story con texto personalizado
export const CustomText = {
  args: {
    onClick: () => console.log('Back button clicked'),
    text: 'Regresar',
  },
};

// Story deshabilitado
export const Disabled = {
  args: {
    onClick: () => console.log('Back button clicked'),
    disabled: true,
  },
};