import Button from './Button';

export default {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    children: { control: 'text' }, // El texto del botón
  },
};

// Historia para el botón primario
export const Primary = {
  args: {
    variant: 'primary',
    children: 'Botón Primario',
  },
};

// Historia para un botón de tipo 'submit' (funcionalmente es igual, pero es buen ejemplo)
export const Submit = {
  args: {
    variant: 'primary',
    type: 'submit',
    children: 'Ingresar',
  },
};

