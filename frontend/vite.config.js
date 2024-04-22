import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import daisyUI from 'daisyui';
// import daisyUI from 'daisyui/vite';


export default defineConfig({
  plugins: [
    reactRefresh(),
    tailwindcss(),
    autoprefixer(),
    // daisyUI(),
  ],
});
