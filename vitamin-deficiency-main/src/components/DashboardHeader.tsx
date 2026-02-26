
import { motion } from "framer-motion";
import { Sparkles, Calendar, ArrowUpRight, Download, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DashboardHeaderProps {
    userName?: string;
    healthScore: number;
    riskLevel: string;
    lastUpdated: string;
    onExportPDF?: () => void;
    onNewLog?: () => void;
}

export const DashboardHeader = ({
    userName = "Abhi",
    healthScore,
    riskLevel,
    lastUpdated,
    onExportPDF,
    onNewLog
}: DashboardHeaderProps) => {
    return (
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-12">
            <div className="space-y-4">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-3"
                >
                    <div className="w-10 h-10 rounded-xl bg-violet-600/10 flex items-center justify-center border border-violet-500/20">
                        <Sparkles className="text-violet-400 w-5 h-5 animate-pulse" />
                    </div>
                    <span className="text-sm font-bold text-violet-400 uppercase tracking-widest">Intelligent Health Cloud</span>
                </motion.div>

                <div className="space-y-1">
                    <motion.h1
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-black tracking-tight text-white"
                    >
                        Welcome back, <span className="text-gradient">{userName}.</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-slate-500 font-medium"
                    >
                        Your biological profile is <span className="text-emerald-400 font-bold">{healthScore}% optimized</span>.
                        No critical alerts detected in last 24h.
                    </motion.p>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="flex items-center gap-6 pt-2"
                >
                    <div className="flex items-center gap-2 text-xs text-slate-500 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Last scan: {lastUpdated}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-400/10 px-3 py-1.5 rounded-full border border-emerald-400/10">
                        <ArrowUpRight className="w-3.5 h-3.5" />
                        <span>+5.4% vs last month</span>
                    </div>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="flex items-center gap-4"
            >
                <Button
                    variant="outline"
                    onClick={onExportPDF}
                    className="h-14 px-6 rounded-2xl border-white/5 bg-white/5 hover:bg-white/10 text-slate-300 font-bold hidden sm:flex"
                >
                    <Download className="w-5 h-5 mr-2" />
                    Full Health PDF
                </Button>
                <Button
                    onClick={onNewLog}
                    className="h-14 px-8 rounded-2xl bg-white text-black hover:bg-slate-200 font-bold shadow-2xl shadow-white/10"
                >
                    <Plus className="w-5 h-5 mr-2" />
                    New Biomarker Log
                </Button>
            </motion.div>
        </div>
    );
};
