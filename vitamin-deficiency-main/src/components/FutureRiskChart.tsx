
import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { TrendingUp, Target } from "lucide-react";

const data = [
    { name: 'Week 1', score: 68, projection: 68 },
    { name: 'Week 2', score: 72, projection: 75 },
    { name: 'Week 3', score: null, projection: 82 },
    { name: 'Week 4', score: null, projection: 88 },
    { name: 'Week 5', score: null, projection: 92 },
    { name: 'Week 6', score: null, projection: 95 },
];

export const FutureRiskChart = () => {
    return (
        <div className="glass-layer-1 border-white/5 rounded-[2rem] p-8 space-y-8 relative overflow-hidden group">
            <div className="bg-grid absolute inset-0 opacity-10" />

            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <TrendingUp className="text-emerald-400 w-5 h-5" />
                        Vitality Projection
                    </h3>
                    <p className="text-xs text-slate-500">Predicted optimization based on current remediation protocol.</p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/10">
                    <Target className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-bold text-emerald-400">Target: 95%</span>
                </div>
            </div>

            <div className="h-[240px] w-full relative z-10">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorProjection" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }}
                            dy={10}
                        />
                        <YAxis
                            hide
                            domain={[60, 100]}
                        />
                        <Tooltip
                            contentStyle={{
                                background: 'rgba(15, 23, 42, 0.9)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '12px',
                                fontSize: '12px'
                            }}
                        />
                        <Area
                            type="monotone"
                            dataKey="score"
                            stroke="#8b5cf6"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorScore)"
                            strokeLinecap="round"
                        />
                        <Area
                            type="monotone"
                            dataKey="projection"
                            stroke="#10b981"
                            strokeWidth={3}
                            strokeDasharray="5 5"
                            fillOpacity={1}
                            fill="url(#colorProjection)"
                            strokeLinecap="round"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            <div className="relative z-10 p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between gap-4">
                <div className="flex gap-3 items-center">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Protocol Adherence High</span>
                </div>
                <span className="text-[10px] font-black text-white uppercase tracking-widest">Est. Peak: Week 6</span>
            </div>
        </div>
    );
};
