
import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";

interface LayoutProps {
    children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
    const location = useLocation();

    return (
        <div className="flex min-h-screen bg-navy-950 text-white font-inter">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content Area */}
            <div className="flex-1 ml-64 flex flex-col min-h-screen relative overflow-x-hidden">
                {/* Background Grid & Glows */}
                <div className="bg-grid absolute inset-0 opacity-10 pointer-events-none" />
                <div className="fixed top-0 left-64 w-full h-screen pointer-events-none overflow-hidden z-[-1]">
                    <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-violet-600/10 rounded-full blur-[120px]" />
                    <div className="absolute bottom-[-5%] left-[10%] w-[30%] h-[30%] bg-blue-600/10 rounded-full blur-[100px]" />
                </div>

                {/* TopBar */}
                <TopBar />

                {/* Content */}
                <main className="flex-1 p-8 relative z-10 w-full max-w-[1600px] mx-auto">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={location.pathname}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className="h-full"
                        >
                            {children}
                        </motion.div>
                    </AnimatePresence>
                </main>

                {/* Footer Strip */}
                <footer className="border-t border-white/5 bg-black/40 backdrop-blur-2xl py-8 px-10">
                    <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                        <div className="space-y-3">
                            <div className="flex items-center gap-4">
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">© 2026 Vitamin AI Ecosystem</span>
                                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                    <span className="text-[9px] font-bold text-emerald-500 uppercase tracking-tighter">AI Core Online</span>
                                </div>
                            </div>
                            <p className="max-w-md text-[10px] leading-relaxed text-slate-500 font-medium">
                                <span className="text-slate-400 font-bold uppercase tracking-tighter mr-2">Medical Disclaimer:</span>
                                Vitamin AI provides health assessments based on peer-reviewed symptom correlation. This is not medical advice or a clinical diagnosis. Always consult with a healthcare professional before altering your nutritional regimen.
                            </p>
                        </div>
                        <div className="flex flex-wrap items-center gap-x-8 gap-y-2">
                            {["Privacy Protocol", "Clinical Reasoning", "Encryption Standards", "SaaS SLA"].map((link) => (
                                <a key={link} href="#" className="text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-violet-400 transition-all">
                                    {link}
                                </a>
                            ))}
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
};
