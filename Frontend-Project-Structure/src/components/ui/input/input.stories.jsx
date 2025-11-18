import Input from './Input';

// El 'meta' es la configuración general de las historias para este componente.
export default {
  title: 'UI/Input', // Así aparecerá en la barra lateral de Storybook
  component: Input,
  tags: ['autodocs'], // Esto genera una página de documentación automática
  argTypes: { // Opcional: Ayuda a Storybook a entender mejor tus props
    label: { control: 'text' },
    placeholder: { control: 'text' },
  },
};

// Cada 'export const' es una "historia" o una variación de tu componente.

// Historia para un campo de texto normal
export const Email = {
  args: {
    label: 'Correo Electrónico',
    id: 'email',
    type: 'email',
    placeholder: 'tu.correo@ejemplo.com',
  },
};

// Historia para un campo de contraseña
export const Password = {
  args: {
    label: 'Contraseña',
    id: 'password',
    type: 'password',
    placeholder: '••••••••',
  },
};