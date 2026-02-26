
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Download, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from "recharts";
import { IntelligencePerception } from "./IntelligencePerception";

const chartData = [
    { subject: 'Vitamin D', A: 45, full: 100 },
    { subject: 'B12', A: 30, full: 100 },
    { subject: 'Iron', A: 55, full: 100 },
    { subject: 'Magnesium', A: 70, full: 100 },
    { subject: 'Zinc', A: 65, full: 100 },
    { subject: 'Vit C', A: 85, full: 100 },
];

export const AIResults = ({ results, onExport }: { results: any[], onExport?: () => void }) => {
    const healthScore = 68; // Mock score

    return (
        <div className="space-y-12 max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Score Meter */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="lg:col-span-1 glass-layer-2 rounded-4xl p-8 flex flex-col items-center justify-center text-center space-y-6"
                >
                    <div className="relative w-48 h-48">
                        <svg className="w-full h-full transform -rotate-90">
                            <circle
                                cx="96"
                                cy="96"
                                r="80"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="12"
                                className="text-white/5"
                            />
                            <motion.circle
                                cx="96"
                                cy="96"
                                r="80"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="12"
                                strokeDasharray={2 * Math.PI * 80}
                                initial={{ strokeDashoffset: 2 * Math.PI * 80 }}
                                animate={{ strokeDashoffset: 2 * Math.PI * 80 * (1 - healthScore / 100) }}
                                transition={{ duration: 2, ease: "easeOut" }}
                                className="text-violet-500"
                                strokeLinecap="round"
                            />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-5xl font-black text-white">{healthScore}</span>
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Vitality Index</span>
                        </div>
                    </div>
                    <div className="space-y-1">
                        <h3 className="text-xl font-bold text-white tracking-tight">Moderate Deficiency Risk</h3>
                        <p className="text-sm text-slate-400 px-4">Your profile suggests strategic nutrient optimization is required.</p>
                    </div>
                </motion.div>

                {/* Radar Chart */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="lg:col-span-2 glass-layer-1 rounded-4xl p-8 overflow-hidden relative"
                >
                    <div className="bg-grid absolute inset-0 opacity-10" />
                    <div className="relative z-10 flex justify-between items-center mb-8">
                        <h3 className="text-xl font-bold text-white flex items-center gap-3">
                            <Sparkles className="text-violet-400 w-5 h-5 animate-pulse" />
                            Nutrient Profile Analysis
                        </h3>
                        <div className="flex gap-2">
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={onExport}
                                className="rounded-xl border-white/5 bg-white/5 hover:bg-white/10 h-10 px-4"
                            >
                                <Download className="w-4 h-4 mr-2" /> Export
                            </Button>
                        </div>
                    </div>

                    <div className="h-[300px] w-full relative z-10">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                                <PolarGrid stroke="rgba(255,255,255,0.08)" />
                                <PolarAngleAxis dataKey="subject" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10, fontWeight: 600 }} />
                                <Radar
                                    name="Current"
                                    dataKey="A"
                                    stroke="#8b5cf6"
                                    fill="#8b5cf6"
                                    fillOpacity={0.4}
                                />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>
            </div>

            {/* Individual Perception Depth Reports */}
            <div className="space-y-12 pb-20">
                <div className="flex items-end justify-between px-2">
                    <div className="space-y-1">
                        <h2 className="text-3xl font-bold tracking-tight">Clinical Breakthroughs</h2>
                        <p className="text-slate-500 italic text-sm">Detailed intelligence depth for each detected deficiency.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-12">
                    {results.map((def, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="space-y-6"
                        >
                            <div className="flex flex-col lg:flex-row gap-8">
                                <Card className="lg:w-1/2 glass-layer-2 border-white/5 rounded-4xl p-8 space-y-6 flex flex-col justify-between hover:border-violet-500/20 transition-all border-l-4 border-l-violet-500">
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h4 className="text-4xl font-black text-white tracking-tighter">{def.name}</h4>
                                                <div className="flex items-center gap-2 mt-2">
                                                    <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
                                                    <span className="text-[10px] font-black text-red-400 uppercase tracking-[0.2em]">Critical Biomarker Deficiency</span>
                                                </div>
                                            </div>
                                        </div>

                                        <p className="text-slate-400 leading-relaxed text-sm">
                                            {def.description}
                                        </p>

                                        <div className="space-y-4">
                                            <div className="text-[10px] font-black text-white uppercase tracking-widest opacity-50">Strategic Remediation</div>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                {def.sources.slice(0, 4).map((source: string, i: number) => (
                                                    <div key={i} className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/5 group hover:bg-violet-500/10 hover:border-violet-500/20 transition-all">
                                                        <CheckCircle2 className="w-4 h-4 text-violet-400 shrink-0" />
                                                        <span className="text-xs text-slate-300 group-hover:text-white transition-colors truncate">{source}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <Button className="w-full h-14 rounded-2xl bg-violet-600 hover:bg-violet-700 text-white shadow-xl shadow-violet-500/20 group transition-all mt-4">
                                        Activate Precision Nutrition Plan
                                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </Button>
                                </Card>

                                <div className="lg:w-1/2">
                                    <IntelligencePerception
                                        confidence={def.confidence || 85}
                                        reasoning={def.reasoning || ["Cross-referencing symptoms...", "Optimizing nutrient pathways..."]}
                                    />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};
