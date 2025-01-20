import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

dotenv.config();

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    define: {
        'process.env': process.env,
    },
    build: {
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes('node_modules')) {
                        const modulesToExclude = [
                            'set-cookie-parser',
                            'turbo-stream',
                        ];
                        const chunkName = id
                            .toString()
                            .split('node_modules/')[1]
                            .split('/')[0]
                            .toString();
                        if (modulesToExclude.includes(chunkName)) {
                            return;
                        }
                        return chunkName;
                    }
                },
            },
        },
        chunkSizeWarningLimit: 1500,
    },
});
