import { Inter, Montserrat, Bebas_Neue } from 'next/font/google';
import './globals.css';
import LenisScroll from '@/components/LenisScroll';
import QueryProvider from '@/components/QueryProvider';
import { Toaster } from '@/components/ui/toaster';
import LoadingOverlay from '@/components/LoadingOverlay';

const inter = Inter({ subsets: ['latin'] });
const montserrat = Montserrat({
    subsets: ['latin'],
    variable: '--font-montserrat',
});
const bebasNeue = Bebas_Neue({
    subsets: ['latin'],
    variable: '--font-bebasneue',
    weight: ['400'],
});

export const metadata = {
    title: 'CSE GECPKD Website',
    description:
        'Welcome to the official website of the Computer Science and Engineering Department of Government Engineering College, Palakkad.',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <link rel="preload" href="/cse.png" as="image" type="image/png" />
                <link rel="preload" href="/cap.png" as="image" type="image/png" />
            </head>
            <body
                className={`${inter.className} ${montserrat.variable} ${bebasNeue.variable}`}
            >
                <QueryProvider>
                    <LoadingOverlay />
                    <LenisScroll>{children}</LenisScroll>
                    <Toaster />
                </QueryProvider>
            </body>
        </html>
    );
}
