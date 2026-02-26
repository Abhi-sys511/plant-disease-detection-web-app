
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, Printer, Shield, ChevronRight, Activity, Beaker, Pill, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HealthReportModalProps {
    isOpen: boolean;
    onClose: () => void;
    results: any[];
}

export const HealthReportModal = ({ isOpen, onClose, results }: HealthReportModalProps) => {
    if (!isOpen) return null;

    const healthScore = 68;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto"
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 40 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    className="w-full max-w-4xl bg-slate-950 rounded-[3rem] border border-white/10 shadow-3xl flex flex-col my-8"
                >
                    {/* Toolbar */}
                    <div className="p-6 border-b border-white/5 flex justify-between items-center bg-slate-900/50">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-violet-600 flex items-center justify-center">
                                <Pill className="text-white w-5 h-5" />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-white leading-none">Clinical Health Dossier</h2>
                                <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">Ref: VAI-2026-X99</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" className="rounded-xl border-white/10 bg-white/5 hover:bg-white/10 text-white" onClick={() => window.print()}>
                                <Printer className="w-4 h-4 mr-2" /> Print
                            </Button>
                            <Button size="sm" className="rounded-xl bg-violet-600 hover:bg-violet-700 text-white shadow-lg shadow-violet-500/20">
                                <Download className="w-4 h-4 mr-2" /> Download PDF
                            </Button>
                            <button onClick={onClose} className="ml-4 p-2 hover:bg-white/10 rounded-full transition-colors">
                                <X className="w-5 h-5 text-slate-400" />
                            </button>
                        </div>
                    </div>

                    {/* Content (Print optimized) */}
                    <div className="p-12 space-y-12 bg-white text-slate-950 rounded-b-[3rem] printable">
                        {/* Header Section */}
                        <div className="flex justify-between items-start border-b-2 border-slate-100 pb-8">
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 text-violet-600">
                                    <Shield className="w-6 h-6" />
                                    <span className="text-2xl font-black tracking-tighter">Vitamin AI Platform</span>
                                </div>
                                <div className="space-y-1">
                                    <h1 className="text-4xl font-bold">Biometric Analysis Report</h1>
                                    <p className="text-slate-500">Patient Profile: Abhi (Pro Member)</p>
                                </div>
                            </div>
                            <div className="text-right space-y-2">
                                <div className="text-6xl font-black text-violet-600">{healthScore}%</div>
                                <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Vitality Index Score</div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            {/* Summary */}
                            <div className="space-y-6">
                                <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 border-l-4 border-violet-500 pl-3">Summary of Findings</h3>
                                <p className="text-sm leading-relaxed text-slate-700">
                                    The AI Clinical Engine has analyzed your reported symptoms and biomarker logs. We have identified
                                    <span className="font-bold text-slate-950"> {results.length} critical optimization areas</span>.
                                    Immediate remediation is recommended for identified musculoskeletal and neurological indicators.
                                </p>

                                <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 space-y-4">
                                    <h4 className="text-xs font-bold text-slate-900 uppercase">Current Risk Profile</h4>
                                    <div className="flex items-center gap-3">
                                        <AlertTriangle className="text-amber-500 w-5 h-5" />
                                        <span className="text-sm font-bold text-amber-700">Moderate Nutrient Deficiency Cluster</span>
                                    </div>
                                </div>
                            </div>

                            {/* Key Indicators */}
                            <div className="space-y-6">
                                <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 border-l-4 border-violet-500 pl-3">Identified Deficiencies</h3>
                                <div className="space-y-3">
                                    {results.map((def, idx) => (
                                        <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center font-bold text-violet-600 text-xs">{idx + 1}</div>
                                                <span className="font-bold text-slate-900">{def.name}</span>
                                            </div>
                                            <span className="text-xs font-bold text-slate-500">{def.confidence}% Conf.</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Detailed Breakthroughs */}
                        <div className="space-y-8">
                            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 border-l-4 border-violet-500 pl-3">Clinical Breakdown</h3>
                            {results.map((def, idx) => (
                                <div key={idx} className="space-y-4 pb-8 border-b border-slate-100 last:border-0">
                                    <div className="flex items-center gap-3">
                                        <h4 className="text-xl font-bold text-slate-900">{def.name} Analysis</h4>
                                        <div className="px-2 py-0.5 rounded-full bg-red-100 text-red-600 text-[10px] font-bold border border-red-200">REMEDIATION REQ.</div>
                                    </div>
                                    <p className="text-sm text-slate-600 leading-relaxed italic">"{def.description}"</p>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                        <div className="p-5 bg-slate-50 rounded-2xl">
                                            <h5 className="text-[10px] font-bold text-slate-400 uppercase mb-3">AI Reasoning Path</h5>
                                            <ul className="space-y-2">
                                                {def.reasoning.map((r: string, i: number) => (
                                                    <li key={i} className="text-xs text-slate-600 flex gap-2">
                                                        <ChevronRight className="w-3 h-3 text-violet-500 shrink-0 mt-0.5" /> {r}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="p-5 bg-slate-50 rounded-2xl">
                                            <h5 className="text-[10px] font-bold text-slate-400 uppercase mb-3">Recommended Protocols</h5>
                                            <div className="flex flex-wrap gap-2">
                                                {def.sources.map((s: string, i: number) => (
                                                    <div key={i} className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-xs font-medium">{s}</div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Footer Disclaimer */}
                        <div className="mt-20 pt-8 border-t border-slate-100 text-[9px] text-slate-400 leading-relaxed text-center italic">
                            Disclaimer: This report is generated by the Vitamin AI Clinical Inference Engine. It is intended for educational and optimization purposes only.
                            It does not constitute medical advice, diagnosis, or treatment. Always consult with a qualified healthcare professional before starting any
                            supplementation protocol. Data processed with end-to-end encryption.
                        </div>
                    </div>
                </motion.div>

                <style>{`
                    @media print {
                        body * { visibility: hidden; }
                        .printable, .printable * { visibility: visible; }
                        .printable { position: absolute; left: 0; top: 0; width: 100%; height: 100%; border: none !important; }
                    }
                `}</style>
            </motion.div>
        </AnimatePresence>
    );
};
