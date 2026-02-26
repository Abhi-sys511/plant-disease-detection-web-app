
import { motion } from "framer-motion";
import { AlertCircle, TrendingDown, CheckCircle, ArrowRight, Zap, Info } from "lucide-react";

const alerts = [
    {
        id: 1,
        type: "high",
        title: "Critical Vitamin D Depletion",
        description: "Your health score dropped 5% due to sustained low sun exposure profiles.",
        icon: TrendingDown,
        color: "text-red-400",
        bg: "bg-red-500/10",
        border: "border-red-500/20"
    },
    {
        id: 2,
        type: "mid",
        title: "B12 Optimization Opportunity",
        description: "Vegan diet profile detected. Adding Methylcobalamin could boost vitality index by 12%.",
        icon: Zap,
        color: "text-amber-400",
        bg: "bg-amber-500/10",
        border: "border-amber-500/20"
    },
    {
        id: 3,
        type: "low",
        title: "Hydration Milestone Reached",
        description: "Bio-pathway synchronization complete. Your cellular hydration is at 98%.",
        icon: CheckCircle,
        color: "text-emerald-400",
        bg: "bg-emerald-500/10",
        border: "border-emerald-500/10"
    }
];

export const SmartAlerts = () => {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-violet-400" />
                    <h3 className="text-xl font-bold text-white tracking-tight">Intelligence Stream</h3>
                </div>
                <button className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition-colors">Mark all read</button>
            </div>

            <div className="space-y-4">
                {alerts.map((alert, i) => (
                    <motion.div
                        key={alert.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className={`group cursor-pointer glass-layer-1 hover:glass-layer-2 border-white/5 rounded-3xl p-5 border-l-4 transition-all ${alert.border} flex items-center justify-between gap-6`}
                    >
                        <div className="flex items-center gap-5">
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-lg ${alert.bg}`}>
                                <alert.icon className={`w-6 h-6 ${alert.color}`} />
                            </div>
                            <div className="space-y-1">
                                <h4 className="text-sm font-bold text-white group-hover:text-violet-400 transition-colors uppercase tracking-tight">{alert.title}</h4>
                                <p className="text-xs text-slate-500 line-clamp-1">{alert.description}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="hidden sm:flex flex-col items-end opacity-0 group-hover:opacity-100 transition-opacity">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Protocol</span>
                                <span className="text-xs font-bold text-white">Clinical Scan v2</span>
                            </div>
                            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-violet-600 transition-all">
                                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-white" />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="glass-morphism rounded-3xl p-6 border-white/5 flex items-center justify-between border-dashed bg-violet-600/5">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-violet-600/10 flex items-center justify-center">
                        <Info className="w-5 h-5 text-violet-400" />
                    </div>
                    <p className="text-xs text-slate-400">Deep link detected. Synchronize your <span className="text-white font-bold underline decoration-violet-500">Apple Health</span> for 40% more accuracy.</p>
                </div>
                <button className="text-[10px] font-black uppercase tracking-[0.2em] text-violet-400">Sync Now</button>
            </div>
        </div>
    );
};
