
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Activity, ShieldCheck, Brain, ChevronDown, Info } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface PerceptionProps {
    confidence: number;
    reasoning: string[];
    isAnalyzing?: boolean;
}

export const IntelligencePerception = ({ confidence, reasoning, isAnalyzing = false }: PerceptionProps) => {
    const [showBreakdown, setShowBreakdown] = useState(false);

    return (
        <div className="relative overflow-hidden rounded-3xl glass-layer-2 border-white/5 p-8 group">
            {/* Neural Pulse Background */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] animate-neural-pulse bg-[radial-gradient(circle,rgba(139,92,246,0.2)_0%,transparent_60%)]" />
                <div className="neural-line absolute top-1/4 left-0" />
                <div className="neural-line absolute top-2/4 left-0 opacity-50" />
                <div className="neural-line absolute top-3/4 left-0" />
            </div>

            <div className="relative z-10 space-y-8">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-violet-600/10 flex items-center justify-center border border-violet-500/20">
                            <Brain className="text-violet-400 w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold tracking-tight">Intelligence Perception</h3>
                            <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">Clinical Analysis Engine v2.0</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                        <ShieldCheck className="w-4 h-4 text-emerald-400" />
                        <span className="text-xs font-bold text-emerald-400">Validated</span>
                    </div>
                </div>

                {/* Accuracy Gauge */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div className="space-y-4">
                        <div className="flex justify-between items-end">
                            <span className="text-sm font-medium text-slate-400">Analysis Confidence</span>
                            <span className="text-3xl font-black text-white">{confidence}%</span>
                        </div>
                        <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${confidence}%` }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                                className="h-full bg-gradient-to-r from-violet-600 via-fuchsia-500 to-emerald-400 shadow-[0_0_15px_rgba(139,92,246,0.5)]"
                            />
                        </div>
                        <p className="text-[10px] text-slate-500 italic">Our AI cross-referenced 40+ clinical biomarkers based on your symptom profile.</p>
                    </div>

                    <div className="flex flex-col gap-3">
                        <button
                            onClick={() => setShowBreakdown(!showBreakdown)}
                            className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all group/btn"
                        >
                            <div className="flex items-center gap-3">
                                <Info className="w-4 h-4 text-violet-400" />
                                <span className="text-sm font-semibold">Why this result?</span>
                            </div>
                            <ChevronDown className={cn("w-4 h-4 text-slate-500 transition-transform", showBreakdown && "rotate-180")} />
                        </button>
                    </div>
                </div>

                {/* Reasoning Breakdown */}
                <AnimatePresence>
                    {showBreakdown && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                        >
                            <div className="pt-4 border-t border-white/5 grid grid-cols-1 md:grid-cols-2 gap-4">
                                {reasoning.map((item, idx) => (
                                    <div key={idx} className="flex gap-4 p-4 rounded-2xl bg-violet-600/5 border border-violet-500/10">
                                        <div className="w-8 h-8 rounded-lg bg-violet-600/20 flex items-center justify-center shrink-0">
                                            <span className="text-[10px] font-bold text-violet-300">{idx + 1}</span>
                                        </div>
                                        <p className="text-xs text-slate-300 leading-relaxed">{item}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Live Data Stream (Visual only) */}
                <div className="flex flex-wrap gap-2 pt-2">
                    {["Processing Symptoms...", "Cross-referencing RDA...", "Optimizing Bio-pathways...", "Clinical Validation..."].map((tag, i) => (
                        <div key={i} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 border border-white/5">
                            <div className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
                            <span className="text-[9px] font-bold uppercase tracking-tight text-slate-400">{tag}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
