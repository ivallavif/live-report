"use client";
import { SessionProvider } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { usePathname } from 'next/navigation'
import { signOut } from "next-auth/react";

import '@ant-design/v5-patch-for-react-19';
import { Button } from "antd";
import Swal from "sweetalert2";
import { useRouter } from 'next/navigation'
import { DownloadOutlined } from '@ant-design/icons'
export default function MainLayout({ children }) {
    const router = useRouter()

    let titleName = 'PM Report'
    switch (usePathname()) {
        case '/main/form':
            titleName = 'Report Form'
            break;
    }
    const signoutConfirmation = () => {
        Swal.fire({
            icon: 'question',
            title: 'Want to Signout?',
            showCancelButton: true
        })
            .then(async (res) => {
                if (res.isConfirmed) {
                    await signOut({ callbackUrl: '/', redirect: true })
                }
            })
    }
    return <SessionProvider>
        <div className="w-full ">
            <div className="flex justify-between items-center py-2 px-4 mb-2 border-b border-gray-200">
                <img src="https://www.unifiber.id/assets/logos/logo-color.svg" className="w-24" />
                <div className="flex gap-2 items-center">
                    <a href="/guideline.pdf" target="_blank" className="text-blue-400 font-semibold mx-4 cursor-pointer underline">Guidelines</a>
                    <Button href="/live_report_1.0.apk" icon={<DownloadOutlined />}>APK</Button>
                    <Button onClick={signoutConfirmation}>Logout</Button>
                </div>
            </div>
            <h1 className="text-orange-500 font-bold text-[1.5rem] mb-2 text-center">{titleName.toUpperCase()}</h1>
            <div className="flex w-full justify-center items-center">
                <div className="w-full px-4 lg:w-1/2">
                    {children}
                </div>
            </div>
        </div>
    </SessionProvider>;
}
